import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityName = req.params.city;
  const weatherData = //not finished
  // TODO: save city to search history
  await historyService.addcity(//need to figure this out
    );
    res.json(cities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err); //remind me what this is
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    //what are the params here
  }

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {

});

export default router;
