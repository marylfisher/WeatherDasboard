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

  constructor(weatherName:string, weatherCode:string){
    this.weatherName = weatherName;
    this.weatherCode = weatherCode;
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
    this.cityName = " ";
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/search.json?key=${this.apiKey}&q=${query}`);
      return await response.json();
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
      const { lat , lon } = locationData [0];
      return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {

  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/search.json?key=${this.apiKey}&q=${city}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city:string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
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
  private parseCurrentWeather(response: any) {

  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

  }
}

export default new WeatherService();
