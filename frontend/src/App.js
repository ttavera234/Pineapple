import {useEffect, useState} from 'react';
import axios from "axios";

import './App.css';

const baseUrl = "http://127.0.0.1:5000"

function App() {
  const [calories, setCalories] = useState(0);
  const handleCalories = e => {
      setCalories(Number(e.target.value));
  }

  const [fat, setFat] = useState(0);
  const handleFat = e => {
      setFat(Number(e.target.value));
  }

  const [carbs, setCarbs] = useState(0);
  const handleCarbs = e => {
      setCarbs(Number(e.target.value));
  }

  const [protein, setProtein] = useState(0);
  const handleProtein = e => {
      setProtein(Number(e.target.value));
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
        const data = await axios.post(`${baseUrl}/meals`, {calories, fat, carbs, protein})
        setMealList([...mealList, data.data]);
        setCalories(0);
        setFat(0);
        setCarbs(0);
        setProtein(0);
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
