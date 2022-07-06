import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { addEntrance } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';
import { MANAGER_ENTRANCE_ROUTE } from '../../../utils/consts';

const EntranceAdd = observer(() => {
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
            data = await addEntrance(formData).then(data => {
                setTitle('');
            });
            toast.success(`Kirish tizimga qo'shildi`, {
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
                    <title>Kirish qo'shish</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_ENTRANCE_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Kirish qo'shish</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Kirish nomi</Form.Label>
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

export default EntranceAdd;