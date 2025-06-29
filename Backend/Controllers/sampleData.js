const questions = {
  title: "Mathematics Practice",
  description: "A set of 12 moderately challenging math questions to improve problem-solving skills.",
  category: "mathematics",
  time: 20,
  difficulty : "Easy",
  questions: [
    {
      question: "What is the value of (3² + 4²)?",
      options: ["12", "25", "9", "7"],
      answer: "B",
      explanation: "3² = 9, 4² = 16, so 9 + 16 = 25."
    },
    {
      question: "Simplify: (5 + 3) × 2 - 4 ÷ 2",
      options: ["14", "12", "16", "10"],
      answer: "A",
      explanation: "8 × 2 = 16, 4 ÷ 2 = 2, so 16 - 2 = 14."
    },
    {
      question: "Find the HCF of 36 and 60.",
      options: ["12", "18", "24", "6"],
      answer: "A",
      explanation: "Factors of 36: 1,2,3,6,12,18,36; of 60: 1,2,3,4,5,6,10,12,... → HCF = 12."
    },
    {
      question: "What is 20% of 250?",
      options: ["25", "50", "45", "60"],
      answer: "B",
      explanation: "20% of 250 = (20/100) × 250 = 50."
    },
    {
      question: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      answer: "C",
      explanation: "12 × 12 = 144."
    },
    {
      question: "Solve: (2x - 3 = 7). Find x.",
      options: ["2", "5", "3", "7"],
      answer: "B",
      explanation: "2x = 10 → x = 5."
    },
    {
      question: "Find the value of x: 5x + 2 = 3x + 10",
      options: ["4", "5", "3", "6"],
      answer: "A",
      explanation: "5x - 3x = 10 - 2 → 2x = 8 → x = 4."
    },
    {
      question: "A rectangle has length 10 cm and breadth 4 cm. Find its area.",
      options: ["40 cm²", "14 cm²", "20 cm²", "28 cm²"],
      answer: "A",
      explanation: "Area = length × breadth = 10 × 4 = 40 cm²."
    },
    {
      question: "What is the value of π (pi) approximately?",
      options: ["3.142", "3.41", "3.001", "3.33"],
      answer: "A",
      explanation: "Pi (π) is approximately 3.142."
    },
    {
      question: "A shopkeeper bought an item for ₹500 and sold it for ₹600. Find the profit percent.",
      options: ["10%", "20%", "25%", "15%"],
      answer: "B",
      explanation: "Profit = ₹100; (100/500) × 100 = 20%."
    },
    {
      question: "Convert 0.75 into a fraction.",
      options: ["1/4", "3/4", "2/5", "1/2"],
      answer: "B",
      explanation: "0.75 = 75/100 = 3/4."
    },
    {
      question: "What is the LCM of 8 and 12?",
      options: ["24", "16", "36", "12"],
      answer: "A",
      explanation: "Multiples of 8: 8, 16, 24... of 12: 12, 24... → LCM = 24."
    }
  ]
}

const questions1 = {
  title: "Chemistry Practice",
  description: "Fundamental questions on chemical reactions, elements, periodic table, and acids-bases.",
  category: "chemistry",
  difficulty : "Intermediate",
  time: 20,
  questions: [
    {
      question: "What is the chemical formula of water?",
      options: ["CO₂", "H₂O", "O₂", "H₂O₂"],
      answer: "B",
      explanation: "Water is made of two hydrogen atoms and one oxygen atom."
    },
    {
      question: "Which element is used in pencils?",
      options: ["Carbon", "Graphite", "Lead", "Zinc"],
      answer: "B",
      explanation: "Pencils contain graphite, a form of carbon."
    },
    {
      question: "What is the pH of a neutral solution?",
      options: ["0", "7", "14", "1"],
      answer: "B",
      explanation: "A neutral solution has a pH of 7 (like pure water)."
    },
    {
      question: "Which gas is used for respiration by humans?",
      options: ["Carbon dioxide", "Oxygen", "Hydrogen", "Nitrogen"],
      answer: "B",
      explanation: "Oxygen is essential for cellular respiration."
    },
    {
      question: "Which acid is found in lemon?",
      options: ["Hydrochloric acid", "Acetic acid", "Citric acid", "Sulfuric acid"],
      answer: "C",
      explanation: "Lemon juice contains citric acid, giving it a sour taste."
    },
    {
      question: "Which metal is liquid at room temperature?",
      options: ["Iron", "Mercury", "Aluminium", "Zinc"],
      answer: "B",
      explanation: "Mercury is the only metal that is liquid at room temperature."
    },
    {
      question: "What is the atomic number of carbon?",
      options: ["12", "6", "8", "16"],
      answer: "B",
      explanation: "Carbon has 6 protons in its nucleus, hence atomic number 6."
    },
    {
      question: "NaCl is commonly known as?",
      options: ["Baking soda", "Bleaching powder", "Table salt", "Washing soda"],
      answer: "C",
      explanation: "NaCl is common table salt."
    },
    {
      question: "Which element is a noble gas?",
      options: ["Oxygen", "Nitrogen", "Neon", "Hydrogen"],
      answer: "C",
      explanation: "Neon is a noble gas found in Group 18 of the periodic table."
    },
    {
      question: "Which substance turns blue litmus red?",
      options: ["Base", "Salt", "Acid", "Water"],
      answer: "C",
      explanation: "Acids turn blue litmus paper red."
    },
    {
      question: "Which gas is produced during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      answer: "A",
      explanation: "Oxygen is a by-product of photosynthesis."
    },
    {
      question: "Which of the following is not a metal?",
      options: ["Iron", "Copper", "Sulphur", "Zinc"],
      answer: "C",
      explanation: "Sulphur is a non-metal."
    },
    {
      question: "The atomic number of an element gives the number of:",
      options: ["Neutrons", "Electrons", "Protons", "Both B and C"],
      answer: "D",
      explanation: "Atomic number = number of protons = number of electrons in neutral atoms."
    },
    {
      question: "Which element is used in making matchstick heads?",
      options: ["Phosphorus", "Chlorine", "Calcium", "Zinc"],
      answer: "A",
      explanation: "Matchstick heads contain red phosphorus."
    },
    {
      question: "Which metal is most reactive?",
      options: ["Copper", "Silver", "Potassium", "Gold"],
      answer: "C",
      explanation: "Potassium is highly reactive and stored in kerosene."
    }
  ]
}

