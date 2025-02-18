import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object

class WeatherObj {
  weatherName: string;
  weatherCode: string;
  temperature: number;
  windSpeed: number;
  humidity: number;

  constructor(weatherName:string, weatherCode:string, temperature:number, windSpeed: number, humidity:number){
    this.weatherName = weatherName;
    this.weatherCode = weatherCode;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
 
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  private cityName: string;
  
  constructor () {
    this.baseURL = process.env.API_BASE_URL || 'https://api.weatherapi.com/v1';
    this.apiKey = process.env.API_Key || ' ';
    this.cityName = " "; //how do i fix this...
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    try {
      const url = this.buildGeocodeQuery(query);
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]): Coordinates {
      const { lat , lon } = locationData [0];
      return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(cityName:string): string {
    return `${this.baseURL}/search.json?key=${this.apiKey}&q=${cityName}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/current.json?key=${this.apiKey}&q=${coordinates.lat},${coordinates.lon}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(cityName:string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(cityName);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      return await response.json();
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): WeatherObj {
    const weatherName = response.current.condition.text;
    const weatherCode = response.current.condition.code;
    const temperature = response.current.tempF;
    const windSpeed = response.current.wind_kph;
    const humidity = response.current.humidity;
    return new WeatherObj(weatherName, weatherCode, temperature, windSpeed, humidity);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]):WeatherObj[] {
    return weatherData.map((data: any) => {
      const weatherName = data.condition.text;
      const weatherCode = data.condition.code;
      const temperature = data.day.avgtemp_c;
      const windSpeed = data.day.maxwind_kph;
      const humidity = data.day.avghumidity;
      return new WeatherObj(weatherName, weatherCode, temperature, windSpeed, humidity);
    });
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData.forecast.forecastday);
    return { currentWeather, forecastArray };
  }
}

export default new WeatherService();
