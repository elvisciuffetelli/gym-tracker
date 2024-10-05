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
import { useEffect } from "react";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

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
					{error?.message ? (
						<p className="my-2 text-red-500">{error.message}</p>
					) : (
						<div>
							<p>We're sorry, but an unexpected error occurred.</p>
							<p className="mt-2">
								Our team has been notified and we're working to fix the issue.
							</p>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-center space-x-4">
					<Button onClick={reset}>Try Again</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
