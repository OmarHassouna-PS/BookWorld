const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const { mongoose } = require("mongoose");

const UserRouter = require('./routes/UserRouter');
const logInRouts = require('./routes/logInRouter');

const app = express();
app.use(cors());
app.use(express.json());


app.use(UserRouter);
app.use(logInRouts);


module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};
