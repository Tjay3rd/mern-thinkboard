/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function EmailVerificationPage() {
	const [code, setCode] = useState(new Array(6).fill(""));
	const inputsRef = useRef<Array<HTMLInputElement>>([]);
	const navigate = useNavigate();
	const fullCode = code.join("");
	const isCodeComplete = fullCode.length === 6;
	const { verifyEmail, isLoading, error } = useAuthStore();

	const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
		if (e) e.preventDefault();
		alert(`Verification code: ${fullCode} Submitted Successfully`);

		try {
			await verifyEmail(fullCode);
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (code.every((digit) => digit !== "")) handleSubmit();
	}, [code]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | null>,
		index: number
	) => {
		const value = e.target.value;

		if (!/^[0-9]*$/.test(value)) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		if (value && index < 5) {
			const nextInput = inputsRef.current[index + 1];
			if (nextInput) nextInput.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			const prevInput = inputsRef.current[index - 1];
			if (prevInput) prevInput.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData("text").slice(0, 6).split("");

		const newCode = [...code];
		for (let i = 0; i < pasted.length; i++) {
			if (/^[0-9]/.test(pasted[i])) newCode[i] = pasted[i];
		}
		setCode(newCode);
		const nextIndex = pasted.length >= 6 ? 5 : pasted.length; //Can also use findLastIndex
		inputsRef.current[nextIndex].focus();
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8 mb-6">
				<div onPaste={handlePaste}>
					<h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to emerald-500 bg-clip-text text-transparent">
						Verify Your Email
					</h2>
					<p className="text-center text-gray-300 mb-6 ">
						Enter the 6-digit code sent to your email address.
					</p>
					<form onSubmit={handleSubmit}>
						<div className="flex justify-between">
							{code.map((digit, i) => (
								<input
									key={i}
									type="text"
									value={digit}
									maxLength={1}
									ref={(el) => {
										if (el) inputsRef.current[i] = el;
									}}
									onChange={(e) => handleChange(e, i)}
									onKeyDown={(e) => handleKeyDown(e, i)}
									className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
								/>
							))}
						</div>
						{error && (
							<p className="text-red-500 font-semibold my-2">{error}</p>
						)}
						<motion.button
							type="submit"
							disabled={isLoading || !isCodeComplete}
							whileTap={{ scale: 0.98 }}
							whileHover={{ scale: 1.02 }}
							className="mt-5 w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
						>
							{isLoading ? (
								<Loader className="m-auto animate-spin" />
							) : (
								"Verify Email"
							)}
						</motion.button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default EmailVerificationPage;
