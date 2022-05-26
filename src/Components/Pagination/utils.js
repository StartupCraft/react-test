const getCurrentPosts = (postsPerPage, currentPage, posts) => {
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  return currentPosts
}

export { getCurrentPosts }
