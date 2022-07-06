import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { getObject, updateObject } from '../../../http/managerAPI';
import { Context } from '../../..';
import { MANAGER_OBJECT_ROUTE } from '../../../utils/consts';
import { Link } from 'react-router-dom';


const ObjectUpdate = observer(() => {
    const {user} = useContext(Context)
    const [title, setTitle] = useState('');
    const {id} = useParams();

    const handleSubmit = event => {
        event.preventDefault();
    
        UpdateData();
    };

 
    useEffect(() => {
        getObject(id).then(data => {
            setTitle(data.title)
        })
    }, [])


    const UpdateData = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('whoAdd', user._userinfo);
            data = await updateObject(formData).then(data => {
                setTitle(title)
            });
            toast.info(`Obyekt yangilandi`, {
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
                    <title>Obyektni yangilash</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_OBJECT_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Obyektni Yangilash</h2>
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
                            <Button variant="success" onClick={UpdateData}>Yangilash</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
});

export default ObjectUpdate;