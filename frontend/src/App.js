import {useEffect, useState} from 'react';
import axios from "axios";

import './App.css';

const baseUrl = "http://localhost:5000"

function App() {
  const [calories, setCalories] = useState(0);
  const handleCalories = e => {
      setCalories(e.target.value);
  }

  const [fat, setFat] = useState(0);
  const handleFat = e => {
      setFat(e.target.value);
  }

  const [carbs, setCarbs] = useState(0);
  const handleCarbs = e => {
      setCarbs(e.target.value);
  }

  const [protein, setProtein] = useState(0);
  const handleProtein = e => {
      setProtein(e.target.value);
  }

  const handleSubmit = e => {
      e.preventDefault();
      console.log(calories);
      console.log(fat);
      console.log(carbs);
      console.log(protein);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
            <label htmlFor="calories">Calories</label>
            <input
                onChange={handleCalories}
                type="int"
                name="calories"
                id="calories"
                value={calories}
            />
            <label htmlFor="fat">Fat</label>
            <input
                onChange={handleFat}
                type="int"
                name="fat"
                id="fat"
                value={fat}
            />
            <label htmlFor="carbs">Carbs</label>
            <input
                onChange={handleCarbs}
                type="int"
                name="carbs"
                id="carbs"
                value={carbs}
            />
            <label htmlFor="protein">Protein</label>
            <input
                onChange={handleProtein}
                type="int"
                name="protein"
                id="protein"
                value={protein}
            />
        </form>
      </header>
    </div>
  );
}

export default App;
