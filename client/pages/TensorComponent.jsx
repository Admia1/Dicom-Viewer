import React, {useState} from 'react'
import DicomComponent from './DicomComponent'

export default function TensorComponent(inp) {

    const tensor = inp.tensor
    const [cordinate,setCordinate] = useState({
        "x":0,
        "y":0,
        "z":0,
    })

    if (tensor.length ==0){
        return (<div>Nothing to show</div>)
    }else{

            
            const p1 = tensor[cordinate.z]
            const p2 = tensor.map((img)=>img[cordinate.y])
            const p3 = tensor.map((img)=>img.map((row)=>row[cordinate.x]))
            const min_gray= 0
            const max_gray= 100
            return (
                <div className='mpr'>

                <DicomComponent plane={p1}
                xCordinate={cordinate.x} yCordinate={cordinate.y}
                xColor={"rgb(255,0,0)"} yColor={"rgb(0,255,0)"}
                min_gray={min_gray} max_gray={max_gray}
                shiftClick={(a,b)=>setCordinate((cordinate)=>({
                    "x":a,
                    "y":b,
                    "z":cordinate.z,
                }))}/>

                <DicomComponent plane={p2}
                xCordinate={cordinate.x} yCordinate={cordinate.z}
                xColor={"rgb(255,0,0)"} yColor={"rgb(0,0,255)"}
                min_gray={min_gray} max_gray={max_gray}
                shiftClick={(a,b)=>setCordinate((cordinate)=>({
                    "x":a,
                    "y":cordinate.y,
                    "z":b,
                }))}/>

                <DicomComponent plane={p3}
                xCordinate={cordinate.y} yCordinate={cordinate.z}
                xColor={"rgb(0,255,0)"} yColor={"rgb(0,0,255)"}
                min_gray={min_gray} max_gray={max_gray}
                shiftClick={(a,b)=>setCordinate((cordinate)=>({
                    "x":cordinate.x,
                    "y":a,
                    "z":b,
                }))}/>
            </div>
        )
    }
}
