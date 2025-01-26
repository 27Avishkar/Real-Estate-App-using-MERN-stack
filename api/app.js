
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/auth.route.js";
import postRoute from "./Routes/post.route.js";
import testRoute from "./Routes/test.route.js";
import userRoute from "./Routes/user.route.js";
import chatRoute from "./Routes/chat.route.js";
import messageRoute from "./Routes/message.route.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(5000, () => {
  console.log("Server is running!");
});