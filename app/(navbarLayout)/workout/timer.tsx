import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";

const Timer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState(90); // Default 1:30 minutes in seconds
	const [isRunning, setIsRunning] = useState(false);
	const [isRinging, setIsRinging] = useState(false);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		// Create audio element when component mounts
		audioRef.current = new Audio("/alarm.wav");

		return () => {
			// Cleanup when component unmounts
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);

	const handleSnooze = () => {
		setTime(90);
		setIsRinging(false);
		stopAlarm();
	};

	const playAlarm = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0; // Reset audio to start
			audioRef.current
				.play()
				.catch((error) => console.error("Error playing audio:", error));
		}
	}, []);

	const stopAlarm = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0; // Reset audio to start
		}
	}, []);

	useEffect(() => {
		let interval: number | undefined;

		if (isRunning && time > 0) {
			interval = window.setInterval(() => {
				setTime((prevTime) => prevTime - 1);
			}, 1000);
		} else if (time === 0 && isRunning) {
			setIsRinging(true);
			setIsRunning(false);
			playAlarm();
		}

		return () => clearInterval(interval);
	}, [isRunning, time, playAlarm]);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handleStart = () => {
		setIsRunning(true);
		setIsOpen(false);
	};

	const handleStop = () => {
		setIsRunning(false);
		setIsRinging(false);
		stopAlarm();
	};

	const handleReset = () => {
		setTime(90);
		setIsRunning(false);
		setIsRinging(false);
		stopAlarm();
	};

	const adjustTime = (seconds: number) => {
		setTime((prevTime) => Math.max(0, prevTime + seconds));
	};

	return (
		<div className="flex items-center space-x-2 mt-6 justify-center">
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon">
						<Clock className="h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Set Timer</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col items-center space-y-4">
						<div className="text-4xl font-bold">{formatTime(time)}</div>
						<div className="flex space-x-2">
							<Button onClick={() => adjustTime(-15)}>-15s</Button>
							<Button onClick={() => adjustTime(-30)}>-30s</Button>
							<Button onClick={() => adjustTime(15)}>+15s</Button>
							<Button onClick={() => adjustTime(30)}>+30s</Button>
						</div>
						<Button onClick={handleStart}>Start Timer</Button>
					</div>
				</DialogContent>
			</Dialog>
			<div className="text-lg font-semibold">
				{isRinging ? "Time's up!" : formatTime(time)}
			</div>
			{isRinging && <Button onClick={handleSnooze}>Snooze</Button>}
			{!isRunning && !isRinging && (
				<Button onClick={handleStart}>Start Timer</Button>
			)}
			{isRunning && <Button onClick={handleStop}>Stop</Button>}
			<Button onClick={handleReset} variant="destructive">
				Reset
			</Button>
		</div>
	);
};

export default Timer;
