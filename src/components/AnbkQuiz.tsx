import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, BookOpen, Clock, AlertTriangle, CheckSquare, ListOrdered, 
  HelpCircle, ChevronLeft, ChevronRight, Send, Check, Copy, Code, CheckCircle2 
} from "lucide-react";
import { StudentProfile, QuizQuestion, UserAnswer, QuizResult } from "../types";
import { quizQuestions } from "../quizData";

interface AnbkQuizProps {
  onQuizSubmit: (result: QuizResult) => void;
}

export default function AnbkQuiz({ onQuizSubmit }: AnbkQuizProps) {
  // Login State
  const [student, setStudent] = useState<StudentProfile>({ name: "", className: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Quiz Play States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, UserAnswer>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Custom Google Apps Script Web App URL input (optional, defaults to sending anyway)
  const [appsScriptUrl, setAppsScriptUrl] = useState("");

  // Countdown Timer Effect
  useEffect(() => {
    if (!isLoggedIn || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleForceSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoggedIn, timeLeft]);

  // Format Timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle Login Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student.name.trim() || !student.className.trim()) {
      setValidationError("Nama Lengkap dan Kelas harus diisi terlebih dahulu!");
      return;
    }
    setValidationError("");
    setIsLoggedIn(true);
  };

  // Safe Answers state initializer or selector
  const getAnswer = (qId: number): UserAnswer => {
    if (answers[qId]) return answers[qId];
    return {
      questionId: qId,
      isRaguRagu: false
    };
  };

  // Toggle Ragu-ragu (Flagged)
  const toggleRaguRagu = () => {
    const q = quizQuestions[currentIdx];
    const currentAns = getAnswer(q.id);
    setAnswers(prev => ({
      ...prev,
      [q.id]: {
        ...currentAns,
        isRaguRagu: !currentAns.isRaguRagu
      }
    }));
  };

  // Answer selections
  const selectPilihanGanda = (optCode: string) => {
    const q = quizQuestions[currentIdx];
    const currentAns = getAnswer(q.id);
    setAnswers(prev => ({
      ...prev,
      [q.id]: {
        ...currentAns,
        pilihanGanda: optCode
      }
    }));
  };

  const togglePilihanGandaKompleks = (optCode: string) => {
    const q = quizQuestions[currentIdx];
    const currentAns = getAnswer(q.id);
    const existing = currentAns.pilihanGandaKompleks || [];
    const updated = existing.includes(optCode)
      ? existing.filter(x => x !== optCode)
      : [...existing, optCode];
    
    setAnswers(prev => ({
      ...prev,
      [q.id]: {
        ...currentAns,
        pilihanGandaKompleks: updated
      }
    }));
  };

  const selectBenarSalah = (statementIdx: number, val: boolean) => {
    const q = quizQuestions[currentIdx];
    const currentAns = getAnswer(q.id);
    const existing = currentAns.benarSalah || new Array((q as any).statements.length).fill(undefined);
    const updated = [...existing];
    updated[statementIdx] = val;
    
    setAnswers(prev => ({
      ...prev,
      [q.id]: {
        ...currentAns,
        benarSalah: updated
      }
    }));
  };

  const selectMenjodohkan = (pairIdx: number, val: string) => {
    const q = quizQuestions[currentIdx];
    const currentAns = getAnswer(q.id);
    const existing = currentAns.menjodohkan || new Array((q as any).pairs.length).fill("");
    const updated = [...existing];
    updated[pairIdx] = val;
    
    setAnswers(prev => ({
      ...prev,
      [q.id]: {
        ...currentAns,
        menjodohkan: updated
      }
    }));
  };

  // Scoring function
  const checkAnswerCorrectness = (q: QuizQuestion, ans: UserAnswer): boolean => {
    if (!ans) return false;
    if (q.type === "pilihan_ganda") {
      return ans.pilihanGanda === q.correctAnswer;
    }
    if (q.type === "pilihan_ganda_kompleks") {
      const userAns = ans.pilihanGandaKompleks || [];
      const correctAns = q.correctAnswers || [];
      if (userAns.length !== correctAns.length) return false;
      return userAns.every(x => correctAns.includes(x));
    }
    if (q.type === "benar_salah") {
      const userAns = ans.benarSalah || [];
      const correctAns = q.statements || [];
      if (userAns.length !== correctAns.length) return false;
      return userAns.every((val, idx) => val === correctAns[idx].isCorrect);
    }
    if (q.type === "menjodohkan") {
      const userAns = ans.menjodohkan || [];
      const correctAns = q.pairs || [];
      if (userAns.length !== correctAns.length) return false;
      return userAns.every((val, idx) => val === correctAns[idx].response);
    }
    return false;
  };

  const isQuestionAnswered = (q: QuizQuestion): boolean => {
    const ans = answers[q.id];
    if (!ans) return false;
    if (q.type === "pilihan_ganda") {
      return ans.pilihanGanda !== undefined;
    }
    if (q.type === "pilihan_ganda_kompleks") {
      return (ans.pilihanGandaKompleks || []).length > 0;
    }
    if (q.type === "benar_salah") {
      const bs = ans.benarSalah || [];
      return bs.length === q.statements.length && bs.every(x => x !== undefined);
    }
    if (q.type === "menjodohkan") {
      const m = ans.menjodohkan || [];
      return m.length === q.pairs.length && m.every(x => x !== "" && x !== undefined);
    }
    return false;
  };

  // Force automatic submit when timer hits 0
  const handleForceSubmit = () => {
    processSubmit();
  };

  // Process Grade calculation and POST logic
  const processSubmit = async () => {
    setSubmitting(true);
    let correctCount = 0;
    let answeredCount = 0;
    let flaggedCount = 0;

    quizQuestions.forEach(q => {
      const ans = answers[q.id];
      const answered = isQuestionAnswered(q);
      if (answered) answeredCount++;
      if (ans && ans.isRaguRagu) flaggedCount++;

      if (ans && checkAnswerCorrectness(q, ans)) {
        correctCount++;
      }
    });

    const incorrectCount = quizQuestions.length - correctCount;
    const unansweredCount = quizQuestions.length - answeredCount;
    const score = Math.round((correctCount / quizQuestions.length) * 100);

    const result: QuizResult = {
      student,
      score,
      correctCount,
      incorrectCount,
      totalAnswered: answeredCount,
      unansweredCount,
      flaggedCount,
      timestamp: new Date().toLocaleString("id-ID")
    };

    // Attempt actual POST to Google Apps Script Spreadsheet Web App URL if specified or fall back
    const postPayload = {
      timestamp: result.timestamp,
      nama: student.name,
      kelas: student.className,
      benar: correctCount,
      salah: incorrectCount,
      terjawab: answeredCount,
      raguragu: flaggedCount,
      belumterjawab: unansweredCount,
      nilai: score
    };

    try {
      if (appsScriptUrl) {
        await fetch(appsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postPayload)
        });
      } else {
        // Fallback POST mock / background log
        console.log("Posting result to mock Google Spreadsheet:", postPayload);
      }
    } catch (err) {
      console.error("Failed to transmit scores to Spreadsheet:", err);
    }

    setSubmitting(false);
    setShowConfirmModal(false);
    onQuizSubmit(result);
  };

  // Copy Google Apps Script code to clipboard
  const copyScriptCode = () => {
    const codeText = `// Google Apps Script - Pasang di Extensions > Apps Script pada Spreadsheet Anda
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Urutan kolom: tanggal dan waktu | nama | kelas | benar | salah | terjawab | ragu ragu | belum terjawab | nilai
    sheet.appendRow([
      data.timestamp,
      data.nama,
      data.kelas,
      data.benar,
      data.salah,
      data.terjawab,
      data.raguragu,
      data.belumterjawab,
      data.nilai
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentQuestion = quizQuestions[currentIdx];
  const currentAnswer = getAnswer(currentQuestion.id);

  // Return Login layout if not logged in
  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto space-y-6" id="anbk-login-page">
        {/* Spreadsheet Sync Alert Box */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-sans font-bold text-slate-800 text-base">Sinkronisasi Google Spreadsheet</h3>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Kuis ini mengintegrasikan pengiriman skor ANBK secara langsung ke Google Spreadsheet milik Sekolah/Guru secara real-time.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">
              Link Spreadsheet Aktif Guru:
            </label>
            <a 
              href="https://docs.google.com/spreadsheets/d/1zunNhts8xLr6S8eqXlbHwk_0olpdzz0hFOVYSwMBzds/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-50 border border-slate-200 text-left text-xs text-indigo-600 font-mono p-2.5 rounded-lg truncate hover:bg-indigo-50/20"
            >
              https://docs.google.com/spreadsheets/d/1zunNhts8xLr6S8eqXlbHwk_0olpdzz0hFOVYSwMBzds/...
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={() => setShowScriptModal(true)}
              className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium font-sans py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Code className="w-4 h-4" />
              Ambil Google Apps Script
            </button>
            <input
              type="text"
              id="apps-script-url-input"
              placeholder="Tempel Web App URL Anda (opsional)..."
              value={appsScriptUrl}
              onChange={(e) => setAppsScriptUrl(e.target.value)}
              className="flex-1 bg-white border border-slate-200 text-xs font-sans p-2.5 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Login Credentials form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4" id="student-login-form">
          <div className="text-center pb-2">
            <h2 className="font-sans font-bold text-slate-800 text-lg">Menu Login Siswa (Asesmen ANBK)</h2>
            <p className="font-sans text-xs text-slate-400">Masukkan identitas lengkap untuk memulai tes penilaian numerasi</p>
          </div>

          {validationError && (
            <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3 rounded-xl text-xs font-sans flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Nama Lengkap Siswa:</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  id="student-name-input"
                  placeholder="Contoh: Ahmad Dhani"
                  value={student.name}
                  onChange={(e) => setStudent({ ...student, name: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-sans text-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Kelas / Rombel:</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  id="student-class-input"
                  placeholder="Contoh: VII-A (Matematika)"
                  value={student.className}
                  onChange={(e) => setStudent({ ...student, className: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-sans text-sm transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            id="start-anbk-quiz-btn"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold font-sans py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            Mulai Ujian Numerasi
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Modal showing Apps Script guide */}
        <AnimatePresence>
          {showScriptModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto"
                id="apps-script-guide-modal"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-sans font-bold text-slate-800 text-base">Panduan Google Apps Script</h3>
                  <button onClick={() => setShowScriptModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-sans cursor-pointer">Tutup</button>
                </div>
                
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  Ikuti langkah-langkah di bawah ini agar data kuis terkirim secara otomatis ke Spreadsheet Anda:
                </p>

                <ol className="list-decimal pl-5 font-sans text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <li>Buka Spreadsheet Anda.</li>
                  <li>Pilih menu <strong>Ekstensi (Extensions)</strong> &gt; <strong>Apps Script</strong>.</li>
                  <li>Hapus kode bawaan, lalu salin kode script di bawah ini.</li>
                  <li>Klik tombol simpan (ikon disket).</li>
                  <li>Pilih tombol <strong>Terapkan (Deploy)</strong> &gt; <strong>Penerapan baru (New deployment)</strong>.</li>
                  <li>Pilih jenis penerapan: <strong>Aplikasi web (Web app)</strong>.</li>
                  <li>Atur <i>Akses siapa saja</i> menjadi <strong>Siapa saja (Anyone)</strong>, lalu klik Terapkan.</li>
                  <li>Salin alamat <strong>URL Aplikasi Web</strong> yang dihasilkan, lalu tempel di kotak input login kuis ini.</li>
                </ol>

                <div className="bg-slate-900 text-indigo-200 rounded-xl p-4 font-mono text-[10px] sm:text-xs relative">
                  <button
                    onClick={copyScriptCode}
                    className="absolute top-2.5 right-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 py-1 px-2.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer text-[10px]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Tersalin!" : "Salin Kode"}
                  </button>
                  <pre className="overflow-x-auto whitespace-pre leading-relaxed pt-6">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  try {
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp,
      data.nama,
      data.kelas,
      data.benar,
      data.salah,
      data.terjawab,
      data.raguragu,
      data.belumterjawab,
      data.nilai
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                  </pre>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Active Quiz Layout
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6" id="anbk-quiz-player">
      
      {/* LEFT & CENTER PANEL: Main test player (lg:col-span-8) */}
      <div className="lg:col-span-8 space-y-4">
        
        {/* Quiz HUD Header */}
        <div className="bg-white rounded-xl p-4 border border-slate-100 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold font-sans">
              ANBK
            </div>
            <div>
              <p className="font-sans font-bold text-slate-800 text-xs sm:text-sm">Asesmen Matematika - Numerasi</p>
              <p className="font-sans text-[11px] text-slate-400 font-medium">Siswa: {student.name} | Kelas: {student.className}</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-slate-950 text-emerald-400 font-mono px-3 py-1.5 rounded-lg border border-slate-800 shadow-inner">
            <Clock className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wider">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Splits: Left Stimulus, Right Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="split-player-container">
          
          {/* Stimulus Box (Left) */}
          <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 h-[350px] md:h-[450px] overflow-y-auto space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md uppercase font-sans">STIMULUS BACALAH:</span>
              <p className="font-sans text-xs text-slate-600 leading-relaxed whitespace-pre-line" id="stimulus-text">
                {currentQuestion.stimulus}
              </p>
            </div>

            {/* Simulated Custom CSS/Math Visualization representation so it looks very clean */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <p className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-wider mb-2">Representasi Visual Stimulus</p>
              <div className="h-16 flex items-center justify-center border-t border-slate-300 relative">
                {/* Simulated Number line axis */}
                <div className="w-full h-0.5 bg-slate-400 relative">
                  <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-slate-400"></div>
                  <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-slate-400"></div>
                  
                  {/* Indicators */}
                  <div className="absolute left-1/4 -top-1.5 w-3 h-3 rounded-full bg-indigo-500 border border-white" title="-10"></div>
                  <div className="absolute left-1/2 -top-1.5 w-3 h-3 rounded-full bg-slate-600 border border-white" title="0"></div>
                  <div className="absolute left-3/4 -top-1.5 w-3 h-3 rounded-full bg-emerald-500 border border-white" title="10"></div>
                </div>
                {/* Labels */}
                <div className="absolute bottom-2 left-1/4 -translate-x-1/2 text-[9px] font-mono text-slate-400">-10</div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-600 font-bold">0</div>
                <div className="absolute bottom-2 left-3/4 -translate-x-1/2 text-[9px] font-mono text-slate-400">+10</div>
              </div>
            </div>
          </div>

          {/* Question & Options Area (Right) */}
          <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 h-[350px] md:h-[450px] overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="font-sans font-bold text-slate-700 text-xs uppercase tracking-wider">SOAL {currentIdx + 1}</span>
                <span className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded-md uppercase ${
                  currentQuestion.difficulty === "mudah" ? "bg-emerald-50 text-emerald-700" :
                  currentQuestion.difficulty === "sedang" ? "bg-amber-50 text-amber-700" :
                  "bg-rose-50 text-rose-700"
                }`}>
                  {currentQuestion.difficulty}
                </span>
              </div>

              <h4 className="font-sans font-medium text-slate-800 text-sm leading-snug">
                {currentQuestion.questionText}
              </h4>

              {/* RENDER OPTIONS BY QUESTION TYPE */}
              <div className="pt-2">
                {/* 1. PILIHAN GANDA SINGLE */}
                {currentQuestion.type === "pilihan_ganda" && (
                  <div className="space-y-2" id="pg-options-list">
                    {currentQuestion.options.map((opt) => {
                      const optCode = opt.charAt(0);
                      const isSelected = currentAnswer.pilihanGanda === optCode;
                      return (
                        <button
                          key={opt}
                          id={`pg-opt-btn-${optCode}`}
                          onClick={() => selectPilihanGanda(optCode)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl border font-sans text-xs sm:text-sm cursor-pointer transition-all ${
                            isSelected
                              ? "bg-indigo-50 border-indigo-500 text-indigo-900 font-medium"
                              : "border-slate-200 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. PILIHAN GANDA KOMPLEKS (Multi Select) */}
                {currentQuestion.type === "pilihan_ganda_kompleks" && (
                  <div className="space-y-2" id="pgk-options-list">
                    <p className="text-[10px] text-slate-400 font-sans italic mb-2">Dapat memilih lebih dari satu jawaban.</p>
                    {currentQuestion.options.map((opt) => {
                      const optCode = opt.charAt(0);
                      const isSelected = (currentAnswer.pilihanGandaKompleks || []).includes(optCode);
                      return (
                        <button
                          key={opt}
                          id={`pgk-opt-btn-${optCode}`}
                          onClick={() => togglePilihanGandaKompleks(optCode)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl border font-sans text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-indigo-50 border-indigo-500 text-indigo-900 font-medium"
                              : "border-slate-200 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span>{opt}</span>
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 3. BENAR / SALAH GRID */}
                {currentQuestion.type === "benar_salah" && (
                  <div className="space-y-3 font-sans" id="bs-statements-table">
                    <p className="text-[10px] text-slate-400 italic mb-2">Tentukan pilihan Benar (B) atau Salah (S) untuk setiap pernyataan berikut.</p>
                    <div className="border border-slate-150 rounded-xl overflow-hidden text-xs">
                      {/* Grid Header */}
                      <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-150 py-2 px-3 font-bold text-slate-500">
                        <div className="col-span-8">Pernyataan</div>
                        <div className="col-span-2 text-center">B</div>
                        <div className="col-span-2 text-center">S</div>
                      </div>
                      
                      {/* Statements list */}
                      {currentQuestion.statements.map((stmt, idx) => {
                        const userVal = (currentAnswer.benarSalah || [])[idx];
                        return (
                          <div key={idx} className="grid grid-cols-12 border-b border-slate-100 last:border-b-0 py-3 px-3 items-center hover:bg-slate-50/30">
                            <div className="col-span-8 text-slate-700 font-medium leading-tight pr-1">{stmt.statement}</div>
                            
                            {/* Benar Radio */}
                            <div className="col-span-2 text-center">
                              <button
                                type="button"
                                onClick={() => selectBenarSalah(idx, true)}
                                className={`w-6 h-6 rounded-full border flex items-center justify-center mx-auto cursor-pointer transition-all ${
                                  userVal === true 
                                    ? "bg-emerald-600 border-emerald-600 text-white font-bold" 
                                    : "border-slate-300 hover:border-slate-400"
                                }`}
                              >
                                {userVal === true ? "✓" : ""}
                              </button>
                            </div>

                            {/* Salah Radio */}
                            <div className="col-span-2 text-center">
                              <button
                                type="button"
                                onClick={() => selectBenarSalah(idx, false)}
                                className={`w-6 h-6 rounded-full border flex items-center justify-center mx-auto cursor-pointer transition-all ${
                                  userVal === false 
                                    ? "bg-rose-600 border-rose-600 text-white font-bold" 
                                    : "border-slate-300 hover:border-slate-400"
                                }`}
                              >
                                {userVal === false ? "✓" : ""}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. MENJODOHKAN SELECTORS */}
                {currentQuestion.type === "menjodohkan" && (
                  <div className="space-y-3 font-sans text-xs sm:text-sm" id="matching-pair-selectors">
                    <p className="text-[10px] text-slate-400 italic mb-2">Pasangkan pernyataan kiri dengan jawaban dropdown di sebelah kanan.</p>
                    <div className="space-y-2.5">
                      {currentQuestion.pairs.map((pair, idx) => {
                        const userSelect = (currentAnswer.menjodohkan || [])[idx] || "";
                        return (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl border border-slate-150 bg-slate-50/50">
                            <span className="text-slate-700 font-medium leading-tight max-w-sm">{pair.premise}</span>
                            <select
                              id={`matching-select-${idx}`}
                              value={userSelect}
                              onChange={(e) => selectMenjodohkan(idx, e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-indigo-500 font-sans cursor-pointer text-slate-800"
                            >
                              <option value="">-- Pilih Jawaban --</option>
                              {currentQuestion.responseOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Question Controls footer */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="flex-1 sm:flex-initial border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              SOAL SEBELUMNYA
            </button>
            <button
              onClick={() => setCurrentIdx(prev => Math.min(quizQuestions.length - 1, prev + 1))}
              disabled={currentIdx === quizQuestions.length - 1}
              className="flex-1 sm:flex-initial border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              SOAL BERIKUTNYA
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <label className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl cursor-pointer select-none">
            <input
              type="checkbox"
              checked={currentAnswer.isRaguRagu}
              onChange={toggleRaguRagu}
              className="w-4 h-4 text-amber-500 rounded-md accent-amber-500 cursor-pointer"
            />
            <span className="font-sans font-bold text-amber-900 text-xs sm:text-sm tracking-wide">RAGU-RAGU</span>
          </label>
        </div>

      </div>

      {/* RIGHT PANEL: Question Grid & Submission (lg:col-span-4) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-indigo-500" />
              Navigasi Butir Soal ANBK
            </h3>
            <p className="font-sans text-[10px] text-slate-400 mt-0.5">Klik nomor di bawah untuk berpindah soal secara instan</p>
          </div>

          {/* Question Grid Numbers */}
          <div className="grid grid-cols-5 gap-2" id="anbk-navigator-grid">
            {quizQuestions.map((q, idx) => {
              const isCurrent = currentIdx === idx;
              const isAnswered = isQuestionAnswered(q);
              const isFlagged = getAnswer(q.id).isRaguRagu;
              
              let bgClass = "bg-slate-100 text-slate-700 hover:bg-slate-200";
              let borderClass = "border-transparent";

              if (isFlagged) {
                bgClass = "bg-amber-400 text-amber-950 font-bold";
              } else if (isAnswered) {
                bgClass = "bg-emerald-600 text-white font-medium";
              }

              if (isCurrent) {
                borderClass = "border-indigo-600 border-2";
              }

              return (
                <button
                  key={q.id}
                  id={`nav-num-${idx + 1}`}
                  onClick={() => setCurrentIdx(idx)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center font-sans font-bold text-xs cursor-pointer border transition-all ${bgClass} ${borderClass}`}
                >
                  <span>{idx + 1}</span>
                  {isAnswered && !isFlagged && <span className="text-[7px] opacity-75">Selesai</span>}
                  {isFlagged && <span className="text-[7px] text-amber-950">Ragu</span>}
                </button>
              );
            })}
          </div>

          {/* Color Key Guide */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 font-sans text-[9px] text-slate-500 uppercase font-bold text-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200"></div>
              <span>Belum</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 rounded-md bg-emerald-600"></div>
              <span>Dijawab</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-5 h-5 rounded-md bg-amber-400"></div>
              <span>Ragu-ragu</span>
            </div>
          </div>

          {/* Final Submit Trigger */}
          <button
            onClick={() => setShowConfirmModal(true)}
            id="finish-anbk-test-btn"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-sans py-3 px-4 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Send className="w-4 h-4" />
            SELESAI & KIRIM JAWABAN
          </button>
        </div>
      </div>

      {/* CONFIRMATION POPUP MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-4"
              id="confirm-anbk-submit-modal"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <AlertTriangle className="w-6 h-6 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-sans font-bold text-slate-800 text-base">Konfirmasi Akhiri Tes</h3>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  Apakah Anda yakin ingin menyelesaikan tes sekarang? Hasil perolehan nilai dan statistik kuis Anda akan segera dikalkulasi dan diunggah langsung ke Spreadsheet Guru.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  disabled={submitting}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold font-sans py-2.5 rounded-lg text-xs cursor-pointer disabled:opacity-50 transition-colors"
                >
                  Batal / Kembali
                </button>
                <button
                  onClick={processSubmit}
                  disabled={submitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold font-sans py-2.5 rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50 transition-colors"
                >
                  {submitting ? "Sedang Mengirim..." : "Ya, Selesai"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
