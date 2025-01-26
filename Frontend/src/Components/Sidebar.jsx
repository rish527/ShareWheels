import { CarFront, Gauge, Monitor, Siren, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='h-full min-w-30 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 pt-8'>
        <div className='w-full overflow-y-auto py-3'>
            <ul className='flex flex-col pl-8 gap-3 font-semibold text-lg'>
                <Link to='/dashboard'>
                    <li>
                        <button 
                            className='w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors'
                        >
                            <Gauge className='size-6' />
                            <p>Dashboard</p>
                        </button>
                    </li>
                </Link>

                <Link to='/dashboard/rides'>
                    <li>
                        <button 
                            className='w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors'
                        >
                            <CarFront className='size-6' />
                            <p>Rides</p>
                        </button>
                    </li>
                </Link>
                <Link to='/dashboard/monitor'>
                    <li>
                        <button 
                            className='w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors'
                        >
                            <Monitor className='size-6' />
                            <p>Live Monitoring</p>
                        </button>
                    </li>
                </Link>
                {/* <Link to='/dashboard/emergency'>
                    <li>
                        <button 
                            className='w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors'
                        >
                            <Siren className='size-6' />
                            <p>Emergency Center</p>
                        </button>
                    </li>
                </Link> */}
                <Link to='/dashboard/users'>
                    <li>
                        <button 
                            className='w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors'
                        >
                            <User className='size-6' />
                            <p>Users</p>
                        </button>
                    </li>
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar