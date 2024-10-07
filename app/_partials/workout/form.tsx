import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Exercise } from "@/types";
import { addWorkout } from "../_actions";

type Props = {
	exercises: Exercise[];
};

export function WorkoutForm({ exercises }: Props) {
	return (
		<form className="space-y-4" action={addWorkout}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
	);
}
