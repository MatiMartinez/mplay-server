const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Create server
const app = express();

// Connect to database
connectDB();

app.use(cors());

// Express.json
app.use(express.json({ extended: true }));

// Port
const port = process.env.PORT || 4000;

// Import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auths", require("./routes/auths"));
app.use("/api/movies", require("./routes/movies"));

// Start app
app.listen(port, "0.0.0.0", () => {
  console.log("Server on PORT:", port);
});
