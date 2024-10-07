import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootPage() {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	} else {
		redirect("/exercises");
	}
}
