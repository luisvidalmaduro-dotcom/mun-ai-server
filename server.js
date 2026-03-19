import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 TU API KEY AQUÍ
const API_KEY = "TU_API_KEY_AQUI";

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un entrenador experto en Modelos de Naciones Unidas en República Dominicana (nivel regional y MINUME). Respondes con estrategias claras, prácticas, profundas y competitivas. Das pasos concretos y ejemplos reales."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.json({
      reply: "Error conectando con la IA"
    });
  }
});

app.listen(3000, () => {
  console.log("🔥 Servidor listo en http://localhost:3000");
});