const express = require('express');

// Middleware is a software that acts as an intermediary between 
// two applications or services to facilitate their communication.
// body-parser gets data from body
const bodyParser = require('body-parser');

// cross origin resource sharing: enables scripts running on a 
// browser client to interact with resources from a different origin/domain
// which is otherwise blocked by same origin policy for Js
const cors = require('cors');

// mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
// manages relationships between data, provides schema validation, 
// translate between objects in code and the representation of those objects in MongoDB
const mongoose = require('mongoose');

const passport = require("passport");

const app = express();

const PORT = 4000;

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");

app.use(cors());
// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://ks14:qazwsxedc@mern1.xq4bs.mongodb.net/job?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log('MongoDB Connected')
  } catch (error) {
    console.error('Error')
    process.exit(1)
  }
}

connectDB();

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/application", ApplicationRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
