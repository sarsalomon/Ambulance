import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addCall, fetchDriver } from '../http/operatorAPI';
import { fetchTerritory, fetchCityOrVillage, fetchDistrict, fetchNeighborhood, fetchStreet, fetchHouse, fetchApartment, fetchObject } from '../http/managerAPI';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvent } from 'react-leaflet'
import L from 'leaflet';

const ReceptionModalMap = observer(({show, onHide, whoAdd}) => {
    const [drivers, setDrivers] = useState([]);
    const [driver, setDriver] = useState('');
    const [latitude, setLatitude] = useState(40.905636);
    const [longitude, setLongitude] = useState(69.6433945);

    useEffect(() => {
        fetchDriver().then(data => setDrivers(data));
    }, []);

    const callAddM = async () => {
        try{
            let data;
            const formData = new FormData()
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('operatorId', whoAdd);
            formData.append('driverId', driver);
            formData.append('type', 3);
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

    const markerIcon = new L.Icon({
        iconUrl: require(`../assets/icons/marker-icon.png`),
        iconSize: [30, 60],
    });


    function MyComponent() {
        const map = useMapEvent('click', (event) => {
            const { lat, lng } = event.latlng;
            setLatitude(lat)
            setLongitude(lng)
        })
        return null
      }

    return (
        <div>
               <Modal
                    show={show}
                    onHide={onHide}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    // fullscreen={true}
                    dialogClassName="modal-80w"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Xaritadan 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container fluid>
                            <Row>
                                <Col>
                                    <MapContainer center={[40.905636, 69.6433945]} zoom={14} maxZoom={17} scrollWheelZoom={true}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        />
                                            <Marker position={[latitude, longitude]} icon={markerIcon}>
                                                <Popup>
                                                    A pretty CSS3 popup. <br /> Easily customizable.
                                                </Popup>
                                            </Marker>
                                            <MyComponent />
                                    </MapContainer>

                                </Col>
                            </Row>
                            <Row>
                                <span>Manzil: {latitude} - {longitude}   <a href={`https://www.google.ru/maps/@${latitude},${longitude},100m/data=!3m1!1e3`} target="_blank" rel="noopener noreferrer">Google</a></span>
                                <Form className='mt-2'>
                                    <Row>
                                        <Col>          
                                            <Form.Group className="mb-3">
                                                <Form.Select
                                                    onChange={(e) => {const seletcedDriver = e.target.value
                                                        setDriver(seletcedDriver);
                                                    }}
                                                >  
                                                <option value={''}>tanlang</option>
                                                    {drivers.map(driver =>
                                                        <option  key={driver._id}
                                                            value={driver._id} 
                                                        >
                                                            {driver.title}
                                                        </option>
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col className="text-end">
                                            <Button variant="success" onClick={callAddM}>Qo`shish</Button>
                                        </Col>
                                    </Row>
                                </Form>      
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
                <ToastContainer />
        </div>
    );
});

export default ReceptionModalMap;