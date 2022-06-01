import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';
import arrayMove from 'array-move';

import postQuery from 'GraphQL/Queries/post.graphql';

import { ROOT } from 'Router/routes';

import {
  Back,
  Column,
  Container,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
} from './styles';
import { fa, tr } from "faker/lib/locales";

const SortableContainer = sortableContainer(({ children }) => (
  <div>{ children }</div>
));

const SortableItem = sortableElement(({ value }) => (
  <PostComment mb={ 2 }>{ value }</PostComment>
));

function Post ({ NumOfPosts = 10 }) {
  const [comments, setComments] = useState([]);
  const [postState, setPostState] = useState({});
  const history = useHistory();
  const { params: { postId } } = useRouteMatch();

  const handleClick = () => history.push(ROOT);

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setComments(arrayMove(comments, newIndex, oldIndex));
  };

  const { data, loading } = useQuery(postQuery, { variables: { id: postId } });

  const post = data?.post || {};

  /**
   * update: using JSON.stringify() is not secure here as the the objects with 
   * the same attributes but ordered differently should be treated as equal
   */
  // prevent infinite rendering since object is passed to useEffect as a dependency
  // const postJson = JSON.stringify(post);

  const postObjIsReady = !(Object.keys(post).length === 0);

  useEffect(() => {
    if (postObjIsReady)
      setPostState(post);
  }, [postObjIsReady, post.id]);

  useEffect(() => {
    if (postObjIsReady)
      setComments(post.comments?.data || []);
  }, [postState]);

  function handleNext (e) {
    const nextPageIndex = Number(postId) + 1;
    if (nextPageIndex <= NumOfPosts) {
      e.preventDefault();
      history.push(`/posts/${nextPageIndex}`);
    }
  }

  function handlePrev (e) {
    const prevPageIndex = Number(postId) - 1;
    if (prevPageIndex >= 1) {
      e.preventDefault();
      history.push(`/posts/${prevPageIndex}`);
    }
  }

  return (
    <Container>
      <Column>
        <Back onClick={ handleClick }>Back</Back>
      </Column>
      { loading ? (
        'Loading...'
      ) : (
        <>
          <Column>
            <h4>Need to add next/previous links</h4>
            <PostContainer key={ post.id }>
              <h3>{ post.title }</h3>
              <PostAuthor>by { post.user.name }</PostAuthor>
              <PostBody mt={ 2 }>{ post.body }</PostBody>
            </PostContainer>
            <div>Next/prev here</div>

            <button
              type="submit"
              onClick={ handlePrev }
            >
              Previous
            </button>
            <button
              type="submit"
              onClick={ handleNext }
            >
              Next
            </button>
          </Column>

          <Column>
            <h4>Incorrect sorting</h4>
            Comments:
            <SortableContainer onSortEnd={ handleSortEnd }>
              { comments
                .map((comment, index) => (
                  <SortableItem
                    index={ index }
                    key={ comment.id }
                    mb={ 3 }
                    value={ comment.body }
                  />
                )) }
            </SortableContainer>
          </Column>
        </>
      ) }
    </Container>
  );
}

Post.propTypes = {
  NumOfPosts: PropTypes.number.isRequired,
};

export default Post;
