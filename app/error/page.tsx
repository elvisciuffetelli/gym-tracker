"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-background">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
						<AlertCircle className="mr-2 h-6 w-6 text-destructive" />
						Something Went Wrong
					</CardTitle>
				</CardHeader>
				<CardContent className="text-center">
					<p>Wee&apos;re sorry, but an unexpected error occurred.</p>
					<p className="mt-2">
						Our team has been notified and wee&apos;re working to fix the issue.
					</p>
				</CardContent>
				<CardFooter className="flex justify-center space-x-4">
					<Button asChild variant="outline">
						<Link href="/">Go Home</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
