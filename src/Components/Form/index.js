import React, { useState } from 'react'

import faker from 'faker'
import { nanoid } from 'nanoid'

const Form = () => {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  function handlePush() {
    setFields([{ name: faker.name.findName(), id: nanoid() }, ...fields])
  }

  return (
    <>
      <h4>
        <s>Incorrect</s> 💅 form field behavior
      </h4>
      <button type="button" onClick={handlePush}>
        Add more
      </button>
      <ol>
        {fields.map(({ name, id }, index) => (
          <li key={id}>
            {name}:<br />
            <input type="text" />
          </li>
        ))}
      </ol>
    </>
  )
}

export default Form
