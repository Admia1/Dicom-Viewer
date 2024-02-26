import React, {useContext, useEffect, useState} from 'react'
import DirComponent from './DirComponent'
import FileComponent from './FileComponent'
import BackButton from './BackButton'
import TensorComponent from './TensorComponent'

function index() {

  const [tensor, setTensor] = useState([])
  const [files, setFiles] = useState([])
  const [dirs, setDirs] = useState([])
  const [fileData, setFileData] = useState({
    s1:0,
    s2:0,
    pixelArray:[[]]
  })
  const [navigator, setNavigator] = useState({
    dir:process.env.NEXT_PUBLIC_startingDir,
    file: ""
  })

  function getData(dir, files, index, imageTensor) {
    if (index < files.length){
      console.log("call", index)
      fetch("http://127.0.0.1:8080/api/nav",{
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "dir" :dir,
          "file":files[index],
        })
      })
      .then((response) => response.json())
      .then((data)=>{
        imageTensor.push(data.fileData.pixel_array.map((row) => row.map((instance) => instance*data.fileData.s1+data.fileData.s2)))
        return {"dir":dir, "files":files,"index":index}
      })
      .then((inp)=>{
        getData(inp.dir, inp.files, inp.index+1, imageTensor)
      })
    }else{
      setTensor(imageTensor)
      console.log("done",imageTensor.length)
    }
  }

  useEffect(() => {
      fetch("http://127.0.0.1:8080/api/nav",{
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "dir":navigator.dir,
          "file":navigator.file,
        })
      })
      .then((response) => response.json())
      .then((data)=>{
        setDirs(data.dir)
        setFiles(data.file)
        setFileData({
          s1:data.fileData.s1,
          s2:data.fileData.s2,
          pixelArray:data.fileData.pixel_array,
        })

        const imageTensor = []
        getData(navigator.dir, data.file, 0, imageTensor)
      })
      
  }, [navigator])
  
  return (
    <div>
      <TensorComponent tensor={tensor} />
      <div><small>{navigator.dir}</small></div>
      <div><small>{navigator.file}</small></div>
      <BackButton setNavigator={setNavigator} />
      <FileComponent files={files} setNavigator={setNavigator}/>
      <DirComponent dirs={dirs} setNavigator={setNavigator}/>
    </div>
  )
}

export default index