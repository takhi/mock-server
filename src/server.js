const express = require("express");
const cors = require("cors");

const apiRoute = require("./routes/apiRoute");

const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors({ maxAge: 86400 }));
app.use(express.json());
app.use("/v1/api", apiRoute())

app.listen(PORT, function(){ console.log(`Server running on port ${PORT}`) });

