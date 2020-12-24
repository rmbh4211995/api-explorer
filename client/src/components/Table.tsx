import React, { useState } from 'react'
import { APIS, Endpoint } from '../lib/api'
import { InputType } from '../pages/Homepage'

import highlight from 'highlight.js'
import classNames from 'classnames'
import isEqual from 'lodash.isequal'

interface TableProps {
  api: string
  params?: string[]
  endpoint: Endpoint
  inputs: InputType
  codeContent: string
  onApiSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onEndpointSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onInputChange: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

const propsAreEqual = (prevProps: TableProps, nextProps: TableProps) => {
  return (
    prevProps.api === nextProps.api &&
    prevProps.endpoint === nextProps.endpoint &&
    isEqual(prevProps.inputs, nextProps.inputs) &&
    isEqual(prevProps.params, nextProps.params)
  )
}

const Table: React.FunctionComponent<TableProps> = React.memo(
  ({ api, endpoint, inputs, params, codeContent, onApiSelect, onEndpointSelect, onInputChange }: TableProps) => {
    const [selectedTab, setSelectedTab] = useState<string>('URL Parameters')

    const onTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setSelectedTab(e.currentTarget.name)
    }

    console.log('Table rendered in prod (:')

    return (
      <>
        {['URL Parameters', 'Code'].map((tab) => (
          <button
            key={tab}
            onClick={onTabClick}
            name={tab}
            className={classNames(
              'text-gray-400 text-sm mb-3 mr-2 pb-1 w-max focus:outline-none',
              selectedTab === tab && 'font-semibold text-blue-400 border-b-2 border-blue-400'
            )}
          >
            {tab}
          </button>
        ))}
        {selectedTab === 'URL Parameters' && (
          <table cellPadding={5} className='shadow rounded-sm text-left bg-white text-gray-700 table-auto w-full'>
            <tbody>
              <tr>
                <td>Api</td>
                <td>
                  <select className='capitalize min-w-44' name='api' id='api' value={api} onChange={onApiSelect}>
                    {Object.keys(APIS).map((key) => {
                      return (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Endpoint</td>
                <td>
                  <select className='capitalize min-w-44' name='endpoints' id='endpoints' onChange={onEndpointSelect}>
                    {Object.entries(APIS[api]).map(([key, value]) => {
                      const { url, params } = value
                      const json = JSON.stringify({ ...(params && { params }), url })

                      return (
                        <option key={json} value={json}>
                          {key}
                        </option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              {params.length > 0 &&
                endpoint.params.map((param, idx) => {
                  const name = `input${idx + 1}`
                  return (
                    <tr key={name}>
                      <td>
                        <span className='bg-gray-200 text-gray-500 rounded-sm px-4 py-1'>{params[idx]}</span>
                      </td>
                      <td>
                        <input
                          id={name}
                          className='text-gray-700 h-6 pl-2 mr-2 w-full sm:min-w-44'
                          value={inputs[name]}
                          onChange={(e) => onInputChange(name, e)}
                          placeholder={param}
                        />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        )}
        {selectedTab === 'Code' && (
          <pre className='hljs p-3 shadow rounded-sm'>
            <code
              dangerouslySetInnerHTML={{
                __html: highlight.highlight(
                  'javascript',
                  `const response = await fetch('${codeContent}')\n\nif (response.status === 200)` +
                    `\n\tconst json = await response.json()\nelse\n\tconsole.log(response.status, response.statusText)`
                ).value,
              }}
            />
          </pre>
        )}
      </>
    )
  },
  propsAreEqual
)

export default Table
