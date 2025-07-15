import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Sun,
  Eye,
  Droplets,
  Wind,
  Thermometer,
  Gauge,
  MapPin,
  Sunrise,
  Sunset,
  Search,
  Loader2,
  AlertCircle,
  CloudRain,
  CloudSnow,
  Zap,
  Navigation,
  Calendar,
  Clock,
  RefreshCw,
  TrendingUp,
  Activity
} from 'lucide-react';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Delhi');
  const [searchInput, setSearchInput] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const API_KEY = `${import.meta.env.VITE_WEATHER_API_KEY}`;
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found. Please check the spelling and try again.');
      }

      const data = await response.json();
      setWeatherData(data);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeatherData(searchInput.trim());
      setSearchInput('');
    }
    document.getElementById('search-input').blur();
  };



  const handleRefresh = () => {
    if (weatherData) {
      fetchWeatherData(weatherData.name);
    }
  };

  useEffect(() => {
    fetchWeatherData('Delhi');
  }, []);

  // Helper functions
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getWeatherIcon = (iconCode, main) => {
    const iconProps = "w-20 h-20 drop-shadow-lg";

    switch (main) {
      case 'Clear':
        return <Sun className={`${iconProps} text-yellow-400`} />;
      case 'Clouds':
        return <Cloud className={`${iconProps} text-gray-300`} />;
      case 'Rain':
        return <CloudRain className={`${iconProps} text-blue-400`} />;
      case 'Snow':
        return <CloudSnow className={`${iconProps} text-blue-200`} />;
      case 'Thunderstorm':
        return <Zap className={`${iconProps} text-purple-400`} />;
      default:
        return <Cloud className={`${iconProps} text-gray-300`} />;
    }
  };

  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  const getBackgroundGradient = () => {
    if (!weatherData) return "from-indigo-900 via-purple-900 to-pink-900";

    const main = weatherData.weather[0].main;
    const hour = new Date().getHours();

    if (main === 'Clear' && hour >= 6 && hour < 18) {
      return "from-blue-400 via-cyan-400 to-teal-400";
    } else if (main === 'Clear') {
      return "from-indigo-900 via-purple-900 to-pink-900";
    } else if (main === 'Clouds') {
      return "from-gray-600 via-gray-700 to-gray-800";
    } else if (main === 'Rain') {
      return "from-blue-800 via-indigo-800 to-purple-800";
    } else if (main === 'Snow') {
      return "from-blue-200 via-blue-300 to-blue-400";
    } else if (main === 'Thunderstorm') {
      return "from-purple-900 via-indigo-900 to-gray-900";
    }

    return "from-indigo-900 via-purple-900 to-pink-900";
  };

  const getCardHoverEffect = () => {
    return "hover:scale-105 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 ease-in-out";
  };

  const getTemperatureColor = (temp) => {
    if (temp > 30) return "text-red-400";
    if (temp > 20) return "text-yellow-400";
    if (temp > 10) return "text-green-400";
    return "text-blue-400";
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} p-4 sm:p-6 lg:p-8 transition-all duration-1000 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-white/4 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <Activity className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                Weather Pro
              </h1>
              <p className="text-white/70 text-lg">Real-time weather insights</p>
            </div>
          </div>

          {/* Live Time Display */}
          <div className="flex items-center justify-center gap-6 mb-8 text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatCurrentTime()}</span>
            </div>
            {weatherData && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(weatherData.dt)}</span>
              </div>
            )}
          </div>

          {/* Enhanced Search Form */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-6">
            <div className="relative group">
              <input
                type="search"
                inputMode="text"
                autoComplete="on"
                autoCorrect="on"
                spellCheck="true"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search any city worldwide..."
                className="w-full px-6 py-4 pl-14 pr-16 bg-white/10 backdrop-blur-md rounded-2xl text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 text-lg group-hover:bg-white/15"
                id="search-input"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-xl p-2 transition-all duration-200 hover:scale-110"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-white animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-white/20 rounded-full"></div>
            </div>
            <p className="mt-6 text-white text-xl font-medium">Fetching weather data...</p>
            <p className="text-white/60 mt-2">Please wait a moment</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-3xl p-8 mb-8 text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-3">Oops! Something went wrong</h3>
            <p className="text-red-100 mb-6">{error}</p>
            <button
              onClick={() => fetchWeatherData('Delhi')}
              className="px-8 py-3 bg-red-500/30 hover:bg-red-500/40 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Weather Data Display */}
        {weatherData && !loading && (
          <div className="space-y-8">
            {/* Main Weather Hero Card */}
            <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 text-white border border-white/20 ${getCardHoverEffect()}`}>
              <div className="flex items-start justify-between mb-8">

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold">{weatherData.name}</h2>
                    <p className="text-white/70 text-lg">{weatherData.sys.country}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <button
                    onClick={handleRefresh}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-200 hover:scale-110"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>

                  <div className="text-right">
                    <p className="text-sm opacity-75">Coordinates</p>
                    <p className="text-sm font-mono">{weatherData.coord.lat}°N, {weatherData.coord.lon}°E</p>
                  </div>

                </div>

              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Temperature Display */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
                    <div className="relative">
                      {getWeatherIcon(weatherData.weather[0].icon, weatherData.weather[0].main)}
                      <div className="absolute -inset-4 bg-white/5 rounded-full blur-xl"></div>
                    </div>
                    <div>
                      <div className={`text-7xl lg:text-8xl font-bold ${getTemperatureColor(weatherData.main.temp)} drop-shadow-lg`}>
                        {Math.round(weatherData.main.temp)}°
                      </div>
                      <div className="text-2xl opacity-75 mt-2">
                        Feels like {Math.round(weatherData.main.feels_like)}°
                      </div>
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-3xl font-semibold capitalize mb-4">{weatherData.weather[0].description}</p>
                    <div className="flex justify-center lg:justify-start gap-8 text-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-400" />
                        <span>Max: {Math.round(weatherData.main.temp_max)}°</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400 rotate-180" />
                        <span>Min: {Math.round(weatherData.main.temp_min)}°</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sun Times */}
                <div className="grid grid-cols-2 gap-6">
                  <div className={`bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-2xl p-6 text-center border border-yellow-400/30 ${getCardHoverEffect()}`}>
                    <Sunrise className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                    <p className="text-yellow-200 mb-2 font-medium">Sunrise</p>
                    <p className="text-2xl font-bold">{formatTime(weatherData.sys.sunrise)}</p>
                  </div>
                  <div className={`bg-gradient-to-br from-orange-400/20 to-red-400/20 backdrop-blur-md rounded-2xl p-6 text-center border border-orange-400/30 ${getCardHoverEffect()}`}>
                    <Sunset className="w-12 h-12 mx-auto mb-3 text-orange-300" />
                    <p className="text-orange-200 mb-2 font-medium">Sunset</p>
                    <p className="text-2xl font-bold">{formatTime(weatherData.sys.sunset)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`bg-gradient-to-br from-blue-400/20 to-cyan-400/20 backdrop-blur-md rounded-2xl p-6 text-white border border-blue-400/30 ${getCardHoverEffect()}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-400/30 rounded-xl">
                    <Droplets className="w-8 h-8 text-blue-300" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Humidity</span>
                    <div className="text-3xl font-bold">{weatherData.main.humidity}%</div>
                  </div>
                </div>
                <div className="w-full bg-blue-400/20 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${weatherData.main.humidity}%` }}
                  ></div>
                </div>
              </div>

              <div className={`bg-gradient-to-br from-green-400/20 to-teal-400/20 backdrop-blur-md rounded-2xl p-6 text-white border border-green-400/30 ${getCardHoverEffect()}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-400/30 rounded-xl">
                    <Wind className="w-8 h-8 text-green-300" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Wind Speed</span>
                    <div className="text-3xl font-bold">{weatherData.wind.speed} m/s</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="w-4 h-4" style={{ transform: `rotate(${weatherData.wind.deg}deg)` }} />
                  <span>{getWindDirection(weatherData.wind.deg)}</span>
                  {weatherData.wind.gust && <span>• Gust: {weatherData.wind.gust} m/s</span>}
                </div>
              </div>

              <div className={`bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-md rounded-2xl p-6 text-white border border-purple-400/30 ${getCardHoverEffect()}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-400/30 rounded-xl">
                    <Gauge className="w-8 h-8 text-purple-300" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Pressure</span>
                    <div className="text-3xl font-bold">{weatherData.main.pressure}</div>
                  </div>
                </div>
                <p className="text-purple-200 text-sm">hPa</p>
              </div>

              <div className={`bg-gradient-to-br from-cyan-400/20 to-blue-400/20 backdrop-blur-md rounded-2xl p-6 text-white border border-cyan-400/30 ${getCardHoverEffect()}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-cyan-400/30 rounded-xl">
                    <Eye className="w-8 h-8 text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">Visibility</span>
                    <div className="text-3xl font-bold">{weatherData.visibility / 1000}</div>
                  </div>
                </div>
                <p className="text-cyan-200 text-sm">km</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20 ${getCardHoverEffect()}`}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Cloud className="w-8 h-8" />
                  Cloud Coverage
                </h3>
                <div className="text-5xl font-bold mb-4">{weatherData.clouds.all}%</div>
                <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-white/60 to-white/80 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${weatherData.clouds.all}%` }}
                  ></div>
                </div>
                <p className="text-white/70">
                  {weatherData.clouds.all > 80 ? 'Very Cloudy' :
                    weatherData.clouds.all > 50 ? 'Partly Cloudy' :
                      weatherData.clouds.all > 20 ? 'Few Clouds' : 'Clear Sky'}
                </p>
              </div>

              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20 ${getCardHoverEffect()}`}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Thermometer className="w-8 h-8" />
                  Additional Details
                </h3>
                <div className="space-y-4">
                  {weatherData.main.grnd_level && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Ground Level</span>
                      <span className="text-xl font-semibold">{weatherData.main.grnd_level} hPa</span>
                    </div>
                  )}
                  {weatherData.main.sea_level && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Sea Level</span>
                      <span className="text-xl font-semibold">{weatherData.main.sea_level} hPa</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Last Updated</span>
                    <span className="text-xl font-semibold">{formatTime(weatherData.dt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Footer */}
        <div className="text-center mt-12 text-white/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-4 h-4" />
            <p>Powered by OpenWeatherMap API</p>
          </div>
          <p className="text-sm">Real-time weather data from around the world</p>
        </div>
      </div>
    </div>
  );
};

export default App;