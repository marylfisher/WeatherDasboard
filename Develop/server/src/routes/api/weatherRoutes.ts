import { Router, type Request, type Response } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.city;
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    // TODO: save city to search history
    await HistoryService.addCity(cityName);
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json( {error: 'Could not get weather data.'} ); 
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (err) {
    console.log(err);
    res.status(500).json( {error: 'Could not get search history.'} );
  }

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
  const cityId = req.params.id;
  await HistoryService.removeCity(cityId);
  res.json({message: 'City has been deleted'})
} catch (err) {
  console.log(err);
  res.status(500).json( {error: 'Could not delete city.'} );
}
});

export default router;
