const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://sameerbaroodwale3:DbYePpMNaCEEq3R2@cluster0.u3hmu7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
