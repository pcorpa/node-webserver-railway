const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectToDB();
    this.middlewares();
    this.routes();
  }

  async connectToDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api/users", require("../routes/users"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("App listening at http://localhost:" + this.port);
    });
  }
}

module.exports = Server;
