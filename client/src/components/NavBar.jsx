import {Container, Nav, Navbar, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_DASHBOARD_ROUTE, LOGIN_ROUTE, OPERATOR_DASHBOARD_ROUTE, MANAGER_DASHBOARD_ROUTE } from '../utils/consts';
import React, { useContext } from 'react';
import { Context } from '..';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    let navbarText
    if(user._userrole === 'Admin'){
        navbarText = [
            <NavLink to={ADMIN_DASHBOARD_ROUTE} className="mx-4">Elektron Tez Tibbiy Yordam</NavLink>
        ] 
    }else if(user._userrole === 'Manager'){
        navbarText = [
            <NavLink to={MANAGER_DASHBOARD_ROUTE} className="mx-4">Elektron Tez Tibbiy Yordam</NavLink>
        ]
    }else if(user._userrole === 'Operator'){
        navbarText = [
            <NavLink to={OPERATOR_DASHBOARD_ROUTE} className="mx-4">Elektron Tez Tibbiy Yordam</NavLink>
        ]
    }

    const logOut = () =>{
        localStorage.clear();
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    }
    
    return (
        <header className='mb-5'>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        {navbarText}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Dropdown>
                            <Dropdown.Toggle variant='success'>
                                {user._userfish}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => logOut()}>Chiqish</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
});

export default NavBar;