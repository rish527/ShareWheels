import React from 'react'

function RideColumn({data, index, selected, setSelected}) {
  return (
    <tr>
        <td className='flex justify-center'>
            {data.rideId}
        </td>
        <td >
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="mask mask-circle h-10 w-10">
                        <img src="/avatar.png" alt="Avatar" />
                    </div>
                </div>
                <div>
                    <div className="font-bold">{data.carOwner}</div>
                </div>
            </div>
        </td>
        <td>{data.riders.length} Riders</td>
        <td><progress className="progress progress-primary w-48 h-3" value={data.progress} max="100"></progress></td>
        <td className='flex justify-center'>
            <button className='btn' onClick={(e)=>setSelected(data.rideId)} >Monitor</button>
        </td>
    </tr>
  )
}

export default RideColumn;