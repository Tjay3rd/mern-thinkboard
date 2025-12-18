import mongoose from "mongoose";

export const connectDB = async () => {
	await mongoose
		.connect("mongodb://localhost:27017/Thinkboard")
		.then(() => console.log("Connected to MongoDB Database"))
		.catch((error) => console.error(error));
};
