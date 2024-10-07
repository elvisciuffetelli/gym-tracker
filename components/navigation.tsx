"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Navigation() {
	const router = useRouter();
	const pathname = usePathname();
	const supabase = createClient();

	const handleLogout = async () => {
		await supabase.auth.signOut();

		router.push("/");
	};

	const tabs = [
		{ name: "Exercises", href: "/exercises" },
		{ name: "Workout", href: "/workout" },
		{ name: "Archive", href: "/archive" },
		{ name: "Calculator", href: "/calculator" },
	];

	return (
		<div className="container mx-auto px-2 py-4 md:p-4">
			<div className="flex justify-between mb-8 items-center">
				<div className="flex justify-between items-center align-middle space-x-2">
					<Image
						src="/logo.png"
						alt="Gym Tracker Logo"
						width={60}
						height={60}
					/>
					<h1 className="text-3xl font-bold">Gym Tracker</h1>
				</div>
				<Button onClick={handleLogout} className="" variant="outline">
					Logout
				</Button>
			</div>
			<div className="flex w-full items-center justify-center">
				<div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mt-4">
					{tabs.map((tab) => (
						<Link
							key={tab.href}
							href={tab.href}
							className={cn(
								"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
								pathname === tab.href
									? "bg-background text-foreground shadow-sm"
									: "hover:bg-background/50",
							)}
						>
							{tab.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
