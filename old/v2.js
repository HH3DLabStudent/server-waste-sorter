import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json({ limit: "10mb" }));

// Init OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',
});

// Configure multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Test endpoint for ESP32
app.get("/api/connect", (req, res) => {
  res.json({ message: "Works, lol" });
});

// Main endpoint for ESP32 Image Analysis
app.post("/api/upload", upload.single("image"), async (req, res) => {
  console.log("Received image upload request");
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const base64Image = req.file.buffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a trash separator helper. Analyze the image to determine the appropriate waste category for the object. 
          Respond in JSON format with the object name and waste categories. Set the appropriate category to true and the rest to false. 
          Categories are: plastic, paper, cardboard, bio_waste, mixed_waste, metal, glass, return_to_store.
          Remember, you are located in Finland. So if it's like a plastic bottle, it might need to be returned to the store for return money (statiegeld in dutch).
          Example response format:
          {
            "object": "Plastic wrapper",
            "plastic": true,
            "paper": false,
            "cardboard": false,
            "bio_waste": false,
            "mixed_waste": false,
            "metal": false,
            "glass": false,
            "return_to_store": false
          }`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "What is this object and how should it be disposed of?" },
            {
              type: "image_url",
              image_url: {
                url: `data:${req.file.mimetype};base64,${base64Image}`,
                detail: "auto"
              }
            }
          ],
        }
      ],
      max_tokens: 300,
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const analysis = JSON.parse(response.choices[0].message.content);

    res.json(analysis);

  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).json({ 
      error: "Error processing the image",
      details: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});