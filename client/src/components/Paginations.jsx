import React from 'react';
import { Col, Container, Pagination, Row } from 'react-bootstrap';


const Paginations = ({itemsPerPage, totalItems, paginate, currentPage, categoryId}) => {
    const pageNumbers = []

    for (let i = 1; i <= (Math.ceil(totalItems/itemsPerPage)); i++){
        pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map((item) => { 
        if (item < currentPage + 3 && item > currentPage - 3) {
            return (
              <Pagination.Item className={currentPage === item ? "active" : null} key={item} onClick={() => paginate(item)}>{item}</Pagination.Item>
            );
          } else {
            return null;
        }
    });

    const handlePrevbtn = () => {
        if(currentPage>1){
            paginate(currentPage-1)
        }
    };
    const handleNextbtn = () => {
        if(currentPage<(Math.ceil(totalItems/itemsPerPage))){
            paginate(currentPage+1)
        }
    };

    let fistellipsis = null
    if(currentPage === 1 || currentPage === 2 || currentPage === 3){
    }else{
        fistellipsis = <Pagination.Ellipsis />
    }
    
    let lastellipsis = null
    if(currentPage === (Math.ceil(totalItems/itemsPerPage)-2) || currentPage === (Math.ceil(totalItems/itemsPerPage)-1)  || currentPage === (Math.ceil(totalItems/itemsPerPage))){
    }else{
        lastellipsis = <Pagination.Ellipsis />
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        {currentPage} show {(Math.ceil(totalItems/itemsPerPage))}
                    </Col>
                    <Col>
                        <Pagination>
                            <Pagination.First onClick={() => paginate(1)}/>
                            <Pagination.Prev onClick={() => handlePrevbtn()}/>       
                                {fistellipsis}
                                    {renderPageNumbers}  
                                {lastellipsis}
                            <Pagination.Next onClick={() => handleNextbtn()}/>
                            <Pagination.Last onClick={() => paginate((Math.ceil(totalItems/itemsPerPage)))}/>
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Paginations;