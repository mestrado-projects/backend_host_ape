import app from "./app.js";
import "./setup.js";
import cors from "cors";

const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
