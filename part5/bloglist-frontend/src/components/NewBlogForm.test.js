import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

const blog = {
  title: 'Component testing 101',
  author: 'Esa Saarienen',
  url: 'altou.fi',
  likes: 5,
  user: null
}
let createBlogMock = jest.fn()

test('renders correct parts of blog by default', async () => {
  render(<NewBlogForm createBlog={createBlogMock} />)
  
  const user = userEvent.setup()
  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], blog.title)
  await user.type(inputs[1], blog.author)
  await user.type(inputs[2], blog.url)
  const submitBtn = screen.getByText('Create')
  await user.click(submitBtn)
  expect(createBlogMock.mock.calls).toContainEqual([blog.title, blog.author, blog.url])
})