
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("J.A.R.V.I.S. backend is online.");
});
app.post("/chat", (req, res) => {
  const message = req.body.message;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Please provide a valid message."
    });
  }

  res.json({
    reply: `J.A.R.V.I.S. received your message: ${message}`
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`J.A.R.V.I.S. online on port ${PORT}`);
});
