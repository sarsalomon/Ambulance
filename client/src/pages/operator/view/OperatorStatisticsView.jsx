import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Button, Table, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCall, fetchStatistic } from '../../../http/managerAPI';
import Paginations from '../../../components/Paginations';
import { confirmAlert } from 'react-confirm-alert';


const OperatorStatisticsView = observer(() => {
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const history = useNavigate();

    useEffect(()=>{
        // const interval = setInterval(() => {
            fetchStatistic().then(data => setAllItems(data));
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
    const deleteC = async (id) => {
        try{
            let data;
            data = await deleteCall(id)
            if (data){
                toast.success(`O'chirildi`, {
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

    const Calldelete = (id) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi Xonodoni o`chirishga?',
            buttons: [
              {
                label: 'Ha',
                onClick: () => deleteC(id)
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
            <Container fluid>
                <div className="application">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Statistika</title>
                    </Helmet>
                </div>
                <h2 className='text-center'>Statistika</h2>
                <Row>
                    
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>
                                        Manzil - Obyekt
                                    </th>
                                    <th>
                                        Kirish - Qavat - Taraf - Xonodon
                                    </th>
                                    <th>
                                        Kasallik - Tashxis
                                        <br/>                                    
                                        Manzil
                                        <br/>                                    
                                        Holati
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentItem.map((statistics, index)  =>
                                    <tr
                                        key={statistics._id}
                                    >
                                        <td>{cpi + index + 1}</td>
                                        <th>
                                            {statistics.districtTitle} -   {statistics.houseTitle}
                                        </th>
                                        <th>
                                            {statistics.entranceTitle} - {statistics.floorTitle} - {statistics.sideTitle} - {statistics.apartmentTitle}
                                        </th>
                                        <th>
                                            {statistics.diseaseTitle} - {statistics.diseaseInfoTitle}
                                            <br/>
                                            <a href={`https://www.google.ru/maps/@${statistics.blatitude},${statistics.blongitude},50m/data=!3m1!1e3`} target="_blank" rel="noopener noreferrer">Boshlangich</a> - <a href={`https://www.google.ru/maps/@${statistics.elatitude},${statistics.elongitude},50m/data=!3m1!1e3`} target="_blank" rel="noopener noreferrer">Yakuniy</a>
                                            <br/>
                                            {statistics.status}
                                            <br/>
                                            <Button variant="danger" className="ms-2" onClick={() => Calldelete(statistics._id)}>O'chirish</Button>
                                        </th>
                                    </tr>
                                )}
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

export default OperatorStatisticsView;