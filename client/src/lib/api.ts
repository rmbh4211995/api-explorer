export interface UrlResult {
  url: string
  matches: string[]
}
export interface Endpoint {
  url: string
  params?: string[]
}

export interface ApisType {
  [key: string]: {
    [key: string]: Endpoint
  }
}

const DOCS: { [key: string]: string } = {
  'studio gibli': 'https://ghibliapi.herokuapp.com/#',
  digimon: 'https://digimon-api.herokuapp.com/',
  pokemon: 'https://pokeapi.co/',
  'kanye rest': 'https://kanye.rest/',
  'open breweries': 'https://www.openbrewerydb.org/documentation',
  'public apis': 'https://github.com/davemachado/public-api',
  jikan: 'https://jikan.docs.apiary.io/#',
  kitsu: 'https://kitsu.docs.apiary.io/#',
  'coin desk': 'https://www.coindesk.com/coindesk-api',
  bored: 'https://www.boredapi.com/documentation',
  agify: 'https://agify.io/',
  genderize: 'https://genderize.io/',
  nationalize: 'https://nationalize.io/',
  'data usa': 'https://datausa.io/about/api/',
  ipify: 'https://www.ipify.org/',
  ipinfo: 'https://ipinfo.io/developers',
  'random user': 'https://randomuser.me/documentation',
  zippopotam: 'http://www.zippopotam.us/',
}

const baseUrls: { [key: string]: string } = {
  'studio gibli': 'https://ghibliapi.herokuapp.com',
  digimon: 'https://digimon-api.vercel.app',
  pokemon: 'https://pokeapi.co/api/v2',
  'kanye rest': 'https://api.kanye.rest',
  'public apis': 'https://api.publicapis.org',
  'open breweries': 'https://api.openbrewerydb.org',
  jikan: 'https://api.jikan.moe/v3',
  kitsu: 'https://kitsu.io/api',
  'coin desk': 'https://api.coindesk.com/v1/bpi',
  bored: 'http://www.boredapi.com/api',
  agify: 'https://api.agify.io',
  genderize: 'https://api.genderize.io',
  nationalize: 'https://api.nationalize.io',
  'data usa': 'https://datausa.io/api/data',
  ipify: 'https://api.ipify.org',
  ipinfo: 'https://ipinfo.io/json',
  'random user': 'https://randomuser.me/api/',
  zippopotam: 'http://api.zippopotam.us',
}

