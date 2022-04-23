import { useState } from 'react';

import './app.css';

function App() {
    const [city, setCity] = useState("");
    const [weatherForecast, setWeatherForecast] = useState(null)

    const handleChange = (e) => {
        setCity(e.target.value)
    };

    const handleSearch = () => {
        // current tempo atual e json utilizado para pegar o retorno
        fetch(`http://api.weatherapi.com/v1/current.json?key=391d3275a6c94affb58164241222304&q=${city}&lang=pt`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then((data) => {
                console.log("DATA", data)
                setWeatherForecast(data)
            })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <a className="navbar-brand text-white">
                    Ton Previsão do Tempo
                </a>
            </nav>

            <main className="container">
                <div className="jumbotron">
                    <h1>Verifique agora a previsão do tempo da sua cidade!</h1>
                    <p id="text" className="lead">
                        Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar
                    </p>

                    <div className="row mb-4 row-container">
                        <div className="col-md-6 col-input" >
                            <input
                                onChange={handleChange}
                                className="form-control"
                                value={city}
                            />

                            <button onClick={handleSearch} className="btn btn-primary btn-lg btn-search">
                                Pesquisar
                            </button>
                        </div>
                    </div>

                    {
                        weatherForecast ? (
                            <div className="container-content">
                                <div className="mt-4 mt-container">
                                    <div className="icon-container">
                                        <img className="icon" src={weatherForecast.current.condition.icon} alt="" />
                                    </div>

                                    <h2>{weatherForecast.location.name}, {weatherForecast.location.region}</h2>

                                    <div className="container-informations">
                                        <p id="lead" className="lead">
                                            {weatherForecast.current.condition.text}
                                        </p>
                                    </div>

                                    <div className="container-temp">
                                        <p className="lead">
                                            Temp: {weatherForecast.current.temp_c}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </main>
        </div>
    );
}

export default App;
