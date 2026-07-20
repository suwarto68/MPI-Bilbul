import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smile, Meh, Frown, Sparkles } from "lucide-react";

interface Mood {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  bgActive: string;
  borderActive: string;
  motivation: string;
}

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods: Mood[] = [
    {
      id: "sedih",
      label: "Sedih",
      icon: Frown,
      color: "text-blue-500",
      bgActive: "bg-blue-50 text-blue-700",
      borderActive: "border-blue-500 shadow-lg shadow-blue-100",
      motivation: "Sedih itu wajar, tapi tahu tidak? Seperti bilangan negatif pada garis bilangan, terkadang kita harus mundur selangkah untuk bisa melompat maju ke arah positif yang lebih tinggi! Mari kita hangatkan semangat belajar hari ini bersama Pak Suwarto. Kamu pasti bisa!"
    },
    {
      id: "biasa",
      label: "Biasa Saja",
      icon: Meh,
      color: "text-amber-500",
      bgActive: "bg-amber-50 text-amber-700",
      borderActive: "border-amber-500 shadow-lg shadow-amber-100",
      motivation: "Keadaan seimbang seperti angka Nol (0) di tengah garis bilangan! Ini adalah titik awal yang sempurna untuk melangkah ke arah kanan (positif). Mari tingkatkan energimu hari ini dengan mengeksplorasi serunya dunia bilangan bulat!"
    },
    {
      id: "senang",
      label: "Senang",
      icon: Smile,
      color: "text-emerald-500",
      bgActive: "bg-emerald-50 text-emerald-700",
      borderActive: "border-emerald-500 shadow-lg shadow-emerald-100",
      motivation: "Luar biasa! Energi positifmu (+100) sangat menular! Mari salurkan keceriaan dan fokus hebatmu hari ini untuk menaklukkan semua tantangan kuis matematika. Pertahankan terus semangat belajarmu!"
    }
  ];

  const currentMood = moods.find(m => m.id === selectedMood);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm max-w-xl mx-auto" id="mood-selector-container">
      <h3 className="text-center font-sans font-semibold text-slate-800 mb-4 flex items-center justify-center gap-2" id="mood-title">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        Bagaimana perasaanmu sebelum belajar hari ini?
      </h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6" id="mood-buttons-grid">
        {moods.map((mood) => {
          const IconComponent = mood.icon;
          const isActive = selectedMood === mood.id;
          
          return (
            <button
              key={mood.id}
              id={`mood-btn-${mood.id}`}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                isActive 
                  ? `${mood.bgActive} ${mood.borderActive} font-medium scale-105` 
                  : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <IconComponent className={`w-8 h-8 mb-2 transition-transform duration-300 ${isActive ? "scale-110" : ""} ${mood.color}`} />
              <span className="text-xs sm:text-sm font-sans">{mood.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {currentMood && (
          <motion.div
            key={currentMood.id}
            id="mood-motivation-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-xl border leading-relaxed text-sm font-sans flex gap-3 ${
              currentMood.id === "sedih" ? "bg-blue-50/50 border-blue-100 text-blue-900" :
              currentMood.id === "biasa" ? "bg-amber-50/50 border-amber-100 text-amber-900" :
              "bg-emerald-50/50 border-emerald-100 text-emerald-900"
            }`}
          >
            <div className="flex-1">
              <p className="font-medium text-xs mb-1 uppercase tracking-wider">
                Motivasi Guru Untukmu:
              </p>
              <p className="italic">
                "{currentMood.motivation}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
