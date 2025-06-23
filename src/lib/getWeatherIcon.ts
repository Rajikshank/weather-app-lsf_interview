const weatherIconMap = {
  1000: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/clear-day.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/clear-night.svg",
  },
  1003: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-day.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-night-fog.svg",
  },
  1006: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/cloudy.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/cloudy.svg",
  },
  1009: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/overcast.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/overcast.svg",
  },
  1030: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/mist.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/mist.svg",
  },
  1063: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-day-drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-night-drizzle.svg",
  },
  1066: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-day-snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-night-snow.svg",
  },
  1069: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-day-sleet.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-night-sleet.svg",
  },
  1072: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
  },
  1087: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms.svg",
  },
  1114: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-snow.svg",
  },
  1117: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
  },
  1135: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/fog-day.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/fog-night.svg",
  },
  1147: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-fog.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-fog.svg",
  },
  1150: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/overcast-day-drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/overcast-night-drizzle.svg",
  },
  1153: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
  },
  1168: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-drizzle.svg",
  },
  1171: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-drizzle.svg",
  },
  1180: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
  },
  1183: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
  },
  1186: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/rain.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/rain.svg",
  },
  1189: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/rain.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/rain.svg",
  },
  1192: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-day-extreme-rain.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-night-extreme-rain.svg",
  },
  1195: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-rain.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-rain.svg",
  },
  1198: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-sleet.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-sleet.svg",
  },
  1201: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-rain.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-rain.svg",
  },
  1204: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/sleet.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/sleet.svg",
  },
  1207: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-sleet.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-sleet.svg",
  },
  1210: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-snow.svg",
  },
  1213: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
  },
  1216: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
  },
  1219: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
  },
  1222: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-snow.svg",
  },
  1225: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-day-extreme-snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-night-extreme-snow.svg",
  },
  1237: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-snow.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-snow.svg",
  },
  1240: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/drizzle.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-drizzle.svg",
  },
  1243: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-rain.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-rain.svg",
  },
  1246: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-rain.svg",
    night:
      "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-rain.svg",
  },
  1249: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/sleet.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/sleet.svg",
  },
  1252: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-sleet.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-sleet.svg",
  },
  1255: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-night-extreme-snow.svg",
  },
  1258: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-day-snow.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/partly-cloudy-night-snow.svg",
  },
  1261: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-day-hail.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-night-hail.svg",
  },
  1264: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-snow.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/extreme-snow.svg",
  },
  1273: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-day-extreme-rain.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-night-extreme-rain.svg",
  },
  1276: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-day.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-night.svg",
  },
  1279: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-day-snow.svg",
    night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-night-snow.svg",
  },
  1282: {
    day: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/snow.svg",
   night: "https://raw.githubusercontent.com/basmilius/weather-icons/0ccc40fcff96ac10e325b53d138fed27c4d18afa/production/fill/svg/thunderstorms-night-snow.svg",
  },
};

export default weatherIconMap;
