import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Home, BookOpen, GraduationCap, Compass, 
  Award, BrainCircuit, Sparkles, CheckCircle2, ChevronRight, HelpCircle, Loader2
} from "lucide-react";
import { TabType, QuizResult } from "./types";
import MoodSelector from "./components/MoodSelector";
import MaterialAccordion from "./components/MaterialAccordion";
import AnbkQuiz from "./components/AnbkQuiz";
import Certificate from "./components/Certificate";
import AiTask from "./components/AiTask";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("beranda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Dynamic Learning Objectives state from server
  const [objectives, setObjectives] = useState<string[]>([]);
  const [loadingObjectives, setLoadingObjectives] = useState(false);

  // Custom reflection state
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Fetch learning objectives on load
  const fetchObjectives = async () => {
    setLoadingObjectives(true);
    try {
      const response = await fetch("/api/gemini/generate-tujuan");
      const res = await response.json();
      if (res.success && res.data) {
        setObjectives(res.data);
      } else {
        throw new Error("Local fallback");
      }
    } catch (err) {
      console.log("Using fallback objectives:", err);
      setObjectives([
        "Memahami hubungan antara bilangan bulat positif, negatif, dan nol pada garis bilangan.",
        "Membandingkan dan mengurutkan nilai bilangan bulat dalam situasi sehari-hari.",
        "Melakukan operasi penjumlahan dan pengurangan bilangan bulat dengan bantuan model visual.",
        "Menyelesaikan masalah kontekstual yang berkaitan dengan operasi hitung campuran bilangan bulat."
      ]);
    } finally {
      setLoadingObjectives(false);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda", icon: Home },
    { id: "pendahuluan", label: "Pendahuluan", icon: HelpCircle },
    { id: "materi", label: "Materi", icon: BookOpen },
    { id: "eksplorasi", label: "Eksplorasi", icon: Compass },
    { id: "kuis", label: "Kuis", icon: Award },
    { id: "tugas", label: "Tugas AI", icon: BrainCircuit },
    { id: "penutup", label: "Penutup", icon: GraduationCap }
  ] as const;

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800" id="main-lms-application">
      
      {/* 1. LMS HEADER SECTION */}
      <header className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-950 text-white shadow-md sticky top-0 z-40 print:hidden" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 hidden sm:block">
              <GraduationCap className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-indigo-300 uppercase tracking-widest font-sans">
                Kelas 7 Fase D MATEMATIKA
              </span>
              <h1 className="font-sans font-extrabold text-base sm:text-lg md:text-xl tracking-tight leading-none mt-0.5">
                Bab 1: Bilangan Bulat
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-300 font-sans tracking-wide mt-1 font-medium">
                Guru Mata Pelajaran: <span className="text-white font-semibold">Suwarto, S.Pd</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-navbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-indigo-900 shadow-sm"
                      : "text-indigo-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/10 bg-indigo-950 font-sans"
            >
              <nav className="px-4 py-3 space-y-1.5 flex flex-col">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleTabClick(item.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer transition-all ${
                        isActive
                          ? "bg-white text-indigo-900"
                          : "text-indigo-100 hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. MAIN LMS WORKSPACE (Scrollable Content Container) */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" id="main-content-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            id={`tab-content-${activeTab}`}
          >
            
            {/* TAB 1: BERANDA (Home) */}
            {activeTab === "beranda" && (
              <div className="space-y-6 max-w-4xl mx-auto" id="beranda-tab-pane">
                {/* Hero Greeting Display Card */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xs text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight leading-tight">
                      Selamat Datang di Ruang Belajar Bilangan Bulat!
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
                      Halo Anak-Anak Hebat Kelas 7! Senang sekali bisa membersamai kalian dalam mengeksplorasi serunya materi Bab 1: Bilangan Bulat. Di sini, kita akan menemukan rahasia angka-angka berlawanan, bertualang dengan garis bilangan, serta menaklukkan tantangan kuis bergaya ANBK dengan ceria. Mari siapkan fokus terbaikmu!
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={() => handleTabClick("pendahuluan")}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold font-sans py-2.5 px-6 rounded-xl text-sm shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      Mulai Eksplorasi Pembelajaran
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mood Selector Module */}
                <MoodSelector />
              </div>
            )}

            {/* TAB 2: PENDAHULUAN (Introduction) */}
            {activeTab === "pendahuluan" && (
              <div className="space-y-6 max-w-4xl mx-auto" id="pendahuluan-tab-pane">
                
                {/* Apersepsi Card */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase font-sans tracking-wider">Apersepsi Pemantik</span>
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-800 leading-tight">Pernahkah Kamu Berpikir Tentang Angka di Bawah Nol?</h3>
                  <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                    Pernahkah kamu memperhatikan angka suhu di dalam freezer kulkas, atau membayangkan bagaimana kapal selam militer menyelam jauh di bawah gelombang laut? Kehidupan kita dikelilingi oleh besaran yang berlawanan arah! Tanpa disadari, kita sedang bermain dengan konsep dasar matematika yang sangat ajaib bernama Bilangan Bulat. Ayo, kita telusuri bagaimana hal itu bekerja!
                  </p>
                </div>

                {/* Tujuan Pembelajaran Block */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
                  <h3 className="font-sans font-extrabold text-lg text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    Tujuan Pembelajaran (Fase D Kurikulum Merdeka)
                  </h3>

                  {loadingObjectives ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-2 font-sans text-xs text-slate-500">
                      <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                      <span>Menyusun tujuan pembelajaran dengan AI...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="objectives-list">
                      {objectives.map((obj, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex gap-3 hover:border-slate-200 transition-colors">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold font-sans">
                            {i + 1}
                          </span>
                          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-snug">{obj}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: MATERI (Lessons) */}
            {activeTab === "materi" && (
              <div id="materi-tab-pane">
                <MaterialAccordion />
              </div>
            )}

            {/* TAB 4: EKSPLORASI (Interactive Sandbox/ATP) */}
            {activeTab === "eksplorasi" && (
              <div className="space-y-6 max-w-5xl mx-auto" id="eksplorasi-tab-pane">
                
                {/* ATP and Simulation intro details */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-3">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md uppercase font-sans tracking-wider">ATP & Eksplorasi Visual</span>
                  <h3 className="font-sans font-bold text-slate-800 text-lg">Eksplorasi Interaktif Garis Bilangan Bulat (PhET)</h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Alur Tujuan Pembelajaran (ATP): Melalui eksperimen visual mandiri, murid dapat secara aktif memanipulasi posisi balon udara, penyelam, dan kartu bernilai negatif/positif untuk menyimpulkan sifat relasi perbandingan matematika pada garis bilangan secara menyeluruh.
                  </p>
                </div>

                {/* PhET Interactive Simulation Embed Frame */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md flex flex-col" id="phet-iframe-container">
                  {/* Frame Header */}
                  <div className="bg-slate-550 border-b border-slate-100 py-3 px-5 flex items-center justify-between">
                    <span className="font-sans font-bold text-slate-700 text-xs sm:text-sm">Laboratorium Garis Bilangan PhET Interactive Colorado</span>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">LIVE INTERACTIVE</span>
                  </div>

                  {/* HTML5 Iframe */}
                  <div className="relative w-full aspect-video md:h-[500px] bg-slate-100">
                    <iframe
                      id="phet-numberline-iframe"
                      src="https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers_all.html"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                      title="PhET Number Line Integers Sandbox"
                    />
                  </div>

                  {/* Frame Footer Info */}
                  <div className="p-4 bg-slate-50 text-center font-sans text-xs text-slate-400">
                    Tekan tombol reload atau gunakan pointer mouse / layar sentuh untuk menaikkan ketinggian balon udara atau menurunkan posisi penyelam pada garis bilangan.
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: KUIS (Interactive ANBK Quiz / Certificate) */}
            {activeTab === "kuis" && (
              <div id="kuis-tab-pane">
                {quizResult ? (
                  <Certificate
                    student={quizResult.student}
                    score={quizResult.score}
                    correctCount={quizResult.correctCount}
                    totalQuestions={25}
                    onRestart={() => setQuizResult(null)}
                  />
                ) : (
                  <AnbkQuiz onQuizSubmit={(res) => setQuizResult(res)} />
                )}
              </div>
            )}

            {/* TAB 6: TUGAS AI (Generative Homework worksheets) */}
            {activeTab === "tugas" && (
              <div id="tugas-tab-pane">
                <AiTask />
              </div>
            )}

            {/* TAB 7: PENUTUP (Closing Summary & Form Feedback) */}
            {activeTab === "penutup" && (
              <div className="space-y-6 max-w-4xl mx-auto" id="penutup-tab-pane">
                
                {/* Rangkuman Bab 1 */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase font-sans tracking-wider">Rangkuman Akhir Bab</span>
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-800 leading-tight">Selamat! Kamu Telah Menguasai Bab Bilangan Bulat</h3>
                  <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                    Melalui perjalanan seru di Bab 1 ini, kita telah berhasil membedah seluruh aspek penting Bilangan Bulat! Mulai dari mengenali tanda bilangan, mengurutkan nilainya berdasarkan garis bilangan, menguasai rahasia nilai mutlak, hingga memecahkan berbagai hitungan penjumlahan, pengurangan, perkalian, pembagian, perpangkatan, dan kombinasi operasi campuran. Semoga ilmu baru ini terus melekat dan memantik pemikiran kritis kalian dalam mengapresiasi matematika harian!
                  </p>
                </div>

                {/* Google Form Reflection Embed & Custom Alternate Forms */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
                  <h3 className="font-sans font-extrabold text-lg text-slate-800">
                    Formulir Refleksi Pembelajaran Siswa
                  </h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Berikan umpan balik jujur mengenai pengalaman belajarmu bersama materi ini agar Bapak Suwarto bisa terus meng-upgrade media pembelajaran menjadi lebih keren lagi!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4" id="reflection-forms">
                    {/* Embedded form alternative */}
                    <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 space-y-4">
                      <h4 className="font-sans font-semibold text-slate-800 text-sm">Refleksi Pembelajaran Mandiri (Instan)</h4>
                      
                      {reflectionSubmitted ? (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-850 p-4 rounded-xl flex items-center gap-3 text-sm font-sans" id="reflection-success">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Terima kasih! Refleksi belajarmu telah berhasil disimpan di dalam sistem. Semangat belajarmu luar biasa!</span>
                        </div>
                      ) : (
                        <div className="space-y-3" id="reflection-inputs">
                          <textarea
                            id="reflection-textarea"
                            rows={4}
                            placeholder="Tuliskan di sini hal paling menarik apa saja yang kamu pelajari hari ini, serta bagian materi mana yang masih kamu rasa sulit..."
                            value={reflectionText}
                            onChange={(e) => setReflectionText(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => {
                              if (reflectionText.trim()) setReflectionSubmitted(true);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold font-sans py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors"
                          >
                            Kirim Refleksi
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. LMS FOOTER BRANDING */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-6 text-center text-xs font-sans print:hidden" id="main-footer">
        <p>© 2026 Media Pembelajaran Bilangan Bulat Kelas VII. All Rights Reserved.</p>
        <p className="mt-1 text-[10px] text-slate-600">Didesain khusus untuk pembelajaran interaktif SMP Negeri 1 oleh Suwarto, S.Pd</p>
      </footer>

    </div>
  );
}
