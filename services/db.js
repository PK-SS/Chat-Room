import { connect } from "mongoose";
const connectDatabase = () => {
	connect(process.env.MONGO_URI)
		.then(() => console.log("DB Connected"))
		.catch((e) => console.log(e.message));
};

export default connectDatabase;
