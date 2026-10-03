
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("J.A.R.V.I.S. backend is online.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`J.A.R.V.I.S. online on port ${PORT}`);
});
