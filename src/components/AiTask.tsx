import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Loader2, Send, HelpCircle, CheckCircle, XCircle, ArrowRight, BookOpen } from "lucide-react";
import { AiAssignment, AiQuestion } from "../types";

export default function AiTask() {
  const [difficulty, setDifficulty] = useState<"mudah" | "sedang" | "sulit">("sedang");
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState<AiAssignment | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // For stepping through assignment questions

  const generateAssignment = async (diff: "mudah" | "sedang" | "sulit") => {
    setLoading(true);
    setChecked(false);
    setUserAnswers({});
    setActiveStep(0);
    try {
      const response = await fetch("/api/gemini/generate-tugas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty: diff })
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setAssignment(resData.data);
      } else {
        throw new Error(resData.error || "Failed to generate");
      }
    } catch (err) {
      console.error("Failed to generate AI assignment, utilizing local backup:", err);
      // Setup high quality client-side fallback if anything fails
      setAssignment({
        title: "Tantangan Matematika Bilangan Bulat",
        instructions: "Selesaikan tantangan berikut dengan memasukkan angka numerik bulat yang benar sesuai pertanyaan kontekstual.",
        questions: [
          {
            id: 1,
            questionText: "Suhu udara di kota Bandung pada pukul 05.00 pagi adalah 16°C. Selama hari tersebut, suhu mengalami kenaikan rata-rata sebesar 2°C setiap jamnya sampai pukul 12.00 siang. Berapakah suhu udara di Bandung pada pukul 12.00 siang tersebut?",
            hint: "Dari jam 5 ke jam 12 ada selisih 7 jam. Suhu naik 2°C setiap jam.",
            correctAnswer: "30",
            explanation: "Selisih waktu dari pukul 05.00 ke 12.00 adalah 7 jam. Kenaikan suhu total: 7 jam x 2°C/jam = 14°C. Maka suhu siang hari = suhu awal + kenaikan = 16°C + 14°C = 30°C."
          },
          {
            id: 2,
            questionText: "Seorang pedagang buah membeli satu keranjang mangga dengan modal Rp 120.000 (dinyatakan -120000). Setelah menjual seluruh mangga secara eceran, ia menerima uang pendapatan kotor sebesar Rp 155.000. Berapakah nilai keuntungan bersih pedagang tersebut dalam rupiah?",
            hint: "Keuntungan bersih = Pendapatan kotor - Modal.",
            correctAnswer: "35000",
            explanation: "Keuntungan bersih diperoleh dari Pendapatan kotor dikurangi modal: Rp 155.000 - Rp 120.000 = Rp 35.000."
          },
          {
            id: 3,
            questionText: "Sebuah lif pengangkut barang berada di lantai 18 sebuah hotel. Lif tersebut turun sejauh 12 lantai untuk mengangkut kasur tidur, kemudian naik lagi sejauh 5 lantai untuk diletakkan di kamar VIP. Berada di lantai berapakah lif pengangkut kasur tersebut sekarang?",
            hint: "Operasi hitung: 18 - 12 + 5.",
            correctAnswer: "11",
            explanation: "Posisi awal lift adalah lantai 18. Turun 12 lantai menjadi: 18 - 12 = 6. Naik kembali 5 lantai menjadi: 6 + 5 = lantai 11."
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateAssignment(difficulty);
  }, []);

  const handleAnswerChange = (questionId: number, val: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: val
    }));
  };

  const handleCheck = () => {
    setChecked(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6" id="ai-task-container">
      {/* Intro card & Config */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4" id="ai-task-header">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
            <h3 className="font-sans font-bold text-slate-800 text-lg">Lembar Kerja Tugas AI Interaktif</h3>
          </div>
          <p className="font-sans text-xs text-slate-500 leading-relaxed max-w-md">
            Guru AI Studio merancang soal kontekstual Bilangan Bulat secara otomatis menggunakan model kecerdasan buatan Gemini. Pilih tingkat kesulitanmu sekarang!
          </p>
        </div>

        {/* Difficulty Controller */}
        <div className="flex items-center gap-2 flex-wrap" id="ai-difficulty-controls">
          {(["mudah", "sedang", "sulit"] as const).map((level) => (
            <button
              key={level}
              id={`ai-diff-btn-${level}`}
              onClick={() => {
                setDifficulty(level);
                generateAssignment(level);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-sans font-medium capitalize cursor-pointer transition-all ${
                difficulty === level
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Pane */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center space-y-4"
            id="ai-loading-box"
          >
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <div className="space-y-1">
              <p className="font-sans font-medium text-slate-700">Menghubungkan ke Google Gemini API...</p>
              <p className="font-sans text-xs text-slate-400">Merumuskan cerita menarik & perhitungan matematika untukmu</p>
            </div>
          </motion.div>
        ) : assignment ? (
          <motion.div
            key="assignment-active"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
            id="ai-active-assignment-pane"
          >
            {/* Title Block */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-sans">Kurikulum Merdeka - Fase D</span>
              <h4 className="font-sans font-extrabold text-xl sm:text-2xl mt-1">{assignment.title}</h4>
              <p className="text-slate-300 text-sm font-sans mt-2 italic">{assignment.instructions}</p>
            </div>

            {/* Questions Step Progress */}
            <div className="flex items-center gap-2 px-1" id="ai-questions-progress-bar">
              {assignment.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 h-2 rounded-full cursor-pointer transition-colors ${
                    activeStep === idx 
                      ? "bg-indigo-600" 
                      : userAnswers[assignment.questions[idx].id] 
                        ? "bg-indigo-200" 
                        : "bg-slate-100"
                  }`}
                  title={`Soal ${idx + 1}`}
                />
              ))}
            </div>

            {/* Current Question Display */}
            {(() => {
              const q = assignment.questions[activeStep];
              if (!q) return null;
              const isAnsCorrect = q.correctAnswer.trim().toLowerCase() === (userAnswers[q.id] || "").trim().toLowerCase();
              return (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden" id={`ai-q-box-${q.id}`}>
                  {/* Question header */}
                  <div className="bg-slate-50 border-b border-slate-100 py-3 px-5 flex items-center justify-between">
                    <span className="font-sans font-bold text-slate-700 text-sm">Soal Tantangan {activeStep + 1} dari {assignment.questions.length}</span>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md uppercase">AI Generated</span>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Stimulus Context Text */}
                    <div className="bg-slate-50/50 border border-slate-150 p-4 rounded-xl text-slate-600 font-sans text-sm leading-relaxed whitespace-pre-line">
                      {q.questionText}
                    </div>

                    {/* Hint Box (Only if not checked) */}
                    {!checked && q.hint && (
                      <p className="text-xs text-indigo-600 italic bg-indigo-50/40 p-2.5 rounded-lg flex items-center gap-1.5 font-sans">
                        <HelpCircle className="w-4 h-4 text-indigo-500" />
                        <span>Petunjuk: {q.hint}</span>
                      </p>
                    )}

                    {/* Answer Area */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Tuliskan Jawaban Anda (Angka Numerik):</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id={`ai-q-input-${q.id}`}
                          placeholder="Masukkan nilai jawaban singkat..."
                          disabled={checked}
                          value={userAnswers[q.id] || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-sans text-sm disabled:bg-slate-50 disabled:text-slate-500"
                        />
                      </div>
                    </div>

                    {/* Feedback Explanation (Visible after grading) */}
                    {checked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`p-4 rounded-xl border space-y-2 font-sans ${
                          isAnsCorrect 
                            ? "bg-emerald-50/70 border-emerald-100 text-emerald-950" 
                            : "bg-rose-50/70 border-rose-100 text-rose-950"
                        }`}
                        id={`ai-q-feedback-${q.id}`}
                      >
                        <div className="flex items-center gap-2">
                          {isAnsCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                          )}
                          <span className="font-bold text-sm">
                            {isAnsCorrect ? "Jawaban Anda Benar (+100)" : "Jawaban Kurang Tepat"}
                          </span>
                        </div>
                        <p className="text-xs">
                          <span className="font-bold">Kunci Jawaban:</span> {q.correctAnswer} | <span className="font-bold">Jawaban Anda:</span> {userAnswers[q.id] || "(Kosong)"}
                        </p>
                        <hr className="opacity-10 border-slate-900" />
                        <div className="text-sm">
                          <p className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1">Penjelasan Guru AI:</p>
                          <p className="italic leading-relaxed">{q.explanation}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Navigation Footer */}
                  <div className="bg-slate-50 border-t border-slate-100 py-3 px-5 flex justify-between items-center">
                    <button
                      onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Sebelumnya
                    </button>
                    
                    {activeStep < assignment.questions.length - 1 ? (
                      <button
                        onClick={() => setActiveStep(prev => Math.min(assignment.questions.length - 1, prev + 1))}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition-colors"
                      >
                        Berikutnya
                      </button>
                    ) : !checked ? (
                      <button
                        onClick={handleCheck}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Kirim Tugas
                      </button>
                    ) : (
                      <button
                        onClick={() => generateAssignment(difficulty)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors"
                      >
                        Buat Tugas Baru
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center font-sans text-slate-500" id="ai-fail-box">
            Gagal mengambil tugas dari server.
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
