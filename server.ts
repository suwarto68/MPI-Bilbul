import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint 1: Generate Learning Objectives (Tujuan Pembelajaran) for Pendahuluan
app.get("/api/gemini/generate-tujuan", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Buatkan 4 Tujuan Pembelajaran (TP) yang terperinci dan aplikatif untuk materi 'Bab 1: Bilangan Bulat' Matematika Kelas 7 SMP Kurikulum Merdeka (Fase D). Format output sebagai JSON array of strings tanpa markdown formatting.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          },
          description: "Daftar tujuan pembelajaran konkret"
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Failed to generate content from Gemini");
    }

    const data = JSON.parse(text.trim());
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error generating objectives:", error);
    // Fallback data if Gemini call fails or is unconfigured
    res.json({
      success: false,
      error: error.message,
      data: [
        "Memahami hubungan antara bilangan bulat positif, negatif, dan nol pada garis bilangan.",
        "Membandingkan dan mengurutkan nilai bilangan bulat dalam situasi sehari-hari.",
        "Melakukan operasi penjumlahan dan pengurangan bilangan bulat dengan bantuan model visual.",
        "Menyelesaikan masalah kontekstual yang berkaitan dengan operasi hitung campuran bilangan bulat."
      ]
    });
  }
});

// Endpoint 2: Generate Interactive Math Assignment (Tugas Interaktif)
app.post("/api/gemini/generate-tugas", async (req, res) => {
  const { difficulty = "sedang" } = req.body;
  try {
    const prompt = `Buatkan 3 soal latihan matematika interaktif tentang 'Bilangan Bulat' Kelas 7 SMP tingkat kesulitan '${difficulty}'. Soal harus relevan dengan kehidupan sehari-hari (kontekstual). Kembalikan dalam format JSON dengan struktur yang ditentukan.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah asisten guru matematika yang kreatif. Buat soal latihan yang menarik, kontekstual, dan mendidik. Jawaban kunci harus berupa angka bulat sederhana atau kata singkat.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "instructions", "questions"],
          properties: {
            title: { type: Type.STRING, description: "Judul Lembar Kerja" },
            instructions: { type: Type.STRING, description: "Petunjuk pengerjaan" },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["id", "questionText", "hint", "correctAnswer", "explanation"],
                properties: {
                  id: { type: Type.INTEGER },
                  questionText: { type: Type.STRING, description: "Teks pertanyaan kontekstual lengkap dengan cerita menarik" },
                  hint: { type: Type.STRING, description: "Petunjuk kecil membantu siswa menjawab" },
                  correctAnswer: { type: Type.STRING, description: "Jawaban singkat yang tepat (misal: -5, 12, atau kata)" },
                  explanation: { type: Type.STRING, description: "Pembahasan atau cara penyelesaian secara ramah anak" }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini API");
    }

    const data = JSON.parse(text.trim());
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error generating assignment:", error);
    // Return high quality local fallback assignments
    res.json({
      success: false,
      error: error.message,
      data: {
        title: "Latihan Bilangan Bulat Kreatif (Koleksi Lokal)",
        instructions: "Kerjakan soal-soal berikut dengan teliti. Tuliskan jawaban Anda berupa angka bulat.",
        questions: [
          {
            id: 1,
            questionText: "Seekor lumba-lumba berenang pada kedalaman 12 meter di bawah permukaan laut. Setelah beberapa menit, lumba-lumba tersebut melompat setinggi 5 meter di atas permukaan laut. Berapa meter total jarak vertikal perpindahan lumba-lumba tersebut?",
            hint: "Kedalaman dinyatakan negatif (-12) dan ketinggian positif (+5). Cari selisihnya: 5 - (-12)",
            correctAnswer: "17",
            explanation: "Jarak perpindahan vertikal dihitung dari selisih posisi akhir dan posisi awal. Lompatan lumba-lumba adalah 5 meter, sedangkan posisi awal adalah -12 meter. Maka: 5 - (-12) = 5 + 12 = 17 meter."
          },
          {
            id: 2,
            questionText: "Suhu udara di kota Tokyo pada pagi hari adalah -3°C. Pada siang hari suhu naik sebesar 8°C, kemudian pada malam hari suhu turun kembali sebesar 10°C. Berapakah suhu udara di Tokyo pada malam hari tersebut?",
            hint: "Mulai dari -3, lalu tambahkan 8, lalu kurangi 10.",
            correctAnswer: "-5",
            explanation: "Suhu awal = -3°C. Naik 8°C menjadi: -3 + 8 = 5°C. Turun 10°C menjadi: 5 - 10 = -5°C."
          },
          {
            id: 3,
            questionText: "Budi memiliki hutang kepada Ani sebesar Rp 15.000 (dinyatakan -15000). Ibu memberikan uang jajan sebesar Rp 25.000 kepada Budi. Jika Budi melunasi seluruh hutangnya, berapa rupiahkah sisa uang yang dimiliki Budi sekarang?",
            hint: "Uang jajan dikurangi jumlah hutang.",
            correctAnswer: "10000",
            explanation: "Uang yang dimiliki Budi = Rp 25.000. Membayar hutang Rp 15.000. Maka sisa uang Budi adalah: 25.000 - 15.000 = Rp 10.000."
          }
        ]
      }
    });
  }
});

// Setup Vite Dev server or Serve Static files in Production
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

initializeServer();
