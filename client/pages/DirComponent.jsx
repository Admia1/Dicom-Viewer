import React from 'react'

export default function DirComponent(
    inputs,
) {
    const dirs = inputs.dirs
    const setNavigator = inputs.setNavigator
    return (
    <div className='dir'>
        {dirs.map((dir,idx)=>(
            <div key={idx} 
              onClick={()=> {setNavigator((navigator)=>({
                dir: navigator.dir + "/" + dir,
                file: ""
              }))}}>
              <p>{dir}</p>
            </div>
          ))
        }
      </div>
  )
}
