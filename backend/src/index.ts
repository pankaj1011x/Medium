import { Hono } from "hono";
import { cors } from "hono/cors";

import { userRoute } from "./routes/userRoutes";
import { blogRoute } from "./routes/blogRoutes";

const app = new Hono();
app.use("/*", cors());
app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
