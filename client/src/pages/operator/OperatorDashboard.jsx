import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Context } from '../..';
import ReceptionModal from '../../components/ReceptionModal';
import ReceptionModalMap from '../../components/ReceptionModalMap';
import { fetchDistrict } from '../../http/operatorAPI';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { OPERATOR_STATISTICS_ROUTE } from '../../utils/consts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { fetchTraking } from '../../http/managerAPI';

const OperatorDashboard = observer(() => {
    const {user} = useContext(Context)
    const [items,setItems] = useState([]);
    const [name,setName] = useState('');
    const [tanid,setTanid] = useState('');
    const [brandVisible, setBrandVisible] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const [allItems, setAllItems] = useState([]);

    const markerIcon = new L.Icon({
        iconUrl: require(`../../assets/icons/white.png`),
        iconSize: [80, 40],
    });
    
    useEffect(()=>{
        const interval = setInterval(() => {
            fetchTraking().then(data => setAllItems(data));
        }, 3000);
        return () => clearInterval(interval);
    },[])
    
    useEffect(() => {
        fetchDistrict(name).then(data => setItems(data));
    }, [name]);

    const openModel = async (id, whoAdd, title) => {
        setTanid(id);
        setBrandVisible(true);
        setName('');
    }    
    
    const openModelMap = async () => {
        setMapVisible(true);
    }
    
    let search
    if(items.length > 0){
        search = <div>
            {items.map(district =>
                <li key={district._id} className="mt-3"> <span onClick={() => openModel(district._id, user._userinfo, district.title)} style={{cursor: 'pointer'}}  className="me-5"> {district.title}</span></li>
            )}
        </div>
    }

    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Operator boshqarish paneli</title>
                </Helmet>
            </div>
            <Container>
                <Link to={OPERATOR_STATISTICS_ROUTE}><Button variant='outline-success ms-4'>Statistika</Button></Link>
                <Row>
                    <Col>
                        <Form.Label><h4>Xaritadan yuborish</h4></Form.Label>
                    </Col>
                    <Col>
                        <Button onClick={() => openModelMap()}>Xaritadan tanlash</Button>
                    </Col>
                </Row>
                <ReceptionModalMap show={mapVisible} onHide={() => setMapVisible(false)} id={tanid} whoAdd={user._userinfo}/>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><h4>Manzilni qidirish</h4></Form.Label>
                                <Form.Control type="text" 
                                    placeholder="1-mkr"     
                                    value={name}
                                    onChange={e=>setName(e.target.value)} 
                                />
                            </Form.Group>
                        </Form>
                        <ul className="search_result">
                            { search }
                        </ul>
                    </Col>
                </Row>
                <ReceptionModal show={brandVisible} onHide={() => setBrandVisible(false)} id={tanid} whoAdd={user._userinfo}/>
                <ToastContainer />
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <MapContainer center={[40.905636, 69.6433945]} zoom={15} maxZoom={17} scrollWheelZoom={true} className={'OperatorMap'}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />
                             {allItems.map((item,index) =>
                                    <Marker position={[item.latitude, item.longitude]} icon={markerIcon}>
                                        <Popup>
                                            {item.title}
                                        </Popup>
                                    </Marker>
                                    )   
                                }
                        
                        </MapContainer>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default OperatorDashboard;