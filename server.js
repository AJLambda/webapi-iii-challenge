// implement your API here

//import express from 'express'; // ES2015 Module Import
const express = require("express"); // define the server; // CommonJS Module Import

const helmet = require("helmet");
const morgan = require("morgan");

//initialize router
const usersRouter = require("./routers/users-router.js");
const postsRouter = require("./routers/posts-router.js");

const server = express(); // instantiate the server; return back the server

//parses body and add it to req object
const parser = express.json();
server.use(parser); // server now knows how to write JSON. Extends express by using middleware
server.use(helmet()); // 3rd party security for headers. Hides x powered by Express
server.use(morgan("dev")); // 3rd party logger (logs i.e. GET /api/hubs 200 35.336 ms - 470)

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  //this function is a request handler. It is also middleware.
  //request and response are positional arguments.
  res.send("It's alive!"); // .send is a method of the response object. This sends a quick response back to the client
});

// export default server
module.exports = server;
