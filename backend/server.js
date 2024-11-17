import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("You are getting this message from server");
});

app.listen(port, (req, res) => {
  console.log(`Server running successfully on port ${port}`);
});
