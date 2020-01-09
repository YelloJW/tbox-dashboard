// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require("passport");
const users = require("./routes/api/users");
const news = require("./routes/api/news");
const sport = require("./routes/api/sport");
const tasks = require("./routes/api/tasks");
const photos = require("./routes/api/photos");

// Initialize app
const app = express();

// Apply middleware function for bodyparser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors())

// Require and save db URI
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useFindAndModify:false,
      useUnifiedTopology: true
     }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/news", news);
app.use("/api/sport", sport);
app.use("/api/photos", photos);
app.use("/api/tasks", tasks);
app.use('/public', express.static('public'));


// Set port for server to run on and have app listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
