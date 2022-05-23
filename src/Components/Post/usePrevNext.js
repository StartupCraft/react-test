import { useMemo } from 'react'

import { useQuery } from '@apollo/client'

import postExist from 'GraphQL/Queries/postExist.graphql'

const usePrevNext = id => {
  const prevId = +id - 1
  const nextId = +id + 1
  const { data: prevPost } = useQuery(postExist, {
    variables: { id: prevId },
  })
  const { data: nextPost } = useQuery(postExist, {
    variables: { id: nextId },
  })

  const result = useMemo(
    () => ({
      isExistPrev: !!prevPost?.post.id,
      isExistNext: !!nextPost?.post.id,
      prevId,
      nextId,
    }),
    [prevPost, nextPost, prevId, nextId],
  )
  return result
}

export default usePrevNext
