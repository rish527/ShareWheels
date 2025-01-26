import React from 'react'

function DataHolder({data}) {
  return (
    <div className='shadow-md bordered w-60 p-4 border-[1px] border-base-300 rounded-lg flex flex-col gap-2'>
        <h1 className='text-white text-4xl font-bold'>{data.value}</h1>
        <h1 className='font-medium text-xs'>{data.key}</h1>
    </div>
  )
}

export default DataHolder