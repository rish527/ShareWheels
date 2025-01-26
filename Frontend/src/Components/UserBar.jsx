import React from 'react'
import {AudioLines, PhoneCall} from 'lucide-react'

function UserBar({data}) {
  return (
    <div className='border-b-1 pb-1'>
        <div className='flex items-center gap-6 justify-between'>
            <div className='flex items-center gap-4 '>
                <div className='mask mask-circle h-10 w-10'>
                    <img src='/avatar.png' alt='Avatar' />
                </div>
                <div>
                    <div className='font-bold'>{data.carOwner}</div>
                    <div className='text-sm'>{data.carModel}</div>
                </div>
            </div>
            <div className="buttons flex gap-4">
                <button className='flex gap-2 p-2 border-2 rounded-xl' > <AudioLines size={20}/> <p className='font-normal'>Listen Audio </p></button>
                <button className='flex gap-2 p-2 border-2 rounded-xl pl-6 pr-6' > <PhoneCall size={20}/> <p className='font-normal'>Call</p> </button>
            </div>
        </div>
    </div>
  )
}

export default UserBar