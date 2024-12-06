import app from "./app.js";
import "./setup.js";
import cors from "cors";

const port = process.env.PORT || 5000;
app.use(cors());
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
