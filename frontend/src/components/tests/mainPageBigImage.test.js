/* global test, expect */
import { render, screen } from '@testing-library/react'
import MainPageBigImage from '../mainPageBigImage'

const applicationDescription = 'NewsCop is a news article ' +
    'overlap detection platform that helps businesses stay on ' +
    "top of competitors' news coverage. Our service quickly " +
    'checks for duplicated stories, allowing you to spot ' +
    'trends and identify opportunities to maximize coverage. ' +
    "With NewsCop, you'll never miss a story."
const projectName = 'News article overlap'
const imageUrl = 'https://i.ibb.co/713x3tb/Screenshot-2023-05-03-at-12-50-00.png'

test('get description', () => {
  render(<MainPageBigImage description={applicationDescription} projectName={projectName} imageUrl={imageUrl} />)
  const element = screen.getByText("NewsCop is a news article overlap detection platform that helps businesses stay on top of competitors' news coverage. Our service quickly checks for duplicated stories, allowing you to spot trends and identify opportunities to maximize coverage. With NewsCop, you'll never miss a story.")
  expect(element).toBeInTheDocument()
})

test('get project name', () => {
  render(<MainPageBigImage description={applicationDescription} projectName={projectName} imageUrl={imageUrl} />)
  const element = screen.getByText('News article overlap')
  expect(element).toBeInTheDocument()
})

test('get background image url', () => {
  render(<MainPageBigImage description={applicationDescription} projectName={projectName} imageUrl={imageUrl} />)
  const expectedUrl = 'url(https://i.ibb.co/713x3tb/Screenshot-2023-05-03-at-12-50-00.png)'
  const element = document.querySelector('#background-image')
  const backgroundImage = window.getComputedStyle(element).getPropertyValue('background-image')
  expect(backgroundImage).toBe(expectedUrl)
})

test('renders a link with the correct SVG elements', () => {
  render(<MainPageBigImage description={applicationDescription} projectName={projectName} imageUrl={imageUrl} />)

  const linkElement = screen.getByRole('link')
  expect(linkElement).toBeInTheDocument()

  const svgElement = linkElement.querySelector('svg.arrow')
  expect(svgElement).toBeInTheDocument()

  const pathElements = svgElement.querySelectorAll('path')
  expect(pathElements).toHaveLength(3)

  expect(pathElements[0]).toHaveClass('a1')
  expect(pathElements[0]).toHaveAttribute('d', 'M0 0 L30 22 L60 0')

  expect(pathElements[1]).toHaveClass('a2')
  expect(pathElements[1]).toHaveAttribute('d', 'M0 20 L30 42 L60 20')

  expect(pathElements[2]).toHaveClass('a3')
  expect(pathElements[2]).toHaveAttribute('d', 'M0 40 L30 62 L60 40')
})
