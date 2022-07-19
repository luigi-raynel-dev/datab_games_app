import React, { useEffect, useState } from 'react';
import { Toast as ReactToast, ToastContainer } from 'react-bootstrap';

import styles from './Toast.module.css'

export default function Toast({ toast, setToast }) {

  const [count, setCount] = useState(0);

  useEffect(
    () => {
      setInterval(() => setCount(prevCount => prevCount + 1), 30 * 1000);
    },
    []
  )

  const removeToast = (remove_toast) => {
    let new_toast = toast.filter(function (value, toast) {
      return toast !== remove_toast;
    })
    setToast(new_toast)
  }

  const getTime = (date) => {
    const seconds = ((new Date()).getTime() - date.getTime()) / 1000
    if (seconds < 60) {
      return "Agora"
    } else if (seconds < 120) {
      return Math.floor(seconds / 60) + " minuto atrás"
    } else {
      return Math.floor(seconds / 60) + " minutos atrás"
    }
  }

  return (
    <ToastContainer className={styles.toast}>
      {toast.map(({ content, date }, index) => {
        return <ReactToast onClose={() => removeToast(index)} key={index}>
          <ReactToast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">{process.env.REACT_APP_NAME}</strong>
            <small className="text-muted">{getTime(date)}</small>
          </ReactToast.Header>
          <ReactToast.Body>{content}</ReactToast.Body>
        </ReactToast>
      }
      )}
    </ToastContainer>
  )
}