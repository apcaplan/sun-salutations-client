import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { transparentize, lighten } from 'polished'

const baseColor = '#485ccf'
const borderRadius = '3px'

const Input = styled.input`
  border-radius: ${borderRadius};
  border: 1px solid lightgray;
  padding: .5rem .75rem;
  font-size: 100%;
  display: block;
  width: 100%;
  margin: 0 0 1rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 0.2rem ${transparentize('0.7', baseColor)};
  }
`
const Form = styled.form`
  max-width: 500px;
  margin: 1rem auto;

  > h3 {
    margin: 3rem 0 1rem;
  }
`
const Button = styled.button`
  border: 0;
  border-radius: ${borderRadius};
  padding: .65rem 1rem;
  font-size: 100%;
  color: white;
  background-color: ${lighten(-0.125, baseColor)};

  &:hover {
    background-color: ${baseColor};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${transparentize('0.7', baseColor)};
  }
`

const RecordForm = ({ record, handleChange, handleSubmit, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <label>Date</label>
    <Input
      placeholder="Enter date"
      value={record.date}
      name="date"
      onChange={handleChange}
    />

    <label>Rounds completed</label>
    <Input
      placeholder="Number of rounds"
      value={record.rounds_completed}
      name="rounds_completed"
      onChange={handleChange}
    />
    <label>Rounds set</label>
    <Input
      placeholder="Enter number of rounds set"
      value={record.rounds_set}
      name="rounds_set"
      onChange={handleChange}
    />
    <label>Notes</label>
    <Input
      placeholder="Enter notes"
      value={record.notes}
      name="notes"
      onChange={handleChange}
    />

    <Button type ="submit">Submit</Button>
    <Link to={cancelPath}>
    </Link>
  </Form>
)

export default RecordForm
