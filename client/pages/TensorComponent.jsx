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
            
            return (
                <div className='mpr'>
                <DicomComponent plane={p1} shiftClick={(a,b)=>setCordinate((cordinate)=>({
                    "x":a,
                    "y":b,
                    "z":cordinate.z,
                }))}/>
                <DicomComponent plane={p2} shiftClick={(a,b)=>setCordinate((cordinate)=>({
                    "x":a,
                    "y":cordinate.y,
                    "z":b,
                }))}/>
                <DicomComponent plane={p3} shiftClick={(a,b)=>setCordinate((cordinate)=>({
                    "x":cordinate.x,
                    "y":a,
                    "z":b,
                }))}/>
            </div>
        )
    }
}
