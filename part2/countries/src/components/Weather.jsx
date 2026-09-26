import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY 

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!capital) return

    let isSubscribed = true

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          capital
        )}&units=metric&appid=${api_key}`
      )
      .then(response => {
        if (isSubscribed) {
          setWeather(response.data)
          setError(null)
        }
      })
      .catch(err => {
        if (isSubscribed) {
          console.error('Failed to fetch weather data:', err)
          setError('Could not load weather data')
        }
      })

    return () => {
      isSubscribed = false
    }
  }, [capital])

  if (!capital) return null
  if (error) return <p>{error}</p>
  if (!weather) return <p>Loading weather...</p>

  const iconCode = weather.weather?.[0]?.icon
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null
  const description = weather.weather?.[0]?.description || 'weather icon'

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      {iconUrl && <img src={iconUrl} alt={description} />}
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
