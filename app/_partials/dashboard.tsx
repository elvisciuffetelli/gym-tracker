"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Exercise, User, Workout } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ExercisesTab } from "./exercisesTab";
import { WorkoutsTab } from "./workoutsTab";

type Props = {
	user: User;
	exercises: Exercise[];
	workouts: Workout[];
};

export function Dashboard({ exercises, workouts }: Props) {
	const router = useRouter();
	const supabase = createClient();

	const handleLogout = async () => {
		await supabase.auth.signOut();

		router.push("/");
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold mb-8">Gym Tracker</h1>
				<Button onClick={handleLogout} className="mb-8" variant="outline">
					Logout
				</Button>
			</div>
			{/* 			{error && <p className="text-red-500">{error}</p>} */}
			<Tabs defaultValue="exercises" className="space-y-4">
				<TabsList>
					<TabsTrigger value="exercises">Exercises</TabsTrigger>
					<TabsTrigger value="workouts">Workouts</TabsTrigger>
				</TabsList>

				<ExercisesTab exercises={exercises} />
				<WorkoutsTab workouts={workouts} exercises={exercises} />
			</Tabs>
		</div>
	);
}
