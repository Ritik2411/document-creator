import React, { useEffect } from 'react'
import './AddDoc.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import db from '../firebase';
import { doc, serverTimestamp, addDoc, collection } from '@firebase/firestore';
import { useSelector } from 'react-redux';

function AddDoc() {
    const state = useSelector(state=>state.user)
   
    const addDocs = () => {
        var docName = prompt("Enter document name")
        if(docName!== null){
            if(state.user == null){
                alert("Sign in first")
            }
            else{
                
                addDoc(collection(db,"user",`${state.user.uid}`,"docs"),{
                filename:docName,
                timestamp:serverTimestamp()
                })
                console.log("Doc added successfully")
            }
        }

        else{
            console.log("Operation Canceled")
        }
    }
    
    return (
        <div className="add-container">
            <div className="add-sub-container">
                <div className="new-doc-header">
                    <p style={{flexGrow:"1"}}>Start a new document</p>
                    <MoreVertIcon style={{color:"gray"}}/>
                </div>

                <div className="new-doc-add" onClick={addDocs}>
                    <AddIcon style={{fontSize:'80px',color:"#dee3e0"}}/>
                </div>

                <div>
                    <p style={{marginLeft:"5px",fontWeight:"600"}}>Blank</p>
                </div>
            </div>
        </div>
    )
}

export default AddDoc
