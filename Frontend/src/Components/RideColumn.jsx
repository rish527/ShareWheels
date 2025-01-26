import React from 'react'

function RideColumn({data, index}) {
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
        <td >
            <div className={`rounded-full px-3 py-2 text-md font-bold ${data.securityStatus === "Safe" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"} flex items-center justify-center ${data.securityStatus === "Stage 3" && "bg-red-200 text-red-800" }`}>
                {data.securityStatus}
            </div>
        </td>
    </tr>
  )
}

export default RideColumn