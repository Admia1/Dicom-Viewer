import React, {useContext, useEffect, useState} from 'react'
import DirComponent from './DirComponent'
import FileComponent from './FileComponent'
import BackButton from './BackButton'
import DicomComponent from './DicomComponent'

function index() {

  const [files, setFiles] = useState([])
  const [dirs, setDirs] = useState([])
  const [fileData, setFileData] = useState({
    s1:0,
    s2:0,
    pixelArray:[[]]
  })
  const [navigator, setNavigator] = useState({
    dir:process.env.NEXT_PUBLIC_startingDir,
    // dir: "/home/admia/DS/COLO/manifest-sFI3R7DS3069120899390652954/CT COLONOGRAPHY",
    file: ""
  })



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
      })
      
  }, [navigator])
  
  return (
    <div>
      {(navigator.file != "") && <DicomComponent fileData={fileData} />}
      <div><small>{navigator.dir}</small></div>
      <div><small>{navigator.file}</small></div>
      <BackButton setNavigator={setNavigator} />
      <FileComponent files={files} setNavigator={setNavigator}/>
      <DirComponent dirs={dirs} setNavigator={setNavigator}/>
    </div>
  )
}

export default index