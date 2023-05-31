import { render, screen } from '@testing-library/react'
import ListURLs from '../ListURLs'
import { MemoryRouter } from 'react-router-dom'

const { describe } = require('jest')

describe('ListURLs', () => {
  test('renders one element list', () => {
    const items = ['text']
    const similarities = [20]

    render(
      <MemoryRouter>
        <ListURLs items={items} similarities={similarities} />
      </MemoryRouter>
    )

    // Check if the text element containing the list only item
    const item = screen.getByText('text')
    expect(item).toBeInTheDocument()
  })
  test('renders two elements list', () => {
    const items = ['text1', 'text2']
    const similarities = [20, 10]

    render(
      <MemoryRouter>
        <ListURLs items={items} similarities={similarities} />
      </MemoryRouter>
    )

    const item1 = screen.getByText('text1')
    const item2 = screen.getByText('text2')
    expect(item1).toBeInTheDocument()
    expect(item2).toBeInTheDocument()
  })
  test('renders empty list', () => {
    const items = []
    const similarities = []

    render(
      <MemoryRouter>
        <ListURLs items={items} similarities={similarities} />
      </MemoryRouter>
    )

    const prompt = screen.getByText('No articles were found')
    expect(prompt).toBeInTheDocument()
  })
})
