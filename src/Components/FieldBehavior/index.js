import React, { useState } from 'react'
import faker from 'faker'
import { nanoid } from 'nanoid'

// moved ...fields to the start of setFields, which makes adding more append to the end of the list, not the start.
function FieldBehavior() {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])

  function handlePush() {
    setFields([...fields, { name: faker.name.findName(), id: nanoid() }])
  }

  return (
    <>
      <h4>Incorrect form field behavior</h4>
      <button type="button" onClick={handlePush}>
        Add more
      </button>
      <ol>
        {fields.map((field, index) => (
          <li key={index}>
            {field.name}:<br />
            <input type="text" />
          </li>
        ))}
      </ol>
    </>
  )
}

export default FieldBehavior
