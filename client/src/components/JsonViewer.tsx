import React from 'react'

interface JsonViewerProps {
  json: object
}

const JsonViewer = ({ json }: JsonViewerProps) => {
  const prettifyJson = JSON.stringify(json, null, 2)

  return (
    <div className='flex flex-wrap w-30 bg-gray-900 text-white'>
      <pre className='whitespace-pre-wrap break-words'>{prettifyJson}</pre>
    </div>
  )
}

export default JsonViewer
