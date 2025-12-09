import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/createPage";
import NoteDetailPage from "./pages/noteDetailPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import { useAuthStore } from "./store/authStore";
import { useEffect, type ReactElement } from "react";
import LoadingSpinner from "./authComponents/LoadingSpinner";

interface Props {
	children: ReactElement;
}
// Protected Routes that require authentication
const ProtectedRoute = ({ children }: Props) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) return <Navigate to="/login" replace />;

	if (!user || !user.isVerified) return <Navigate to="/verify-email" replace />;

	return children;
};

const RedirectAuthenticatedUser = ({ children }: Props) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
	return children;
};

const App = () => {
	const { checkAuth, isCheckingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div
			data-theme="forest"
			className="h-full w-full absolute inset-0 -z-10 items-center bg-[radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"
		>
			<div className="bg-transparent">
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/create"
						element={
							<ProtectedRoute>
								<CreatePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/note/:id"
						element={
							<ProtectedRoute>
								<NoteDetailPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							<RedirectAuthenticatedUser>
								<SignUpPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route
						path="/verify-email"
						element={
							<RedirectAuthenticatedUser>
								<EmailVerificationPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route
						path="/login"
						element={
							<RedirectAuthenticatedUser>
								<LoginPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route
						path="/forgot-password"
						element={
							<RedirectAuthenticatedUser>
								<ForgotPasswordPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route
						path="/reset-password"
						element={
							<RedirectAuthenticatedUser>
								<ResetPasswordPage />
							</RedirectAuthenticatedUser>
						}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
