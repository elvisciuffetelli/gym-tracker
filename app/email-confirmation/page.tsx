import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-background">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Email Confirmation
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-center">
						Thank you for signing up! We&apos;ve sent a confirmation email to
						your address.
					</p>
					<p className="text-center">
						Please check your inbox and click on the confirmation link to
						activate your account.
					</p>
					<div className="flex justify-center">
						<Button asChild>
							<Link href="/login">Return to Login</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
