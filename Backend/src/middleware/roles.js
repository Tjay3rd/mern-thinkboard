const requireAdmin = (req, res, next) => {
	if (!req.user || req.user.role !== "admin") {
		return res.status(403).json({
			success: false,
			message: "Access denied: Requires Admin privileges.",
		});
	}
	next();
};

export default requireAdmin;
