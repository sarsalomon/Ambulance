import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { AdmindeleteUser, AdminfetchUser } from '../../../http/adminAPI';
import { ADMIN_GET_USER_ROUTE } from '../../../utils/consts';

const AdminUserView = observer(() => {
    const [items, setItems] = useState([]);
    const history = useNavigate();

    useEffect(()=>{
        AdminfetchUser().then(data => setItems(data));
    },[])

    const Userdelete = (id) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi Foydalanuvchini o`chirishga?',
            buttons: [
              {
                label: 'Ha',
                onClick: () => AdmindeleteUser(id)
              },
              {
                label: 'Yo`q'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Foydalanuvchilar</title>
                </Helmet>
            </div>
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fish</th>
                                    <th>Phone</th>
                                    <th>Depart</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item=>
                                        <tr key={item._id}>
                                            <td>{item.fish}</td>
                                            <td>{item.fish}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.departmentName}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => history(ADMIN_GET_USER_ROUTE + '/' + item._id)}>Yangilash</Button>
                                                <Button variant="danger" className="ms-2" onClick={() => Userdelete(item._id)}>O'chirish</Button>
                                            </td>
                                        </tr>
                                    )   
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    );
});

export default AdminUserView;