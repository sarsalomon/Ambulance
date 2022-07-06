import React, { useContext } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { ADMIN_DASHBOARD_ROUTE, MANAGER_DASHBOARD_ROUTE, OPERATOR_DASHBOARD_ROUTE, STATISTICS_DASHBOARD_ROUTE } from '../utils/consts';

const NotFounded = observer(() => {
    const {user} = useContext(Context)
    let redirectButton
    if(user._userrole === 'Admin'){
        redirectButton = ADMIN_DASHBOARD_ROUTE
    }else if(user._userrole === 'Manager'){
        redirectButton = MANAGER_DASHBOARD_ROUTE
    }else if(user._userrole === 'Operator'){
        redirectButton = OPERATOR_DASHBOARD_ROUTE
    }else if(user._userrole === 'Statistics'){
        redirectButton = STATISTICS_DASHBOARD_ROUTE
    }
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Xatolik</title>
                </Helmet>
            </div>
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h2>Afsuki siz qidirgan sahifa topilmadi :(</h2>
                        <NavLink to={redirectButton}><Button variant='success'>Bosh sahifaga qaytish</Button></NavLink>
                    </Col>                    
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default NotFounded;