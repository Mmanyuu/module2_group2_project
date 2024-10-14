const RandomQuote = {
  Thunderstorm: [
    "You might want to stay in, I hear thunder rumbling.",
    "Better grab a raincoat, it’s looking stormy out there!",
    "Lightning alert! Let’s keep cozy inside today.",
    "Might get wild—thunderstorms are rolling in.",
    "I’d skip the outdoor plans, a storm’s brewing.",
  ],
  Drizzle: [
    "It’s just a drizzle—might not need a big umbrella.",
    "Feels like a drizzly kind of day, don’t forget your hoodie!",
    "A light shower’s on the way, keep dry out there.",
    "Tiny drops falling—good excuse for a hot coffee.",
    "You won’t get soaked, but an umbrella might help.",
  ],
  Rain: [
    "Rain’s coming—better grab the brolly.",
    "It’s pouring! Raincoat weather for sure.",
    "Get those boots ready—it’s gonna be a wet one.",
    "Don’t let the rain stop you—just dress for it!",
    "A rainy day ahead, time to jump in puddles?",
  ],
  Snow: [
    "Snow alert—bundle up and stay warm!",
    "Winter wonderland outside! Time for snow fun?",
    "Snow’s falling—don’t forget your gloves!",
    "Layer up! It's going to be chilly and snowy.",
    "Careful on the roads—it’s snowing out.",
  ],
  Mist: [
    "Can barely see out there—watch out for fog!",
    "Hazy views today, take it slow.",
    "Driving in mist? Keep those headlights on.",
    "Stay alert—it’s a bit foggy outside.",
    "The haze is thick, maybe stay in if you can.",
  ],
  Smoke: [
    "The air’s smoky—stay inside if you can.",
    "Smoky skies ahead—better wear a mask.",
    "It’s hazy with smoke—limit outdoor activity.",
    "Take care—smoke is lingering in the air.",
    "Smells smoky—keep your windows shut.",
  ],
  Haze: [
    "It’s hazy—stay indoors if needed.",
    "Visibility’s low due to haze, be careful.",
    "Hazy views today—better avoid outdoor exercise.",
    "Air feels heavy with haze—take it easy.",
    "Haze ahead—better stay inside.",
  ],
  Dust: [
    "Dusty winds ahead—don’t forget a mask!",
    "The air’s a bit gritty—keep windows closed.",
    "It’s dusty—better skip outdoor activities.",
    "Wind’s carrying dust—protect your eyes.",
    "Dust storm alert—stay safe!",
  ],
  Fog: [
    "Can barely see ahead—watch out for fog.",
    "Foggy weather—drive carefully.",
    "Fog’s rolling in—keep those headlights on.",
    "It’s a bit foggy—better leave early.",
    "Foggy views today—stay alert on the road.",
  ],
  Sand: [
    "Sand’s blowing—wear protective eyewear.",
    "Wind’s kicking up sand—stay indoors if possible.",
    "A sandy day ahead—cover your face.",
    "It’s sandy outside—be cautious.",
    "Sandstorm risk—take shelter.",
  ],
  Ash: [
    "Ash falling—let’s stay inside.",
    "The air’s full of ash—wear a mask.",
    "Ash alert—keep the windows shut.",
    "It’s ashy outside—take precautions.",
    "Ash fall—stay safe indoors.",
  ],
  Squall: [
    "Whoa! Squall warnings—brace yourself.",
    "Squalls ahead—hunker down!",
    "It’s squally outside—better stay in.",
    "Prepare for sudden wind and rain!",
    "Take care—squalls are coming.",
  ],
  Tornado: [
    "Tornado alert—find shelter immediately!",
    "Tornado risk—stay indoors and stay safe.",
    "Dangerous winds ahead—brace yourself!",
    "Stay informed—tornado alert in effect.",
    "Take cover—a tornado may hit.",
  ],
  Clear: [
    "Not a cloud in the sky—perfect day for a walk!",
    "Clear skies—time to enjoy the sun.",
    "The weather’s perfect today—get out there!",
    "Clear and bright—no umbrella needed.",
    "Sunny day ahead—soak it all in!",
  ],
  Clouds: [
    "It’s cloudy, but no rain yet—fingers crossed!",
    "Gray skies today, but no need for an umbrella.",
    "A cloudy day—perfect for reading indoors.",
    "Feels overcast—might get some sun later.",
    "Cloudy views—stay comfy today!",
  ],
};

// Function to get a random quote based on the weather condition
export const getRandomQuote = (condition) => {
  const quotes = RandomQuote[condition];
  if (quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  return null; // Return null if no quotes found for the condition
};

// Function to fetch a random quote based on weather data
export const fetchRandomQuoteForWeather = (weatherData) => {
  const weatherCondition = weatherData.weather[0].main;
  return getRandomQuote(weatherCondition);
};

export default RandomQuote;
