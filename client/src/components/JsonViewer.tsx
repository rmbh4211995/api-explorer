import React, { useState, useEffect } from 'react'
import isArray from 'lodash.isarray'
import formatHighlight from 'json-format-highlight'
import Check from '../icons/check.svg'
import Cross from '../icons/cross.svg'

interface JsonViewerProps {
  json: object[] | object
  error: boolean | null
}

interface Indexes {
  start: number
  end: number
}

const maxPerPage = 3

const JsonViewer = ({ json, error }: JsonViewerProps) => {
  const [{ start, end }, setIndexes] = useState<Indexes>({ start: 0, end: 1 })
  const [results, setResults] = useState<object[]>([])

  useEffect(() => {
    if (isArray(json)) {
      setResults(json)
      setIndexes({ start: 0, end: Math.min(maxPerPage, json.length) })
    } else {
      setResults([json])
      setIndexes({ start: 0, end: 1 })
    }
  }, [json])

  const onPrev = () => {
    setIndexes(({ start, end }) => ({
      start: Math.min(start - maxPerPage, results.length),
      end: Math.min(end - maxPerPage, results.length),
    }))
  }

  const onNext = () => {
    setIndexes(({ start, end }) => ({
      start: Math.min(start + maxPerPage, results.length),
      end: Math.min(end + maxPerPage, results.length),
    }))
  }

  const prettifyJson = formatHighlight(results.slice(start, end), {
    keyColor: 'black',
    numberColor: 'blue',
    stringColor: '#0B7500',
    trueColor: '#00cc00',
    falseColor: '#ff8080',
    nullColor: 'cornflowerblue',
  })

  return (
    <div className='mb-10'>
      <div className='flex flex-col flex-wrap shadow rounded-b-sm rounded-tr-sm p-6 bg-gray-100 text-gray-800'>
        <div className='flex items-center mb-4'>
          {error === false && (
            <React.Fragment>
              <Check className='mr-4' />
              <span className='text-sm' style={{ color: '#1EC957' }}>
                Success!
              </span>
            </React.Fragment>
          )}
          {error === true && (
            <React.Fragment>
              <Cross className='mr-4' />
              <span className='text-sm' style={{ color: '#ff4646' }}>
                Error
              </span>
            </React.Fragment>
          )}
        </div>
        <pre className='text-xs h-96 max-h-96 overflow-auto whitespace-pre-wrap break-all md:break-words'>
          <code dangerouslySetInnerHTML={{ __html: prettifyJson }} />
        </pre>
      </div>
      <div className='flex justify-center mx-auto mt-4 shadow rounded-sm bg-gray-100 p-2'>
        <button
          onClick={onPrev}
          disabled={start === 0}
          className='text-sm rounded-sm bg-blue-500 text-white py-1 px-3 mr-4 disabled:cursor-not-allowed disabled:opacity-20'
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={end + 3 > results.length}
          className='text-sm rounded-sm bg-blue-500 text-white py-1 px-3 disabled:cursor-not-allowed disabled:opacity-20'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default JsonViewer
