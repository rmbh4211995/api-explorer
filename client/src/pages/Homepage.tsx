import React, { useEffect, useState } from 'react'
import JsonViewer from '../components/JsonViewer'

interface HomepageProps {
  name: string
  depth: number
}

interface Endpoint {
  base: string
  part?: string
}
interface ApisType {
  [key: string]: {
    [key: string]: Endpoint
  }
}

const baseUrls = {
  gibli: 'https://ghibliapi.herokuapp.com',
  digimon: 'https://digimon-api.vercel.app',
  pokemon: 'https://pokeapi.co/api/v2',
  publicApis: 'https://api.publicapis.org',
  openBreweries: 'https://api.openbrewerydb.org',
  jikan: 'https://api.jikan.moe/v3',
}

const Docs: { [key: string]: string } = {
  'studio gibli': 'https://ghibliapi.herokuapp.com/#',
  digimon: 'https://digimon-api.herokuapp.com/',
  pokemon: 'https://pokeapi.co/',
  'kanye rest': 'https://kanye.rest/',
  'public apis': 'https://github.com/davemachado/public-api',
  jikan: 'https://jikan.docs.apiary.io/#',
}

const Apis: ApisType = {
  'studio gibli': {
    films: { base: `${baseUrls.gibli}/films` },
    film: {
      base: `${baseUrls.gibli}/films/`,
      part: '2baf70d1-42bb-4437-b551-e5fed5a87abe',
    },
    people: { base: `${baseUrls.gibli}/people` },
    person: {
      base: `${baseUrls.gibli}/people/`,
      part: 'fe93adf2-2f3a-4ec4-9f68-5422f1b87c01',
    },
    locations: { base: `${baseUrls.gibli}/locations` },
    location: {
      base: `${baseUrls.gibli}/locations/`,
      part: '11014596-71b0-4b3e-b8c0-1c4b15f28b9a',
    },
    species: { base: `${baseUrls.gibli}/species` },
    specie: {
      base: `${baseUrls.gibli}/species/`,
      part: 'af3910a6-429f-4c74-9ad5-dfe1c4aa04f2',
    },
    vehicles: { base: `${baseUrls.gibli}/vehicles` },
    vehicle: {
      base: `${baseUrls.gibli}/vehicles/`,
      part: '4e09b023-f650-4747-9ab9-eacf14540cfb',
    },
  },
  digimon: {
    digimon: { base: `${baseUrls.digimon}/api/digimon` },
    digimonByName: {
      base: `${baseUrls.digimon}/api/digimon/name/`,
      part: 'agumon',
    },
    digimonByLevel: {
      base: `${baseUrls.digimon}/api/digimon/level/`,
      part: 'rookie',
    },
  },
  pokemon: {
    pokemon: { base: `${baseUrls.pokemon}/pokemon` },
    evolutions: { base: `${baseUrls.pokemon}/evolution-chain` },
    moves: { base: `${baseUrls.pokemon}/move` },
    locations: { base: `${baseUrls.pokemon}/location` },
    items: { base: `${baseUrls.pokemon}/item` },
    machines: { base: `${baseUrls.pokemon}/machine` },
    berries: { base: `${baseUrls.pokemon}/berry` },
  },
  'kanye rest': {
    quote: { base: 'https://api.kanye.rest' },
  },
  'public apis': {
    entries: { base: `${baseUrls.publicApis}/entries` },
    random: { base: `${baseUrls.publicApis}/random` },
    categories: { base: `${baseUrls.publicApis}/categories` },
    health: { base: `${baseUrls.publicApis}/health` },
  },
  jikan: {
    anime: { base: `${baseUrls.jikan}/search/anime?q=&order_by=id&sort=asc&page=1` },
    manga: { base: `${baseUrls.jikan}/search/manga?q=&order_by=id&sort=asc&page=1` },
    'action anime': { base: `${baseUrls.jikan}/anime/1` },
    'action manga': { base: `${baseUrls.jikan}/manga/1` },
  },
}

const Homepage = (props: HomepageProps) => {
  const [api, setApi] = useState<string>('studio gibli')
  const [json, setJson] = useState<object>()
  const [endpoint, setEndpoint] = useState<Endpoint>({
    base: '',
  })
  const [disabled, setDisabled] = useState<boolean>(true)
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    const getData = async () => {
      const url = part ? `${base}${part}` : base
      const requestJson = await (await fetch(url)).json()

      setJson(requestJson)
    }

    const { base, part } = endpoint

    if (input !== '') setInput('')
    if (base !== '') getData()
  }, [endpoint])

  useEffect(() => {
    const { base, part } = Object.values(Apis[api])[0]

    setDisabled(!part)
    setEndpoint({ base, part })
  }, [api])

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { part, base } = JSON.parse(e.target.value)

    setDisabled(!part)
    setEndpoint({ base, part })
  }

  const onApiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setApi(e.target.value)

  const onClick = async () => {
    const { base, part } = endpoint
    const url = input === '' ? `${base}${part}` : `${base}${input}`
    const response = await fetch(url)
    console.log(response)

    if (response.status === 200) {
      // success
      const json = await response.json()
      setJson(json)
    } else {
      // error
      const { status, statusText, url } = response
      const headers: string[] = []
      response.headers.forEach((header) => headers.push(header))

      setJson({ status, statusText, url, body: response.text(), headers })
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  return (
    <>
      <div className='flex justify-center items-center bg-gray-800 text-white py-2'>
        <p className='bg-red-400 py px-2 rounded-sm mr-2'>Api</p>
        <span className='text-lg mr-2 capitalize'>{api}</span>
      </div>
      <div className='flex justify-center items-center bg-blue-400 text-white py-4'>
        <p className='bg-blue-800 py px-2 rounded-sm mr-2'>Official Docs</p>
        <a className='underline text-blue-800 hover:text-blue-600' href={Docs[api]} target='_blank'>
          {Docs[api]}
        </a>
      </div>
      <div className='py-4 bg-gray-800'>
        <div className='w-max mx-auto'>
          <div className='text-white my-4'>
            {endpoint.base}
            {input !== '' ? input : endpoint.part}
          </div>
          <div className='flex flex-col items-center md:flex-row'>
            <button
              disabled={disabled}
              onClick={onClick}
              className='capitalize bg-green-900 text-white py px-4 rounded-sm mr-2 h-6 mb-4 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400'
            >
              Get
            </button>
            <select
              className='capitalize border border-gray-900 mr-2 h-6 mb-4'
              name='api'
              id='api'
              value={api}
              onChange={onApiSelect}
            >
              {Object.keys(Apis).map((key) => {
                return (
                  <option key={key} value={key}>
                    {key}
                  </option>
                )
              })}
            </select>
            <select
              className='capitalize border border-gray-900 mr-2 h-6 mb-4'
              name='endpoints'
              id='endpoints'
              onChange={onSelect}
            >
              {Object.entries(Apis[api]).map(([key, value]) => {
                const { part, base } = value
                const json = JSON.stringify({ ...(part && { part }), base })

                return (
                  <option key={json} value={json}>
                    {key}
                  </option>
                )
              })}
            </select>
            {!disabled && (
              <input className='text-gray-700 h-6 mb-4' value={input} onChange={onChange} placeholder={endpoint.part} />
            )}
          </div>
        </div>
      </div>
      <JsonViewer json={json} />
    </>
  )
}

export default Homepage
