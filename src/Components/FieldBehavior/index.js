import React, { useState } from 'react'
import faker from 'faker'
import { nanoid } from 'nanoid'

// Because data is missing from Post regarding what the next/prev id is from the server, I opted to pass the posts data to the post via it's state. I can then lookup the next/prev id from the returned list.
// This was the only solution I could think of that wouldn't cause a bad experience by clicking next and finding no post found (due to post being deleted or db id skipping)
// Used state to fix closure issue with show alert, alternate solution would be useRef but I thought this was cleaner and offered better user feedback
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
