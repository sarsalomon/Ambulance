import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { addDiseaseInfo, fetchDisease } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';
import { MANAGER_DISEASE_ROUTE } from '../../../utils/consts';

const DiseaseInfoAdd = observer(() => {
    const {user} = useContext(Context)
    const [items, setItems] = useState([]);
    const [info, setInfo] = useState([]);
    const [diseaseId,setDiseaseId] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    
        DataAdd();
    };

 
    useEffect(()=>{
        fetchDisease().then(data => setItems(data));
    },[])

    const DataAdd = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('diseaseId', diseaseId);
            formData.append('info', JSON.stringify(info));
            formData.append('whoAdd', user._userinfo);
            data = await addDiseaseInfo(formData).then(data => {
                setInfo([]);
                setDiseaseId('');
            })
            toast.success(`Kasalliklar tizimga qo'shildi`, {
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


    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Tashxis qo'shish</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_DISEASE_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Tashxis qo'shish</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Kasallik toifasi</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setDiseaseId(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>Kasallik</option>
                                        {items.map(item =>
                                            <option key={item._id}
                                                value={item._id} 
                                            >
                                                {item.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                                variant={"outline-dark"}
                                onClick={addInfo}
                                className="mb-3"
                            >
                                Tashxis qo'shish
                            </Button>
                            {info.map(i =>
                                <Row className="mt-1" key={i.number}>
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Tashxis nomi" className="mb-3">
                                            <Form.Control
                                                type="text" 
                                                placeholder="name@example.com" 
                                                value={i.title}
                                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="floatingInput" label="Tashxis tarifi" className="mb-3">
                                            <Form.Control
                                                type="text" 
                                                as="textarea"
                                                placeholder="name@example.com" 
                                                value={i.description}
                                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <Button
                                            onClick={() => removeInfo(i.number)}
                                            variant={"outline-danger"}
                                        >
                                            O'chirish
                                        </Button>
                                    </Col>     
                                </Row>
                            )}
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

export default DiseaseInfoAdd;