const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongo-url"
  )
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const userModel = mongoose.model("todo", userSchema);

app.get("/", async (req, res) => {
  const datas = await userModel.find();
  res.json(datas);
});
app.post("/", async (req, res) => {
  const newUser = await userModel(req.body);
  newUser.save();
  res.json(newUser);
});

app.put("/update/:id", async (req, res) => {
  const updateData = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updateData);
});

app.delete("/delete/:id", async (req, res) => {
  const updateData = await userModel.findByIdAndDelete(req.params.id);
  res.json(updateData);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
