import {Button, Card, Container, Form} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {Helmet} from "react-helmet";
import React, { useContext, useState } from 'react';
import { Context } from '..';
import { authorizationtosystem } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { ADMIN_DASHBOARD_ROUTE, MANAGER_DASHBOARD_ROUTE, OPERATOR_DASHBOARD_ROUTE, STATISTICS_DASHBOARD_ROUTE } from '../utils/consts';
import { ToastContainer, toast } from 'react-toastify';

const Auth = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [logins, setLogins] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            data = await authorizationtosystem(logins, password);
            if (data){
                // user.setUser(user);
                // user.setIsAuth(true);
                // navigate(OPERATOR_DASHBOARD_ROUTE);
                user.setUserInfo(data.id)
                user.setUserRole(data.role)
                user.setUserFish(data.name)
                user.setUser(user)
                user.setIsAuth(true)
                if(data.role === 'Admin'){
                    navigate(ADMIN_DASHBOARD_ROUTE);
                }else if(data.role === 'Manager'){
                    navigate(MANAGER_DASHBOARD_ROUTE);
                }else if(data.role === 'Operator'){
                    navigate(OPERATOR_DASHBOARD_ROUTE);
                }else if(data.role === 'Statistics'){
                    navigate(STATISTICS_DASHBOARD_ROUTE);
                }
            }
        } catch (e){
            toast.error(e.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Tizimga kirish</title>
                </Helmet>
            </div>
            <Container
                className='d-flex justify-content-center align-items-center '
                style={{height: window.innerHeight-54}}
            >
                <Card style={{width: 600}} className='p-5 shadow'>
                    <h2 className='m-auto'>Tizimga kirish</h2>
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-2'
                            placeholder='Login yozing...'
                            value={logins}
                            onChange={e => setLogins(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Parol yozing...'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            variant='success'
                            size="lg" 
                            className='mt-3 align-self-end'
                            onClick={click}
                        >
                            Kirish
                        </Button>
                    </Form>
                </Card>
                <ToastContainer />
            </Container>
        </div>
    );
});

export default Auth;