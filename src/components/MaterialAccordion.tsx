import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, BookOpen, Search, ArrowRight, HelpCircle } from "lucide-react";

interface AccordionItem {
  id: number;
  title: string;
  subtopic: string;
  explanation: string;
  examples: { question: string; answer: string; steps?: string }[];
  keyConcept: string;
}

export default function MaterialAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const materials: AccordionItem[] = [
    {
      id: 1,
      title: "Memahami konsep bilangan positif dan negatif untuk menyatakan besaran dengan sifat berlawanan menggunakan titik acuan 0",
      subtopic: "Konsep Bilangan Positif, Negatif, dan Nol",
      explanation: "Bilangan bulat terdiri dari tiga bagian utama: bilangan bulat positif, nol, dan bilangan bulat negatif. Untuk memahami konsep ini, kita dapat membayangkan arah berlawanan dalam kehidupan sehari-hari dengan titik acuan nol (0).\n\n- Bilangan positif menyatakan hal-hal seperti: di atas permukaan laut, suhu di atas 0°C, keuntungan, atau melangkah maju.\n- Bilangan negatif menyatakan hal-hal seperti: di bawah permukaan laut, suhu di bawah 0°C, kerugian, atau melangkah mundur.\n- Titik Acuan (0) bertindak sebagai pembatas netral.",
      keyConcept: "Suhu 5°C di bawah nol ditulis sebagai -5°C. Ketinggian 100 meter di atas permukaan laut ditulis +100 m atau cukup 100 m.",
      examples: [
        { question: "Tuliskan dalam lambang bilangan: Seekor lumba-lumba melompat 3 meter di atas permukaan laut, kemudian menyelam kembali sejauh 15 meter.", answer: "+3 (melompat di atas) dan -15 (menyelam di bawah)", steps: "Titik acuan 0 adalah permukaan laut. Naik = positif (+), turun = negatif (-)." }
      ]
    },
    {
      id: 2,
      title: "Membandingkan besar bilangan positif dan negatif berdasarkan posisinya pada garis bilangan dan nilai mutlaknya",
      subtopic: "Garis Bilangan, Nilai Mutlak, Perbandingan Bilangan Bulat",
      explanation: "Garis bilangan membantu kita memvisualisasikan letak dan nilai bilangan bulat. Semakin ke kanan letak suatu bilangan pada garis bilangan hizontal, nilainya semakin besar. Sebaliknya, semakin ke kiri letaknya, nilainya semakin kecil.\n\nNilai Mutlak (|x|) menyatakan jarak suatu bilangan x dari titik nol tanpa memedulikan tandanya. Karena jarak selalu positif atau nol, nilai mutlak suatu bilangan tidak pernah negatif.\nContoh: |-5| = 5 dan |5| = 5.",
      keyConcept: "Pada bilangan negatif, semakin besar angkanya, nilainya semakin kecil karena letaknya semakin ke kiri. Contoh: -10 < -2 karena -10 berada jauh di sebelah kiri -2.",
      examples: [
        { question: "Bandingkanlah bilangan bulat -8 dengan -12!", answer: "-8 > -12", steps: "Pada garis bilangan, -8 berada di sebelah kanan -12. Jadi, -8 lebih besar dari -12." },
        { question: "Berapakah hasil dari |-14| - |6|?", answer: "8", steps: "|-14| = 14 dan |6| = 6. Maka, 14 - 6 = 8." }
      ]
    },
    {
      id: 3,
      title: "Memahami arti penjumlahan bilangan positif dan negatif melalui situasi nyata dan menggunakan garis bilangan",
      subtopic: "Penjumlahan Bilangan Bulat",
      explanation: "Penjumlahan bilangan bulat dapat disimulasikan sebagai pergerakan melangkah pada garis bilangan:\n1. Mulai dari titik nol (0).\n2. Untuk menjumlahkan bilangan positif, kita melangkah ke KANAN.\n3. Untuk menjumlahkan bilangan negatif, kita melangkah ke KIRI.\n\nDalam kehidupan sehari-hari, penjumlahan juga dapat dianalogikan sebagai pembayaran hutang. Jika kita memiliki uang Rp 10.000 (+10) dan hutang Rp 7.000 (-7), maka setelah dilunasi kita memiliki sisa uang Rp 3.000 (+3).",
      keyConcept: "a + (-b) sama dengan a - b.\n(-a) + (-b) = -(a + b).",
      examples: [
        { question: "Hitunglah: (-5) + 8", answer: "3", steps: "Mulai dari 0, melangkah ke kiri sebanyak 5 satuan (sampai -5), lalu dari -5 melangkah ke kanan sebanyak 8 satuan. Kita berhenti di titik 3." },
        { question: "Hitunglah: (-3) + (-4)", answer: "-7", steps: "Mulai dari 0, melangkah ke kiri 3 satuan (sampai -3), kemudian dilanjutkan melangkah ke kiri lagi sebanyak 4 satuan. Kita berhenti di titik -7." }
      ]
    },
    {
      id: 4,
      title: "Menerapkan sifat komutatif dan asosiatif untuk mempermudah perhitungan penjumlahan bilangan bulat.",
      subtopic: "Sifat Komutatif dan Asosiatif Penjumlahan",
      explanation: "Dua sifat utama dalam operasi penjumlahan bilangan bulat adalah:\n1. Sifat Komutatif (Pertukaran): Penjumlahan dua bilangan bulat akan menghasilkan nilai yang sama meskipun urutan letak bilangannya ditukar.\n   Rumus: a + b = b + a\n\n2. Sifat Asosiatif (Pengelompokan): Penjumlahan tiga bilangan bulat menghasilkan nilai yang sama meskipun dikelompokkan dengan cara yang berbeda.\n   Rumus: (a + b) + c = a + (b + c)",
      keyConcept: "Gunakan sifat ini untuk mengelompokkan bilangan yang mudah dihitung terlebih dahulu (misalnya yang menghasilkan puluhan atau ratusan bulat).",
      examples: [
        { question: "Hitunglah dengan cerdas: (-37) + 54 + 37", answer: "54", steps: "Gunakan sifat komutatif: (-37) + 37 + 54 = [(-37) + 37] + 54 = 0 + 54 = 54." },
        { question: "Hitunglah: (48 + (-25)) + 25", answer: "48", steps: "Gunakan sifat asosiatif: 48 + ((-25) + 25) = 48 + 0 = 48." }
      ]
    },
    {
      id: 5,
      title: "Memahami arti pengurangan bilangan positif dan negatif, serta mengubah operasi pengurangan menjadi operasi penjumlahan.",
      subtopic: "Pengurangan Bilangan Bulat",
      explanation: "Mengurangi suatu bilangan bulat sama dengan menjumlahkan dengan lawan (invers) dari bilangan pengurang tersebut.\n\n- Lawan dari bilangan positif (+) adalah bilangan negatif (-).\n- Lawan dari bilangan negatif (-) adalah bilangan positif (+).\n\nRumus dasar:\na - b = a + (-b)\na - (-b) = a + b",
      keyConcept: "Tanda minus ganda yang berdampingan seperti - (-b) akan melebur menjadi tanda tambah (+b).",
      examples: [
        { question: "Hitunglah: 7 - 12", answer: "-5", steps: "Ubah menjadi penjumlahan: 7 + (-12). Karena kita melangkah ke kiri sejauh 12 langkah dari angka 7, kita mendarat di -5." },
        { question: "Hitunglah: (-4) - (-9)", answer: "5", steps: "Ubah tanda minus ganda menjadi tambah: (-4) + 9. Kita berada di -4 lalu melangkah ke kanan sejauh 9 langkah, hasilnya adalah 5." }
      ]
    },
    {
      id: 6,
      title: "Memahami arti perkalian bilangan positif dan negatif serta menghitung hasilnya berdasarkan aturan tanda.",
      subtopic: "Perkalian Bilangan Bulat dan Aturan Tanda",
      explanation: "Perkalian bilangan bulat dapat dipahami sebagai penjumlahan berulang. Namun, ketika melibatkan bilangan negatif, kita wajib mematuhi aturan tanda perkalian berikut:\n\n1. Positif x Positif = Positif (+)\n2. Negatif x Negatif = Positif (+)\n3. Positif x Negatif = Negatif (-)\n4. Negatif x Positif = Negatif (-)",
      keyConcept: "Sama Tanda menghasilkan Positif. Beda Tanda menghasilkan Negatif.",
      examples: [
        { question: "Hitunglah: (-5) x (-6)", answer: "30", steps: "Kedua bilangan memiliki tanda negatif yang sama (-). Negatif dikali negatif adalah positif. Maka, 5 x 6 = 30." },
        { question: "Hitunglah: 4 x (-8)", answer: "-32", steps: "Kedua bilangan memiliki tanda yang berbeda. Positif dikali negatif adalah negatif. Maka, 4 x (-8) = -32." }
      ]
    },
    {
      id: 7,
      title: "Menerapkan sifat komutatif, asosiatif, dan distributif perkalian serta konsep perpangkatan (eksponen).",
      subtopic: "Sifat Perkalian dan Perpangkatan (Eksponen)",
      explanation: "Perkalian bilangan bulat memiliki sifat-sifat yang analog dengan penjumlahan:\n- Sifat Komutatif: a x b = b x a\n- Sifat Asosiatif: (a x b) x c = a x (b x c)\n- Sifat Distributif (Penyebaran) terhadap Penjumlahan: a x (b + c) = (a x b) + (a x c)\n\nPerpangkatan (Eksponen) adalah perkalian berulang dari bilangan bulat dasar.\n(-a) pangkat n bernilai positif jika n genap, dan bernilai negatif jika n ganjil.",
      keyConcept: "(-2)³ = (-2) x (-2) x (-2) = -8 (Pangkat ganjil, hasil negatif).\n(-3)² = (-3) x (-3) = 9 (Pangkat genap, hasil positif).",
      examples: [
        { question: "Selesaikan menggunakan sifat distributif: 7 x (10 - 2)", answer: "56", steps: "7 x (10 - 2) = (7 x 10) - (7 x 2) = 70 - 14 = 56." },
        { question: "Hitunglah: (-5)³", answer: "-125", steps: "(-5) x (-5) x (-5) = 25 x (-5) = -125." }
      ]
    },
    {
      id: 8,
      title: "Memahami arti pembagian bilangan positif dan negatif serta mengubahnya menjadi perkalian dengan kebalikannya.",
      subtopic: "Pembagian Bilangan Bulat",
      explanation: "Pembagian adalah operasi kebalikan dari perkalian. Jika a x b = c, maka c : b = a.\nAturan tanda untuk pembagian sama persis dengan aturan perkalian:\n- Pembagian dua bilangan bertanda sama menghasilkan bilangan positif.\n- Pembagian dua bilangan berbeda tanda menghasilkan bilangan negatif.\n\nDalam pembagian bilangan bulat, membagi suatu bilangan dengan angka pecahan sama dengan mengalikan bilangan tersebut dengan kebalikan pecahannya.",
      keyConcept: "Sama seperti perkalian: (-) : (-) = (+), (-) : (+) = (-). Pembagian oleh angka 0 (nol) menghasilkan nilai tidak terdefinisi.",
      examples: [
        { question: "Hitunglah: (-42) : 6", answer: "-7", steps: "Negatif dibagi positif menghasilkan negatif. Maka, 42 dibagi 6 adalah 7, hasilnya -7." },
        { question: "Hitunglah: (-20) : (-5)", answer: "4", steps: "Negatif dibagi negatif menghasilkan positif. Maka, 20 dibagi 5 adalah 4." }
      ]
    },
    {
      id: 9,
      title: "Menyelesaikan operasi hitung campuran yang melibatkan perkalian dan pembagian.",
      subtopic: "Operasi Campuran Perkalian dan Pembagian",
      explanation: "Operasi perkalian (x) dan pembagian (:) memiliki tingkat kekuatan yang setara dalam matematika. Jika kedua operasi ini muncul bersamaan tanpa tanda kurung, kita harus mengerjakannya secara berurutan mulai dari KIRI ke KANAN.",
      keyConcept: "Kekuatan setara: dahulukan yang berada di sebelah kiri.",
      examples: [
        { question: "Hitunglah: 12 x (-4) : 6", answer: "-8", steps: "Kerjakan perkalian di kiri terlebih dahulu: 12 x (-4) = -48. Kemudian lakukan pembagian: -48 : 6 = -8." },
        { question: "Hitunglah: (-40) : (-5) x (-3)", answer: "-24", steps: "Kerjakan pembagian di kiri dahulu: (-40) : (-5) = 8. Selanjutnya lakukan perkalian: 8 x (-3) = -24." }
      ]
    },
    {
      id: 10,
      title: "Menyelesaikan operasi hitung campuran yang melibatkan empat operasi dan tanda kurung.",
      subtopic: "Operasi Hitung Campuran dan Urutan Operasi",
      explanation: "Aturan urutan operasi hitung matematika campuran (sering disebut KUKABATAKU):\n1. Kerjakan operasi di dalam kurung ( ) terlebih dahulu.\n2. Kerjakan perkalian (x) dan pembagian (:) dari kiri ke kanan.\n3. Kerjakan penjumlahan (+) dan pengurangan (-) dari kiri ke kanan.",
      keyConcept: "Urutan prioritas: Kurung -> Kali/Bagi -> Tambah/Kurang.",
      examples: [
        { question: "Hitunglah: (-5) + 3 x (-4) - 8", answer: "-25", steps: "Dahulukan perkalian: 3 x (-4) = -12. Persamaan menjadi: (-5) + (-12) - 8. Lakukan dari kiri: -17 - 8 = -25." },
        { question: "Hitunglah: 20 : (7 - 11) + (-6)", answer: "-11", steps: "Dahulukan operasi dalam kurung: 7 - 11 = -4. Persamaan menjadi: 20 : (-4) + (-6). Lakukan pembagian: -5 + (-6) = -11." }
      ]
    },
    {
      id: 11,
      title: "Merangkum dan mengklasifikasikan himpunan bilangan (asli, bulat) dan menerapkan empat operasi hitung.",
      subtopic: "Himpunan Bilangan Asli, Cacah, dan Bulat",
      explanation: "Mari melihat gambaran besar klasifikasi himpunan bilangan:\n\n1. Bilangan Asli (A): Mulai dari {1, 2, 3, 4, ...}\n2. Bilangan Cacah (C): Mulai dari {0, 1, 2, 3, 4, ...} (Asli + angka Nol)\n3. Bilangan Bulat (B): Terdiri dari bilangan bulat negatif, angka nol, dan bilangan bulat positif.\n   B = {..., -3, -2, -1, 0, 1, 2, 3, ...}\n\nSeluruh bilangan asli dan bilangan cacah adalah anggota dari himpunan bilangan bulat.",
      keyConcept: "Bilangan asli adalah subset dari bilangan cacah, dan bilangan cacah adalah subset dari bilangan bulat.",
      examples: [
        { question: "Apakah -15 merupakan bilangan cacah?", answer: "Bukan", steps: "Bilangan cacah hanya memuat nol dan bilangan positif (0, 1, 2, ...). Bilangan negatif seperti -15 hanya dikelompokkan ke dalam bilangan bulat." }
      ]
    }
  ];

  const filteredMaterials = materials.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6" id="materials-component">
      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto" id="material-search-container">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          id="material-search-input"
          placeholder="Cari materi, konsep, atau rumus..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white font-sans text-sm transition-all"
        />
      </div>

      {/* Accordion Wrapper */}
      <div className="space-y-3 max-w-4xl mx-auto" id="materials-accordion-list">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={item.id}
                id={`accordion-item-${item.id}`}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs hover:border-slate-200 transition-colors"
              >
                {/* Header (Clickable) */}
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50/50 cursor-pointer transition-colors"
                  id={`accordion-header-${item.id}`}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold text-sm font-sans mt-0.5">
                    {item.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded-md mb-1 font-sans uppercase tracking-wider">
                      {item.subtopic}
                    </span>
                    <h4 className="font-sans font-medium text-slate-800 text-sm sm:text-base leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-slate-400 transition-transform duration-300 mt-1 ${
                      isOpen ? "rotate-180 text-indigo-500" : ""
                    }`}
                  />
                </button>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`accordion-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 border-t border-slate-100 bg-slate-50/30 space-y-4">
                        {/* Explanation */}
                        <div className="prose prose-slate max-w-none text-slate-600 font-sans text-sm leading-relaxed whitespace-pre-line">
                          {item.explanation}
                        </div>

                        {/* Key Concept Alert */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-3">
                          <BookOpen className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-sans font-bold text-amber-950 text-xs uppercase tracking-wider mb-0.5">Konsep Kunci</h5>
                            <p className="font-sans text-amber-900 text-sm">{item.keyConcept}</p>
                          </div>
                        </div>

                        {/* Examples Section */}
                        {item.examples.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <h5 className="font-sans font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                              <HelpCircle className="w-4 h-4 text-indigo-500" />
                              Contoh Soal & Pembahasan
                            </h5>
                            {item.examples.map((ex, i) => (
                              <div key={i} className="bg-white border border-slate-150 rounded-lg p-4 space-y-2.5 shadow-2xs">
                                <p className="font-sans font-medium text-slate-800 text-sm">
                                  <span className="text-indigo-600 font-semibold font-mono">Soal: </span>
                                  {ex.question}
                                </p>
                                <div className="pl-4 border-l-2 border-indigo-100 space-y-1.5">
                                  <p className="font-sans text-sm text-indigo-950 font-medium">
                                    <span className="text-emerald-600 font-semibold font-mono">Jawaban: </span>
                                    {ex.answer}
                                  </p>
                                  {ex.steps && (
                                    <p className="font-sans text-xs text-slate-500">
                                      <span className="font-semibold">Langkah:</span> {ex.steps}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200" id="no-search-results">
            <p className="text-slate-400 font-sans">Tidak menemukan materi yang cocok dengan pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
