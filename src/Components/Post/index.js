import React from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import postQuery from 'GraphQL/Queries/post.graphql'
import { ROOT } from 'Router/routes'
import PostDisplay from './PostDisplay'
import { Back, Centered, Column, Container } from './styles'

// JP - 06/21/2022:
// Refactored to better handle Loading, No Results and Has Results
// Fixed crashing when no results or no comments
// Also removed infinte render loop in useEffect / setComments
// Improved Responsiveness of page
// Added PostNavigation componment, attempts to use ids from the paged posts in previous view to correctly determine next/previous post Id. If not available navigation is hidden
// TODO: Request Backend Team to add Next/Previous Post Ids to Post query

function Post() {
  const history = useHistory()
  const {
    params: { postId },
  } = useRouteMatch()
  const location = useLocation()
  const handleClick = () => history.push(ROOT)
  const { data, loading } = useQuery(postQuery, { variables: { id: postId } })

  const htmlLoading = (
    <Centered>
      <h4>Loading...</h4>
    </Centered>
  )
  const htmlHasResults = (
    <PostDisplay
      data={data ?? {}}
      postId={postId}
      posts={location?.state?.posts ?? []}
    />
  )

  const htmlNoResults = (
    <Centered>
      <h3>Post Not Found</h3>
    </Centered>
  )

  let content = ''

  if (loading) {
    content = htmlLoading
  } else if (!loading && data?.post?.id === null) {
    content = htmlNoResults
  } else {
    content = htmlHasResults
  }

  return (
    <>
      <Container>
        <Column>
          <Back onClick={handleClick}>Back</Back>
        </Column>
      </Container>
      <Container>{content}</Container>
    </>
  )
}

export default Post
