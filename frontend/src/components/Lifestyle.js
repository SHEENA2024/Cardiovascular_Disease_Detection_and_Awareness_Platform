import React, { useState } from "react";
import "./Lifestyle.css";

const lifestyleTips = [
  {
    title: "🏃 Stay Active",
    description: "At least 30 minutes of moderate exercise daily reduces risk of heart disease and improves mood.",
    image: "https://source.unsplash.com/600x400/?running,fitness"
  },
  {
    title: "🥗 Eat Balanced Meals",
    description: "Include whole grains, fresh fruits, vegetables, lean proteins, and healthy fats.",
    image: "https://source.unsplash.com/600x400/?healthy,food"
  },
  {
    title: "💧 Stay Hydrated",
    description: "Drink at least 8 glasses of water per day. Hydration improves focus, skin, and digestion.",
    image: "https://source.unsplash.com/600x400/?water,glass"
  },
  {
    title: "😴 Prioritize Sleep",
    description: "Aim for 7–9 hours of quality sleep every night. Good sleep boosts memory and immunity.",
    image: "https://source.unsplash.com/600x400/?sleep,bed"
  },
  {
    title: "🧘 Manage Stress",
    description: "Practice mindfulness, meditation, or deep breathing to lower stress hormones.",
    image: "https://source.unsplash.com/600x400/?meditation,calm"
  }
];

export default function Lifestyle() {
  const [currentTip, setCurrentTip] = useState(0);
  const [habits, setHabits] = useState({
    exercise: false,
    sleep: false,
    hydration: false,
    nutrition: false,
    mindfulness: false
  });

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % lifestyleTips.length);
  };

  const handlePrev = () => {
    setCurrentTip((prev) => (prev - 1 + lifestyleTips.length) % lifestyleTips.length);
  };

  const toggleHabit = (habit) => {
    setHabits({ ...habits, [habit]: !habits[habit] });
  };

  return (
    <div className="lifestyle-page">
      {/* Hero */}
      <header className="lifestyle-hero">
        <h1>🌱 Build a Healthy Lifestyle</h1>
        <p>Your guide to balance, wellness, and long-term heart health.</p>
      </header>

      {/* Swipeable Carousel */}
      <section className="carousel">
        <h2>✨ Essential Lifestyle Tips</h2>
        <div className="carousel-content">
          <button onClick={handlePrev}>⬅</button>
          <div className="tip-card">
            <img src={lifestyleTips[currentTip].image} alt={lifestyleTips[currentTip].title} />
            <h3>{lifestyleTips[currentTip].title}</h3>
            <p>{lifestyleTips[currentTip].description}</p>
          </div>
          <button onClick={handleNext}>➡</button>
        </div>
      </section>

      {/* Daily Routine Timeline */}
      <section className="timeline">
        <h2>🕒 A Healthy Daily Routine</h2>
        <ul>
          <li><strong>6:30 AM:</strong> Wake up & stretch</li>
          <li><strong>7:00 AM:</strong> 30 min exercise</li>
          <li><strong>8:00 AM:</strong> Healthy breakfast</li>
          <li><strong>12:30 PM:</strong> Balanced lunch</li>
          <li><strong>3:00 PM:</strong> Short walk / break</li>
          <li><strong>6:30 PM:</strong> Light dinner with veggies</li>
          <li><strong>9:30 PM:</strong> Screen-free relaxation</li>
          <li><strong>10:30 PM:</strong> Sleep</li>
        </ul>
      </section>

      {/* Habits Checklist */}
      <section className="checklist">
        <h2>✅ Track Your Healthy Habits</h2>
        {Object.keys(habits).map((habit) => (
          <label key={habit} className="habit">
            <input
              type="checkbox"
              checked={habits[habit]}
              onChange={() => toggleHabit(habit)}
            />
            {habit.charAt(0).toUpperCase() + habit.slice(1)}
          </label>
        ))}
      </section>

      {/* Educational Cards */}
      <section className="education-cards">
        <h2>📚 Learn the Pillars of Wellness</h2>
        <div className="card-grid">
          <div className="edu-card sleep">
            <h3>😴 Sleep</h3>
            <p>7–9 hours of rest keeps your brain sharp, boosts memory, and strengthens immunity.</p>
          </div>
          <div className="edu-card exercise">
            <h3>🏋 Exercise</h3>
            <p>150 minutes of moderate exercise weekly reduces risk of heart disease.</p>
          </div>
          <div className="edu-card nutrition">
            <h3>🥗 Nutrition</h3>
            <p>Balanced meals fuel your body and reduce the risk of obesity & diabetes.</p>
          </div>
          <div className="edu-card stress">
            <h3>🧘 Stress Management</h3>
            <p>Mindfulness lowers blood pressure and cortisol, improving heart health.</p>
          </div>
          <div className="edu-card hydration">
            <h3>💧 Hydration</h3>
            <p>Water flushes toxins, boosts energy, and supports digestion.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="lifestyle-footer">
        <h2>🌟 Start Today!</h2>
        <p>Every small step matters. Build consistency and enjoy lifelong wellness.</p>
      </footer>
    </div>
  );
}
