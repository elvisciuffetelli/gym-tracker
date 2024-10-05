import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import type { Exercise, Workout } from "@/types";
import { format } from "date-fns";
import { addWorkout } from "./_actions";

type Props = {
	exercises: Exercise[];
	workouts: Workout[];
};

type GroupedWorkouts = {
	[key: string]: Workout[];
};

export function WorkoutsTab({ exercises, workouts }: Props) {
	const groupedWorkouts = workouts.reduce((acc: GroupedWorkouts, workout) => {
		// Format the date with the day of the week
		const date = format(new Date(workout.created_at), "dd/MM/yyyy EEEE");
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(workout);
		return acc;
	}, {} as GroupedWorkouts);

	return (
		<TabsContent value="workouts">
			<Card>
				<CardHeader>
					<CardTitle>Workouts</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" action={addWorkout}>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="exercise">Exercise</Label>
								<select
									id="exercise-id"
									name="exercise-id"
									className="w-full p-2 border rounded"
								>
									<option value="">Select an exercise</option>
									{exercises.map((exercise) => (
										<option key={exercise.id} value={exercise.id}>
											{exercise.name}
										</option>
									))}
								</select>
							</div>
							<div>
								<Label htmlFor="sets">Sets</Label>
								<Input id="sets" type="number" name="sets" />
							</div>
							<div>
								<Label htmlFor="reps">Reps</Label>
								<Input id="reps" type="number" name="reps" />
							</div>
							<div>
								<Label htmlFor="weight">Weight (kg)</Label>
								<Input id="weight" name="weight" type="number" step="0.1" />
							</div>
						</div>
						<Button type="submit" className="w-full">
							Add Workout
						</Button>
					</form>
					<div className="mt-8">
						<h3 className="text-xl font-semibold mb-4">Recent Workouts</h3>
						<ul className="space-y-2">
							{Object.entries(groupedWorkouts).map(([date, workouts]) => (
								<div key={date}>
									<h4 className="text-lg font-semibold mb-2">{date}</h4>
									<ul className="space-y-2">
										{(workouts as Workout[]).map((workout: Workout) => (
											<li key={workout.id} className="bg-secondary p-2 rounded">
												{
													exercises.find((e) => e.id === workout.exercise_id)
														?.name
												}{" "}
												- {workout.sets} sets, {workout.reps} reps,{" "}
												{workout.weight}kg
											</li>
										))}
									</ul>
								</div>
							))}
						</ul>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
