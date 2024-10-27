# Real-Time Weather Monitoring System

## Overview

This project is a Real-Time Data Processing System for monitoring weather conditions across major metros in India. It retrieves weather data from the [OpenWeatherMap API](https://openweathermap.org/) every 5 minutes, displaying the latest temperature, feels-like temperature, and a line chart showcasing the 10 most recent temperature updates.

## Features

- **Real-Time Data Fetching**: Automatically fetches weather data every 5 minutes.
- **Latest Weather Information**: Displays the latest temperature and feels-like temperature.
- **Temperature History Visualization**: Line chart showing the last 10 temperature updates for each city.
- **Support for Multiple Cities**: Monitors weather for major metros in India including Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.



## Technologies Used

- **Frontend**: React, Chart.js
- **Backend**: Node.js, Express, Axios
- **Data Source**: OpenWeatherMap API

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- OpenWeatherMap API key (Sign up at [OpenWeatherMap](https://openweathermap.org/))

### Getting Started

1. **Clone the repository**:

   ```bash
   git clone <https://github.com/Hamza1821/weather-monitoring.git>
   cd weather-monitoring
   ```
2. **Install dependencies for the backend**:
    ```bash
    cd api
    npm install
    ```
3.  **Install dependencies for the frontend**:
    ```bash
    cd ../ui
    npm install
    ```
4.  **Start the Backend**:
    ```bash
    cd api
    npm run dev
    ```
    **The backend server will run at http://localhost:3000.**

5.  **Start the Frontend**:
    ```bash
    cd ui
    npm run dev
    ```
    **The frontend application will run at http://localhost:5173.**

