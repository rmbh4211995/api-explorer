import React from 'react'

interface ColorTagProps {
  type: string
  content: string
}

const propsAreEqual = (prevProps: ColorTagProps, nextProps: ColorTagProps) => {
  return prevProps.type === nextProps.type && prevProps.content === nextProps.content
}

const ColorTag: React.FunctionComponent<ColorTagProps> = React.memo(({ type, content }: ColorTagProps) => {
  // console.log('ColorTag rendered')

  const jsx =
    type === 'href' ? (
      <>
        <p className='w-min text-blue-400 border-2 border-blue-500 rounded-sm mr-2 mb-2 px-1 h-5 leading-4'>Docs</p>
        <a className='break-all text-sm shadow text-blue-700 hover:text-blue-600' href={content} target='_blank'>
          {content}
        </a>
      </>
    ) : type === 'p' ? (
      <>
        <p className='w-min text-green-400 border-2 border-green-500 rounded-sm mr-2 mb-2 px-1 h-5 leading-4'>Get</p>
        <p className='break-all text-gray-500'>{content}</p>
      </>
    ) : null

  return <div className='flex flex-col text-sm my-3 sm:flex-row sm:items-center'>{jsx}</div>
}, propsAreEqual)

export default ColorTag
