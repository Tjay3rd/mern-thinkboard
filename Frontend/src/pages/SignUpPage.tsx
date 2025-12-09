import { motion } from "framer-motion";
import { User, Mail, Lock, Loader } from "lucide-react";
import { useState, type FormEvent } from "react";
import Input from "../authComponents/Input";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../authComponents/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

function SignUpPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup, isLoading, error } = useAuthStore();
	const navigate = useNavigate();

	const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await signup(name, email, password);
			navigate("/verify-email");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
			>
				<div className="p-8">
					<h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400 to emerald-500 bg-clip-text text-transparent">
						Create Account
					</h2>

					<form onSubmit={handleSignUp}>
						<Input
							type="text"
							placeholder="Full Name"
							value={name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setName(e.target.value)
							}
							icon={User}
						/>
						<Input
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
							icon={Mail}
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
							icon={Lock}
						/>
						{error && (
							<p className="text-red-500 font-semibold my-2">{error}</p>
						)}
						<PasswordStrengthMeter password={password} />

						<motion.button
							type="submit"
							disabled={isLoading}
							whileTap={{ scale: 0.98 }}
							whileHover={{ scale: 1.02 }}
							className="mt-5 w-full py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
						>
							{isLoading ? (
								<Loader className="animate-spin mx-auto" />
							) : (
								"Sign Up"
							)}
						</motion.button>
					</form>
				</div>
				<div className="px-8 py-4 bg-gray-900/50 flex justify-center">
					<p className="text-sm text-gray-400">
						Already have an account?{" "}
						<Link to={"/login"} className="text-green-400 hover:underline">
							Login
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
}

export default SignUpPage;
