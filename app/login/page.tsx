"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { login, signup } from "./actions";

export default function Login() {
	const supabase = createClient();

	const handleGoogleSignIn = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: "https://blue-bear-gym.netlify.app/auth/callback",
			},
		});

		if (error) {
			console.error("Error:", error.message);
			redirect("/error");
		}
	};

	return (
		<div className="container mx-auto px-4 flex justify-center items-center min-h-screen bg-background">
			<div className="space-y-6 w-full max-w-md">
				<form className="space-y-4 p-8 bg-card rounded-lg shadow-lg">
					<h1 className="text-2xl font-bold text-center mb-6">Login</h1>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							name="password"
							placeholder="Enter your password"
							required
						/>
					</div>

					<Button type="submit" className="w-full" formAction={login}>
						Log in
					</Button>
					<Button
						type="submit"
						className="w-full"
						formAction={signup}
						variant="secondary"
					>
						Sign Up
					</Button>
				</form>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				<Button
					type="button"
					variant="outline"
					className="w-full"
					onClick={handleGoogleSignIn}
				>
					<svg
						className="mr-2 h-4 w-4"
						aria-hidden="true"
						focusable="false"
						data-prefix="fab"
						data-icon="google"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 488 512"
					>
						<path
							fill="currentColor"
							d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
						/>
					</svg>
					Sign in with Google
				</Button>
			</div>
		</div>
	);
}
