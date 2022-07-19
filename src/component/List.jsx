import React, { useEffect } from 'react'
import { Col, Placeholder, Row, Table } from 'react-bootstrap';

import TableLoading from './TableLoading'

import styles from './List.module.css';

export default function List({ tableProps, theadProps, tbodyProps, header, itens, itemKey, itemStatus, getItens, onClickItem, page, total }) {

  useEffect(() => {
    getItens('', 0)
  }, []);

  return (
    <div>
      <Row>
        <Col md={12}>
          <Table style={itemStatus ? {cursor: 'pointer'} : {}} hover={itemStatus} responsive {...tableProps}>
            <thead  {...theadProps}>
              <tr>
                {header.map((header_line, header_index) => {
                  return <th key={header_index}>{header_line.name}</th>
                })}
              </tr>
            </thead>
            {
              itens
                ? <tbody  {...tbodyProps}>
                  {itens.length > 0
                    ? itens.map((item_value, item_index) => {
                      return <tr className={styles[item_value[itemStatus]]} 
                        key={item_index} 
                        onClick={() => item_value[itemStatus] === 'clickable' ? onClickItem(item_value[itemKey]) : false}>
                        {header.map((header_line, header_index) => {
                          return <td key={header_index}>{header_line.prefix} {item_value[header_line.key]}</td>
                        })}
                      </tr>
                    })
                    : <tr className={styles.neutral}><td colSpan="6">Sem resultado</td></tr>
                  }
                </tbody>
                : <TableLoading lines={3} columns={
                  header.map(() => {
                    return { min: 3, max: 8 }
                  })
                } />
            }
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md={12} className={styles.total}>
          <div className={styles.description}><b>Total:</b></div>
          {
            total !== null
              ? <div>{total}</div>
              : <Placeholder as="div" className={styles.placeholder} animation="glow">
                <Placeholder xs={2} />
              </Placeholder>
          }
        </Col>
      </Row>
    </div>
  );
}