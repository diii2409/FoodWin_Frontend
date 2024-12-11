const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME!;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY!;

// Hàm resize ảnh
const resizeImage = (file: File, maxSize: number): Promise<File> => {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.onload = e => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				let width = img.width;
				let height = img.height;

				if (width > height) {
					if (width > maxSize) {
						height *= maxSize / width;
						width = maxSize;
					}
				} else {
					if (height > maxSize) {
						width *= maxSize / height;
						height = maxSize;
					}
				}

				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					throw new Error("Failed to get 2D context for resizing image");
				}

				ctx.drawImage(img, 0, 0, width, height);
				canvas.toBlob(
					blob => {
						if (blob) {
							resolve(
								new File([blob], file.name, {
									type: "image/jpeg",
									lastModified: Date.now(),
								}),
							);
						}
					},
					"image/jpeg",
					0.7,
				);
			};
			img.src = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	});
};

// Hàm upload ảnh
export const uploadImage = async (file: File): Promise<string> => {
	if (!UPLOAD_PRESET || !CLOUD_NAME) {
		throw new Error("Missing Cloudinary environment variables");
	}

	const resizedFile = await resizeImage(file, 1000);

	const formData = new FormData();
	formData.append("file", resizedFile);
	formData.append("upload_preset", UPLOAD_PRESET);

	try {
		const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
			method: "POST",
			body: formData,
		});

		const data = await response.json();

		if (!response.ok) {
			console.error("Upload failed", data); // Log lỗi chi tiết
			throw new Error(data.error?.message || "Upload failed");
		}

		return data.secure_url;
	} catch (error) {
		console.error("Error during upload:", error); // Log thêm lỗi
		throw error;
	}
};

// Hàm xóa ảnh
export const deleteImage = async (publicId: string): Promise<boolean> => {
	if (!CLOUD_NAME || !API_KEY || !UPLOAD_PRESET) {
		throw new Error("Missing Cloudinary environment variables");
	}
	const signatureResponse = await fetch(
		`http://localhost:7000/cloudinary/signature?public_id=${publicId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const {signature, timestamp, api_key, cloudName} = await signatureResponse.json();

	const formData = new FormData();
	formData.append("public_id", publicId);
	formData.append("api_key", api_key);
	formData.append("timestamp", timestamp.toString());
	formData.append("signature", signature);

	const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Delete failed");
	}

	const data = await response.json();
	return data.result === "ok";
};

export const changeImage = async (oldPublicId: string, newFile: File): Promise<string> => {
	// Xóa ảnh cũ
	const deleteResult = await deleteImage(oldPublicId);
	if (!deleteResult) {
		throw new Error("Failed to delete the old image");
	}

	// Upload ảnh mới
	const newImageUrl = await uploadImage(newFile);
	return newImageUrl;
};

export const extractPublicIdFromUrl = (url: string): string | null => {
	const regex = /\/image\/upload\/(?:v\d+\/)?([^\.]+)/;
	const match = url.match(regex);
	return match ? match[1] : null;
};
