"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addExercise(
	prevState: { message: string },
	formData: FormData,
) {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.getUser();
	if (error || !data?.user) {
		redirect("/");
	}

	const { error: exercisesError } = await (await supabase)
		.from("exercises")
		.insert({
			name: formData.get("exercise") as string,
			user_id: data.user.id,
		});

	if (exercisesError) {
		console.error("Error adding exercise:", exercisesError);
		return {
			message: `${exercisesError.details} ${exercisesError.message}`,
		};
	}

	revalidatePath("/", "layout");
}

export async function deleteExercise(
	prevState: { message: string },
	formData: FormData,
) {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.getUser();
	if (error || !data?.user) {
		redirect("/");
	}

	const exerciseId = formData.get("exercise-id") as string;

	const { error: deleteExercisesError } = await (await supabase)
		.from("exercises")
		.delete()
		.match({ id: exerciseId });

	if (deleteExercisesError) {
		console.error("Error deleting exercise:", deleteExercisesError);
		return {
			message: `${deleteExercisesError.details} ${deleteExercisesError.message}`,
		};
	}

	revalidatePath("/", "layout");
}

export async function addWorkout(formData: FormData) {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.getUser();
	if (error || !data?.user) {
		redirect("/");
	}

	const selectedExercise = formData.get("exercise-id") as string;
	const sets = formData.get("sets") as string;
	const reps = formData.get("reps") as string;
	const weight = formData.get("weight") as string;

	const { error: addWorkoutError } = await (await supabase)
		.from("workouts")
		.insert({
			exercise_id: selectedExercise,
			sets: Number.parseInt(sets),
			reps: Number.parseInt(reps),
			weight: Number.parseFloat(weight),
			user_id: data.user.id,
		});

	if (addWorkoutError) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
}
