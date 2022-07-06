import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { getHouse, fetchDistrict, fetchObject, updateHouse } from '../../../http/managerAPI';
import { Context } from '../../..';
import { MANAGER_HOUSE_ROUTE } from '../../../utils/consts';
import { Link } from 'react-router-dom';


const HouseUpdate = observer(() => {
    const {user} = useContext(Context);
    const {id} = useParams();
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

    const handleSubmit = event => {
        event.preventDefault();
    
        UpdateData();
    };

 
    useEffect(() => {
        getHouse(id).then(data => {
            setDistrict(data.districtId);
            setObject(data.objectId);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setEntranceCount(data.entranceCount);
            setFloorCount(data.floorCount);
            setFirstDoor(data.firstdoor);
            setTitle(data.title);
            setDualityOrTrinity(data.dualityortrinity);
        })
    }, [])


    useEffect(() => {
        fetchDistrict().then(data => setDistricts(data));
    }, []);


    useEffect(() => {
        if (district) {
            fetchObject().then(data => setObjects(data));
        }
    }, [district]);


    const UpdateData = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('districtId', district);
            formData.append('objectId', object);
            formData.append('entranceCount', entranceCount);
            formData.append('floorCount', floorCount);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('firstdoor', firstdoor);
            formData.append('dualityortrinity', dualityortrinity);
            formData.append('title', title);
            formData.append('whoAdd', user._userinfo);
            data = await updateHouse(formData).then(data => {
                setDistrict(district);
                setObject(object);
                setLatitude(latitude);
                setLongitude(longitude);
                setEntranceCount(entranceCount);
                setFloorCount(floorCount);
                setFirstDoor(firstdoor);
                setTitle(title);
            });
            toast.info(`Uy yangilandi`, {
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
                    <title>Uyni yangilash</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_HOUSE_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Uyni Yangilash</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Manzil tanlash</Form.Label>
                                <Form.Select
                                    value={district}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setDistrict(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {districts.map(district =>
                                            <option key={district._id}
                                                value={district._id} 
                                                selected={district._id == district ? true : false}
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
                                    value={object}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setObject(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>obyekt</option>
                                        {objects.map(object =>
                                            <option key={object._id}
                                                value={object._id} 
                                                selected={object._id == object ? true : false}
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
                                    placeholder='2'
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
                                    placeholder='4'
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
                                    placeholder='2'
                                    value={firstdoor}
                                    onChange={e=>setFirstDoor(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Obyekt tanlash</Form.Label>
                                <Form.Select
                                    value={dualityortrinity}
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
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Kenglik</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='40.911607'
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
                                    placeholder='69.615744'
                                    value={longitude}
                                    onChange={e=>setLongitude(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Nomi</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='5'
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

export default HouseUpdate;