import React from "react";
import { Award, Printer, Calendar, BookOpen, Signature, CheckCircle2 } from "lucide-react";
import { StudentProfile } from "../types";

interface CertificateProps {
  student: StudentProfile;
  score: number;
  correctCount: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function Certificate({ student, score, correctCount, totalQuestions, onRestart }: CertificateProps) {
  const currentDateString = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="certificate-page-container">
      {/* Visual Header Warning about Printing */}
      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm font-sans text-emerald-800">
            Selamat! Kamu telah menyelesaikan Kuis Asesmen Numerasi Bilangan Bulat. Sertifikat belajarmu sudah siap dicetak.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-sans font-medium flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4" />
          Cetak Sertifikat
        </button>
      </div>

      {/* Actual Printable Certificate Card */}
      <div 
        id="printable-certificate"
        className="relative bg-amber-50/10 border-[12px] border-double border-amber-800 p-8 sm:p-12 text-center shadow-xl rounded-xl overflow-hidden print:border-amber-800 print:bg-white print:shadow-none"
      >
        {/* Certificate Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Certificate Border Line */}
        <div className="border border-amber-700/30 p-6 sm:p-8 space-y-6 sm:space-y-8">
          
          {/* Badge & Title */}
          <div className="flex flex-col items-center space-y-2">
            <Award className="w-16 h-16 text-amber-600 mx-auto print:text-amber-700" />
            <h1 className="font-serif text-amber-900 text-3xl sm:text-4xl tracking-wide uppercase font-bold">
              Sertifikat Penghargaan
            </h1>
            <p className="font-sans text-xs uppercase tracking-widest text-slate-500">
              No: SP/MAT-VII/FaseD/{Math.floor(1000 + Math.random() * 9000)}
            </p>
          </div>

          {/* Intro Text */}
          <div className="space-y-1">
            <p className="font-sans italic text-slate-600 text-sm">Dengan bangga mempersembahkan penghargaan ini kepada:</p>
            <h2 className="font-serif text-slate-800 text-2xl sm:text-3xl font-bold border-b border-dashed border-slate-300 pb-2 inline-block px-12 capitalize">
              {student.name || "Siswa Cerdas"}
            </h2>
            <p className="font-sans text-sm font-medium text-slate-500 uppercase tracking-wider">
              Kelas: {student.className || "7 Fase D"}
            </p>
          </div>

          {/* Description of Achievement */}
          <p className="font-sans text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Telah menyelesaikan dan lulus Kuis Asesmen Numerasi Interaktif pada materi pembelajaran <strong className="text-slate-800">Bab 1: Bilangan Bulat</strong> tingkat kesulitan AKM Kelas 7 Fase D dengan perolehan hasil sangat memuaskan:
          </p>

          {/* Stats Box */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto bg-amber-50/50 rounded-xl p-3 border border-amber-900/10 font-sans text-center print:bg-slate-50">
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Nilai Akhir</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-700 font-serif">{score}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Benar</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 font-serif">{correctCount} / {totalQuestions}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Predikat</p>
              <p className="text-xl sm:text-2xl font-bold text-indigo-700 font-serif">
                {score >= 85 ? "Istimewa" : score >= 70 ? "Sangat Baik" : "Cukup Baik"}
              </p>
            </div>
          </div>

          {/* Footer Dates & Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-6 max-w-2xl mx-auto font-sans">
            {/* Left Column: Date & Subject */}
            <div className="text-left flex flex-col justify-end space-y-1 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Tanggal: {currentDateString}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Mata Pelajaran: Matematika</span>
              </div>
            </div>

            {/* Right Column: Signature of Guru */}
            <div className="text-right flex flex-col items-end space-y-1 text-xs sm:text-sm">
              <p className="text-slate-600">Guru Mata Pelajaran,</p>
              
              {/* Signature Graphic Mock */}
              <div className="relative py-2 px-4 select-none">
                <Signature className="w-10 h-10 text-indigo-600 opacity-20 absolute top-0 right-1/2 translate-x-1/2" />
                <span className="font-serif text-indigo-800 italic font-bold text-base block tracking-wider pt-2">
                  Suwarto, S.Pd
                </span>
                <span className="text-slate-400 text-[10px] block font-mono">NIP. 19780512 200501 1 002</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Print Instructions or Return Options */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 print:hidden" id="certificate-actions">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl text-sm font-sans flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <Printer className="w-5 h-5" />
          Cetak Hasil Sertifikat (PDF / Printer)
        </button>
        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6 py-2.5 rounded-xl text-sm font-sans flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          Kembali ke Dashboard / Kuis Baru
        </button>
      </div>
    </div>
  );
}
