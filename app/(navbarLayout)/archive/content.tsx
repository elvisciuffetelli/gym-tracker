"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import type { Exercise, Workout } from "@/types";
import { format } from "date-fns";
//@ts-ignore
import { useFormState } from "react-dom";
import { deleteWorkout } from "../../_actions";

type Props = {
	exercises: Exercise[];
	workouts: Workout[];
};

type GroupedWorkouts = {
	[date: string]: {
		[exerciseName: string]: Workout[];
	};
};

export function Content({ exercises, workouts }: Props) {
	const [state, formAction] = useFormState(deleteWorkout, { message: "" });

	const groupedWorkouts = workouts.reduce((acc: GroupedWorkouts, workout) => {
		const date = format(new Date(workout.created_at), "dd/MM/yyyy EEEE");
		const exerciseName =
			exercises.find((e) => e.id === workout.exercise_id)?.name || "Unknown";
		if (!acc[date]) {
			acc[date] = {};
		}
		if (!acc[date][exerciseName]) {
			acc[date][exerciseName] = [];
		}
		acc[date][exerciseName].push(workout);
		return acc;
	}, {} as GroupedWorkouts);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Workouts Archive</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mt-8">
					<h3 className="text-xl font-semibold mb-4">All Workouts</h3>
					<ul className="space-y-3 divide-y">
						{Object.entries(groupedWorkouts).map(([date, exercisesByDate]) => (
							<div key={date}>
								<h4 className="text-lg font-semibold mb-2 pt-4">{date}</h4>
								{Object.entries(exercisesByDate).map(
									([exerciseName, workouts]) => (
										<div key={exerciseName} className="mt-2">
											<h5 className="text-md font-semibold capitalize mb-1 mt-2">
												{exerciseName}
											</h5>
											<ul className="space-y-2">
												{(workouts as Workout[]).map((workout: Workout) => {
													// Find the corresponding exercise for the workout
													const exerciseForWorkout = exercises.find(
														(e) => e.id === workout.exercise_id,
													);
													// Calculate the percentage if maximal is available
													const percentageOfMaximal =
														exerciseForWorkout?.maximal
															? (
																	(workout.weight /
																		exerciseForWorkout.maximal) *
																	100
																).toFixed(1)
															: null;
													return (
														<li
															key={workout.id}
															className="bg-secondary py-3 px-2 rounded flex flex-col md:flex-row justify-between items-center"
														>
															<div className="w-full pb-2 md:pb-0">
																<span>
																	{workout.sets} sets, {workout.reps} reps,
																</span>
																<span> {workout.weight}kg, </span>
																{/* Display the percentage of the maximal if available */}
																{percentageOfMaximal && (
																	<span>{percentageOfMaximal}% of maximal</span>
																)}
															</div>
															<form
																action={formAction}
																className="w-full md:w-auto"
															>
																<input
																	type="hidden"
																	name="workout-id"
																	value={workout.id}
																/>
																<Button
																	type="submit"
																	className="w-full md:w-auto"
																	variant="destructive"
																>
																	Delete
																</Button>
															</form>
														</li>
													);
												})}
											</ul>
										</div>
									),
								)}
							</div>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
