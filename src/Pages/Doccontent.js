import React, { useState } from 'react'
import { useLocation,useParams } from 'react-router-dom'
import Texteditor from '../Components/Texteditor'
import './Doccontent.css'

function Doccontent() {
    const [loading,setLoading] = useState(true)
    const {id} = useParams() 
    const {state} = useLocation()
    console.log(state)
    console.log(id)

    setTimeout(()=>{
        setLoading(false)
    },5000)

    return (
        <>
            {
                (loading)?(
                    <div style={{textAlign:'center',marginTop:'50px'}}>
                        <h1>Loading...</h1>
                    </div>
                    
                ):(
                    <div className="doc-container">
                        <p className="doc-name">{state.docname}</p>
                        
                        <div style={{marginTop:'10px'}}>
                            <Texteditor id={id}/>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Doccontent
