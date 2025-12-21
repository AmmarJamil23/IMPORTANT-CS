import React from 'react'
import { useState } from 'react';

const App = () => {
  const [jobs, setJobs] = useState([])


  return (
    <div className='w-80 min-h-[400px] bg-gray-100 p-4 shadow-lg font-sans'>

      <header className='mb-4'>
        <h1 className='text-xl font-bold text-blue-600'>JobTracker</h1>
        <p>Track Your Applications Easily</p>
      </header>

      <div>
        <p className='text-sm text-gray-600'>Ready to Save a New Job</p>

        <button className='mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition'>
          + Add New Job
        </button>
      </div>

    </div>
  )
}

export default App