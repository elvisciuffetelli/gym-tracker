"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Exercise, User, Workout } from "@/types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalculatorTab } from "./calculatorTab";
import { ExercisesTab } from "./exercisesTab";
import { WorkoutTab } from "./workout";
import { WorkoutsArchive } from "./workoutsArchive";

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
		<div className="container mx-auto px-2 py-4 md:p-4">
			<div className="flex justify-between mb-8 items-center">
				<div className="flex justify-between items-center align-middle space-x-2">
					<Image
						src="/logo.png"
						alt="Gym Tracker Logo"
						width={60}
						height={60}
					/>
					<h1 className="text-3xl font-bold">Gym Tracker</h1>
				</div>
				<Button onClick={handleLogout} className="" variant="outline">
					Logout
				</Button>
			</div>
			{/* 			{error && <p className="text-red-500">{error}</p>} */}
			<Tabs defaultValue="exercises" className="space-y-4">
				<TabsList>
					<TabsTrigger value="exercises">Exercises</TabsTrigger>
					<TabsTrigger value="workouts">Workout</TabsTrigger>
					<TabsTrigger value="workouts-archive">Archive</TabsTrigger>
					<TabsTrigger value="calculator">Calculator</TabsTrigger>
				</TabsList>

				<ExercisesTab exercises={exercises} />
				<WorkoutTab workouts={workouts} exercises={exercises} />
				<WorkoutsArchive workouts={workouts} exercises={exercises} />
				<CalculatorTab />
			</Tabs>
		</div>
	);
}
