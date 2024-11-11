import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

type Props = {
	page: number;
	pages: number;
	onPageChange: (page: number) => void;
};

const PaginationSelector = ({page, pages, onPageChange}: Props) => {
	const range = 1;
	const pageNumbers: number[] = [];

	if (pages < 1) {
		return;
	}

	// Nếu trang hiện tại nằm ở phần đầu (trang 1 hoặc 2), hiển thị các trang đầu tiên và dấu ba chấm ở cuối
	else if (page <= 3) {
		for (let i = 1; i <= Math.min(3, pages); i++) {
			pageNumbers.push(i);
		}
		if (pages > 3) {
			// 3 bấm ở đằng sau
			pageNumbers.push(-1);
			pageNumbers.push(pages);
		}
	}

	// Nếu trang hiện tại nằm ở phần cuối (trang 9 hoặc 10), hiển thị các trang cuối và dấu ba chấm ở đầu
	else if (page >= pages - 1) {
		pageNumbers.push(1);
		// 3 chấm ở đằng trước
		pageNumbers.push(-1);
		for (let i = pages - 2; i <= pages; i++) {
			pageNumbers.push(i);
		}
	}

	// Nếu trang hiện tại ở giữa, hiển thị dấu ba chấm ở đầu, các trang xung quanh và dấu ba chấm ở cuối
	else {
		pageNumbers.push(1);
		// 3 bấm ở đằng trước
		pageNumbers.push(-1);
		for (let i = page - range; i <= page + range; i++) {
			pageNumbers.push(i);
		}
		// 3 bấm ở đằng sau
		pageNumbers.push(-1);
		pageNumbers.push(pages);
	}
	return (
		<Pagination>
			<PaginationContent>
				{/* Nút chuyển về trang trước nếu không phải trang đầu */}
				{page !== 1 && (
					<PaginationItem>
						<PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
					</PaginationItem>
				)}
				{pageNumbers.map((number, index) => (
					<PaginationItem key={index}>
						{number >= 0 ? (
							<PaginationLink
								href="#"
								onClick={() => onPageChange(number)}
								className={page === number ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
								isActive={page === number}>
								{number}
							</PaginationLink>
						) : (
							// Hiển thị dấu ba chấm
							<PaginationEllipsis />
						)}
					</PaginationItem>
				))}

				{/* Nút chuyển sang trang tiếp theo nếu không phải trang cuối */}
				{page !== pages && (
					<PaginationItem>
						<PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationSelector;
