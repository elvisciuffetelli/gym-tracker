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
import type { Exercise } from "@/types";
//@ts-ignore
import { useFormState } from "react-dom";
import { addExercise, deleteExercise, updateExercise } from "../../_actions";

type Props = {
	exercises: Exercise[];
};

export function Content({ exercises }: Props) {
	const [deleteExerciseState, deleteExerciseFormAction] = useFormState(
		deleteExercise,
		{ message: "" },
	);

	const [addExerciseState, addExerciseFormAction] = useFormState(addExercise, {
		message: "",
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle>Exercises</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{addExerciseState?.message && (
						<p className="text-red-500">{addExerciseState.message}</p>
					)}
					<form action={addExerciseFormAction} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input placeholder="New exercise name" name="exercise" />
							<Input
								type="number"
								placeholder="Maximal"
								name="maximal"
								min="0"
								step="0.1"
							/>
						</div>
						<Button type="submit" className="w-full">
							Add Exercise
						</Button>
					</form>
					<ul className="divide-y pt-6">
						{deleteExerciseState?.message && (
							<p className="text-red-500">{deleteExerciseState.message}</p>
						)}
						{exercises.map((exercise) => (
							<li
								className="flex flex-col md:flex-row md:justify-between py-3"
								key={exercise.id}
							>
								<span className="pb-3 md:pb-0 text-center md:text-left">
									<span className="font-bold capitalize">{exercise.name}</span>
									{exercise.maximal ? ` - Maximal: ${exercise.maximal} Kg` : ""}
								</span>
								<div className="flex space-x-2">
									<Dialog>
										<DialogTrigger asChild>
											<Button
												type="button"
												className="w-full md:w-auto"
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
													<Button type="submit" className="w-full md:w-auto">
														Update Exercise
													</Button>
												</DialogClose>
											</form>
										</DialogContent>
									</Dialog>

									<form action={deleteExerciseFormAction} className="w-full">
										<input
											type="hidden"
											name="exercise-id"
											value={exercise.id}
										/>
										<Button
											type="submit"
											className="w-full md:w-auto"
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
	);
}
