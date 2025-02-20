import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services'; 
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import {Route,Switch } from 'react-router';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Protectedroute from './ProtectedRoute'
import { useEffect, useState } from 'react';

 

function App() { 

  const[auth,setauth]=useState(false);
  const[auth1,setauth1]=useState(true);
  const isLoggedIn=async()=>{

    try{
            const res=await fetch("/auth",{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"

              },
              credentials:"include"
            });

             if(res.status === 200){
              setauth(true)
              setauth1(false)
             }

             if(res.status === 401){
              setauth(false)
              setauth1(true)
             }

    }catch(error){
            console.log(error)
    }
  }

  useEffect(()=>{
       isLoggedIn(); 
  },[]);
  return (
    <>
      
      <Navbar auth={auth1} />
       
        <Switch> 
        <Route exact path='/' component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path='/service' component={Services} />
        <Route exact path='/contact' component={Contact} />  
        <Protectedroute exact path='/login' component={Login} auth={auth1}/> 
        <Protectedroute exact path='/register' component={Register} auth={auth1}/> 
        <Protectedroute exact path='/dashboard' component={Dashboard} auth={auth}/> 
        <Protectedroute exact path='/logout' component={Logout} auth={auth}/> 
       
        </Switch>  
       
       
      <Footer />
      
        

     
      <Footer /> 
    </>
  );
}

export default App;
