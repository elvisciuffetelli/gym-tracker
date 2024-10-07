import { createClient } from "@/utils/supabase/server";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = createClient();
		await (await supabase).auth.exchangeCodeForSession(code);
	}

	// Redirect to the exercises page after successful authentication
	return NextResponse.redirect(`${requestUrl.origin}/exercises`);
}
