import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { AdmindeleteObject, AdminfetchObject } from '../../../http/adminAPI';
import { ADMIN_GET_OBJECT_ROUTE } from '../../../utils/consts';

const AdminObjectView = observer(() => {
    const [items, setItems] = useState([]);
    const history = useNavigate();

    useEffect(()=>{
        AdminfetchObject().then(data => setItems(data));
    },[])

    const Objectdelete = (id) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi Oybektni o`chirishga?',
            buttons: [
              {
                label: 'Ha',
                onClick: () => AdmindeleteObject(id)
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
                    <title>Obyektni yangilash</title>
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
                                                <Button variant="primary" onClick={() => history(ADMIN_GET_OBJECT_ROUTE + '/' + item._id)}>Yangilash</Button>
                                                <Button variant="danger" className="ms-2" onClick={() => Objectdelete(item._id)}>O'chirish</Button>
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

export default AdminObjectView;