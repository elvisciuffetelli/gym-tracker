import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import type { Exercise, Workout } from "@/types";
import { format } from "date-fns";
import Timer from "../timer";
import { WorkoutForm } from "./form";
import { RecentWorkoutsList } from "./recentWorkoutsList";

type Props = {
	exercises: Exercise[];
	workouts: Workout[];
};

type GroupedWorkouts = {
	[date: string]: {
		[exerciseName: string]: Workout[];
	};
};

export function WorkoutTab({ exercises, workouts }: Props) {
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
		<TabsContent value="workouts">
			<Card>
				<CardHeader>
					<CardTitle>Workouts</CardTitle>
				</CardHeader>
				<CardContent>
					<WorkoutForm exercises={exercises} />
					<Timer />
					<RecentWorkoutsList
						groupedWorkouts={groupedWorkouts}
						exercises={exercises}
					/>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
