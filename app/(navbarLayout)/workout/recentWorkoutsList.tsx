import type { Exercise, Workout } from "@/types";

type Props = {
	groupedWorkouts: {
		[date: string]: {
			[exerciseName: string]: Workout[];
		};
	};
	exercises: Exercise[];
};

export function RecentWorkoutsList({ groupedWorkouts, exercises }: Props) {
	return (
		<div className="mt-8">
			<h3 className="text-xl font-semibold mb-4">Recent Workouts</h3>
			<ul className="space-y-3 divide-y">
				{Object.entries(groupedWorkouts).map(([date, exercisesByDate]) => (
					<div key={date}>
						<h4 className="text-lg font-semibold mb-2 pt-4">{date}</h4>
						{Object.entries(exercisesByDate).map(([exerciseName, workouts]) => (
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
										const percentageOfMaximal = exerciseForWorkout?.maximal
											? (
													(workout.weight / exerciseForWorkout.maximal) *
													100
												).toFixed(1)
											: null;
										return (
											<li
												key={workout.id}
												className="bg-secondary py-3 px-2 rounded"
											>
												<div>
													<span>
														{workout.sets} sets, {workout.reps} reps,
													</span>
													<span> {workout.weight}kg, </span>
													{/* Display the percentage of the maximal if available */}
													{percentageOfMaximal && (
														<span>{percentageOfMaximal}% of maximal</span>
													)}
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						))}
					</div>
				))}
			</ul>
		</div>
	);
}
