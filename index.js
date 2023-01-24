const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const port = 8888;

app.use(express.json());
app.use(cors());

const CardSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
});

const Card = mongoose.model("Vsvcard", CardSchema);

app.get("/", (req, res) => {
  Card.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.send("emeliyyat tapilmadi");
    }
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  Card.findById(id, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.send("emeliyyat tapilmadi");
    }
  });
});

app.post("/", (req, res) => {
  const newCard = new Card({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
  });
  newCard.save();
  res.send(newCard);
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.send("emeliyyat tapilmadi");
    }
  });

});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://vasivvv:200306vasiv@cluster0.5yo1mci.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("icerdeyiz hocam!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
