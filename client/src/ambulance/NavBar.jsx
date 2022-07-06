import {Container, Nav, Navbar, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import React, { useContext } from 'react';
import { Context } from '..';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.clear();
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    }
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Dropdown>
                            <Dropdown.Toggle variant='success'>
                                s
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