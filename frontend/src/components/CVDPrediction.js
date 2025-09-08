import React, { useState } from 'react';
import axios from 'axios';

const CVDPrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '',
    gluc: '',
    smoke: '',
    alco: '',
    active: '',
    country: 'India',
    occupation: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = formData.height / 100;
      const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);
      return bmi;
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3b82f6' };
    if (bmi < 25) return { category: 'Normal', color: '#10b981' };
    if (bmi < 30) return { category: 'Overweight', color: '#f59e0b' };
    return { category: 'Obese', color: '#ef4444' };
  };

  const validateForm = () => {
    const requiredFields = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active'];
    return requiredFields.every(field => formData[field] !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert form data to match API expectations
      const apiData = {
        date: new Date().toISOString().split('T')[0],
        country: formData.country,
        id: Date.now(), // Generate unique ID
        active: parseInt(formData.active),
        age: parseInt(formData.age),
        alco: parseInt(formData.alco),
        ap_hi: parseInt(formData.ap_hi),
        ap_lo: parseInt(formData.ap_lo),
        cholesterol: parseInt(formData.cholesterol),
        gender: parseInt(formData.gender),
        gluc: parseInt(formData.gluc),
        height: parseInt(formData.height),
        occupation: formData.occupation || 'Not specified',
        smoke: parseInt(formData.smoke),
        weight: parseInt(formData.weight)
      };

      const response = await axios.post('/predict', apiData);
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while making the prediction');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: '',
      gender: '',
      height: '',
      weight: '',
      ap_hi: '',
      ap_lo: '',
      cholesterol: '',
      gluc: '',
      smoke: '',
      alco: '',
      active: '',
      country: 'India',
      occupation: ''
    });
    setPrediction(null);
    setError(null);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (prediction) {
    const isPositive = prediction.prediction === 1;
    const bmi = calculateBMI();
    const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

    return (
      <div className="cvd-prediction">
        <div className="container">
          <div className="prediction-results">
            <div className={`result-card ${isPositive ? 'high-risk' : 'low-risk'}`}>
              <div className="result-header">
                <div className="result-icon">
                  {isPositive ? '⚠️' : '✅'}
                </div>
                <h2>Prediction Results</h2>
              </div>

              <div className="result-main">
                <div className={`risk-indicator ${isPositive ? 'high' : 'low'}`}>
                  <div className="risk-status">
                    {prediction.message}
                  </div>
                  <div className="confidence-score">
                    Risk Level: {isPositive ? 'HIGH' : 'LOW'}
                  </div>
                </div>

                {bmi && (
                  <div className="health-metrics">
                    <h3>Your Health Metrics</h3>
                    <div className="metrics-grid">
                      <div className="metric">
                        <span className="metric-label">BMI</span>
                        <span className="metric-value">{bmi}</span>
                        <span 
                          className="metric-category" 
                          style={{ color: bmiInfo.color }}
                        >
                          {bmiInfo.category}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Blood Pressure</span>
                        <span className="metric-value">
                          {formData.ap_hi}/{formData.ap_lo}
                        </span>
                        <span className="metric-category">
                          {parseInt(formData.ap_hi) > 140 || parseInt(formData.ap_lo) > 90 ? 'High' : 'Normal'}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Age Group</span>
                        <span className="metric-value">{formData.age} years</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="recommendations">
                  <h3>Personalized Recommendations</h3>
                  <div className="recommendation-list">
                    {isPositive ? (
                      <>
                        <div className="recommendation urgent">
                          <span className="rec-icon">🩺</span>
                          <span>Consult with a healthcare provider immediately</span>
                        </div>
                        <div className="recommendation">
                          <span className="rec-icon">💊</span>
                          <span>Discuss medication options with your doctor</span>
                        </div>
                        <div className="recommendation">
                          <span className="rec-icon">🏃‍♀️</span>
                          <span>Start a supervised exercise program</span>
                        </div>
                        <div className="recommendation">
                          <span className="rec-icon">🥗</span>
                          <span>Follow a strict heart-healthy diet</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="recommendation">
                          <span className="rec-icon">✅</span>
                          <span>Maintain your current healthy lifestyle</span>
                        </div>
                        <div className="recommendation">
                          <span className="rec-icon">🏃‍♀️</span>
                          <span>Continue regular physical activity</span>
                        </div>
                        <div className="recommendation">
                          <span className="rec-icon">🩺</span>
                          <span>Schedule regular check-ups</span>
                        </div>
                        <div className="recommendation">
                          <span className="rec-icon">🥗</span>
                          <span>Maintain a balanced, heart-healthy diet</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="disclaimer">
                  <p><strong>Important:</strong> This prediction is for educational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for accurate diagnosis and treatment.</p>
                </div>

                <div className="result-actions">
                  <button onClick={resetForm} className="btn btn-secondary">
                    Take Another Assessment
                  </button>
                  <button 
                    onClick={() => window.print()} 
                    className="btn btn-outline"
                  >
                    Print Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cvd-prediction">
      <div className="container">
        <div className="prediction-header">
          <h1>Advanced Cardiovascular Disease Prediction</h1>
          <p>Our AI-powered tool analyzes multiple health factors to assess your cardiovascular disease risk. Please provide accurate information for the most reliable prediction.</p>
        </div>

        <div className="form-progress">
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Personal Info</div>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Health Metrics</div>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Lifestyle</div>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="prediction-form">
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="1"
                    max="120"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="0">Female</option>
                    <option value="1">Male</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="height">Height (cm) *</label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    min="100"
                    max="250"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="weight">Weight (kg) *</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="20"
                    max="300"
                    required
                  />
                  {calculateBMI() && (
                    <div className="bmi-display">
                      BMI: {calculateBMI()} ({getBMICategory(parseFloat(calculateBMI())).category})
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="e.g., Engineer, Teacher, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2>Health Metrics</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="ap_hi">Systolic Blood Pressure (mmHg) *</label>
                  <input
                    type="number"
                    id="ap_hi"
                    name="ap_hi"
                    value={formData.ap_hi}
                    onChange={handleInputChange}
                    min="70"
                    max="250"
                    required
                  />
                  <small>Normal: 90-120 mmHg</small>
                </div>

                <div className="form-group">
                  <label htmlFor="ap_lo">Diastolic Blood Pressure (mmHg) *</label>
                  <input
                    type="number"
                    id="ap_lo"
                    name="ap_lo"
                    value={formData.ap_lo}
                    onChange={handleInputChange}
                    min="40"
                    max="150"
                    required
                  />
                  <small>Normal: 60-80 mmHg</small>
                </div>

                <div className="form-group">
                  <label htmlFor="cholesterol">Cholesterol Level *</label>
                  <select
                    id="cholesterol"
                    name="cholesterol"
                    value={formData.cholesterol}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="1">Normal</option>
                    <option value="2">Above Normal</option>
                    <option value="3">Well Above Normal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="gluc">Glucose Level *</label>
                  <select
                    id="gluc"
                    name="gluc"
                    value={formData.gluc}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="1">Normal</option>
                    <option value="2">Above Normal</option>
                    <option value="3">Well Above Normal</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2>Lifestyle Factors</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="smoke">Do you smoke? *</label>
                  <select
                    id="smoke"
                    name="smoke"
                    value={formData.smoke}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="alco">Do you consume alcohol? *</label>
                  <select
                    id="alco"
                    name="alco"
                    value={formData.alco}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="active">Are you physically active? *</label>
                  <select
                    id="active"
                    name="active"
                    value={formData.active}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Next
              </button>
            ) : (
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Analyzing...' : 'Get Prediction'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CVDPrediction;