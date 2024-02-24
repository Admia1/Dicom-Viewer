import React from 'react'

export default function BackButton( input) {
    const setNavigator = input.setNavigator
  return (
    <div 
      className='back'
      onClick={()=> {setNavigator((navigator)=>({
        dir: navigator.dir.slice(0,navigator.dir.lastIndexOf("/")),
        file: ""
      }))}}>
        BACK
      </div>
  )
}
