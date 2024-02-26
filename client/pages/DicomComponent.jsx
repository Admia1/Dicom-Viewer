import React, { useEffect, useRef } from 'react'


export default function DicomComponent(input) {
  const fileData = input.fileData
  const min_gray = 0
  const max_gray = 100
  const pixelArray = fileData.pixelArray

  const scale = 2

  const Canvas = props => {
    
    const canvasRef = useRef(null)
    
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      fileData.pixelArray.forEach((row, i) => {
        row.forEach((pixel,j) => {
          let color = pixel* fileData.s1 + fileData.s2
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

    }, [])
  
    return <canvas ref={canvasRef} {...props} />
  }
    
  const width = scale*pixelArray[0].length
  const height = scale*pixelArray.length
  
  return (
    <Canvas id="myCanvas" width={`${width}`} height={`${height}`} className='dicom'>
      Your browser does not support the HTML canvas tag.
    </Canvas>
  )
}