const questions2 = {
  title: "History Quiz",
  description: "A collection of questions from ancient, medieval, and modern Indian and world history.",
  category: "history",
  difficulty : "Intermediate",
  time: 20,
  questions: [
    {
      question: "Who was the first President of independent India?",
      options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Mahatma Gandhi", "Sardar Patel"],
      answer: "B",
      explanation: "Dr. Rajendra Prasad became the first President of India in 1950."
    },
    {
      question: "In which year did the Battle of Plassey take place?",
      options: ["1757", "1857", "1805", "1761"],
      answer: "A",
      explanation: "The Battle of Plassey was fought in 1757 between the British and Nawab Siraj-ud-Daulah."
    },
    {
      question: "Who founded the Maurya Empire?",
      options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"],
      answer: "B",
      explanation: "Chandragupta Maurya established the Maurya Empire in 321 BCE."
    },
    {
      question: "Who wrote the book *Discovery of India*?",
      options: ["B. R. Ambedkar", "Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose"],
      answer: "C",
      explanation: "Jawaharlal Nehru wrote this book while in prison in 1942."
    },
    {
      question: "Which Mughal emperor built the Taj Mahal?",
      options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
      answer: "C",
      explanation: "Shah Jahan built the Taj Mahal in memory of his wife Mumtaz Mahal."
    },
    {
      question: "What was the capital of the Vijayanagara Empire?",
      options: ["Bijapur", "Hampi", "Madurai", "Delhi"],
      answer: "B",
      explanation: "Hampi was the flourishing capital of the Vijayanagara Empire."
    },
    {
      question: "In which year did India gain independence?",
      options: ["1945", "1946", "1947", "1950"],
      answer: "C",
      explanation: "India became independent on August 15, 1947."
    },
    {
      question: "Who was the founder of the Indian National Congress?",
      options: ["Mahatma Gandhi", "A. O. Hume", "Dadabhai Naoroji", "Bal Gangadhar Tilak"],
      answer: "B",
      explanation: "A. O. Hume, a retired British civil servant, founded INC in 1885."
    },
    {
      question: "Which movement is associated with the slogan 'Do or Die'?",
      options: ["Non-Cooperation", "Civil Disobedience", "Quit India", "Swadeshi"],
      answer: "C",
      explanation: "The Quit India Movement of 1942 used the slogan 'Do or Die'."
    },
    {
      question: "Who was the last Governor-General of independent India?",
      options: ["Lord Mountbatten", "C. Rajagopalachari", "Jawaharlal Nehru", "Sardar Patel"],
      answer: "B",
      explanation: "C. Rajagopalachari succeeded Mountbatten as the last Governor-General."
    },
    {
      question: "Who discovered the sea route to India?",
      options: ["Marco Polo", "Ferdinand Magellan", "Christopher Columbus", "Vasco da Gama"],
      answer: "D",
      explanation: "Vasco da Gama reached Calicut in 1498, discovering the sea route to India."
    },
    {
      question: "Which ancient Indian text is considered a treatise on statecraft?",
      options: ["Rigveda", "Arthashastra", "Manusmriti", "Mahabharata"],
      answer: "B",
      explanation: "Arthashastra, by Chanakya, is a treatise on politics and economics."
    },
    {
      question: "What was the main cause of the Revolt of 1857?",
      options: ["Land Revenue System", "Social Reforms", "Religious Policy", "Introduction of greased cartridges"],
      answer: "D",
      explanation: "Greased cartridges offended both Hindus and Muslims, sparking the revolt."
    },
    {
      question: "Who was the founder of the Sikh religion?",
      options: ["Guru Arjan Dev", "Guru Nanak Dev", "Guru Gobind Singh", "Guru Teg Bahadur"],
      answer: "B",
      explanation: "Guru Nanak Dev founded Sikhism in the 15th century."
    },
    {
      question: "Which treaty ended the First World War?",
      options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of London"],
      answer: "B",
      explanation: "The Treaty of Versailles was signed in 1919, officially ending WWI."
    }
  ]
}