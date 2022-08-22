import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Component testing 101',
  author: 'Esa Saarienen',
  url: 'altou.fi',
  likes: 5,
  user: null
}
let container
let likeMockHandler = jest.fn()

beforeEach(() => {
  container = render(<Blog blog={blog} likeBlog={likeMockHandler} />).container
})

test('renders correct parts of blog by default', async () => {
  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent(blog.author)
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent('likes: ' + blog.likes)

})

test('url and likes are shown after show button is clicked', async () => {
  const user = userEvent.setup()
  const show = container.querySelector('.showAndHideButton')
  await user.click(show)
  expect(screen.getByText(blog.title)).toBeDefined()
  expect(screen.getByText(blog.author)).toBeDefined()
  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByText('likes: ' + blog.likes)).toBeDefined()
})


test('clicking like button twice triggers updatehandler twice', async () => {
  const user = userEvent.setup()
  const show = container.querySelector('.showAndHideButton')
  await user.click(show)
  const likeButton = container.querySelector('.likeButton')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeMockHandler.mock.calls).toHaveLength(2)
})