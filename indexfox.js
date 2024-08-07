import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chess, TennisBall, Code } from 'lucide-react';

const BackgroundImage = () => (
  <div className="fixed inset-0 z-0">
    <img src="/api/placeholder/1920/1080" alt="Nature background" className="w-full h-full object-cover" />
  </div>
);

const FloatingLeaf = ({ delay }) => (
  <motion.div
    className="absolute text-4xl"
    initial={{ y: -20, x: Math.random() * window.innerWidth }}
    animate={{ y: window.innerHeight + 20 }}
    transition={{ duration: 10, delay, repeat: Infinity, ease: "linear" }}
  >
    🍃
  </motion.div>
);

const HoverCard = ({ icon: Icon, title, content }) => (
  <motion.div
    className="bg-green-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-8 h-8 mb-2 text-green-600" />
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p>{content}</p>
  </motion.div>
);

const BacCalculator = () => {
  const [grade, setGrade] = useState('');
  const [result, setResult] = useState('');

  const calculateBac = () => {
    const numGrade = parseFloat(grade);
    if (isNaN(numGrade)) {
      setResult('Veuillez entrer une note valide');
    } else if (numGrade < 8) {
      setResult('Échec');
    } else if (numGrade < 10) {
      setResult('Rattrapage');
    } else if (numGrade < 12) {
      setResult('Passable');
    } else if (numGrade < 14) {
      setResult('Assez bien');
    } else if (numGrade < 16) {
      setResult('Bien');
    } else if (numGrade <= 20) {
      setResult('Très bien');
    } else {
      setResult('Note invalide');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Calculateur de mention au BAC</h3>
      <input
        type="number"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        placeholder="Entrez votre moyenne"
        className="border rounded px-2 py-1 mb-2"
      />
      <button onClick={calculateBac} className="bg-green-500 text-white px-4 py-2 rounded">
        Calculer
      </button>
      {result && <p className="mt-2">{result}</p>}
    </div>
  );
};

const App = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(Array.from({ length: 10 }, (_, i) => i * 0.5));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 relative overflow-hidden">
      <BackgroundImage />
      {leaves.map((delay, index) => (
        <FloatingLeaf key={index} delay={delay} />
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        <motion.h1
          className="text-6xl font-bold mb-8 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          MATHIS BOCHE
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <HoverCard icon={Chess} title="Échecs" content="Élo: 1772 F" />
          <HoverCard icon={TennisBall} title="Tennis" content="Meilleur classement: 15/4 (à 11 ans)" />
          <HoverCard icon={Code} title="Programmation" content="Passionné par l'IA" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BacCalculator />
        </motion.div>
      </div>
    </div>
  );
};

export default App;