const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  const most = _(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(1)

  const mostBlog = { 'author': most[0], 'blogs': most[1] }

  return mostBlog
}

const mostLikes = (blogs) => {
  const most = _(blogs)
    .groupBy('author')
    .map((blogs, author) => {

      const likes = _.sumBy(blogs, 'likes')

      return (
        {
          author,
          likes
        }
      )
    })
    .maxBy('likes')

  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}