import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import { Context } from '.';
import './App.css';

import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    check().then(data => {
        user.setUser(true);
        user.setIsAuth(true);
        user.setUserInfo(data.id)
        user.setUserRole(data.role)
        user.setUserFish(data.name)
    }).finally(() => setLoading(false));
  }, []);
  
  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
      {user.isAuth ?
        <NavBar/>
       :
       <div/>
      }
      <AppRouter/>
      {user.isAuth ?
      <Footer/>
       :
       <div/>
      }
    </BrowserRouter>
  );
});

export default App;
