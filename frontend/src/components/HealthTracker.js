import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadialBarChart, RadialBar
} from "recharts";

export default function HealthTracker() {
  const [bpm, setBpm] = useState(72);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [heartbeatData, setHeartbeatData] = useState([]);
  const [bmiData, setBmiData] = useState({ weight: "", height: "", age: "", gender: "male", activity: "sedentary" });
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiHistory, setBmiHistory] = useState([]);
  const [vitals, setVitals] = useState({ systolic: "", diastolic: "", sugar: "", cholesterol: "" });
  const [prediction, setPrediction] = useState(null);

  // Heartbeat Simulation
  useEffect(() => {
    let interval;
    if (isMeasuring) {
      interval = setInterval(() => {
        const newBpm = Math.floor(60 + Math.random() * 40);
        setBpm(newBpm);
        setHeartbeatData((prev) => [
          ...prev.slice(-14),
          { time: new Date().toLocaleTimeString().slice(3, 8), bpm: newBpm },
        ]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMeasuring]);

  // BMI Calculator
  const calculateBMI = () => {
    const { weight, height, age, gender, activity } = bmiData;
    if (!weight || !height) return;
    const hM = height / 100;
    const bmi = (weight / (hM * hM)).toFixed(2);

    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi >= 25 && bmi < 30) category = "Overweight";
    else if (bmi >= 30) category = "Obese";

    const result = { bmi, category, age, gender, activity };
    setBmiResult(result);
    setBmiHistory((prev) => [...prev, { name: `Check ${prev.length + 1}`, bmi: parseFloat(bmi) }]);
  };

  // Heart Disease Prediction (Backend)
  const predictDisease = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: "2025-09-07",
          country: "India",
          id: 1,
          active: 1,
          age: bmiData.age || 30,
          alco: 0,
          ap_hi: vitals.systolic || 120,
          ap_lo: vitals.diastolic || 80,
          cholesterol: vitals.cholesterol || 180,
          gender: bmiData.gender === "male" ? 1 : 2,
          gluc: vitals.sugar || 1,
          height: bmiData.height,
          occupation: "Engineer",
          smoke: 0,
          weight: bmiData.weight,
        }),
      });
      const data = await response.json();
      setPrediction(data.message);
    } catch (error) {
      console.error(error);
      setPrediction("⚠️ Error connecting to backend.");
    }
  };

  // Styles
  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  };

  const buttonStyle = {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #e0f7fa, #f1f8e9)", padding: "30px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#00796b" }}>🏥 Health Tracker Dashboard</h1>
        <p style={{ fontSize: "18px", color: "#555" }}>Monitor your heart, BMI, and vitals with AI support</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
        {/* Heartbeat Monitor */}
        <div style={cardStyle}>
          <h2 style={{ color: "#1565c0" }}>💓 Heartbeat Monitor</h2>
          <p style={{ fontSize: "48px", fontWeight: "bold", color: "#333" }}>{bpm} BPM</p>
          <button onClick={() => setIsMeasuring(!isMeasuring)} style={buttonStyle}>
            {isMeasuring ? "Stop Measuring" : "Start Measuring"}
          </button>
          <div style={{ height: "200px", marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartbeatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[50, 120]} />
                <Tooltip />
                <Line type="monotone" dataKey="bpm" stroke="#007bff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BMI Calculator */}
        <div style={cardStyle}>
          <h2 style={{ color: "#2e7d32" }}>⚖️ BMI Calculator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <input type="number" placeholder="Weight (kg)" onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })} />
            <input type="number" placeholder="Height (cm)" onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })} />
            <input type="number" placeholder="Age" onChange={(e) => setBmiData({ ...bmiData, age: e.target.value })} />
            <select onChange={(e) => setBmiData({ ...bmiData, gender: e.target.value })}>
              <option value="male">Male</option><option value="female">Female</option>
            </select>
            <select style={{ gridColumn: "span 2" }} onChange={(e) => setBmiData({ ...bmiData, activity: e.target.value })}>
              <option value="sedentary">Sedentary</option>
              <option value="active">Active</option>
              <option value="very-active">Very Active</option>
            </select>
          </div>
          <button onClick={calculateBMI} style={buttonStyle}>Calculate BMI</button>

          {bmiResult && (
            <div style={{ marginTop: "20px" }}>
              <p><b>BMI:</b> {bmiResult.bmi}</p>
              <p><b>Category:</b> {bmiResult.category}</p>
              <div style={{ height: "120px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="70%" outerRadius="100%"
                    data={[{ name: "BMI", value: bmiResult.bmi, fill: "#2e7d32" }]}
                    startAngle={180} endAngle={0}>
                    <RadialBar minAngle={15} background clockWise dataKey="value" />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Vitals Tracker */}
        <div style={cardStyle}>
          <h2 style={{ color: "#6a1b9a" }}>🩺 Vitals Tracker</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <input type="number" placeholder="Systolic BP" onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })} />
            <input type="number" placeholder="Diastolic BP" onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })} />
            <input type="number" placeholder="Sugar Level" onChange={(e) => setVitals({ ...vitals, sugar: e.target.value })} />
            <input type="number" placeholder="Cholesterol" onChange={(e) => setVitals({ ...vitals, cholesterol: e.target.value })} />
          </div>
          {vitals.systolic && (
            <p style={{ marginTop: "10px" }}>Blood Pressure: {vitals.systolic}/{vitals.diastolic}</p>
          )}
        </div>

        {/* Prediction */}
        <div style={cardStyle}>
          <h2 style={{ color: "#c62828" }}>🧪 Heart Disease Prediction</h2>
          <button onClick={predictDisease} style={{ ...buttonStyle, background: "#c62828" }}>Run Prediction</button>
          {prediction && <p style={{ marginTop: "15px", fontWeight: "bold" }}>{prediction}</p>}
        </div>
      </div>
    </div>
  );
}
