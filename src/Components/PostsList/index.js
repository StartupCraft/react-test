import React from 'react'
import { NavLink } from 'react-router-dom'
import PropsTypes from 'prop-types'

import { POST } from 'Router/routes'

import { FetchMoreButton, Post, PostAuthor, PostBody } from './styles'

const PostList = ({ loading, posts, onLoadMore }) => (
  <>
    <h4>Need to add pagination</h4>
    {posts.map(post => (
      <Post key={post.id} mx={4}>
        <NavLink href={POST(post.id)} to={POST(post.id)}>
          {post.title}
        </NavLink>
        <PostAuthor>by {post.user.name}</PostAuthor>
        <PostBody>{post.body}</PostBody>
      </Post>
    ))}
    <div>
      <FetchMoreButton disabled={loading} onClick={onLoadMore}>
        {loading ? 'Loading...' : 'Load more'}
      </FetchMoreButton>
    </div>
  </>
)

PostList.propTypes = {
  loading: PropsTypes.bool,
  posts: PropsTypes.arrayOf(
    PropsTypes.shape({
      id: PropsTypes.string,
      title: PropsTypes.string,
      body: PropsTypes.string,
      user: PropsTypes.shape({
        name: PropsTypes.string,
      }),
    }),
  ),
  onLoadMore: PropsTypes.func,
}

PostList.defaultProps = {
  loading: false,
  posts: [],
  onLoadMore: () => {},
}

export default PostList
