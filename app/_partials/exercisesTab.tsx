"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import type { Exercise } from "@/types";
//@ts-ignore
import { useFormState } from "react-dom";
import { addExercise, deleteExercise, updateExercise } from "./_actions";

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
							<Input
								type="number"
								placeholder="Maximal"
								name="maximal"
								min="0"
								step="0.1"
							/>
							<Button type="submit">Add Exercise</Button>
						</form>
						<ul className="list-disc pl-5 space-y-2">
							{deleteExerciseState?.message && (
								<p className="text-red-500">{deleteExerciseState.message}</p>
							)}
							{exercises.map((exercise) => (
								<li
									className="flex justify-between items-center"
									key={exercise.id}
								>
									<span>
										<span className="font-bold capitalize">
											{exercise.name}
										</span>
										{exercise.maximal
											? ` - Maximal: ${exercise.maximal} Kg`
											: ""}
									</span>
									<div className="flex">
										<Dialog>
											<DialogTrigger asChild>
												<Button
													type="button"
													className="ml-4"
													variant="secondary"
												>
													Edit
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Edit exercise</DialogTitle>
												</DialogHeader>
												<form className="space-y-4" action={updateExercise}>
													<input
														type="hidden"
														name="exercise-id"
														value={exercise.id}
													/>
													<div>
														<label
															htmlFor="exercise"
															className="block text-sm font-medium text-gray-700"
														>
															Exercise Name
														</label>
														<Input
															id="exercise"
															name="exercise"
															className="mt-1"
															defaultValue={exercise.name}
														/>
													</div>
													<div>
														<label
															htmlFor="maximal"
															className="block text-sm font-medium text-gray-700"
														>
															Maximal (Kg)
														</label>
														<Input
															id="maximal"
															type="number"
															name="maximal"
															defaultValue={exercise.maximal}
															min="0"
															step="0.1"
															className="mt-1"
														/>
													</div>
													<DialogClose asChild>
														<Button type="submit" className="w-full">
															Update Exercise
														</Button>
													</DialogClose>
												</form>
											</DialogContent>
										</Dialog>

										<form action={deleteExerciseFormAction}>
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
										</form>
									</div>
								</li>
							))}
						</ul>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
