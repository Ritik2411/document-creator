import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import './Texteditor.css'
import { EditorState,convertFromRaw,convertToRaw } from 'draft-js'
import { setDoc, doc, getDoc } from '@firebase/firestore'
import { useSelector } from 'react-redux'
import db from '../firebase'

function Texteditor({id}) {
    
    const state = useSelector(state=>state.user)
    const [data,setData] = useState([])
    const [editorstate,setEditorstate] = useState(EditorState.createEmpty())
    
    useEffect(async()=>{
        if(state.user === undefined || state.user === null){
            console.log("User not found")
        }
        else{
            const snapshot = await getDoc(doc(db,"user",`${state.user.uid}`,"docs",`${id}`))
            setData(snapshot.data())
        }
    },[state.user])

    useEffect(() => {
        if (data?.editorState) {
          setEditorstate(
            EditorState.createWithContent(
              convertFromRaw(data?.editorState)
            )
          );
        }
        else{
            console.log("Crash")
        }
      }, [data]);
    
    const editorStateChange = (editorState) => {
        setEditorstate(editorState)

        setDoc(doc(db,"user",`${state.user.uid}`,"docs",`${id}`),{
            editorState:convertToRaw(editorstate.getCurrentContent())
        },{merge:true})
    }

    return (
        <div className="editor-div">
            <Editor
                toolbarClassName="toobarstyling"
                editorClassName="editorstyling"
                editorState={editorstate}
                onEditorStateChange={editorStateChange}
            />
        </div>
    )
}

export default Texteditor
