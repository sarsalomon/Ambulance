import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Button, Table, Form  } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate } from 'react-router-dom';
import { deleteObject, fetchAllObject } from '../../../http/managerAPI';
import { MANAGER_ADD_OBJECT_ROUTE, MANAGER_GET_OBJECT_ROUTE } from '../../../utils/consts';
import Paginations from '../../../components/Paginations';

const ObjectView = observer(() => {
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const history = useNavigate();

    useEffect(()=>{
        // const interval = setInterval(() => {
            fetchAllObject().then(data => setAllItems(data));
        // }, 1000);
        // return () => clearInterval(interval);
    },[])

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItem = allItems.slice(firstItemIndex, lastItemIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    let paginates = null
    if(allItems.length>5){
      paginates =  <Paginations
      itemsPerPage={itemsPerPage}
      totalItems={allItems.length}
      paginate={paginate}
      currentPage={currentPage}
  />
    }
    
    const deleteO = async (id) => {
        try{
            let data;
            data = await deleteObject(id)
            if (data){
                fetchAllObject().then(data => setAllItems(data));
                toast.success(`O'chirildi`, {
                    position: "bottom-left",
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
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

 
    const Objectdelete = (id) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi Obyektni o`chirishga?',
            buttons: [
              {
                label: 'Ha',
                onClick: () => deleteO(id)
              },
              {
                label: 'Yo`q'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    
    let cpi
    if(currentPage === 1){
        cpi = currentPage - 1
    }else if(currentPage >1){
        cpi = itemsPerPage * (currentPage - 1)
    }

    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Obyektlar</title>
                </Helmet>
            </div>
            <Container fluid>
                <h2 className='text-center'>Obyektlar</h2>
                <Row>
                    <Form>
                        <Row>
                            <Col md={2} xs={12} className="d-flex align-items-center">
                                <Link to={MANAGER_ADD_OBJECT_ROUTE}><Button variant='success'>Obyekt qo`shish</Button></Link>
                            </Col>
                            <Col>
                            </Col>
                            <Col md={2} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nechtalik</Form.Label>
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setItemsPerPage(seletcedItem);
                                        }}
                                    >  
                                        <option value={5}>tanlang</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                        <option value={250}>250</option>
                                        <option value={500}>500</option>
                                        <option value={1000}>1000</option>
                                        <option value={allItems.length}>{allItems.length}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nomi</th>
                                    <th>Harakat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItem.map((item,index) =>
                                        <tr key={item._id}>
                                            <td>{cpi + index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => history(MANAGER_GET_OBJECT_ROUTE + '/' + item._id)}>Yangilash</Button>
                                                <Button variant="danger" className="ms-2" onClick={() => Objectdelete(item._id)}>O'chirish</Button>
                                            </td>
                                        </tr>
                                    )   
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {paginates}
                <ToastContainer />
            </Container>
        </div>
    );
});

export default ObjectView;