import { createClient } from "@/utils/supabase/server";

import { Dashboard } from "@/app/_partials/dashboard";
import { redirect } from "next/navigation";

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

	if (exerciseError || workoutsError) {
		console.error(
			"Error fetching exercises or workouts:",
			exerciseError,
			workoutsError,
		);
		redirect("/error");
	}

	return (
		<Dashboard
			user={data.user}
			exercises={exercisesData}
			workouts={workoutsData}
		/>
	);
}
