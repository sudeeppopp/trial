const express = require("express");
const app = express();
const port = 8080;

require('./app')(app);

var PORT = process.env.PORT || 8080;
app.listen(PORT, () => {   console.log("server running.. ")});
//default: localhost:8080
