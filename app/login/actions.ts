"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await (await supabase).auth.signInWithPassword(data);

	if (error) {
		throw new Error(error.message);
		//redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signup(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await (await supabase).auth.signUp(data);
	console.log("error", error);

	if (error) {
		//redirect("/error");
		throw new Error(error.message);
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function googleSignIn(formData: FormData) {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: "https://blue-bear-gym.netlify.app/auth/callback",
		},
	});

	if (data.url) {
		console.log("data.url", data.url);
		redirect(data.url); // use the redirect API for your server framework
	}

	if (error) {
		throw new Error(error.message);
	}
}
