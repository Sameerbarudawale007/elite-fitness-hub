const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Sameersameer:Sameersameer@cluster0.uwf2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
