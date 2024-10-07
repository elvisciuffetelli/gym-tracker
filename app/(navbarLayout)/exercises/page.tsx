import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Content } from "./content";

export default async function Page() {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.getUser();
	if (error || !data?.user) {
		redirect("/");
	}

	const { data: exercisesData, error: exerciseError } = await (await supabase)
		.from("exercises")
		.select();

	return <Content exercises={exercisesData || []} />;
}
