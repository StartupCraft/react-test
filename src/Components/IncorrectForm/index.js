import React, { useCallback, useState } from 'react'

import faker from 'faker'
import { nanoid } from 'nanoid'

import Field from './Field'

const IncorrectForm = () => {
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
      comment: '',
    },
  ])

  const createNewField = () => {
    setFields([
      ...fields,
      { name: faker.name.findName(), id: nanoid(), comment: '' },
    ])
  }

  const handleCommentChange = useCallback(
    (val, id) => {
      setFields(
        fields.map(field =>
          field.id !== id
            ? field
            : {
                ...field,
                ...{ comment: val },
              },
        ),
      )
    },
    [fields, setFields],
  )

  // useEffect(() => {
  //   console.log(fields)
  // }, [fields])

  return (
    <>
      <h4>Incorrect form field behavior</h4>
      <button type="button" onClick={createNewField}>
        Add more
      </button>
      <ol>
        {fields.map(field => (
          <Field
            handleCommentChange={handleCommentChange}
            key={field.id}
            {...field}
          />
        ))}
      </ol>
    </>
  )
}

export default IncorrectForm
