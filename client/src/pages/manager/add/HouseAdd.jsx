import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchDistrict, fetchObject, addHouse } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';
import { MANAGER_HOUSE_ROUTE } from '../../../utils/consts';

const HouseAdd = observer(() => {
    const {user} = useContext(Context);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [objects, setObjects] = useState([]);
    const [object, setObject] = useState('');
    const [title, setTitle] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [entranceCount, setEntranceCount] = useState('');
    const [floorCount, setFloorCount] = useState('');
    const [firstdoor, setFirstDoor] = useState('');
    const [dualityortrinity, setDualityOrTrinity] = useState('');
    const [normalornot, setNormalOrNot] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    
        DataAdd();
    };


    useEffect(() => {
        fetchDistrict().then(data => setDistricts(data));
    }, []);


    useEffect(() => {
        if (district) {
            fetchObject().then(data => setObjects(data));
        }
    }, [district]);

    const DataAdd = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('districtId', district);
            formData.append('objectId', object);
            formData.append('entranceCount', entranceCount);
            formData.append('floorCount', floorCount);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('firstdoor', firstdoor);
            formData.append('dualityortrinity', dualityortrinity);
            formData.append('normalornot', normalornot);
            formData.append('whoAdd', user._userinfo);
            data = await addHouse(formData);
            if (data) {
                setDistrict(district);
                setObject(object);
                setEntranceCount('');
                setFloorCount('')
                setLatitude('');
                setLongitude('');
                setFirstDoor('');
                setDualityOrTrinity(dualityortrinity);
                setNormalOrNot(normalornot);
                setTitle('');
                toast.success(`Uy tizimga qo'shildi`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
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
                    <title>Uy qo'shish</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_HOUSE_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Uy qo'shish</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Manzil tanlash</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setDistrict(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {districts.map(district =>
                                            <option key={district._id}
                                                value={district._id} 
                                            >
                                                {district.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Obyekt tanlash</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setObject(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {objects.map(object =>
                                            <option key={object._id}
                                                value={object._id} 
                                            >
                                                {object.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Kirishlar soni</Form.Label>
                                <Form.Control
                                    type='text'
                                    // placeholder='2'
                                    value={entranceCount}
                                    onChange={e=>setEntranceCount(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Qavatlar soni</Form.Label>
                                <Form.Control
                                    type='text'
                                    // placeholder='4'
                                    value={floorCount}
                                    onChange={e=>setFloorCount(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>1-eshik soni</Form.Label>
                                <Form.Control
                                    type='text'
                                    // placeholder='2'
                                    value={firstdoor}
                                    onChange={e=>setFirstDoor(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Eshiklar soni</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setDualityOrTrinity(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>nechtalik</option>
                                    <option value={'1'}>1 talik</option>
                                    <option value={'2'}>2 talik</option>
                                    <option value={'3'}>3 talik</option>
                                      
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Normallik</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setNormalOrNot(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>nechtalik</option>
                                    <option value={'1'}>Bir xil</option>
                                    <option value={'2'}>2-3 aralash</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Kenglik</Form.Label>
                                <Form.Control
                                    type='text'
                                    // placeholder='40.911607'
                                    value={latitude}
                                    onChange={e=>setLatitude(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Uzunlik</Form.Label>
                                <Form.Control
                                    type='text'
                                    // placeholder='69.615744'
                                    value={longitude}
                                    onChange={e=>setLongitude(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Raqami</Form.Label>
                                <Form.Control
                                    type='text'
                                    // placeholder='5'
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

export default HouseAdd;