import {useEffect, useState} from 'react';
import axios from "axios";

import './App.css';

const baseUrl = "http://127.0.0.1:5000"

function App() {
  const [calories, setCalories] = useState('');
  const [editCalories, setEditCalories] = useState('');
  const handleCalories = (e, field) => {
      if (field === 'edit') {
          setEditCalories(e.target.value)
      } else {
          setCalories(e.target.value);
      }
  }

  const [fat, setFat] = useState('');
  const [editFat, setEditFat] = useState('');
  const handleFat = (e, field) => {
      if (field === 'edit') {
          setEditFat(e.target.value)
      } else {
          setFat(e.target.value);
      }
  }

  const [carbs, setCarbs] = useState('');
  const [editCarbs, setEditCarbs] = useState('');
  const handleCarbs = (e, field) => {
      if (field === 'edit') {
          setEditCarbs(e.target.value)
      } else {
          setCarbs(e.target.value);
      }
  }

  const [protein, setProtein] = useState('');
  const [editProtein, setEditProtein] = useState('');
  const handleProtein = (e, field) => {
      if (field === 'edit') {
          setEditProtein(e.target.value)
      } else {
          setProtein(e.target.value);
      }
  }

  const [mealList, setMealList] = useState([]);
  const fetchMeals = async () => {
      const data = await axios.get(`${baseUrl}/meals`)
      const { meals } = data.data
      setMealList(meals);
  }

  const [mealId, setMealId] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          // Check if we are editing a value (mealID already has a value)
          if (mealId) {
              const updatedData = {
                  calories: Number(editCalories) || 0,
                  fat: Number(editFat) || 0,
                  carbs: Number(editCarbs) || 0,
                  protein: Number(editProtein) || 0
              };

              const data = await axios.put(`${baseUrl}/meals/${mealId}`, updatedData);
              const updatedMeal = data.data.meal;

              const updatedList = mealList.map(meal => {
                  if (meal.id === mealId) {
                      return updatedMeal;
                  }
                  return meal;
              });
              setMealList(updatedList);

          } else {
              // Logic for CREATING a new meal
              const data = await axios.post(`${baseUrl}/meals`, {
                  calories: Number(calories) || 0,
                  fat: Number(fat) || 0,
                  carbs: Number(carbs) || 0,
                  protein: Number(protein) || 0
              });
              setMealList([...mealList, data.data]);
          }

          // Reset all fields
          setCalories('');
          setFat('');
          setCarbs('');
          setProtein('');
          setEditCalories('');
          setEditFat('');
          setEditCarbs('');
          setEditProtein('');
          setMealId(null);

      } catch (err) {
          console.error(err.message)
      }
  }

  const handleDelete = async (id) => {
      try {
          await axios.delete(`${baseUrl}/meals/${id}`)
          const updatedList = mealList.filter(meal => meal.id !== id)
          setMealList(updatedList);
      } catch (err) {
          console.error(err.message)
      }
  }

  const toggleEdit = (meal) => {
      setMealId(meal.id);
      setEditCalories(meal.calories)
      setEditFat(meal.fat)
      setEditCarbs(meal.carbs)
      setEditProtein(meal.protein)
  }

  useEffect(() => {
      fetchMeals();
  }, []);

  return (
    <div className="App">
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="calories">Calories</label>
                <input
                    onChange={(e) => handleCalories(e, 'calories')}
                    type="number"
                    name="calories"
                    id="calories"
                    placeholder="Number of calories"
                    value={calories}
                />
                <label htmlFor="fat">Fat</label>
                <input
                    onChange={(e) => handleFat(e, 'fat')}
                    type="number"
                    name="fat"
                    id="fat"
                    placeholder="Grams of fat"
                    value={fat}
                />
                <label htmlFor="carbs">Carbs</label>
                <input
                    onChange={(e) => handleCarbs(e, 'carbs')}
                    type="number"
                    name="carbs"
                    id="carbs"
                    placeholder="Grams of carbs"
                    value={carbs}
                />
                <label htmlFor="protein">Protein</label>
                <input
                    onChange={(e) => handleProtein(e, 'protein')}
                    type="number"
                    name="protein"
                    id="protein"
                    placeholder="Grams of protein"
                    value={protein}
                />
                <button type="submit">Submit</button>
            </form>
        </section>
        <section>
            <ul>
                {mealList.map(meal => {
                    if (mealId === meal.id) {
                        return (
                            <li key={meal.id}>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        onChange={(e) => handleCalories(e, 'edit')}
                                        type="number"
                                        name="editCalories"
                                        id="editCalories"
                                        value={editCalories}
                                    />
                                    <input
                                        onChange={(e) => handleFat(e, 'edit')}
                                        type="number"
                                        name="editFat"
                                        id="editFat"
                                        value={editFat}
                                    />
                                    <input
                                        onChange={(e) => handleCarbs(e, 'edit')}
                                        type="number"
                                        name="editCarbs"
                                        id="editCarbs"
                                        value={editCarbs}
                                    />
                                    <input
                                        onChange={(e) => handleProtein(e, 'edit')}
                                        type="number"
                                        name="editProtein"
                                        id="editProtein"
                                        value={editProtein}
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                            </li>
                        )
                    } else {
                        return (
                        <li key={meal.id}>
                            Calories: {meal.calories},
                            Fat: {meal.fat},
                            Carbs: {meal.carbs},
                            Protein: {meal.protein}
                            <button onClick={() => toggleEdit(meal)}>Edit</button>
                            <button onClick={() => handleDelete(meal.id)}>X</button>
                        </li>
                    )
                    }
                })}
            </ul>
        </section>
    </div>
  );
}

export default App;
