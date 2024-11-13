const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Detail = require("./models/detail");

const app = express();
const port = 8000;

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/loanApp";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());

app.use(cors());

const loanStepSchema = new mongoose.Schema({
  step: Number,
  selectedOption: Number,
});

const LoanStep = mongoose.model("LoanStep", loanStepSchema);

const detailSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
  email: String,
  income: Number,
  expenses: Number,
  assets: Number,
  liabilities: Number,
});

const Detail = mongoose.model("Detail", detailSchema);
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// loan details
app.post("/api/saveLoanStep", async (req, res) => {
  const { step, selectedOption } = req.body;

  try {
    const newStep = new LoanStep({ step, selectedOption });
    await newStep.save();
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data." });
  }
});

// personal details

app.post("/api/saveDetail", async (req, res) => {
  const { name, mobileNumber, email, income, expenses, assets, liabilities } = req.body;

  try {
    const newDetail = new Detail({
      name,
      mobileNumber,
      email,
      income,
      expenses,
      assets,
      liabilities,
    });

    await newDetail.save();
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data." });
  }
});
