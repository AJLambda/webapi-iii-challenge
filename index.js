const envReader = require("dotenv");
envReader.config(); // reads .env and merges it into process.env
// import server from './server/js'
const server = require("./server.js");

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:3000 ***\n");
});

/*

1. install express with "yarn add express" or "npm i express"
2. run it with "yarn server"

*/
