import React, { useEffect, useRef } from 'react'

export default function DicomComponent(input) {
  const pixelArray = input.plane
  const shiftClick = input.shiftClick
  const xCordinate = input.xCordinate
  const yCordinate = input.yCordinate
  const min_gray = input.min_gray
  const max_gray = input.max_gray
  const xColor = input.xColor
  const yColor = input.yColor

  const scale = 1

  const Canvas = props => {
    
    const canvasRef = useRef(null)
    
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      pixelArray.forEach((row, i) => {
        row.forEach((pixel,j) => {
          let color = pixel
          if (color < min_gray){
            color=min_gray
          }
          if (color>max_gray){
            color=max_gray
          }
          color = Math.floor((color-min_gray)*(255)/(max_gray-min_gray))
          if (color<0){
            color =0
          }
          if (color>255){
            color=255
          }

          context.fillStyle =`rgb(${color}, ${color}, ${color})`
          context.fillRect(scale*j, scale*i, scale, scale)
        })
      });

      context.fillStyle = xColor
      context.fillRect(xCordinate, 0, 1, scale*pixelArray.length)
      context.fillStyle = yColor
      context.fillRect(0, yCordinate, scale*pixelArray[0].length, 1)


    }, [])
  
    return <canvas ref={canvasRef} onClick={(action)=>{
      const x = Math.floor(action.clientX - canvasRef.current.getBoundingClientRect().x) 
      const y = Math.floor(action.clientY - canvasRef.current.getBoundingClientRect().y , action)
      
      if (action.shiftKey){//move to point
        shiftClick(x,y)
      }else{//show labels
        1+1
      }
      console.log(x,y,action)
    
    }
    } {...props} />
  }
    
  const width = scale*pixelArray[0].length
  const height = scale*pixelArray.length
  
  return (
    <Canvas id="myCanvas" width={`${width}`} height={`${height}`} className='dicom' >
      Your browser does not support the HTML canvas tag.
    </Canvas>
  )
}
