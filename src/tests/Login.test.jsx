import React, {useState} from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Login from '../login/Login';
import { BrowserRouter } from 'react-router-dom';

function InputLogin() {
  const [value, setValue] = useState('')

  const handleChange = ev => {
    ev.preventDefault()
    setValue(ev.currentTarget.value)
  }  

  return <input value={value} aria-label="inputLogin" onChange={handleChange} />
}

const setup = () => {
  const utils = render(<InputLogin />)
  const input = utils.getByLabelText('inputLogin')
  return {
    input,
    ...utils,
  }
}

test('Inserir cnpj_cpf', async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
    const {input} = setup()
    expect(input.value).toBe('') // empty before
    fireEvent.change(input, {target: {value: '123.456.789-01'}})
    expect(input.value).toBe('123.456.789-01') //empty after
    fireEvent.click(screen.getByText('Consultar'))
    expect(screen.getByRole('button')).toBeDisabled()
});