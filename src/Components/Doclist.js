import React, { useState,useEffect } from 'react'
import './Doclist.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { collection, onSnapshot,doc,deleteDoc } from '@firebase/firestore';
import db from '../firebase';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';

function Doclist() {
    const state = useSelector(state=>state.user)
    const [data,setData] = useState([])
    const [copyData,setCopydata] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [search,setSearch] = useState('') 

    useEffect(async()=>{
        if(state.user === undefined || state.user === null){
            setData([])
        }
        else{
            await onSnapshot(collection(db,"user",`${state.user.uid}`,"docs"),((snapshot)=>{
                setData(snapshot.docs.map((data)=>({
                    id:data.id,
                    data:data.data()
                })))
            }))          
        }
    },[state.user])

    useEffect(()=>{
        var CD = data
        setCopydata(CD)
    },[data])
    

    const searchDoc = (e) => {
        console.log(data)
        const search = e.target.value
        setSearch(search)
        console.log(search)
        if(search === ''){
            setCopydata(data)
        }

        else{
            let filteredData = copyData.filter(doc => {
                return(
                    doc.data.filename.toLowerCase().includes(search.toLowerCase())
                )
            })
            setCopydata(filteredData)
        
        }   
    }

    const deleteDocs = async(id) => {
        const datas = (doc(db,"user",`${state.user.uid}`,"docs",id))
        await deleteDoc(datas)
        console.log("Doc deleted")
    }

    setTimeout(()=>{
        setLoading(false)
    },4000)

    return (
        <div style={{display:"flex",alignItems:'center',justifyContent:'center',marginTop:'50px',marginBottom:'10px'}}>
            <div className='doclist'>
                <div className="list-container">
                    <div style={{flexGrow:'1',display:'flex'}}><ArticleIcon style={{color:"#2196F3"}}/>&nbsp;<p>My Documents</p></div>
                    <p style={{marginLeft:'10px',marginRight:'10px'}}>Date Created</p>
                    <p style={{marginLeft:'10px',marginRight:'10px'}}>Delete Doc</p>
                </div>     

                <div style={{padding:'3px'}}>
                    <input 
                        type="text" 
                        className="search-doc" 
                        placeholder='Search docs'
                        value={search}
                        onChange={searchDoc}
                    />
                </div>    

                <div style={{height:'250px',overflowY:'scroll',overflowX:'hidden'}}>
                    {
                        (loading === true)?(
                                <h2 style={{textAlign:'center',marginTop:'10px'}}>Loading...</h2>
                            ):(
                                (copyData.length>0)?(
                                   copyData.map((data)=>{
                                     return(
                                        <div className="list-container-item">
                                            <p style={{flexGrow:'1'}}><span className="span-title" onClick={()=>{navigate(`/doccontent/${data.id}`,{state:{docname:data.data.filename}})}}>{data.data.filename}</span></p>
                                            <p style={{marginLeft:'10px',marginRight:'40px'}}>{(data.data.timestamp!==null)?(data.data.timestamp.toDate().toLocaleDateString()):("waiting")}</p>
                                            <IconButton onClick={()=>{deleteDocs(data.id)}}>
                                                <DeleteIcon style={{color:'gray',marginLeft:'10px',marginRight:'10px'}}/>
                                            </IconButton>
                                        </div>    
                                        )
                                    })
                                ):(
                                    <h2 style={{textAlign:'center',marginTop:'10px'}}>No Data</h2>
                                )   
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Doclist
