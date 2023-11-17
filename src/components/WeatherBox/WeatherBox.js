import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useState, useCallback } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = (props) => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleCityChange = useCallback((city, lon, lat) => {
    setPending(true);
    setError(false);
    console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a6b5a7d34a3ccc9cc40b908388412eb&units=metric`)
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setPending(false);
          setWeather(weatherData);
        });
      } else {
        setError(true);
        setPending(false);
        setWeather('');
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && !error && <WeatherSummary {...weather} />}
      {weather && pending && <Loader />}
      {error && <ErrorBox>There is no such City!</ErrorBox>}
      <Loader />
    </section>
  )
};

export default WeatherBox;