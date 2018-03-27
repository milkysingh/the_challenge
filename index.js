const express = require("express");

const app = express();
const port = process.env.PORT || 4000;
require("./app")(app);

app.listen(port, () => console.log(`Server is running at port ${port}`));
