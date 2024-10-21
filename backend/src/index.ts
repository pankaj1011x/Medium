import { Hono } from "hono";

import { userRoute } from "./routes/userRoutes";
import { blogRoute } from "./routes/blogRoutes";

const app = new Hono();

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
