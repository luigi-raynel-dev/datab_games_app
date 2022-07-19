import React, { useState, useContext } from 'react'
import { Card, Col, Placeholder, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

import Alert from '../component/Alert';
import List from '../component/List';
import { api } from "../services/api"

import { ToastContext } from '../Router'

export default function Order({orderId}) {

  let navigate = useNavigate()
  var moment = require('moment');

  const addToast = useContext(ToastContext)

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState(null);
  const [alert, setAlert] = useState([])
  const addAlert = add_alert => setAlert([...alert, add_alert])

  const getOrder = (search, page) => {
    setItems(null)
    api(navigate, addToast).get(`/orders/${orderId}`)
      .then(response => {
        if (response.status === 200) {
          setItems(response.data.items);
          setOrder(response.data);
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

  return (
    <>
      <Alert alert={alert} setAlert={setAlert} />
      <Row>
      <Col md={12}>
                {
                  order ? (
                    <Card className="text-center">
                        <Card.Header>{order?.code}</Card.Header>
                        <Card.Body>
                            <Card.Title>Pedido #{order?.id}</Card.Title>
                            <Card.Text>
                            Valor total R$: <b>{order?.total}</b>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">{order && moment(order.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')}</Card.Footer>
                    </Card>
                    ) : (
                      <Card className="text-center">
                        <Card.Header>
                          <Placeholder as="div" animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                        </Card.Header>
                        <Card.Body>
                          <Placeholder as="div" animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                          <Placeholder as="div" animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                          <Placeholder as="div" animation="glow">
                            <Placeholder xs={12} />
                          </Placeholder>
                        </Card.Footer>
                      </Card>
                    )
                  }
        </Col>
        <Col md={12}>
            <h4>Items</h4>
        </Col>
        <Col md={12}>
          <List tableProps={{ striped: true }}
            header={[
              { key: "name", name: "Produto" },
              { key: "price", name: "Preço unit.", prefix: "R$" },
              { key: "amount", name: "Qtd" },
              { key: "item_total", name: "Total", prefix: "R$" }
            ]}
            itens={
              items
                ? cloneDeep(items).map((value, index) => {
                  value.created_at = moment(value.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')
                  value.status = 'default'
                  return value
                })
                : null
            }
            itemKey={"id"}
            getItens={getOrder}
            total={items?.length} />
        </Col>
      </Row>
    </>
  );
}