const APIS: ApisType = {
  'studio gibli': {
    films: { url: `/films` },
    film: {
      url: `/films/:id`,
      params: ['2baf70d1-42bb-4437-b551-e5fed5a87abe'],
    },
    people: { url: `/people` },
    person: {
      url: `/people/:id`,
      params: ['fe93adf2-2f3a-4ec4-9f68-5422f1b87c01'],
    },
    locations: { url: `/locations` },
    location: {
      url: `/locations/:id`,
      params: ['11014596-71b0-4b3e-b8c0-1c4b15f28b9a'],
    },
    species: { url: `/species` },
    specie: {
      url: `/species/:id`,
      params: ['af3910a6-429f-4c74-9ad5-dfe1c4aa04f2'],
    },
    vehicles: { url: `/vehicles` },
    vehicle: {
      url: `/vehicles/:id`,
      params: ['4e09b023-f650-4747-9ab9-eacf14540cfb'],
    },
  },
  digimon: {
    digimon: { url: `/api/digimon` },
    'digmon by name': {
      url: `/api/digimon/name/:name`,
      params: ['agumon'],
    },
    'digimon by level': {
      url: `/api/digimon/level/:level`,
      params: ['rookie'],
    },
  },
  pokemon: {
    pokemon: { url: `/pokemon` },
    'pokemon by name': {
      url: `/pokemon/:name`,
      params: ['bulbasaur'],
    },
    abilities: {
      url: `/ability`,
    },
    ability: {
      url: `/ability/:name`,
      params: ['stench'],
    },
    stats: {
      url: `/stat`,
    },
    stat: {
      url: `/stat/:name`,
      params: ['attack'],
    },
    evolutions: { url: `/evolution-chain` },
    evolution: {
      url: `/evolution-chain/:id`,
      params: ['7'],
    },
    'evolution trigger': {
      url: `/evolution-trigger/:trigger`,
      params: ['level-up'],
    },
    contests: { url: `/contests` },
    'contest types': {
      url: `/contests/:type`,
      params: ['cool'],
    },
    'contest effect': {
      url: `/contest-effect/:id`,
      params: ['1'],
    },
    'super contest effect': {
      url: `/super-contest-effect/:id`,
      params: ['1'],
    },
    moves: { url: `/move` },
    move: {
      url: `/move/:move`,
      params: ['solar-beam'],
    },
    locations: { url: `/location` },
    location: {
      url: `/location/:location`,
      params: ['canalave-city'],
    },
    regions: { url: `/region` },
    region: {
      url: `/region/:region`,
      params: ['kanto'],
    },
    items: { url: `/item` },
    machines: { url: `/machine` },
    machine: {
      url: `/machine/:id`,
      params: ['1'],
    },
    berries: { url: `/berry` },
    berry: {
      url: `/berry/:name`,
      params: ['cheri'],
    },
    'berry firmness': {
      url: `/berry/berry-firmness/:firmness`,
      params: ['very soft'],
    },
    'berry flavor': {
      url: `/berry/berry-flavor/:flavor`,
      params: ['spicy'],
    },
  },
  'kanye rest': {
    quote: { url: ' ' },
  },
  'open breweries': {
    breweries: { url: `/breweries` },
    brewery: {
      url: `/breweries/:id`,
      params: ['1'],
    },
    'search brewery': {
      url: '/breweries/search?query=:query',
      params: ['dog'],
    },
    autocomplete: {
      url: `/breweries/autocomplete?query=:query`,
      params: ['cat'],
    },
  },
  'public apis': {
    entries: { url: `/entries` },
    random: { url: `/random` },
    categories: { url: `/categories` },
    health: { url: `/health` },
  },
  jikan: {
    animes: { url: `/search/anime?q=&order_by=id&sort=asc&page=1` },
    mangas: { url: `/search/manga?q=&order_by=id&sort=asc&page=1` },
    'anime by id': { url: `/anime/:id`, params: ['1'] },
    'manga by id': { url: `/manga/:id`, params: ['1'] },
    staff: { url: `/anime/:id/characters_staff`, params: ['1'] },
    episodes: { url: `/anime/:id/episodes`, params: ['1'] },
    search: { url: `/search/:type?q=:query&page=1`, params: ['anime', 'Fate/Zero'] },
  },
  kitsu: {
    animes: { url: '/edge/anime' },
    anime: { url: '/edge/anime/:id', params: ['1'] },
    'anime episodes': { url: '/edge/episodes' },
    'anime episode': { url: '/edge/episodes/:id', params: ['1'] },
    'trending anime': { url: '/edge/trending/anime' },
    mangas: { url: '/edge/manga' },
    manga: { url: '/edge/manga/:id', params: ['1'] },
    'manga chapters': { url: '/edge/manga/chapters' },
    'manga chapter': { url: '/edge/manga/chapters/param-1', params: ['1'] },
    'trending manga': { url: '/edge/trending/manga' },
    categories: { url: '/edge/categories' },
    category: { url: '/edge/manga/categories/:id', params: ['1'] },
    'media relationships': { url: '/edge/media-relationships' },
    'media relationship': { url: '/edge/media-relationships/:id', params: ['1'] },
    mappings: { url: '/edge/mappings' },
    mapping: { url: '/edge/mappings/:id', params: ['1'] },
    franchises: { url: '/edge/franchises' },
    franchise: { url: '/edge/franchises/:id', params: ['1'] },
    installments: { url: '/edge/installments' },
    installment: { url: '/edge/installments/:id', params: ['1'] },
    streamers: { url: '/edge/streamers' },
    streamer: { url: '/edge/streamers/:id' },
    'streaming links': { url: '/edge/streaming-links' },
    'streaming link': { url: '/edge/streaming-links/:id', params: ['1'] },
    reports: { url: '/edge/reports' },
    report: { url: '/edge/reports/:id', params: ['1'] },
  },
  'coin desk': {
    'bitcoin price': { url: '/currentprice.json' },
    'historical price': { url: '/historical/close.json' },
    conversion: { url: '/currentprice/:currency.json', params: ['JPY'] },
  },
  bored: {
    'random activity': { url: '/activity' },
    'specific activity': { url: '/activity?key=:key', params: ['5881028'] },
    'activity by type': { url: '/activity?type=:type', params: ['recreational'] },
    'activity by price range': { url: '/activity?minprice=:minprice&maxprice=:maxprice', params: ['0', '1'] },
  },
  agify: {
    'age by name': { url: '?name=:name', params: ['matthew'] },
    'batch age': {
      url: '?name[]=:name1&name[]=:name2&name[]=:name3',
      params: ['ryan', 'michael', 'ryanmichael'],
    },
    localization: { url: '?name=:name&country_id=:country_id', params: ['ashley', 'US'] },
  },
  genderize: {
    'gender by name': { url: '?name=:name', params: ['ashley'] },
    'batch gender': {
      url: '?name[]=:name1&name[]=:name2&name[]=:name3',
      params: ['anivia', 'xerath', 'darius'],
    },
    localization: { url: '?name=:name&country_id=:country_id', params: ['anivia', 'US'] },
  },
  nationalize: {
    'nationality by name': { url: '?name=:name', params: ['jonas'] },
    'batch nationality': {
      url: '?name[]=:name1&name[]=:name2&name[]=:name3',
      params: ['ulrich', 'martha', 'katharina'],
    },
  },
  'data usa': {
    'nation data by measure': { url: '?drilldowns=Nation&measures=:measure', params: ['Average Income'] },
    'national population': { url: '?drilldowns=Nation&measures=Population' },
    'state populations': { url: '?drilldowns=State&measures=Population' },
    'household income by race': { url: '?drilldowns=Race&measures=:measure', params: ['Household Income by Race'] },
    'poverty rate by race': {
      url: '?drilldowns=Race&measures=Poverty+Rate',
    },
    'custom drilldown by measure': {
      url: '?drilldowns=:drilldown&measures=:measure',
      params: ['County', 'Adult Obesity'],
    },
  },
  ipify: {
    'get ip': { url: '?format=json' },
  },
  ipinfo: {
    'my ip details': { url: ' ' },
    'get details by ip': { url: '/:ip', params: ['173.245.48.0/20'] },
  },
  'random user': {
    'get user': { url: ' ' },
    'get multiple users': { url: '/?results=:number', params: ['20'] },
    'get user by gender': { url: '/?gender=:gender', params: ['female'] },
    'get user with password': { url: '/?password=:passwordType', params: ['1-16'] },
  },
  zippopotam: {
    'zip details': { url: '/:country/:zip', params: ['us', '90210'] },
    'get zip': { url: '/us/:state/:city', params: ['ma', 'belmont'] },
  },
}

const createUrl = (name: string, endpoint: string, params?: string[]): UrlResult => {
  let counter = -1
  let matches: string[] = []
  const url = `${baseUrls[name]}${endpoint}`.replace(/:[\w]+/gm, (match: string) => {
    counter++
    matches.push(match)
    return encodeURIComponent(params[counter])
  })

  return { url, matches }
}

export { DOCS, APIS, createUrl }
