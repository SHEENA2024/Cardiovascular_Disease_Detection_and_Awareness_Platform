// Additional Components for Heart Health App


// Recipes Component
const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const recipes = [
    {
      id: 1,
      title: "Mediterranean Salmon Bowl",
      category: "main",
      time: "25 min",
      servings: 4,
      difficulty: "Easy",
      image: "🐟",
      nutrition: { calories: 420, fiber: "8g", protein: "35g", sodium: "Low" },
      ingredients: [
        "4 salmon fillets (6 oz each)",
        "2 cups quinoa, cooked",
        "1 cucumber, diced",
        "1 cup cherry tomatoes",
        "1/2 red onion, sliced",
        "1/4 cup kalamata olives",
        "2 tbsp olive oil",
        "1 lemon, juiced",
        "Fresh dill and parsley"
      ],
      instructions: [
        "Season salmon with herbs and grill for 4-5 minutes per side",
        "Prepare quinoa according to package directions",
        "Dice vegetables and mix with olive oil and lemon",
        "Assemble bowls with quinoa, vegetables, and salmon",
        "Garnish with fresh herbs and serve immediately"
      ],
      benefits: "Rich in omega-3 fatty acids, fiber, and lean protein. Supports heart health and reduces inflammation."
    },
    {
      id: 2,
      title: "Heart-Healthy Oatmeal",
      category: "breakfast",
      time: "10 min",
      servings: 2,
      difficulty: "Easy",
      image: "🥣",
      nutrition: { calories: 320, fiber: "12g", protein: "12g", sodium: "Low" },
      ingredients: [
        "1 cup steel-cut oats",
        "2 cups low-fat milk",
        "1 banana, sliced",
        "2 tbsp chopped walnuts",
        "1 tbsp ground flaxseed",
        "1 tsp cinnamon",
        "1 tbsp honey",
        "1/2 cup blueberries"
      ],
      instructions: [
        "Cook oats according to package directions with milk",
        "Stir in cinnamon and flaxseed",
        "Top with banana, walnuts, and blueberries",
        "Drizzle with honey and serve warm"
      ],
      benefits: "High in soluble fiber that helps lower cholesterol. Antioxidant-rich berries support heart health."
    },
    {
      id: 3,
      title: "Avocado Chickpea Salad",
      category: "lunch",
      time: "15 min",
      servings: 3,
      difficulty: "Easy",
      image: "🥑",
      nutrition: { calories: 380, fiber: "15g", protein: "14g", sodium: "Low" },
      ingredients: [
        "2 cans chickpeas, drained",
        "2 ripe avocados",
        "2 cups mixed greens",
        "1/4 cup red bell pepper",
        "2 tbsp olive oil",
        "1 lime, juiced",
        "1 tsp cumin",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Mash avocados with lime juice and cumin",
        "Mix in chickpeas and bell pepper",
        "Serve over mixed greens",
        "Season with salt and pepper"
      ],
      benefits: "Packed with heart-healthy monounsaturated fats and plant-based protein."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Recipes', icon: '🍽️' },
    { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
    { id: 'lunch', name: 'Lunch', icon: '🥗' },
    { id: 'main', name: 'Dinner', icon: '🍽️' },
    { id: 'snack', name: 'Snacks', icon: '🥜' }
  ];

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const toggleFavorite = (recipeId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(recipeId)) {
      newFavorites.delete(recipeId);
    } else {
      newFavorites.add(recipeId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="recipes">
      <div className="container">
        <div className="recipes-header">
          <h1>Heart-Healthy Recipes</h1>
          <p>Delicious meals designed to support your cardiovascular health</p>
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-header">
                <div className="recipe-image">{recipe.image}</div>
                <button 
                  className={`favorite-btn ${favorites.has(recipe.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(recipe.id)}
                >
                  {favorites.has(recipe.id) ? '❤️' : '🤍'}
                </button>
              </div>
              
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                
                <div className="recipe-meta">
                  <span className="meta-item">⏱️ {recipe.time}</span>
                  <span className="meta-item">👥 {recipe.servings} servings</span>
                  <span className="meta-item">📊 {recipe.difficulty}</span>
                </div>

                <div className="nutrition-info">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Calories:</span>
                    <span className="nutrition-value">{recipe.nutrition.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fiber:</span>
                    <span className="nutrition-value">{recipe.nutrition.fiber}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Protein:</span>
                    <span className="nutrition-value">{recipe.nutrition.protein}</span>
                  </div>
                </div>

                <div className="recipe-benefits">
                  <strong>Heart Benefits:</strong> {recipe.benefits}
                </div>

                <div className="recipe-actions">
                  <button className="btn btn-primary">View Full Recipe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Health Tracker Component
const HealthTracker = () => {
  const [activeTab, setActiveTab] = useState('blood-pressure');
  const [readings, setReadings] = useState({
    'blood-pressure': [],
    'heart-rate': [],
    'weight': [],
    'exercise': []
  });

  const [newReading, setNewReading] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    weight: '',
    exerciseType: '',
    exerciseDuration: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5)
  });

  const trackerTabs = [
    { id: 'blood-pressure', name: 'Blood Pressure', icon: '🩸' },
    { id: 'heart-rate', name: 'Heart Rate', icon: '💓' },
    { id: 'weight', name: 'Weight', icon: '⚖️' },
    { id: 'exercise', name: 'Exercise', icon: '🏃‍♀️' }
  ];

  const addReading = () => {
    const timestamp = `${newReading.date} ${newReading.time}`;
    let reading = { timestamp, id: Date.now() };

    switch (activeTab) {
      case 'blood-pressure':
        if (newReading.systolic && newReading.diastolic) {
          reading = {
            ...reading,
            systolic: parseInt(newReading.systolic),
            diastolic: parseInt(newReading.diastolic),
            category: getBPCategory(parseInt(newReading.systolic), parseInt(newReading.diastolic))
          };
        } else return;
        break;
      case 'heart-rate':
        if (newReading.heartRate) {
          reading = {
            ...reading,
            bpm: parseInt(newReading.heartRate),
            category: getHRCategory(parseInt(newReading.heartRate))
          };
        } else return;
        break;
      case 'weight':
        if (newReading.weight) {
          reading = {
            ...reading,
            weight: parseFloat(newReading.weight)
          };
        } else return;
        break;
      case 'exercise':
        if (newReading.exerciseType && newReading.exerciseDuration) {
          reading = {
            ...reading,
            type: newReading.exerciseType,
            duration: parseInt(newReading.exerciseDuration)
          };
        } else return;
        break;
    }

    setReadings(prev => ({
      ...prev,
      [activeTab]: [reading, ...prev[activeTab]].slice(0, 10)
    }));

    // Reset form
    setNewReading({
      systolic: '',
      diastolic: '',
      heartRate: '',
      weight: '',
      exerciseType: '',
      exerciseDuration: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5)
    });
  };

  const getBPCategory = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) return { text: 'Normal', color: '#10b981' };
    if (systolic < 130 && diastolic < 80) return { text: 'Elevated', color: '#f59e0b' };
    if (systolic < 140 || diastolic < 90) return { text: 'Stage 1', color: '#f97316' };
    return { text: 'Stage 2', color: '#ef4444' };
  };

  const getHRCategory = (bpm) => {
    if (bpm < 60) return { text: 'Low', color: '#3b82f6' };
    if (bpm <= 100) return { text: 'Normal', color: '#10b981' };
    return { text: 'High', color: '#ef4444' };
  };

  const renderTrackingForm = () => {
    switch (activeTab) {
      case 'blood-pressure':
        return (
          <div className="tracking-form">
            <h3>Record Blood Pressure</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Systolic (top number)</label>
                <input
                  type="number"
                  placeholder="120"
                  value={newReading.systolic}
                  onChange={(e) => setNewReading({...newReading, systolic: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Diastolic (bottom number)</label>
                <input
                  type="number"
                  placeholder="80"
                  value={newReading.diastolic}
                  onChange={(e) => setNewReading({...newReading, diastolic: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 'heart-rate':
        return (
          <div className="tracking-form">
            <h3>Record Heart Rate</h3>
            <div className="form-group">
              <label>Beats per minute</label>
              <input
                type="number"
                placeholder="72"
                value={newReading.heartRate}
                onChange={(e) => setNewReading({...newReading, heartRate: e.target.value})}
              />
            </div>
          </div>
        );
      case 'weight':
        return (
          <div className="tracking-form">
            <h3>Record Weight</h3>
            <div className="form-group">
              <label>Weight (lbs)</label>
              <input
                type="number"
                step="0.1"
                placeholder="150.0"
                value={newReading.weight}
                onChange={(e) => setNewReading({...newReading, weight: e.target.value})}
              />
            </div>
          </div>
        );
      case 'exercise':
        return (
          <div className="tracking-form">
            <h3>Record Exercise</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Exercise Type</label>
                <select
                  value={newReading.exerciseType}
                  onChange={(e) => setNewReading({...newReading, exerciseType: e.target.value})}
                >
                  <option value="">Select exercise</option>
                  <option value="walking">Walking</option>
                  <option value="running">Running</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                  <option value="strength">Strength Training</option>
                  <option value="yoga">Yoga</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  placeholder="30"
                  value={newReading.exerciseDuration}
                  onChange={(e) => setNewReading({...newReading, exerciseDuration: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderReadings = () => {
    const currentReadings = readings[activeTab];
    
    if (currentReadings.length === 0) {
      return (
        <div className="no-readings">
          <div className="no-readings-icon">📊</div>
          <h3>No readings yet</h3>
          <p>Start tracking your {trackerTabs.find(tab => tab.id === activeTab)?.name.toLowerCase()} to see your progress here.</p>
        </div>
      );
    }

    return (
      <div className="readings-list">
        <h3>Recent Readings</h3>
        {currentReadings.map(reading => (
          <div key={reading.id} className="reading-item">
            <div className="reading-date">
              {new Date(reading.timestamp).toLocaleDateString()}
              <span className="reading-time">
                {new Date(reading.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="reading-value">
              {activeTab === 'blood-pressure' && (
                <>
                  <span className="bp-reading">{reading.systolic}/{reading.diastolic}</span>
                  <span 
                    className="bp-category"
                    style={{ color: reading.category.color }}
                  >
                    {reading.category.text}
                  </span>
                </>
              )}
              {activeTab === 'heart-rate' && (
                <>
                  <span className="hr-reading">{reading.bpm} BPM</span>
                  <span 
                    className="hr-category"
                    style={{ color: reading.category.color }}
                  >
                    {reading.category.text}
                  </span>
                </>
              )}
              {activeTab === 'weight' && (
                <span className="weight-reading">{reading.weight} lbs</span>
              )}
              {activeTab === 'exercise' && (
                <span className="exercise-reading">
                  {reading.type} - {reading.duration} min
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="health-tracker">
      <div className="container">
        <div className="tracker-header">
          <h1>Health Tracker</h1>
          <p>Monitor your vital signs and track your progress towards better heart health</p>
        </div>

        <div className="tracker-tabs">
          {trackerTabs.map(tab => (
            <button
              key={tab.id}
              className={`tracker-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        <div className="tracker-content">
          <div className="tracker-form-section">
            {renderTrackingForm()}
            
            <div className="form-datetime">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newReading.date}
                  onChange={(e) => setNewReading({...newReading, date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={newReading.time}
                  onChange={(e) => setNewReading({...newReading, time: e.target.value})}
                />
              </div>
            </div>

            <button onClick={addReading} className="btn btn-primary add-reading-btn">
              Add Reading
            </button>
          </div>

          <div className="tracker-readings-section">
            {renderReadings()}
          </div>
        </div>

        <div className="tracker-tips">
          <h3>📋 Tracking Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🩸</div>
              <h4>Blood Pressure</h4>
              <p>Measure at the same time daily, after resting for 5 minutes. Avoid caffeine 30 minutes before.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💓</div>
              <h4>Heart Rate</h4>
              <p>Check your pulse at your wrist or neck. Count for 15 seconds and multiply by 4.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⚖️</div>
              <h4>Weight</h4>
              <p>Weigh yourself at the same time each day, preferably in the morning before eating.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🏃‍♀️</div>
              <h4>Exercise</h4>
              <p>Aim for 150 minutes of moderate exercise per week. Track all physical activities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lifestyle Component
const Lifestyle = () => {
  const [selectedCategory, setSelectedCategory] = useState('exercise');

  const lifestyleCategories = {
    exercise: {
      title: 'Exercise & Fitness',
      icon: '🏃‍♀️',
      content: [
        {
          type: 'Aerobic Exercise',
          description: 'Activities that increase your heart rate and breathing',
          examples: ['Brisk walking', 'Swimming', 'Cycling', 'Dancing'],
          recommendation: '150 minutes per week of moderate intensity',
          benefits: 'Strengthens heart muscle, improves circulation, lowers blood pressure'
        },
        {
          type: 'Strength Training',
          description: 'Exercises that build muscle strength and endurance',
          examples: ['Weight lifting', 'Resistance bands', 'Push-ups', 'Yoga'],
          recommendation: '2-3 times per week, all major muscle groups',
          benefits: 'Improves metabolism, bone density, and overall fitness'
        },
        {
          type: 'Flexibility & Balance',
          description: 'Activities that improve range of motion and stability',
          examples: ['Stretching', 'Tai Chi', 'Yoga', 'Pilates'],
          recommendation: '2-3 times per week, 10-30 minutes',
          benefits: 'Reduces injury risk, improves posture, stress relief'
        }
      ]
    },
    nutrition: {
      title: 'Heart-Healthy Nutrition',
      icon: '🥗',
      content: [
        {
          type: 'Mediterranean Diet',
          description: 'Rich in fruits, vegetables, whole grains, and healthy fats',
          examples: ['Olive oil', 'Fish', 'Nuts', 'Legumes', 'Fresh produce'],
          recommendation: 'Primary eating pattern for heart health',
          benefits: 'Reduces heart disease risk by up to 30%'
        },
        {
          type: 'DASH Diet',
          description: 'Dietary Approaches to Stop Hypertension',
          examples: ['Low sodium foods', 'Fruits', 'Vegetables', 'Lean proteins'],
          recommendation: 'Less than 2,300mg sodium daily',
          benefits: 'Significantly lowers blood pressure'
        },
        {
          type: 'Limit Harmful Foods',
          description: 'Foods to reduce or avoid for heart health',
          examples: ['Processed meats', 'Sugary drinks', 'Trans fats', 'Excess salt'],
          recommendation: 'Minimize consumption',
          benefits: 'Reduces inflammation and cardiovascular risk'
        }
      ]
    },
    stress: {
      title: 'Stress Management',
      icon: '🧘‍♀️',
      content: [
        {
          type: 'Mindfulness & Meditation',
          description: 'Practices to calm the mind and reduce stress',
          examples: ['Deep breathing', 'Meditation apps', 'Mindful walking', 'Body scans'],
          recommendation: '10-20 minutes daily',
          benefits: 'Lowers cortisol, reduces blood pressure'
        },
        {
          type: 'Social Connections',
          description: 'Building and maintaining supportive relationships',
          examples: ['Family time', 'Friends', 'Support groups', 'Community activities'],
          recommendation: 'Regular social interaction',
          benefits: 'Reduces stress hormones, improves mental health'
        },
        {
          type: 'Hobbies & Recreation',
          description: 'Activities that bring joy and relaxation',
          examples: ['Reading', 'Gardening', 'Music', 'Art', 'Nature walks'],
          recommendation: 'Regular engagement in enjoyable activities',
          benefits: 'Improves mood, reduces stress, enhances well-being'
        }
      ]
    },
    sleep: {
      title: 'Quality Sleep',
      icon: '😴',
      content: [
        {
          type: 'Sleep Duration',
          description: 'Getting adequate sleep for heart health',
          examples: ['7-9 hours nightly', 'Consistent bedtime', 'Regular wake time'],
          recommendation: '7-9 hours per night for adults',
          benefits: 'Supports heart repair, regulates blood pressure'
        },
        {
          type: 'Sleep Quality',
          description: 'Creating conditions for restorative sleep',
          examples: ['Dark room', 'Cool temperature', 'Comfortable mattress', 'No screens'],
          recommendation: 'Optimize sleep environment',
          benefits: 'Improves deep sleep phases, reduces inflammation'
        },
        {
          type: 'Sleep Hygiene',
          description: 'Habits that promote better sleep',
          examples: ['No caffeine late', 'Regular schedule', 'Relaxation routine'],
          recommendation: 'Consistent healthy sleep habits',
          benefits: 'Better sleep quality, improved cardiovascular health'
        }
      ]
    }
  };

  return (
    <div className="lifestyle">
      <div className="container">
        <div className="lifestyle-header">
          <h1>Heart-Healthy Lifestyle</h1>
          <p>Comprehensive guidance for living a heart-healthy life through evidence-based practices</p>
        </div>

        <div className="lifestyle-nav">
          {Object.entries(lifestyleCategories).map(([key, category]) => (
            <button
              key={key}
              className={`lifestyle-btn ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key)}
            >
              <span className="lifestyle-icon">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>

        <div className="lifestyle-content">
          <h2>
            <span className="content-icon">{lifestyleCategories[selectedCategory].icon}</span>
            {lifestyleCategories[selectedCategory].title}
          </h2>

          <div className="lifestyle-cards">
            {lifestyleCategories[selectedCategory].content.map((item, index) => (
              <div key={index} className="lifestyle-card">
                <h3>{item.type}</h3>
                <p className="item-description">{item.description}</p>
                
                <div className="item-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {item.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>

                <div className="item-recommendation">
                  <strong>Recommendation:</strong> {item.recommendation}
                </div>

                <div className="item-benefits">
                  <strong>Benefits:</strong> {item.benefits}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lifestyle-action-plan">
          <h3>🎯 Create Your Action Plan</h3>
          <div className="action-plan-card">
            <p>Start small and build sustainable habits. Choose one area to focus on this week:</p>
            <div className="action-buttons">
              <button className="action-btn">🚶‍♀️ Start 10-minute daily walks</button>
              <button className="action-btn">🥗 Add one extra serving of vegetables</button>
              <button className="action-btn">🧘‍♀️ Try 5-minute meditation</button>
              <button className="action-btn">😴 Set a consistent bedtime</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all components
export { Recipes, HealthTracker, Lifestyle };