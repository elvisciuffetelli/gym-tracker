"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import type { Exercise } from "@/types";
//@ts-ignore
import { useFormState } from "react-dom";
import { addExercise, deleteExercise } from "./_actions";

type Props = {
	exercises: Exercise[];
};

export function ExercisesTab({ exercises }: Props) {
	const [deleteExerciseState, deleteExerciseFormAction] = useFormState(
		deleteExercise,
		{ message: "" },
	);

	const [addExerciseState, addExerciseFormAction] = useFormState(addExercise, {
		message: "",
	});

	return (
		<TabsContent value="exercises">
			<Card>
				<CardHeader>
					<CardTitle>Exercises</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{addExerciseState?.message && (
							<p className="text-red-500">{addExerciseState.message}</p>
						)}
						<form action={addExerciseFormAction} className="flex space-x-2">
							<Input placeholder="New exercise name" name="exercise" />
							<Button type="submit">Add Exercise</Button>
						</form>
						<ul className="list-disc pl-5 space-y-2">
							{deleteExerciseState?.message && (
								<p className="text-red-500">{deleteExerciseState.message}</p>
							)}
							{exercises.map((exercise) => (
								<form action={deleteExerciseFormAction} key={exercise.id}>
									<li className="flex justify-between items-center">
										{exercise.name}
										<input
											type="hidden"
											name="exercise-id"
											value={exercise.id}
										/>
										<Button
											type="submit"
											className="ml-4"
											variant="destructive"
										>
											Delete
										</Button>
									</li>
								</form>
							))}
						</ul>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
