import React, { useCallback, useState } from 'react'

import faker from 'faker'
import { nanoid } from 'nanoid'

import { Column } from 'Components/Post/styles'

const Form = () => {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
      inputKey: '',
    },
  ])

  function handlePush() {
    setFields([
      { name: faker.name.findName(), id: nanoid(), inputKey: '' },
      ...fields,
    ])
  }

  const handleCommentChange = useCallback(
    (val, id) => {
      const state = fields.slice()
      const index = state.findIndex(field => field.id === id)
      state[index] = {
        ...state[index],
        inputKey: val,
      }
      setFields([...state])
    },
    [fields, setFields],
  )

  const handleInput = useCallback(
    (e, id) => {
      handleCommentChange(e.target.value, id)
    },
    [handleCommentChange],
  )

  return (
    <Column>
      <h4>Incorrect form field behavior</h4>
      <button type="button" onClick={handlePush}>
        Add more
      </button>
      <ol>
        {fields.map((field, index) => (
          <li key={index}>
            {field.name}:<br />
            <input
              type="text"
              value={field.inputKey}
              onChange={e => handleInput(e, field.id)}
            />
          </li>
        ))}
      </ol>
    </Column>
  )
}

export default Form
