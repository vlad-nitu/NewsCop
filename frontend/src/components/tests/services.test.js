/* global test, expect */
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Services from '../services'

const badTitles = ['Fake title']
const titles = ['URL plagiarism checker', 'Text plagiarism checker', 'Text similarity checker']
const descriptions = ['NewsCop provides users with a way of checking the URL of a news article against a large database of articles for fast and accurate plagiarism detection.',
  'NewsCop provides users with a way of checking the text of a news article against a large database of articles for fast and accurate plagiarism detection.', 'Test the similarity between two news articles by using this poweful tool which enables you to input two URLs of media content and see the alikeness of the two']
const images = ['https://scholarlykitchen.sspnet.org/wp-content/uploads/2020/05/iStock-1188116818.jpg', 'https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_Indianapolis_Star%2C_2011.jpg/1200px-The_Indianapolis_Star%2C_2011.jpg']

test('get descriptions', () => {
  render(
    <MemoryRouter>
      <Services titles={titles} descriptions={descriptions} images={images} />
    </MemoryRouter>
  )
  const description1 = screen.getByText(descriptions[0])
  const description2 = screen.getByText(descriptions[1])
  const description3 = screen.getByText(descriptions[2])
  const button = screen.getByTestId('ButtonTest 1')
  expect(description1).toBeInTheDocument()
  expect(description2).toBeInTheDocument()
  expect(description3).toBeInTheDocument()
  fireEvent.click(button)
  expect(window.scrollX).toBe(0)
  expect(window.scrollY).toBe(0)
})

test('bad weather test', () => {
  const ret = () => {
    render(
      <Services titles={badTitles} descriptions={descriptions} images={images} />)
  }
  expect(ret).toThrow(Error)
})
test('get titles', () => {
  render(
    <MemoryRouter>
      <Services titles={titles} descriptions={descriptions} images={images} />
    </MemoryRouter>
  )
  const title1 = screen.getByText(titles[0])
  const title2 = screen.getByText(titles[1])
  const title3 = screen.getByText(titles[2])
  expect(title1).toBeInTheDocument()
  expect(title2).toBeInTheDocument()
  expect(title3).toBeInTheDocument()
})

test('get image url', () => {
  render(
    <MemoryRouter>
      <Services titles={titles} descriptions={descriptions} images={images} />
    </MemoryRouter>
  )
  const image1 = screen.getByAltText('Service 1')
  const image2 = screen.getByAltText('Service 2')
  const image3 = screen.getByAltText('Service 3')
  expect(image1.getAttribute('src')).toEqual(images[0])
  expect(image2.getAttribute('src')).toEqual(images[1])
  expect(image3.getAttribute('src')).toEqual(images[2])
})
