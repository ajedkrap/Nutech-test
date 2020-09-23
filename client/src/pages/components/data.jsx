import React from 'react';
import {
  Col, Media, Button
} from 'reactstrap';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


const { REACT_APP_URL } = process.env

const DataTable = (props) => {
  const { updateData, deleteData, goodsData } = props

  return (
    <Col className="p-0 m-0">

      {goodsData.length === 0 &&
        <div>
          No Data
          </div>
      }
      {goodsData.length > 0 &&
        goodsData.map((value, index) => {
          return <Media className="py-2" key={value.id + "" + index}>
            <Media left className="mx-2 border" href="#">
              <Media object src={REACT_APP_URL + value.picture} alt="Generic placeholder image" />
            </Media>
            <Media body>
              <Media heading>
                {value.name}
              </Media>
              <Col>{"Purchase Price : " + value.purchase_price}</Col>
              <Col>{"Selling Price : " + value.selling_price}</Col>
              <Col>{"Stock : " + value.stock}</Col>
            </Media>
            <Media right>
              <Col className="action">
                <Button className="mx-1 update" onClick={() => updateData(value)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button className="mx-1 delete" onClick={() => deleteData(value)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Col>
            </Media>
          </Media>
        })}

    </Col>
  );
}


export default DataTable;
