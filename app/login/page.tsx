import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";

export default function Login() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-background">
			<form className="space-y-4 w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
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
				<Button type="submit" className="w-full" formAction={signup}>
					Sign Up
				</Button>
			</form>
		</div>
	);
}
