import React from 'react'

export default function FileComponent(
    inputs,
) {
    const files = inputs.files
    const setNavigator = inputs.setNavigator
    return (
    <div className='file'>
    {
        files.map((file,idx)=>(
        <div key={idx}
        onClick={()=> {setNavigator((navigator)=>({
            dir: navigator.dir,
            file: file
        }))}}>
            {file}
        </div>
        ))
    }
    </div>
  )
}
