import { render, screen } from '@testing-library/react'
import ListURLs from '../ListURLs'
import { MemoryRouter } from 'react-router-dom'

describe('ListURLs', () => {
  test('renders one element list', () => {
    const articles = [{
          similarity: 0.75,
          title: 'title1',
          url: 'https://example1.com',
          publisher: "publisher1",
          date: '2023-05-01'
        }]

    const sourceUrl = ""

    render(
      <MemoryRouter>
        <ListURLs articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    // Check if the text element containing the list only item
    const item = screen.getByText('title1')
    expect(item).toBeInTheDocument()
  })
  test('renders two elements list', () => {
const articles = [{
          similarity: 0.75,
          title: 'title1',
          url: 'https://example1.com',
          publisher: "publisher1",
          date: '2023-05-01'
        },{
          similarity: 0.6,
          title: 'title2',
          url: 'https://example2.com',
          publisher: "publisher2",
          date: '2023-05-02'
        }
]
    const sourceUrl = ""

    render(
      <MemoryRouter>
        <ListURLs articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    const item1 = screen.getByText('title1')
    const item2 = screen.getByText('title2')
    expect(item1).toBeInTheDocument()
    expect(item2).toBeInTheDocument()
  })
  test('renders empty list', () => {
    const articles = []
    const sourceUrl = ""

    render(
      <MemoryRouter>
        <ListURLs articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    const prompt = screen.getByText('No articles were found')
    expect(prompt).toBeInTheDocument()
  })
})
