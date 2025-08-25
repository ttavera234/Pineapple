import {useEffect, useState} from 'react';
import axios from "axios";

import './App.css';

const baseUrl = "http://127.0.0.1:5000"

function App() {
  const [calories, setCalories] = useState('');
  const handleCalories = e => {
      setCalories(e.target.value);
  }

  const [fat, setFat] = useState('');
  const handleFat = e => {
      setFat(e.target.value);
  }

  const [carbs, setCarbs] = useState('');
  const handleCarbs = e => {
      setCarbs(e.target.value);
  }

  const [protein, setProtein] = useState('');
  const handleProtein = e => {
      setProtein(e.target.value);
  }

  const [mealList, setMealList] = useState([]);
  const fetchMeals = async () => {
      const data = await axios.get(`${baseUrl}/meals`)
      const { meals } = data.data
      setMealList(meals);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(`${baseUrl}/meals`, {
            calories: Number(calories) || 0,
            fat: Number(fat) || 0,
            carbs: Number(carbs) || 0,
            protein: Number(protein) || 0
        })

        setMealList([...mealList, data.data]);
        setCalories('');
        setFat('');
        setCarbs('');
        setProtein('');
      } catch (err) {
          console.log(err.message)
      }
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
                    onChange={handleCalories}
                    type="number"
                    name="calories"
                    id="calories"
                    value={calories}
                />
                <label htmlFor="fat">Fat</label>
                <input
                    onChange={handleFat}
                    type="number"
                    name="fat"
                    id="fat"
                    value={fat}
                />
                <label htmlFor="carbs">Carbs</label>
                <input
                    onChange={handleCarbs}
                    type="number"
                    name="carbs"
                    id="carbs"
                    value={carbs}
                />
                <label htmlFor="protein">Protein</label>
                <input
                    onChange={handleProtein}
                    type="number"
                    name="protein"
                    id="protein"
                    value={protein}
                />
                <button type="submit">Submit</button>
            </form>
        </section>
        <section>
            <ul>
                {mealList.map(meal => {
                    return (
                        <li key={meal.id}>
                            Calories: {meal.calories},
                            Fat: {meal.fat},
                            Carbs: {meal.carbs},
                            Protein: {meal.protein}
                        </li>
                    )
                })}
            </ul>
        </section>
    </div>
  );
}

export default App;
