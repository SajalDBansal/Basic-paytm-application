const express = require("express");
const cors = require("cors");
const rootRouter = require("./routers/index");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})


