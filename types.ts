export type Exercise = {
	id: string;
	name: string;
	maximal?: number;
};

export type Workout = {
	id: string;
	exercise_id: string;
	sets: number;
	reps: number;
	weight: number;
	created_at: string;
};

export type User = {
	id: string;
};
