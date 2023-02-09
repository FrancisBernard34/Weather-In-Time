import { useState } from "react";
import "./Search.css";

export default function Search() {
  const [city, setCity] = useState("");

  function searchInput() {
    let value = document.querySelector("input[name=searchInput]").value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=d43763f0b7e08d82b4e132c767c42a2e`;

    fetch(url)
      .then((resti) => resti.json())
      .then((data) => {
        const { main, name, sys, weather } = data;
        if (sys !== undefined) {
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

          setCity(`
            <div class="WeatherWrapper">
            <p>${(main.temp - 273).toFixed(1)} °C</p>
            <p>${sys.country}</p>
            <p>${name}</p>
            <p>${weather[0]["description"]}</p>
            <img src="${icon}" alt="icon" />
            </div>
            `);
        } else {
          setCity("");
        }
      });
  }

  return (
    <div className="SearchWrapper">
      <div className="Search">
        <h2>Digite o nome da sua cidade para realizar a previsão</h2>
        <input
          type="text"
          name="searchInput"
          placeholder="Digite a cidade aqui..."
        />
        <button onClick={searchInput}>Pesquisar</button>
      </div>

      {city !== "" ? (
        <div dangerouslySetInnerHTML={{ __html: city }} />
      ) : (
        <div style={{padding:"20px", color:"white"}}>Pesquise por algo acima...</div>
      )}
    </div>
  );
}
