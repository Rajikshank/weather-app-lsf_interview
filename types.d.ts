// interface Weather {
//   date:string
//   temp_c: number;
//   temp_f: number;
//   condition: {
//     text: string;
//     icon: string;
//     code: number;
//   };
//   wind_mph: number;
//   wind_kph: number;
//   wind_degree: number;
//   wind_dir: string;
//   pressure_mb: number;
//   pressure_in: number;
//   precip_mm: number;
//   precip_in: number;
//   humidity: number;
//   cloud: number;
//   feelslike_c: number;
//   feelslike_f: number;
//   vis_km: number;
//   vis_miles: number;
//   uv: number;
//   gust_mph: number;
//   gust_kph: number;
// }

// export interface WeatherData {
//   location: {
//     name: string;
//     region: string;
//     country: string;
//     lat: number;
//     lon: number;
//     tz_id: string;
//     localtime_epoch: number;
//     localtime: string;
//   };

//   forecast: {
//     forecastday: Weather[];
//   };
//   current: Weather
// }

// export interface WeatherError {
//   error: {
//     code: unknown;
//     message: unknown;
//   };
// }



export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    air_quality?: {
      pm2_5: number;
      pm10: number;
    };
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  chance_of_rain: number;
}