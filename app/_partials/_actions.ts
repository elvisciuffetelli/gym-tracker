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

	const name = (formData.get("exercise") as string).trim().toLowerCase();
	const maximal = formData.get("maximal") as string;

	const { error: exercisesError } = await (await supabase)
		.from("exercises")
		.insert({
			name: name,
			user_id: data.user.id,
			maximal: Number.parseFloat(maximal),
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

export async function deleteWorkout(
	prevState: { message: string },
	formData: FormData,
) {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.getUser();
	if (error || !data?.user) {
		redirect("/");
	}

	const workoutId = formData.get("workout-id") as string;

	const { error: deleteWorkoutError } = await (await supabase)
		.from("workouts")
		.delete()
		.match({ id: workoutId });

	if (deleteWorkoutError) {
		console.error("Error deleting workout:", deleteWorkoutError);
		return {
			message: `${deleteWorkoutError.details} ${deleteWorkoutError.message}`,
		};
	}

	revalidatePath("/", "layout");
}

export async function updateExercise(formData: FormData) {
	const supabase = createClient();

	const { data, error } = await (await supabase).auth.getUser();
	if (error || !data?.user) {
		redirect("/");
	}

	const selectedExercise = formData.get("exercise-id") as string;
	const name = (formData.get("exercise") as string).trim().toLowerCase();
	const maximal = formData.get("maximal") as string;

	const { error: updateExerciseError } = await (await supabase)
		.from("exercises")
		.update({
			name,
			maximal: Number.parseFloat(maximal),
		})
		.match({ id: selectedExercise });

	if (updateExerciseError) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
}
