import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Components/Header';
import AddDoc from './Components/AddDoc';
import Doclist from './Components/Doclist';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { user } from './Redux/Action';
import Home from './Pages/Home'
import Doccontent from './Pages/Doccontent'

function App() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log("User is",authUser)
      if(authUser){
        dispatch(user({
          user:authUser
        }))
      }

      else{
        dispatch(user({
          user:null
        }))
      }
    })
  },[])

  return (
      <BrowserRouter>
        {}
        <Header/>
        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/doccontent/:id" element={<Doccontent/>}/>
        </Routes>    
      </BrowserRouter>
  );
}

export default App;
