import React from 'react';
import { Alert as ReactAlert } from 'react-bootstrap';

export default function Alert({ alert, setAlert }) {
  const removeAlert = (remove_alert) => {
    let new_alert = alert.filter(function (value, alert) {
      return alert !== remove_alert;
    })
    setAlert(new_alert)
  }

  return (
    <>
      {alert.map(({ variant, title, content }, index) => {
        return <ReactAlert variant={variant} onClose={() => removeAlert(index)} key={index} dismissible>
          <ReactAlert.Heading>{title}</ReactAlert.Heading>
          {
            Array.isArray(content)
              ? <>
                {
                  content.map((value) => {
                    return <p>{value}</p>
                  })
                }
              </>
              : (
                typeof content === 'string' || content instanceof String
                  ? <p>{content}</p>
                  : content
              )
          }
        </ReactAlert>
      }
      )}
    </>
  )
}

