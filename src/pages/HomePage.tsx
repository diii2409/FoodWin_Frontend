import {Layout} from "@/layouts";
import appDownloadImage from "../assets/appDownload.png";
import langingImage from "../assets/landing.png";

export default function HomePage() {
	return (
		<Layout showHero>
			<div className="flex flex-col gap-12">
				<div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
					<h1 className="text-5xl font-bold tracking-tight text-orange-500 ">
						Tuck into a takeaway today
					</h1>
					<span className="text-xl">Food is just a click away!</span>
				</div>
				<div className="grid md:grid-cols-2 gap-5">
					<img src={langingImage} />
					<div className="flex flex-col item-center justify-center gap-4 text-center">
						<span className="font-bold text-3xl tracking-tighter">
							Order takeaway even faster!
						</span>
						<div className="">
							Download the App for faster ordering and personalised
							recommendations
						</div>
						<img src={appDownloadImage} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
