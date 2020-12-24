import React, { useEffect, useState } from 'react'
import { DOCS, APIS, Endpoint, createUrl } from '../lib/api'
import JsonViewer from '../components/JsonViewer'
import classNames from 'classnames'
import highlight from 'highlight.js'
import Table from '../components/Table'
import ColorTag from '../components/ColorTag'

interface HomepageProps {
  name: string
  depth: number
}

export interface InputType {
  [key: string]: string
}

const Homepage = (props: HomepageProps) => {
  const [api, setApi] = useState<string>('studio gibli')
  const [json, setJson] = useState<object>()
  const [endpoint, setEndpoint] = useState<Endpoint>({ url: '', params: [] })
  const [inputs, setInputs] = useState<InputType>({
    input1: '',
    input2: '',
  })
  const [error, setError] = useState<boolean | null>(null)
  const [params, setParams] = useState<string[]>([])

  const isDefaultInput = Object.values(inputs).every((val) => val === '')

  useEffect(() => {
    const { url, params = [] } = Object.values(APIS[api])[0]

    onEndpointChange(url, params)
  }, [api])

  const onEndpointChange = async (url: string, params: string[]) => {
    setEndpoint({ url, params })

    if (url.length > 0) {
      const { url: newUrl, matches } = createUrl(api, url, isDefaultInput ? params : [...Object.values(inputs)])
      const requestJson = await (await fetch(newUrl)).json()

      setParams(matches)
      setJson(requestJson)
      setError(null)
    }

    if (Object.values(inputs).some((val) => val.length > 0)) {
      setInputs({ input1: '', input2: '' })
    }
  }

  const onEndpointSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { params = [], url } = JSON.parse(e.target.value)

    onEndpointChange(url, params)
  }

  const onApiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setApi(e.target.value)

  const onClick = async () => {
    const { url, matches } = createUrl(api, endpoint.url, isDefaultInput ? endpoint.params : [...Object.values(inputs)])
    const response = await fetch(url)

    setParams(matches)

    if (response.status === 200) {
      // success
      const json = await response.json()
      setJson(json)
      setError(false)
    } else {
      // error
      const { status, statusText, url } = response
      const headers: string[] = []
      response.headers.forEach((header) => headers.push(header))

      setJson({ errorCode: status, error: statusText, url, body: response.text(), headers })
      setError(true)
    }
  }

  const onInputChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputs((prevState) => ({ ...prevState, [key]: value }))
  }

  // console.log('rerender', { api, endpoint, inputs, error })

  return (
    <>
      <div className='w-full bg-gray-900 text-white pt-7'>
        <div className='flex flex-col w-3/5 mx-auto'>
          <p className='text-sm text-blue-400'>Designed for developers</p>
          <p className='text-xl'>A compilation of some free internet treasures</p>
          <p className='text-sm text-gray-400'>
            Take a quick look at the available endpoints with the explorer below and start experimenting
          </p>
        </div>
      </div>
      <div className='w-full bg-gray-900 pt-7'>
        <div className='w-3/5 mx-auto'>
          <div className='grid grid-rows-3 sm:grid-cols-3 sm:grid-rows-1'>
            <div className='pr-5 mb-2'>
              <p className='text-sm text-white'>Free Resources</p>
              <p className='text-sm text-gray-400'>Cycle through a collection of apis and supported endpoints</p>
            </div>
            <div className='pr-5 mb-2'>
              <p className='text-sm text-white'>Testing Utility</p>
              <p className='text-sm text-gray-400'>Use the interactive api console to create custom requests.</p>
            </div>
            <div className='pr-5 mb-2'>
              <p className='text-sm text-white'>Identify Properties</p>
              <p className='text-sm text-gray-400'>Examine valuable metadata and paginate through results.</p>
            </div>
          </div>
        </div>
        <div className='w-3/5 mx-auto pt-7'>
          <ColorTag type='href' content={DOCS[api]} />
          <ColorTag
            type='p'
            content={createUrl(api, endpoint.url, isDefaultInput ? endpoint.params : [...Object.values(inputs)]).url}
          />
          <Table
            api={api}
            onApiSelect={onApiSelect}
            onEndpointSelect={onEndpointSelect}
            onInputChange={onInputChange}
            inputs={inputs}
            endpoint={endpoint}
            params={params}
            codeContent={
              createUrl(api, endpoint.url, isDefaultInput ? endpoint.params : [...Object.values(inputs)]).url
            }
          />
        </div>
        <div className='flex w-3/5 mx-auto mt-4'>
          <button
            disabled={params.length === 0}
            onClick={onClick}
            className={classNames(
              'shadow-md capitalize bg-green-500 text-white py-1 px-7 rounded-sm mr-2 mb-4',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-300 disabled:shadow-none',
              'hover:bg-green-600'
            )}
          >
            Request
          </button>
        </div>
      </div>
      <div className='w-full py-4 bg-gray-900 pt-3'>
        <div className='w-3/5 mx-auto'>
          <JsonViewer json={json} error={error} />
        </div>
      </div>
    </>
  )
}

export default Homepage
