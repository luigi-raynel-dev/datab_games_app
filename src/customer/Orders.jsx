import React, { useState, useContext } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

import Alert from '../component/Alert';
import List from '../component/List';
import { api } from "../services/api"

import { ToastContext } from '../Router'
import Order from './Order';

export default function Orders() {

  let navigate = useNavigate()
  var moment = require('moment');

  const addToast = useContext(ToastContext)

  const [orders, setOrders] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [modalOrder, setModalOrder] = useState(false);
  const [submiting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState([])
  const addAlert = add_alert => setAlert([...alert, add_alert])

  const getOrders = (search, page) => {
    setOrders(null)
    api(navigate, addToast).get(`/orders`)
      .then(response => {
        if (response.status === 200) {
          setOrders(response.data);
        }
        return response
      })
      .catch(err => {
        addAlert({
          variant: 'danger',
          title: 'Ops,',
          content: 'Ocorreu um erro durante a consulta dos dados, tente novamente em alguns instantes, se o problema persistir entre em contato com o nosso suporte.'
        })
        console.error("Erro: " + err)
      })
  }

  const toggleModalDocument = (item) => { 
    if(typeof item === "number") setOrderId(item)
    setModalOrder(!modalOrder)
  }

  return (
    <>
      <Alert alert={alert} setAlert={setAlert} />
      <Row>
      <Col md={12}>
          <h4>Pedidos:</h4>
      </Col>
        <Col md={12}>
          <List tableProps={{ striped: true }}
            header={[
              { key: "id", name: "#" },
              { key: "code", name: "Cód" },
              { key: "total", name: "Total", prefix: "R$" },
              { key: "created_at", name: "Data" }
            ]}
            itens={
              orders
                ? cloneDeep(orders).map((value, index) => {
                  value.created_at = moment(value.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')
                  value.status = 'clickable'
                  return value
                })
                : null
            }
            itemKey={"id"}
            getItens={getOrders}
            onClickItem={toggleModalDocument}
            itemStatus={"status"}
            total={orders?.length} />
        </Col>
      </Row>

      {/* Modal do pedido */}
      <Modal show={modalOrder}
        size="xl"
        keyboard={false}
        onHide={toggleModalDocument}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ver pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Order orderId={orderId}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
            disabled={submiting}
            onClick={toggleModalDocument}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}