/* global test, expect */
import { render, screen } from '@testing-library/react'
import MainPageBigImage from '../mainPageBigImage'
import '@testing-library/jest-dom/extend-expect';

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
