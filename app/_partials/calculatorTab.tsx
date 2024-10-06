"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { type ChangeEvent, useState } from "react";

type DropSet = {
	reps: number;
	weight: number;
};

export function CalculatorTab(): JSX.Element {
	const [weight, setWeight] = useState<string>("");
	const [reps, setReps] = useState<string>("");
	const [oneRepMax, setOneRepMax] = useState<number | null>(null);
	const [dropSets, setDropSets] = useState<DropSet[]>([]);

	const calculateDropSets = (weightNum: number): DropSet[] => {
		// Percentages for each rep count (these can be adjusted as needed)
		const percentages = [
			100, // 1 rep
			97, // 2 reps
			94, // 3 reps
			92, // 4 reps
			89, // 5 reps
			86, // 6 reps
			83, // 7 reps
			81, // 8 reps
			78, // 9 reps
			75, // 10 reps
		];

		return percentages.map((percentage, index) => ({
			reps: index + 1,
			weight: Math.round(weightNum * (percentage / 100)),
		}));
	};

	const calculateOneRepMax = (weightStr: string, repsStr: string): void => {
		const weightNum = Number.parseFloat(weightStr);
		const repsNum = Number.parseInt(repsStr, 10);

		// Check if reps is 0 and handle it as an invalid input
		if (repsNum <= 0) {
			setOneRepMax(null);
			setDropSets([]);
			return;
		}

		if (Number.isNaN(weightNum) || Number.isNaN(repsNum)) {
			setOneRepMax(null);
			setDropSets([]);
			return;
		}

		const oneRepMax = Math.round(weightNum / (1.0278 - 0.0278 * repsNum));
		setOneRepMax(oneRepMax);
		setDropSets(calculateDropSets(oneRepMax));
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		setter: (value: string) => void,
		field: "weight" | "reps",
	): void => {
		const value = e.target.value;
		setter(value);

		if (field === "weight") {
			calculateOneRepMax(value, reps);
		} else {
			calculateOneRepMax(weight, value);
		}
	};

	return (
		<TabsContent value="calculator">
			<Card>
				<CardHeader>
					<CardTitle>1 Rep Max Calculator</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<form className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									placeholder="Reps"
									name="reps"
									type="number"
									min="1"
									value={reps}
									onChange={(e) => handleInputChange(e, setReps, "reps")}
								/>
								<Input
									type="number"
									placeholder="Weight"
									name="weight"
									min="0"
									step="0.1"
									value={weight}
									onChange={(e) => handleInputChange(e, setWeight, "weight")}
								/>
							</div>
						</form>
						{oneRepMax !== null && (
							<div className="mt-4 p-4 bg-secondary rounded-md">
								<p className="text-lg font-semibold mb-2">
									Estimated 1 Rep Max: {oneRepMax} kg
								</p>
								{dropSets.length > 0 && (
									<div className="mt-4">
										<p className="font-medium mb-2">
											Recommended weights per rep:
										</p>
										<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
											{dropSets.map((set) => (
												<div
													key={set.reps}
													className="bg-background p-2 rounded-sm text-sm"
												>
													{set.reps}×{set.weight}kg
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
}
