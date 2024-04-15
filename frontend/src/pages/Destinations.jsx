import React from 'react'
import TopDestination from '../component/Destination/TopDestination'
import TourismPlaces from '../component/LocalTourism/LocalTourismPlaces'

const Destinations = () => {
  return (
    <div className='md:w-4/5 mx-auto'>
    <TopDestination/>
    <TourismPlaces/>
    </div>
  )
}

export default Destinations