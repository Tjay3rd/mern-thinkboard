import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function Navbar() {
	return (
		<div className="sticky w-full top-0 z-10">
			<header className="bg-base-300 border-b border-base-content/10">
				<div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
						Thinkboard
					</h1>
					<div>
						<Link to={"/create"} className="btn btn-primary mx-4">
							<Plus className="size-5" />
							<span>New Note</span>
						</Link>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Navbar;
