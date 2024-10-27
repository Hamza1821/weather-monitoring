// src/Weather.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Weather.css'; // Import the CSS file for styling

// Register all necessary components
Chart.register(...registerables);

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/weather', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const allData = response.data;

      // Separate data for each city
      const separatedData = {};
      allData.forEach(data => {
        const cityName = data.city;
        if (!separatedData[cityName]) {
          separatedData[cityName] = [];
        }
        separatedData[cityName].push(data);
      });

      // Get the most recent data and last 10 records for each city
      const mostRecentData = Object.keys(separatedData).map(city => {
        const cityRecords = separatedData[city];
        const recentRecords = cityRecords.slice(-10);
        
        // Get the last two temperatures
        const lastTwoTemps = recentRecords.slice(-2).map(record => record.temp);

        return {
          city,
          temp: (recentRecords[recentRecords.length - 1].temp).toFixed(2),
          feels_like: (recentRecords[recentRecords.length - 1].feels_like).toFixed(2),
          main: recentRecords[recentRecords.length - 1].main,
          timestamp: recentRecords[recentRecords.length - 1].timestamp,
          history: recentRecords.map(record => ({
            time: new Date(record.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            temp: record.main,
          })),
          alert: lastTwoTemps.length === 2 && lastTwoTemps.every(temp => temp > 35), // Check if both temps are above 35
        };
      });

      setWeatherData(mostRecentData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Initial fetch
    const interval = setInterval(() => {
      fetchWeatherData(); // Fetch every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h1>Metro Cities Weather</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weather-grid">
          {weatherData.map((data, index) => (
            <div className="weather-card" key={index}>
              <h3>{data.city}</h3>
              <p>Temperature: {data.temp} °C</p>
              <p>Feels Like: {data.feels_like} °C</p>
              <p>Weather: {data.main}</p>
              {data.alert && <p className="alert-message">Alert: Recent temperatures are above 35°C!</p>} {/* Alert Message */}
              <h4>Temperature History</h4>
              <Line
                data={{
                  labels: data.history.map(record => record.time),
                  datasets: [
                    {
                      label: 'Temperature (°C)',
                      data: data.history.map(record => record.temp),
                      borderColor: 'rgba(75, 192, 192, 1)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      fill: true,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Time',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Temperature (°C)',
                      },
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
