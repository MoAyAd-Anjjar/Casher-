import React from 'react'
import List from './List'
import View from './view'
import Camera from './Camera'


function Cash() {
  return (
    <div className='flex w-auto'>
      <View/>      
      <List/>
      {/* <Camera/> */}
    </div>
  )
}

export default Cash
