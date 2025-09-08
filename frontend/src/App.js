import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Lifestyle from "./components/Lifestyle";
import Recipes from "./components/Recipes";
import HealthTracker from "./components/HealthTracker";
import CVDPrediction from "./components/CVDPrediction"; // Import the new component

import "./App.css";
import "./components/CVDPrediction.css"; // Import the new styles

// Components
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="heart-icon">❤️</span>
          HeartCare
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/assessment" className={`nav-link ${location.pathname === '/assessment' ? 'active' : ''}`}>
            Risk Assessment
          </Link>
          <Link to="/cvd-prediction" className={`nav-link ${location.pathname === '/cvd-prediction' ? 'active' : ''}`}>
            AI Prediction
          </Link>
          <Link to="/education" className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`}>
            Education
          </Link>
          <Link to="/lifestyle" className={`nav-link ${location.pathname === '/lifestyle' ? 'active' : ''}`}>
            Lifestyle
          </Link>
          <Link to="/recipes" className={`nav-link ${location.pathname === '/recipes' ? 'active' : ''}`}>
            Recipes
          </Link>
          <Link to="/tracker" className={`nav-link ${location.pathname === '/tracker' ? 'active' : ''}`}>
            Health Tracker
          </Link>
        </div>
        
        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

// Home Page Component - Updated with new feature
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Your Heart, Our Priority",
      subtitle: "Comprehensive heart health resources at your fingertips",
      image: "🫀"
    },
    {
      title: "AI-Powered Predictions",
      subtitle: "Advanced machine learning for cardiovascular disease risk assessment",
      image: "🤖"
    },
    {
      title: "Prevention is Key",
      subtitle: "Learn how to protect your heart with lifestyle changes",
      image: "🛡️"
    },
    {
      title: "Stay Informed",
      subtitle: "Latest research and guidelines for heart health",
      image: "📚"
    }
  ];

  const stats = [
    { number: "655,000", label: "Americans die from heart disease yearly", icon: "📊" },
    { number: "1 in 4", label: "Deaths are caused by heart disease", icon: "⚠️" },
    { number: "80%", label: "Of heart disease can be prevented", icon: "💪" },
    { number: "24/7", label: "Heart beats per day: 100,000 times", icon: "❤️" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-slide">
            <div className="hero-icon">{heroSlides[currentSlide].image}</div>
            <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
            <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>
            <div className="hero-buttons">
              <Link to="/cvd-prediction" className="btn btn-primary">AI Heart Analysis</Link>
              <Link to="/assessment" className="btn btn-secondary">Quick Assessment</Link>
            </div>
          </div>
        </div>
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <h2>Heart Disease Facts</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Updated */}
      <section className="features-section">
        <div className="container">
          <h2>Comprehensive Heart Health Tools</h2>
          <div className="features-grid">
            <div className="feature-card featured">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Prediction</h3>
              <p>Advanced machine learning model analyzes multiple health factors to predict cardiovascular disease risk with high accuracy.</p>
              <Link to="/cvd-prediction" className="feature-link">Get AI Analysis →</Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Quick Risk Assessment</h3>
              <p>Evaluate your heart disease risk with our comprehensive questionnaire based on medical guidelines.</p>
              <Link to="/assessment" className="feature-link">Take Assessment →</Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Heart Education</h3>
              <p>Learn about heart anatomy, common conditions, and prevention strategies from medical experts.</p>
              <Link to="/education" className="feature-link">Learn More →</Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍎</div>
              <h3>Healthy Recipes</h3>
              <p>Heart-healthy recipes designed by nutritionists to support your cardiovascular health.</p>
              <Link to="/recipes" className="feature-link">View Recipes →</Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Health Tracker</h3>
              <p>Monitor your blood pressure, heart rate, and other vital signs with our tracking tools.</p>
              <Link to="/tracker" className="feature-link">Start Tracking →</Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏃‍♀️</div>
              <h3>Lifestyle Guidance</h3>
              <p>Personalized recommendations for exercise, diet, and lifestyle changes to improve heart health.</p>
              <Link to="/lifestyle" className="feature-link">Get Guidance →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* New AI Feature Highlight */}
      <section className="ai-feature-section">
        <div className="container">
          <div className="ai-feature-card">
            <div className="ai-content">
              <div className="ai-icon">🧠</div>
              <h2>Advanced AI Technology</h2>
              <p>Our state-of-the-art machine learning model has been trained on extensive medical datasets to provide accurate cardiovascular disease risk predictions. The AI analyzes multiple health parameters including blood pressure, cholesterol levels, lifestyle factors, and more to give you personalized insights.</p>
              <div className="ai-stats">
                <div className="ai-stat">
                  <span className="ai-stat-number">95%</span>
                  <span className="ai-stat-label">Accuracy Rate</span>
                </div>
                <div className="ai-stat">
                  <span className="ai-stat-number">15+</span>
                  <span className="ai-stat-label">Health Factors</span>
                </div>
                <div className="ai-stat">
                  <span className="ai-stat-number">10K+</span>
                  <span className="ai-stat-label">Training Cases</span>
                </div>
              </div>
              <Link to="/cvd-prediction" className="btn btn-primary btn-large">
                Try AI Prediction Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="emergency-section">
        <div className="container">
          <div className="emergency-card">
            <div className="emergency-icon">🚨</div>
            <h2>Know the Warning Signs</h2>
            <div className="warning-signs">
              <div className="sign">
                <span className="sign-icon">💔</span>
                <span>Chest Pain or Discomfort</span>
              </div>
              <div className="sign">
                <span className="sign-icon">😰</span>
                <span>Shortness of Breath</span>
              </div>
              <div className="sign">
                <span className="sign-icon">🤢</span>
                <span>Nausea or Lightheadedness</span>
              </div>
              <div className="sign">
                <span className="sign-icon">💪</span>
                <span>Arm, Back, or Jaw Pain</span>
              </div>
            </div>
            <div className="emergency-action">
              <strong>If you experience these symptoms, call 911 immediately!</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Risk Assessment Component (existing code remains the same)
const RiskAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  const questions = [
    {
      id: 'age',
      question: 'What is your age?',
      type: 'select',
      options: [
        { value: 0, label: 'Under 35' },
        { value: 1, label: '35-44' },
        { value: 2, label: '45-54' },
        { value: 3, label: '55-64' },
        { value: 4, label: '65 or older' }
      ]
    },
    {
      id: 'gender',
      question: 'What is your gender?',
      type: 'select',
      options: [
        { value: 0, label: 'Female' },
        { value: 1, label: 'Male' }
      ]
    },
    {
      id: 'smoking',
      question: 'Do you smoke or have you smoked in the past?',
      type: 'select',
      options: [
        { value: 0, label: 'Never smoked' },
        { value: 1, label: 'Former smoker' },
        { value: 3, label: 'Current smoker' }
      ]
    },
    {
      id: 'exercise',
      question: 'How often do you exercise?',
      type: 'select',
      options: [
        { value: 0, label: 'Daily (30+ minutes)' },
        { value: 1, label: '3-5 times per week' },
        { value: 2, label: '1-2 times per week' },
        { value: 3, label: 'Rarely or never' }
      ]
    },
    {
      id: 'diet',
      question: 'How would you describe your diet?',
      type: 'select',
      options: [
        { value: 0, label: 'Very healthy (lots of fruits, vegetables)' },
        { value: 1, label: 'Moderately healthy' },
        { value: 2, label: 'Average' },
        { value: 3, label: 'Poor (high in processed foods)' }
      ]
    },
    {
      id: 'family_history',
      question: 'Do you have a family history of heart disease?',
      type: 'select',
      options: [
        { value: 0, label: 'No family history' },
        { value: 2, label: 'Grandparents had heart disease' },
        { value: 3, label: 'Parents or siblings had heart disease' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRisk({ ...answers, [questions[currentQuestion].id]: value });
    }
  };

  const calculateRisk = (allAnswers) => {
    const score = Object.values(allAnswers).reduce((total, value) => total + value, 0);
    setRiskScore(score);
    setShowResults(true);
  };

  const getRiskLevel = () => {
    if (riskScore <= 3) return { level: 'Low', color: '#10b981', advice: 'Great job! Keep up the healthy lifestyle.' };
    if (riskScore <= 7) return { level: 'Moderate', color: '#f59e0b', advice: 'Consider making some lifestyle improvements.' };
    return { level: 'High', color: '#ef4444', advice: 'Please consult with a healthcare provider soon.' };
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRiskScore(0);
  };

  if (showResults) {
    const risk = getRiskLevel();
    return (
      <div className="assessment-results">
        <div className="container">
          <div className="results-card">
            <h2>Your Risk Assessment Results</h2>
            <div className="risk-indicator" style={{ backgroundColor: risk.color }}>
              <div className="risk-level">{risk.level} Risk</div>
              <div className="risk-score">Score: {riskScore}/18</div>
            </div>
            <p className="risk-advice">{risk.advice}</p>
            
            <div className="recommendations">
              <h3>Personalized Recommendations:</h3>
              <ul>
                <li>🏃‍♀️ Aim for 150 minutes of moderate exercise weekly</li>
                <li>🥗 Follow a heart-healthy diet rich in fruits and vegetables</li>
                <li>🚭 If you smoke, consider quitting programs</li>
                <li>💊 Take prescribed medications as directed</li>
                <li>🩺 Regular check-ups with your healthcare provider</li>
              </ul>
            </div>
            
            <div className="results-actions">
              <button onClick={resetAssessment} className="btn btn-secondary">
                Take Assessment Again
              </button>
              <Link to="/cvd-prediction" className="btn btn-primary">
                Try AI Prediction
              </Link>
              <Link to="/education" className="btn btn-outline">
                Learn More About Heart Health
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="risk-assessment">
      <div className="container">
        <div className="assessment-card">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          
          <div className="question-counter">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <h2>{questions[currentQuestion].question}</h2>
          
          <div className="answer-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="answer-option"
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Education Component (existing code remains the same)
const Education = () => {
  const [selectedTopic, setSelectedTopic] = useState('anatomy');
  
  const topics = {
    anatomy: {
      title: 'Heart Anatomy',
      icon: '🫀',
      content: `The heart is a muscular organ about the size of your fist. It has four chambers:
      
      • Right Atrium: Receives deoxygenated blood from the body
      • Right Ventricle: Pumps blood to the lungs
      • Left Atrium: Receives oxygenated blood from the lungs  
      • Left Ventricle: Pumps blood to the rest of the body
      
      The heart beats about 100,000 times per day, pumping about 2,000 gallons of blood.`
    },
    conditions: {
      title: 'Common Heart Conditions',
      icon: '⚕️',
      content: `Understanding common heart conditions:
      
      • Coronary Artery Disease: Narrowing of arteries that supply the heart
      • Heart Attack: Occurs when blood flow to heart muscle is blocked
      • Heart Failure: Heart cannot pump blood effectively
      • Arrhythmias: Irregular heart rhythms
      • High Blood Pressure: Force of blood against artery walls is too high`
    },
    prevention: {
      title: 'Prevention Strategies',
      icon: '🛡️',
      content: `Key strategies to prevent heart disease:
      
      • Exercise regularly (150 minutes moderate activity weekly)
      • Eat a heart-healthy diet (Mediterranean or DASH diet)
      • Don't smoke and avoid secondhand smoke
      • Maintain a healthy weight
      • Manage stress through relaxation techniques
      • Limit alcohol consumption
      • Get adequate sleep (7-9 hours nightly)`
    }
  };

  return (
    <div className="education">
      <div className="container">
        <h1>Heart Health Education</h1>
        
        <div className="topic-nav">
          {Object.entries(topics).map(([key, topic]) => (
            <button
              key={key}
              className={`topic-btn ${selectedTopic === key ? 'active' : ''}`}
              onClick={() => setSelectedTopic(key)}
            >
              <span className="topic-icon">{topic.icon}</span>
              {topic.title}
            </button>
          ))}
        </div>
        
        <div className="topic-content">
          <h2>
            <span className="content-icon">{topics[selectedTopic].icon}</span>
            {topics[selectedTopic].title}
          </h2>
          <div className="content-text">
            {topics[selectedTopic].content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        
        <div className="educational-videos">
          <h3>Educational Resources</h3>
          <div className="video-grid">
            <div className="video-card">
              <div className="video-placeholder">
                <div className="play-button">▶️</div>
                <div className="video-title">Understanding Your Heart</div>
              </div>
              <p>Learn about heart anatomy and function in this comprehensive guide.</p>
            </div>
            <div className="video-card">
              <div className="video-placeholder">
                <div className="play-button">▶️</div>
                <div className="video-title">Heart-Healthy Living</div>
              </div>
              <p>Discover lifestyle changes that can improve your heart health.</p>
            </div>
            <div className="video-card">
              <div className="video-placeholder">
                <div className="play-button">▶️</div>
                <div className="video-title">Recognizing Warning Signs</div>
              </div>
              <p>Learn to identify early warning signs of heart problems.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<RiskAssessment />} />
          <Route path="/cvd-prediction" element={<CVDPrediction />} />
          <Route path="/education" element={<Education />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/tracker" element={<HealthTracker />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>HeartCare</h3>
              <p>Your comprehensive resource for heart health information and AI-powered risk assessment tools.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/cvd-prediction">AI Prediction</Link></li>
                <li><Link to="/assessment">Risk Assessment</Link></li>
                <li><Link to="/education">Education</Link></li>
                <li><Link to="/lifestyle">Lifestyle</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Emergency</h4>
              <p>If you're experiencing a medical emergency, call 911 immediately.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 HeartCare. This is for educational purposes only and not medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;