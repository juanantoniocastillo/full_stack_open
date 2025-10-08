const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce(
    (sum, blog) => (blog.likes + sum),
    0
  )

  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const favorite = blogs.reduce(
      (fav, currentBlog) => currentBlog.likes > fav.likes ? currentBlog : fav
    )

    return favorite
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}