import React, { useEffect, useState } from 'react'
import { Placeholder } from 'react-bootstrap';

import styles from './TableLoading.module.css'

export default function TableLoading(props) {

  const [lines, setLines] = useState([]);

  useEffect(() => {
    let lines = [];
    for (let x = 0; x < props.lines; x++) {
      let columns = []
      props.columns.map((column) => {
        columns.push(Math.floor(Math.random() * (column.max - column.min)) + column.min)
      })
      lines.push(columns)
    }
    setLines(lines)
  }, []);

  return (
    <tbody className={styles.wait}>
      {lines.map((line, line_index) => {
        return <tr key={line_index + 1}>
          {line.map((column, column_index) => {
            return <td key={column_index}>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={column} />
              </Placeholder>
            </td>
          })}
        </tr>
      })}
    </tbody>
  );
}