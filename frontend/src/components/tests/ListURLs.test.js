import { render, screen } from '@testing-library/react'
import ListURLs from '../ListURLs'
import { MemoryRouter } from 'react-router-dom'

describe('ListURLs', () => {
  test('renders one element list', () => {
    const articles = [{
      similarity: 0.75,
      title: 'title',
      url: 'https://example.com',
      publisher: 'publisher',
      date: '2023-05-01'
    }]

    const sourceUrl = ''

    render(
      <MemoryRouter>
        <ListURLs articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    // Check if the text element containing the list only item
    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()
  })
  test('renders two elements list', () => {
    const articles = [{
      similarity: 0.75,
      title: 'title1',
      url: 'https://example1.com',
      publisher: 'publisher1',
      date: '2023-05-01'
    }, {
      similarity: 0.6,
      title: 'title2',
      url: 'https://example2.com',
      publisher: 'https://publisher2',
      date: '2023-05-02'
    }, {
      similarity: 0.3,
      title: 'title3',
      url: 'https://example2.com',
      publisher: 'http://publisher3',
      date: '2023-05-03'
    }
    ]
    const sourceUrl = ''

    render(
      <MemoryRouter>
        <ListURLs articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    const title1 = screen.getByText('title1')
    const title2 = screen.getByText('title2')
    const title3 = screen.getByText('title3')
    expect(title1).toBeInTheDocument()
    expect(title2).toBeInTheDocument()
    expect(title3).toBeInTheDocument()

    const publisher1 = screen.getByText('publisher1')
    const publisher2 = screen.getByText('https://publisher2')
    const publisher3 = screen.getByText('http://publisher3')
    expect(publisher1).toBeInTheDocument()
    expect(publisher2).toBeInTheDocument()
    expect(publisher3).toBeInTheDocument()

    const date1 = screen.getByText('2023-05-01')
    const date2 = screen.getByText('2023-05-02')
    const date3 = screen.getByText('2023-05-03')
    expect(date1).toBeInTheDocument()
    expect(date2).toBeInTheDocument()
    expect(date3).toBeInTheDocument()
  })
  test('renders empty list', () => {
    const articles = []
    const sourceUrl = ''

    render(
      <MemoryRouter>
        <ListURLs articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    const prompt = screen.getByText('No articles were found')
    expect(prompt).toBeInTheDocument()
  })
  test('renders two elements list on small device', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 900
    })
    const articles = [{
      similarity: 0.75,
      title: 'title1',
      url: 'https://example1.com',
      publisher: 'publisher1',
      date: '2023-05-01'
    }, {
      similarity: 0.6,
      title: 'title2',
      url: 'https://example2.com',
      publisher: 'https://publisher2',
      date: '2023-05-02'
    }, {
      similarity: 0.3,
      title: 'title3',
      url: 'https://example3.com',
      publisher: 'http://publisher3',
      date: '2023-05-03'
    }
    ]
    const sourceUrl = ''

    render(
      <MemoryRouter>
        <ListURLs articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    const title1 = screen.getByText('title1')
    const title2 = screen.getByText('title2')
    const title3 = screen.getByText('title2')
    expect(title1).toBeInTheDocument()
    expect(title2).toBeInTheDocument()
    expect(title3).toBeInTheDocument()
  })
})
