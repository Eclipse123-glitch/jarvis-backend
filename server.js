const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.send("J.A.R.V.I.S. backend is online.");
});

app.post("/chat", async (req, res) => {
  const message = req.body?.message;

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Please provide a valid message."
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not configured.");

    return res.status(500).json({
      error: "The AI service is not configured."
    });
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: message.trim()
    });

    const reply = response.text;

    if (!reply) {
      return res.status(502).json({
        error: "The AI returned an empty response."
      });
    }

    res.json({ reply });
  } catch (error) {
    console.error(
      "Gemini request failed:",
      error?.message || error
    );

    res.status(502).json({
      error: "J.A.R.V.I.S. couldn't get an AI response. Please try again."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`J.A.R.V.I.S. online on port ${PORT}`);
});
