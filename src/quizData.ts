import { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  // ================= PILIHAN GANDA (10 Soal) =================
  {
    id: 1,
    type: "pilihan_ganda",
    difficulty: "mudah",
    stimulus: "Suhu udara dingin di ruang pembekuan kulkas milik Ibu Rahma diatur pada suhu 8 derajat Celcius di bawah 0°C. Sementara itu, suhu di lemari es biasa tempat menyimpan buah-buahan adalah 5 derajat Celcius di atas 0°C. Perbedaan suhu ini sangat penting agar makanan tetap segar dan tidak cepat membusuk. Konsep bilangan negatif digunakan untuk menuliskan suhu di bawah nol, sedangkan bilangan positif digunakan untuk suhu di atas nol.",
    questionText: "Bagaimanakah penulisan suhu ruang pembekuan kulkas Ibu Rahma menggunakan lambang bilangan bulat?",
    options: ["A. 8°C", "B. -8°C", "C. 0°C", "D. -5°C"],
    correctAnswer: "B"
  },
  {
    id: 2,
    type: "pilihan_ganda",
    difficulty: "mudah",
    stimulus: "Sebuah kapal selam militer milik TNI Angkatan Laut sedang melakukan latihan navigasi di perairan Selat Bali. Kapal selam tersebut mula-mula berada tepat di permukaan laut (titik acuan 0 meter). Kapal selam kemudian menyelam ke kedalaman 45 meter di bawah permukaan laut untuk menghindari radar musuh. Di dalam matematika, posisi di bawah permukaan air laut dilambangkan dengan tanda negatif.",
    questionText: "Berapakah posisi kedalaman kapal selam tersebut dinyatakan dalam bilangan bulat?",
    options: ["A. 45 meter", "B. 0 meter", "C. -45 meter", "D. -90 meter"],
    correctAnswer: "C"
  },
  {
    id: 3,
    type: "pilihan_ganda",
    difficulty: "mudah",
    stimulus: "Pada sebuah garis bilangan horizontal, terdapat titik acuan angka nol (0). Di sebelah kanan nol terdapat bilangan bulat positif yang nilainya semakin besar jika menjauhi nol. Di sebelah kiri nol terdapat bilangan bulat negatif yang nilainya justru semakin kecil jika semakin menjauh dari nol. Mari kita bandingkan nilai dari bilangan bulat -15 dengan bilangan bulat -7 berdasarkan posisinya.",
    questionText: "Pernyataan perbandingan berikut yang benar mengenai -15 dan -7 adalah...",
    options: ["A. -15 > -7", "B. -15 < -7", "C. -15 = -7", "D. -7 < -15"],
    correctAnswer: "B"
  },
  {
    id: 4,
    type: "pilihan_ganda",
    difficulty: "sedang",
    stimulus: "Suhu udara di Puncak Jaya Wijaya, Papua, tercatat sangat ekstrem pada musim dingin. Pada malam hari suhu udara mencapai -9°C. Seiring terbitnya matahari pada pagi hari, suhu udara perlahan naik sebesar 14°C karena mendapat kehangatan sinar matahari. Perubahan suhu ini dapat diselesaikan dengan konsep penjumlahan bilangan bulat negatif dan positif.",
    questionText: "Berapakah suhu udara di Puncak Jaya Wijaya pada pagi hari setelah mengalami kenaikan?",
    options: ["A. 5°C", "B. -5°C", "C. 23°C", "D. -23°C"],
    correctAnswer: "A"
  },
  {
    id: 5,
    type: "pilihan_ganda",
    difficulty: "sedang",
    stimulus: "Dalam suatu permainan kartu bilangan bulat, Andi memegang kartu bernilai -12 dan Budi memegang kartu bernilai 5. Aturan permainan menyatakan bahwa nilai akhir diperoleh dengan cara mengalikan angka pada kartu Andi dengan angka pada kartu Budi. Aturan tanda perkalian bilangan bulat menyatakan bahwa bilangan negatif dikalikan bilangan positif akan menghasilkan bilangan negatif.",
    questionText: "Berapakah hasil perkalian nilai kartu Andi dan kartu Budi tersebut?",
    options: ["A. 60", "B. -17", "C. -60", "D. -7"],
    correctAnswer: "C"
  },
  {
    id: 6,
    type: "pilihan_ganda",
    difficulty: "sedang",
    stimulus: "Pak Danu memiliki hutang di bank sebesar Rp 1.500.000 yang dilambangkan dengan -1.500.000 rupiah. Untuk melunasi hutang tersebut secara bertahap, Pak Danu berniat mencicilnya sama besar setiap bulan selama 5 bulan tanpa bunga. Konsep pembagian bilangan bulat negatif dengan bilangan positif dapat membantu menentukan nilai cicilan Pak Danu per bulannya.",
    questionText: "Berapa rupiah perubahan saldo rekening Pak Danu setiap bulan karena pemotongan cicilan tersebut? (Nyatakan dengan tanda negatif)",
    options: ["A. -Rp 150.000", "B. -Rp 300.000", "C. -Rp 500.000", "D. Rp 300.000"],
    correctAnswer: "B"
  },
  {
    id: 7,
    type: "pilihan_ganda",
    difficulty: "sedang",
    stimulus: "Di dalam sebuah gedung perkantoran setinggi 20 lantai, terdapat sebuah lift yang sedang bekerja. Seorang karyawan naik dari lantai dasar (lantai 1) menuju lantai 12 untuk menghadiri rapat penting. Setelah rapat selesai, karyawan tersebut harus turun 7 lantai menuju departemen keuangan untuk mengantarkan berkas kwitansi perjalanan dinas.",
    questionText: "Berada di lantai berapakah karyawan tersebut sekarang?",
    options: ["A. Lantai 19", "B. Lantai 6", "C. Lantai 5", "D. Lantai 4"],
    correctAnswer: "C"
  },
  {
    id: 8,
    type: "pilihan_ganda",
    difficulty: "sedang",
    stimulus: "Dalam asesmen nasional numerasi, siswa sering dihadapkan pada soal logika operasi hitung campuran. Diberikan operasi hitung berikut: (-24) + 16 : (-4) - (-10). Ingat aturan urutan operasi hitung (KUKABATAKU: Kurung, Kali, Bagi, Tambah, Kurang). Pembagian harus dilakukan terlebih dahulu sebelum penjumlahan dan pengurangan.",
    questionText: "Berapakah hasil akhir dari operasi hitung campuran tersebut?",
    options: ["A. -18", "B. -34", "C. -14", "D. -28"],
    correctAnswer: "A"
  },
  {
    id: 9,
    type: "pilihan_ganda",
    difficulty: "sedang",
    stimulus: "Sebuah eksperimen sains mengamati pertumbuhan sejenis bakteri dalam wadah bersuhu khusus. Suhu awal wadah penelitian adalah 25°C. Setiap 3 menit, peneliti menurunkan suhu wadah sebesar 4°C secara konsisten. Eksperimen ini berjalan selama 15 menit. Penurunan suhu secara konstan ini merupakan aplikasi dari operasi perkalian dan pengurangan bilangan bulat.",
    questionText: "Berapakah suhu akhir wadah eksperimen tersebut setelah 15 menit?",
    options: ["A. 5°C", "B. -5°C", "C. 9°C", "D. 1°C"],
    correctAnswer: "A"
  },
  {
    id: 10,
    type: "pilihan_ganda",
    difficulty: "sulit",
    stimulus: "Dua bilangan bulat misterius A dan B berada pada garis bilangan. Nilai mutlak dari A adalah 8, sedangkan nilai mutlak dari B adalah 15. Diketahui bahwa posisi bilangan A berada di sebelah kanan titik nol, sedangkan bilangan B berada di sebelah kiri titik nol. Nilai mutlak |x| menyatakan jarak suatu bilangan x dari titik nol pada garis bilangan tanpa memperhatikan arah.",
    questionText: "Berapakah hasil penjumlahan dari bilangan A dan bilangan B tersebut (A + B)?",
    options: ["A. 23", "B. -7", "C. 7", "D. -23"],
    correctAnswer: "B"
  },

  // ================= PILIHAN GANDA KOMPLEKS (5 Soal) =================
  {
    id: 11,
    type: "pilihan_ganda_kompleks",
    difficulty: "mudah",
    stimulus: "Di kota London, temperatur udara pada bulan Desember berkisar antara suhu dingin ekstrem di bawah 0°C. Peneliti meteorologi mengelompokkan suhu-suhu harian sebagai berikut: Hari Senin (-3°C), Hari Selasa (2°C), Hari Rabu (-7°C), Hari Kamis (0°C), Hari Jumat (-1°C). Kita ingin mengidentifikasi hari-hari mana saja yang memiliki suhu di bawah titik beku (kurang dari 0°C).",
    questionText: "Pilihlah semua hari yang memiliki suhu harian di bawah titik beku (bernilai negatif)! (Pilih semua jawaban yang benar)",
    options: ["A. Hari Senin (-3°C)", "B. Hari Selasa (2°C)", "C. Hari Rabu (-7°C)", "D. Hari Jumat (-1°C)"],
    correctAnswers: ["A", "C", "D"]
  },
  {
    id: 12,
    type: "pilihan_ganda_kompleks",
    difficulty: "sedang",
    stimulus: "Sifat-sifat aritmetika pada penjumlahan bilangan bulat sangat membantu kita menyederhanakan perhitungan yang rumit. Di antara sifat-sifat tersebut adalah Sifat Komutatif (Pertukaran) yang ditulis a + b = b + a, serta Sifat Asosiatif (Pengelompokan) yang ditulis (a + b) + c = a + (b + c). Sifat-sifat ini menjamin hasil penjumlahan tetap sama meskipun posisi ditukar atau dikelompokkan berbeda.",
    questionText: "Manakah di antara persamaan-persamaan matematika berikut yang menerapkan sifat komutatif atau asosiatif penjumlahan secara benar? (Pilih semua jawaban yang benar)",
    options: [
      "A. (-8) + 12 = 12 + (-8)",
      "B. (5 + (-3)) + 7 = 5 + ((-3) + 7)",
      "C. 10 - 4 = 4 - 10",
      "D. (-15) + 0 = 0"
    ],
    correctAnswers: ["A", "B"]
  },
  {
    id: 13,
    type: "pilihan_ganda_kompleks",
    difficulty: "sedang",
    stimulus: "Operasi hitung perkalian bilangan bulat melibatkan tanda positif dan negatif. Aturan tanda perkalian berbunyi: (+) dikali (+) menjadi (+), (-) dikali (-) menjadi (+), sedangkan perkalian dua bilangan berbeda tanda akan menghasilkan bilangan negatif (-). Mari kita uji pemahaman kita tentang beberapa operasi perkalian bilangan bulat.",
    questionText: "Di antara operasi hitung perkalian berikut, manakah yang menghasilkan nilai bilangan bulat positif? (Pilih semua jawaban yang benar)",
    options: [
      "A. (-6) x (-8)",
      "B. (-5) x 12",
      "C. 9 x 4",
      "D. (-10) x 0"
    ],
    correctAnswers: ["A", "C"]
  },
  {
    id: 14,
    type: "pilihan_ganda_kompleks",
    difficulty: "sedang",
    stimulus: "Dalam matematika, bilangan bulat dibedakan menjadi beberapa himpunan bagian, termasuk bilangan asli (mulai dari 1, 2, 3...) dan bilangan cacah (mulai dari 0, 1, 2, 3...). Himpunan bilangan bulat sendiri mencakup seluruh bilangan bulat negatif, angka nol, dan bilangan bulat positif. Pemahaman klasifikasi himpunan ini penting agar kita tidak keliru memahami sifat-sifat bilangan.",
    questionText: "Manakah pernyataan yang benar mengenai pengklasifikasian bilangan berikut? (Pilih semua jawaban yang benar)",
    options: [
      "A. Angka -5 termasuk ke dalam himpunan bilangan bulat namun bukan bilangan cacah.",
      "B. Angka 0 termasuk bilangan cacah sekaligus anggota bilangan bulat.",
      "C. Angka 3 adalah bagian dari bilangan asli, bilangan cacah, sekaligus bilangan bulat.",
      "D. Seluruh bilangan bulat adalah bagian dari bilangan asli."
    ],
    correctAnswers: ["A", "B", "C"]
  },
  {
    id: 15,
    type: "pilihan_ganda_kompleks",
    difficulty: "sulit",
    stimulus: "Konsep perpangkatan atau eksponen pada bilangan bulat menyatakan perkalian berulang suatu bilangan dasar sebanyak pangkatnya. Jika basis berupa bilangan negatif, maka tanda hasil perpangkatan sangat dipengaruhi oleh ganjil atau genapnya nilai pangkat tersebut. Pangkat genap menghasilkan bilangan positif, sedangkan pangkat ganjil tetap menghasilkan bilangan negatif.",
    questionText: "Manakah dari operasi perpangkatan bilangan negatif berikut yang menghasilkan bilangan negatif? (Pilih semua jawaban yang benar)",
    options: [
      "A. (-2) pangkat 3",
      "B. (-3) pangkat 2",
      "C. (-1) pangkat 5",
      "D. (-5) pangkat 4"
    ],
    correctAnswers: ["A", "C"]
  },

  // ================= BENAR / SALAH (5 Soal, masing-masing 3 pernyataan) =================
  {
    id: 16,
    type: "benar_salah",
    difficulty: "mudah",
    stimulus: "Apersepsi mengenai posisi bilangan bulat pada garis bilangan sangat penting. Titik nol adalah batas antara wilayah positif di sebelah kanan dan wilayah negatif di sebelah kiri. Aturan dasar garis bilangan menyatakan bahwa bilangan yang posisinya berada di sebelah kanan selalu bernilai lebih besar daripada bilangan di sebelah kirinya, berapapun angkanya.",
    questionText: "Tentukan kebenaran dari pernyataan-pernyataan berikut mengenai posisi dan nilai bilangan bulat!",
    statements: [
      { statement: "Bilangan -100 terletak di sebelah kanan -10 pada garis bilangan hizontal.", isCorrect: false },
      { statement: "Bilangan -3 bernilai lebih besar dari -8 karena posisinya lebih dekat ke nol.", isCorrect: true },
      { statement: "Bilangan bulat positif terkecil adalah angka 1.", isCorrect: true }
    ]
  },
  {
    id: 17,
    type: "benar_salah",
    difficulty: "sedang",
    stimulus: "Mari kita tinjau operasi pengurangan bilangan bulat. Operasi pengurangan a - b pada dasarnya dapat diubah menjadi operasi penjumlahan dengan lawan bilangan pengurang, yaitu a + (-b). Aturan ini sangat mempermudah kita ketika mengurangkan suatu bilangan negatif, misalnya a - (-b) yang berubah menjadi penjumlahan a + b.",
    questionText: "Ujilah kebenaran operasi hitung pengurangan bilangan bulat di bawah ini!",
    statements: [
      { statement: "Hasil dari 5 - (-3) adalah sama dengan hasil dari 5 + 3, yaitu 8.", isCorrect: true },
      { statement: "Hasil dari (-12) - 5 adalah -7.", isCorrect: false },
      { statement: "Mengurangkan bilangan bulat negatif dari suatu bilangan selalu menghasilkan bilangan positif.", isCorrect: false }
    ]
  },
  {
    id: 18,
    type: "benar_salah",
    difficulty: "sedang",
    stimulus: "Aturan distribusi atau Sifat Distributif perkalian terhadap penjumlahan ditulis: a x (b + c) = (a x b) + (a x c). Sifat ini sangat berguna dalam aritmetika mental untuk mempercepat perkalian bilangan besar atau menyederhanakan bentuk aljabar dasar. Mari kita buktikan konsistensi sifat distributif ini pada bilangan bulat.",
    questionText: "Tentukan apakah pernyataan mengenai sifat distributif berikut bernilai Benar atau Salah!",
    statements: [
      { statement: "Bentuk 4 x (10 + (-2)) bernilai sama dengan (4 x 10) + (4 x (-2)).", isCorrect: true },
      { statement: "Operasi (-3) x (5 - 2) menghasilkan nilai akhir -9.", isCorrect: true },
      { statement: "Sifat distributif hanya berlaku jika semua bilangannya bernilai positif.", isCorrect: false }
    ]
  },
  {
    id: 19,
    type: "benar_salah",
    difficulty: "sedang",
    stimulus: "Pembagian bilangan bulat merupakan operasi kebalikan (invers) dari perkalian. Ketika membagi suatu bilangan bulat, kita juga menerapkan aturan tanda yang sama dengan perkalian. Membagi bilangan bulat positif dengan bilangan bulat negatif menghasilkan bilangan bulat negatif. Namun, yang terpenting adalah pembagian dengan bilangan nol (0) tidak terdefinisi dalam matematika.",
    questionText: "Nyatakan Benar atau Salah pada pernyataan-pernyataan tentang operasi pembagian bilangan bulat berikut!",
    statements: [
      { statement: "Hasil dari (-36) : (-6) adalah bilangan bulat positif yaitu 6.", isCorrect: true },
      { statement: "Operasi pembagian 0 : (-5) hasilnya adalah tidak terdefinisi.", isCorrect: false },
      { statement: "Pembagian bilangan bulat positif dengan bilangan bulat negatif selalu menghasilkan pecahan.", isCorrect: false }
    ]
  },
  {
    id: 20,
    type: "benar_salah",
    difficulty: "sulit",
    stimulus: "Dalam operasi hitung campuran yang kompleks, penggunaan tanda kurung mengubah prioritas pengerjaan secara total. Berdasarkan hukum matematika, operasi di dalam tanda kurung harus dikerjakan paling awal, diikuti oleh pangkat, perkalian dan pembagian, dan terakhir penjumlahan dan pengurangan dari kiri ke kanan. Jika aturan ini diabaikan, maka hasil perhitungan pasti salah.",
    questionText: "Periksalah kebenaran hasil perhitungan campuran di bawah ini berdasarkan urutan operasi matematika!",
    statements: [
      { statement: "Hasil dari (-4) x (10 - 15) : 2 adalah 10.", isCorrect: true },
      { statement: "Hasil dari 50 - 10 : (-2) + (-5) adalah 50.", isCorrect: true },
      { statement: "Hasil dari (12 + 8) x (5 - 8) adalah -60.", isCorrect: true }
    ]
  },

  // ================= MENJODOHKAN (5 Soal, masing-masing 4 pernyataan) =================
  {
    id: 21,
    type: "menjodohkan",
    difficulty: "mudah",
    stimulus: "Sebagai siswa matematika, sangat penting untuk mengenali berbagai istilah dasar bilangan bulat dan posisinya dalam situasi riil. Berbagai kondisi di bumi seperti suhu pegunungan, kedalaman laut, nilai keuangan, dan arah melangkah dapat direpresentasikan menggunakan konsep bilangan bulat positif dan negatif.",
    questionText: "Jodohkanlah kondisi kontekstual di sebelah kiri dengan nilai representasi bilangan bulat yang tepat di sebelah kanan!",
    pairs: [
      { premise: "Suhu udara 10 derajat di bawah nol", response: "-10" },
      { premise: "Kedalaman 250 meter di bawah permukaan laut", response: "-250" },
      { premise: "Mendapatkan untung perdagangan Rp 50.000", response: "+50000" },
      { premise: "Mengalami rugi atau berhutang Rp 10.000", response: "-10000" }
    ],
    responseOptions: ["-10", "-250", "+50000", "-10000", "+10", "+250", "-50000"]
  },
  {
    id: 22,
    type: "menjodohkan",
    difficulty: "sedang",
    stimulus: "Mari berlatih menghitung nilai mutlak. Nilai mutlak dari suatu bilangan bulat, ditulis dengan simbol dua garis tegak |x|, adalah nilai non-negatif dari bilangan tersebut tanpa memedulikan tandanya. Secara geometris, ini menggambarkan jarak sesungguhnya bilangan tersebut dari titik nol pada garis bilangan.",
    questionText: "Jodohkanlah operasi nilai mutlak di sebelah kiri dengan nilai penyelesaiannya yang benar di sebelah kanan!",
    pairs: [
      { premise: "Nilai mutlak dari |-15|", response: "15" },
      { premise: "Hasil dari |8| - |-3|", response: "5" },
      { premise: "Hasil dari |-10| + |4|", response: "14" },
      { premise: "Nilai mutlak dari |0|", response: "0" }
    ],
    responseOptions: ["15", "5", "14", "0", "-15", "11", "8"]
  },
  {
    id: 23,
    type: "menjodohkan",
    difficulty: "sedang",
    stimulus: "Operasi hitung penjumlahan dan pengurangan bilangan bulat dapat diselesaikan secara cepat dengan memahami konsep hutang dan uang tunai. Bilangan negatif dianalogikan sebagai hutang yang dimiliki, sedangkan bilangan positif melambangkan kepemilikan uang tunai yang siap digunakan untuk melunasi hutang tersebut.",
    questionText: "Pasangkanlah operasi hitung penjumlahan di sebelah kiri dengan hasil jawabannya yang benar di sebelah kanan!",
    pairs: [
      { premise: "(-7) + (-5)", response: "-12" },
      { premise: "(-15) + 20", response: "5" },
      { premise: "12 + (-18)", response: "-6" },
      { premise: "(-9) + 9", response: "0" }
    ],
    responseOptions: ["-12", "5", "-6", "0", "12", "-3", "18"]
  },
  {
    id: 24,
    type: "menjodohkan",
    difficulty: "sedang",
    stimulus: "Perkalian bilangan bulat sering digunakan dalam pemodelan matematika sederhana. Tanda dari hasil perkalian sangat menentukan nilai akhir. Ingatlah bahwa perkalian bilangan ganjil dari faktor-faktor negatif akan menghasilkan bilangan negatif, sedangkan perkalian bilangan genap dari faktor-faktor negatif akan menghasilkan bilangan positif.",
    questionText: "Hubungkanlah soal perkalian bilangan bulat di sebelah kiri dengan jawaban yang sesuai di sebelah kanan!",
    pairs: [
      { premise: "(-3) x 7", response: "-21" },
      { premise: "(-5) x (-4)", response: "20" },
      { premise: "(-2) x (-2) x (-2)", response: "-8" },
      { premise: "6 x (-5)", response: "-30" }
    ],
    responseOptions: ["-21", "20", "-8", "-30", "21", "-20", "8", "30"]
  },
  {
    id: 25,
    type: "menjodohkan",
    difficulty: "sulit",
    stimulus: "Aplikasi operasi bilangan bulat dapat dikombinasikan dalam soal hitung campuran yang memerlukan ketelitian ekstra. Siswa harus mendahulukan perkalian dan pembagian sebelum beralih ke penjumlahan atau pengurangan, kecuali jika terdapat tanda kurung yang mengikat operasi tersebut.",
    questionText: "Jodohkanlah operasi hitung campuran di sebelah kiri dengan nilai hasil akhirnya di sebelah kanan!",
    pairs: [
      { premise: "(-10) + 40 : (-5)", response: "-18" },
      { premise: "(-8) x 3 + 10", response: "-14" },
      { premise: "(-100) : 25 x 4", response: "-16" },
      { premise: "(15 - 20) x (-3)", response: "15" }
    ],
    responseOptions: ["-18", "-16", "15", "-30", "30", "-14", "100"]
  }
];
