import React from 'react'
import './Header.css'
import { auth, provider } from '../firebase';
import { signInWithPopup,signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom'

function Header() {

    const state = useSelector(state=>state.user)
    const navigate = useNavigate()
    
    const signin = async() => {
        await signInWithPopup(auth,provider).then((res)=>{
            console.log("Sign in sucessful")     
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    const signout = () => {
        signOut(auth).then(()=>{
           navigate('/') 
           console.log("Sign out")  
        }).catch((err)=>{
            console.log(err)    
        })
    }

    return (
        <div style={{position:'sticky',zIndex:'90'}}>
            <div className="header-container">
                <Link to='/' style={{textDecoration:'none'}}>
                <div className="header-title">
                        <img src="https://img.icons8.com/color/48/000000/google-docs--v1.png" alt='no source' height="33px"/>    
                        <p className="header-title-name">Document Creator</p>
                    </div>
                </Link>

                <div style={{flexGrow:"1"}}/>

                <div className="header-user">
                    {
                        (state.user!==undefined && state.user!==null)?(<div className="user-image-div">
                                <img src={state.user.photoURL} alt="" height="35px" width="35px" className="user-image"/>
                                <div>
                                    <button className="logout-para" onClick={signout}>Logout</button>
                                </div>                        
                            </div>):(
                            <button className="login-button" 
                        onClick={signin}
                    >
                        Login
                    </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
