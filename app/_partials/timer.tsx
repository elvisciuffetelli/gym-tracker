import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";

const Timer = () => {
	const createAlarmSound = () => {
		const audioContext = new window.AudioContext();

		return () => {
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);

			oscillator.type = "sine";
			oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz - A4 note

			gainNode.gain.setValueAtTime(0, audioContext.currentTime);
			gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
			gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + 0.5);
		};
	};
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState(90); // Default 1:30 minutes in seconds
	const [isRunning, setIsRunning] = useState(false);
	const [isRinging, setIsRinging] = useState(false);

	const playAlarm = createAlarmSound();

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
	};

	const handleReset = () => {
		setTime(90);
		setIsRunning(false);
		setIsRinging(false);
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
			{!isRunning && <Button onClick={handleStart}>Start Timer</Button>}
			{isRunning && <Button onClick={handleStop}>Stop</Button>}
			<Button onClick={handleReset} variant="destructive">
				Reset
			</Button>
		</div>
	);
};

export default Timer;
