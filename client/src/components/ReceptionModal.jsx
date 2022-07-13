import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { fetchApartment, fetchHouse } from '../http/managerAPI';
import { addCall, fetchDriver } from '../http/operatorAPI';

const ReceptionModal = observer(({show, onHide, id, whoAdd, title}) => {
    const [drivers, setDrivers] = useState([]);
    const [driver, setDriver] = useState('');
    const [houses, setHouses] = useState([]);
    const [house, setHouse] = useState('');
    const [apartments, setApartments] = useState([]);
    const [apartment, setApartment] = useState('');
    
    useEffect(() => {
        if(id !== ''){
            fetchHouse(id).then(data => setHouses(data));
        }
    }, [id]);

  
    useEffect(() => {
        if(house !== '' && id !== ''){
            fetchApartment(id, house).then(data => setApartments(data));
            fetchDriver().then(data => setDrivers(data));
        }
    }, [house, id]);


    const callAdd = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('districtId', id);
            formData.append('objectId', '');
            formData.append('houseId', house);
            formData.append('apartmentId', apartment);
            formData.append('peopleId', '');
            formData.append('operatorId', whoAdd);
            formData.append('driverId', driver);
            formData.append('type', 1);
            data = await addCall(formData);
            setDriver('');
            toast.success(`Qabulga qo'shildi`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            if(data){
                onHide();
                return false;
            }
        }catch(e) {
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
    console.log(id)
    console.log(house)
    console.log(apartments)
    console.log(apartment)
    return (
        <div>
               <Modal
                    show={show}
                    onHide={onHide}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Qabul qo'shish
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Row className="mt-3">
                                <Col xs={6} md={6} className='d-flex'>                         
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setHouse(seletcedItem);
                                        }}
                                    >  
                                    <option value={''}>Uylar</option>
                                        {houses.map(house =>
                                            <option  key={house._id}
                                                value={house._id} 
                                            >
                                                {house.title}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Col>
                                <Col xs={6} md={6} className='d-flex'>                         
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setApartment(seletcedItem);
                                        }}
                                    >  
                                    <option value={''}>Xonodonlar</option>
                                        {apartments.map(apartment =>
                                            <option  key={apartment._id}
                                                value={apartment._id} 
                                            >
                                                {apartment.title}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={6} md={6} className='d-flex'>                         
                                    <Form.Select
                                        onChange={(e) => {const seletcedDriver = e.target.value
                                            setDriver(seletcedDriver);
                                        }}
                                    >  
                                    <option value={''}>Haydovchilar</option>
                                        {drivers.map(driver =>
                                            <option  key={driver._id}
                                                value={driver._id} 
                                            >
                                                {driver.title}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Col>
                                <Col xs={6} md={6} className="text-end">
                                    <Button variant="outline-success" onClick={callAdd} type="submit" size="lg">Qabulga qo'shish</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                <ToastContainer />
                </Modal>
        </div>
    );
});

export default ReceptionModal;