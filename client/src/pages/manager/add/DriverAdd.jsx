import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { addDriver, fetchCar } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';
import { MANAGER_DRIVER_ROUTE } from '../../../utils/consts';

const DriverAdd = observer(() => {
    const {user} = useContext(Context)
    const [cars,setCars] = useState([]);
    const [car,setCar] = useState('');
    const [title,setTitle] = useState('');
    const [phone,setPhone] = useState('');
    const [birthday,setBirthday] = useState('');
    const [address,setAddress] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    
        DataAdd();
    };

 
    useEffect(() => {
        fetchCar().then(data => setCars(data));
    }, []);

    const DataAdd = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('carId', car);
            formData.append('title', title);
            formData.append('phone', phone);
            formData.append('birthday', birthday);
            formData.append('address', address);
            formData.append('whoAdd', user._userinfo);
            data = await addDriver(formData).then(data => {
                setCar('');
                setTitle('');
                setPhone('');
                setBirthday('');
                setAddress('');
            })
            toast.success(`Shopir tizimga qo'shildi`, {
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
                    <title>Haydovchi qo'shish</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_DRIVER_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Haydovchi qo'shish</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Moshina tanlash</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedCar = e.target.value
                                        setCar(seletcedCar);
                                    }}
                                >  
                                    <option value={''}>Moshina</option>
                                        {cars.map(car =>
                                            <option key={car._id}
                                                value={car._id} 
                                            >
                                                {car.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>F.I.SH</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Toshtimorv Sanjar'
                                    value={title}
                                    onChange={e=>setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <Form.Group className="mb-3">
                                <Form.Label>Telefon Raqam</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='+998907548803'
                                    value={phone}
                                    onChange={e=>setPhone(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Manzil</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ezgulik 12'
                                    value={address}
                                    onChange={e=>setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Col> 
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Tug'ilgan kun</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={birthday}
                                    onChange={e=>setBirthday(e.target.value)}
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

export default DriverAdd;