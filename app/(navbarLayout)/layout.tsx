import { Navigation } from "@/components/navigation";
import type React from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navigation />
			<section className="container mx-auto px-2 py-4 md:px-4 md:py-6">
				{children}
			</section>
		</>
	);
}
