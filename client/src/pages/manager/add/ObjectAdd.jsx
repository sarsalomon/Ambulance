import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { addObject } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';
import { MANAGER_OBJECT_ROUTE } from '../../../utils/consts';

const ObjectAdd = observer(() => {
    const {user} = useContext(Context)
    const [title, setTitle] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    
        DataAdd();
    };

 
    const DataAdd = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('whoAdd', user._userinfo);
            data = await addObject(formData).then(data => {
                setTitle('');
            });
            toast.success(`Obyekt tizimga qo'shildi`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
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
                    <title>Obyekt qo'shish</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_OBJECT_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Obyekt qo'shish</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Obyekt nomi</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='4'
                                    value={title}
                                    onChange={e=>setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end">
                            <Button variant="success" onClick={DataAdd}>Qo`shish</Button>
                        </Col>
                    </Row>
                </Form>
                <ToastContainer />
            </Container>
        </div>
    );
});

export default ObjectAdd;