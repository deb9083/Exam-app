'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Brain, BookOpen, Clock, Download, Share2, BarChart3, CheckCircle, Circle, Smartphone } from 'lucide-react';

const ExamTopicPrioritizer = () => {
  const [activeTab, setActiveTab] = useState('prioritizer');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analyzedTopics, setAnalyzedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // PWA Install functionality
  useEffect(() => {
    const handler = (e: React.MouseEvent) => {
        e.preventDefault();
        setDefersoftroot(e);
        setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallButton(false);
      }
    }
  };

  // Mock data for demonstration
  const sampleTopics = [
    { 
      id: 1, 
      name: 'Calculus - Derivatives', 
      priority: 'High', 
      frequency: 85, 
      lastAppeared: '2023, 2022, 2021',
      summary: 'Fundamental concept in calculus dealing with rates of change and slopes of curves.',
      keyPoints: ['Chain rule', 'Product rule', 'Quotient rule', 'Implicit differentiation'],
      formulas: ['d/dx(xⁿ) = nxⁿ⁻¹', 'd/dx(sin x) = cos x', 'd/dx(eˣ) = eˣ'],
      mnemonics: 'Remember SOHCAHTOA for trig derivatives'
    },
    { 
      id: 2, 
      name: 'Linear Algebra - Matrices', 
      priority: 'High', 
      frequency: 78, 
      lastAppeared: '2023, 2021, 2020',
      summary: 'Mathematical structures for linear transformations and systems of equations.',
      keyPoints: ['Matrix multiplication', 'Determinants', 'Inverse matrices', 'Eigenvalues'],
      formulas: ['det(A) = ad - bc (2x2)', '(AB)⁻¹ = B⁻¹A⁻¹'],
      mnemonics: 'RREF = Row Reduce to Echelon Form'
    },
    { 
      id: 3, 
      name: 'Statistics - Hypothesis Testing', 
      priority: 'Medium', 
      frequency: 62, 
      lastAppeared: '2022, 2020, 2019',
      summary: 'Method for making statistical decisions using experimental data.',
      keyPoints: ['Null hypothesis', 'P-values', 'Type I/II errors', 'Confidence intervals'],
      formulas: ['Z = (x̄ - μ)/(σ/√n)', 't = (x̄ - μ)/(s/√n)'],
      mnemonics: 'Null hypothesis is what you want to NULLIFY'
    },
    { 
      id: 4, 
      name: 'Probability - Conditional Probability', 
      priority: 'Medium', 
      frequency: 55, 
      lastAppeared: '2023, 2019, 2018',
      summary: 'Probability of an event occurring given that another event has occurred.',
      keyPoints: ['Bayes theorem', 'Independence', 'Conditional probability formula'],
      formulas: ['P(A|B) = P(A∩B)/P(B)', 'P(A|B) = P(B|A)P(A)/P(B)'],
      mnemonics: 'BAYES: Before Any Yearning, Examine Statistics'
    },
    { 
      id: 5, 
      name: 'Geometry - Circle Theorems', 
      priority: 'Low', 
      frequency: 35, 
      lastAppeared: '2021, 2018, 2017',
      summary: 'Properties and relationships involving circles and their components.',
      keyPoints: ['Inscribed angles', 'Central angles', 'Tangent properties'],
      formulas: ['C = 2πr', 'A = πr²', 'Arc length = rθ'],
      mnemonics: 'Circles are ROUND: Radius, Origin, Understanding, Never-ending, Diameter'
    }
  ];

  const sampleQuiz = [
    {
      question: "What is the derivative of x³?",
      options: ["3x²", "x²", "3x", "x³"],
      correct: 0,
      explanation: "Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x²"
    },
    {
      question: "Which rule is used for differentiating f(g(x))?",
      options: ["Product rule", "Quotient rule", "Chain rule", "Power rule"],
      correct: 2,
      explanation: "The chain rule is used when differentiating composite functions like f(g(x))"
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzedTopics(sampleTopics);
    }, 2000);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const startQuiz = (topic) => {
    setSelectedTopic(topic);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
  };

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === sampleQuiz[currentQuestionIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex + 1 < sampleQuiz.length) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        setQuizStarted(false);
        alert(`Quiz completed! Score: ${quizScore + (answerIndex === sampleQuiz[currentQuestionIndex].correct ? 1 : 0)}/${sampleQuiz.length}`);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📚 Exam Topic Prioritizer
            </h1>
            {showInstallButton && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg"
              >
                <Smartphone size={16} />
                Install App
              </button>
            )}
          </div>
          <p className="text-gray-600 text-base md:text-lg">Your Smart Exam Companion - Study Smarter, Not Harder</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-8 bg-white rounded-lg p-2 shadow-sm overflow-x-auto">
          {[
            { id: 'prioritizer', icon: BarChart3, label: 'Prioritizer', shortLabel: 'Priority' },
            { id: 'revision', icon: BookOpen, label: 'AI Revision', shortLabel: 'Revision' },
            { id: 'quiz', icon: Brain, label: 'Quick Quiz', shortLabel: 'Quiz' },
            { id: 'planner', icon: Clock, label: 'Study Planner', shortLabel: 'Planner' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg transition-all text-sm md:text-base whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'prioritizer' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Upload className="text-blue-500" />
                Upload Your Materials
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-gray-500 mb-2">
                    <Upload size={48} className="mx-auto mb-2" />
                    <p className="text-lg">Click to upload syllabus & past papers</p>
                    <p className="text-sm">PDF, DOC, DOCX files supported</p>
                  </div>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="text-green-500" size={16} />
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {analyzedTopics.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 AI Analysis Results</h2>
                
                <div className="grid gap-4">
                  {analyzedTopics.map(topic => (
                    <div key={topic.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">{topic.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(topic.priority)}`}>
                            {topic.priority} Priority
                          </span>
                          <span className="text-sm text-gray-600">{topic.frequency}% frequency</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{topic.summary}</p>
                      <p className="text-sm text-gray-500">Last appeared: {topic.lastAppeared}</p>
                      
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => setActiveTab('revision')}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          📖 Get Revision Notes
                        </button>
                        <button 
                          onClick={() => startQuiz(topic)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          🧠 Take Quiz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'revision' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="text-blue-500" />
              AI Revision Maker
            </h2>

            {analyzedTopics.length > 0 ? (
              <div className="grid gap-6">
                {analyzedTopics.slice(0, 3).map(topic => (
                  <div key={topic.id} className="border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-xl font-semibold">{topic.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(topic.priority)}`}>
                        {topic.priority}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">📋 Key Points</h4>
                        <ul className="space-y-1">
                          {topic.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Circle size={6} className="text-blue-500 fill-current" />
                              {point}
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-semibold text-gray-700 mb-2 mt-4">📐 Important Formulas</h4>
                        <div className="space-y-1">
                          {topic.formulas.map((formula, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded text-sm font-mono">
                              {formula}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">🧠 Memory Tricks</h4>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm">{topic.mnemonics}</p>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                            <Download size={16} />
                            Export PDF
                          </button>
                          <button className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                            <Share2 size={16} />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Upload your materials first to generate AI revision notes</p>
                <button 
                  onClick={() => setActiveTab('prioritizer')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Go to Topic Prioritizer
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Brain className="text-purple-500" />
              Quick Exam Quiz
            </h2>

            {!quizStarted ? (
              <div>
                {analyzedTopics.length > 0 ? (
                  <div className="grid gap-4">
                    <p className="text-gray-600 mb-4">Select a topic to start your quiz:</p>
                    {analyzedTopics.map(topic => (
                      <div key={topic.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h3 className="font-semibold">{topic.name}</h3>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(topic.priority)}`}>
                            {topic.priority} Priority
                          </span>
                        </div>
                        <button 
                          onClick={() => startQuiz(topic)}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                          Start Quiz 🚀
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Upload your materials first to generate custom quizzes</p>
                    <button 
                      onClick={() => setActiveTab('prioritizer')}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Go to Topic Prioritizer
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Quiz: {selectedTopic?.name}</h3>
                    <span className="text-sm text-gray-500">
                      Question {currentQuestionIndex + 1} of {sampleQuiz.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / sampleQuiz.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-medium mb-4">
                    {sampleQuiz[currentQuestionIndex].question}
                  </h4>
                  <div className="space-y-3">
                    {sampleQuiz[currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={selectedAnswer !== ''}
                        className={`w-full p-3 text-left rounded-lg border transition-all ${
                          selectedAnswer === '' 
                            ? 'hover:bg-blue-50 hover:border-blue-300' 
                            : selectedAnswer === index
                              ? index === sampleQuiz[currentQuestionIndex].correct
                                ? 'bg-green-100 border-green-300 text-green-800'
                                : 'bg-red-100 border-red-300 text-red-800'
                              : index === sampleQuiz[currentQuestionIndex].correct
                                ? 'bg-green-100 border-green-300 text-green-800'
                                : 'bg-gray-100 border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {selectedAnswer !== '' && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {sampleQuiz[currentQuestionIndex].explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="text-orange-500" />
              Smart Study Planner
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">📅 Your Study Schedule</h3>
                <div className="space-y-3">
                  {analyzedTopics.slice(0, 5).map((topic, index) => (
                    <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{topic.name}</p>
                        <p className="text-sm text-gray-600">Day {index + 1} • 2 hours recommended</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(topic.priority)}`}>
                        {topic.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">⚙️ Customize Your Plan</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Study hours per day
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="8" 
                      defaultValue="4" 
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>1hr</span>
                      <span>8hrs</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days until exam
                    </label>
                    <input 
                      type="number" 
                      defaultValue="14" 
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Focus on
                    </label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>High priority topics first</option>
                      <option>Balanced approach</option>
                      <option>Weak areas first</option>
                    </select>
                  </div>

                  <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
                    Generate Custom Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamTopicPrioritizer;