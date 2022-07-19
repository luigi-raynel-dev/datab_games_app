import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useField } from 'formik';

export function Input({ label, description, ...props }) {
  const [field, meta] = useField(props);

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={props.id || props.name} hidden={!label}>{label}</Form.Label>
      <Form.Control {...field} {...props} isInvalid={meta.touched && meta.error} />
      {
        description
          ? <Form.Text className="text-muted">{description}</Form.Text>
          : null
      }
      {
        meta.touched && meta.error
          ? <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
          : null
      }
    </Form.Group>
  );
};

export function InputButton({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={props.id || props.name} hidden={!label}>{label}</Form.Label>
      <InputGroup className="mb-3">
        <FormControl {...field} {...props}
          isInvalid={meta.touched && meta.error} />
        {props.button}
        {
          meta.touched && meta.error
            ? <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
            : null
        }
      </InputGroup>
    </Form.Group>
  );
};