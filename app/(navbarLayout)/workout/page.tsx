import type { Exercise } from "@/types";
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

	const twoWeeksAgo = new Date();
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

	const { data: workoutsData, error: workoutsError } = await (await supabase)
		.from("workouts")
		.select()
		.gte("created_at", twoWeeksAgo.toISOString());

	return (
		<Content exercises={exercisesData || []} workouts={workoutsData || []} />
	);
}
