/* global test, expect */
import { render, screen } from '@testing-library/react'
import Mission from '../mission'
import '@testing-library/jest-dom/extend-expect';

const description = 'Creating a platform that provides various ways of comparing news articles, helping users to identify overlapping content quickly and accurately and, consequently, decreasing the impact of missinformation and bias in the media.'
const ourMissionImage = 'https://gcdnb.pbrd.co/images/N1ELmhry5wXH.png?o=1'

test('get description1', () => {
  render(<Mission description={description} imageUrl={ourMissionImage} />)
  const element = screen.getByText('Creating a platform that provides various ways of comparing news articles, helping users to identify overlapping content quickly and accurately and, consequently, decreasing the impact of missinformation and bias in the media.')
  expect(element).toBeInTheDocument()
})

test('get title', () => {
  render(<Mission description={description} imageUrl={ourMissionImage} />)
  const element = screen.getByText('Our Mission')
  expect(element).toBeInTheDocument()
})

test('get image url', () => {
  const { getByAltText } = render(<Mission description={description} imageUrl={ourMissionImage} />)
  const element = getByAltText('Mission')
  expect(element.getAttribute('src')).toEqual(ourMissionImage)
})
