import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SimilaritySettings from '../SimilaritySettings'

describe('SimilaritySettings', () => {
  test('renders all the components', () => {
    const articles = [{
      similarity: 75,
      title: 'title',
      url: 'https://example.com',
      publisher: 'publisher',
      date: '2023-05-01'
    }]

    const sourceUrl = ''

    render(
      <MemoryRouter>
        <SimilaritySettings articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    // Check if the text element containing the list only item
    const title = screen.getByText('title')
    expect(title).toBeInTheDocument()

    const slider = screen.getByText('Display articles with similarity above 0 %')
    expect(slider).toBeInTheDocument()
  })

  test('renders the button for more than 5 element answer', async () => {
    const article = {
      similarity: 75,
      title: 'title',
      url: 'https://example1.com',
      publisher: 'publisher1',
      date: '2023-05-01'
    }
    const articles = [article, article, article, article, article, article]
    const sourceUrl = ''

    render(
      <MemoryRouter>
        <SimilaritySettings articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    const slider = screen.getByText('Display articles with similarity above 0 %')
    expect(slider).toBeInTheDocument()

    // click on the button to see all the articles
    const button = screen.getByText('See more articles')
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()

    fireEvent.click(button)

    // see that the button is now disabled
    await waitFor(() => {
      expect(button).not.toBeInTheDocument()
    })
  })
  test('changes the slider value', () => {
    const article = {
      similarity: 75,
      title: 'title',
      url: 'https://example1.com',
      publisher: 'publisher1',
      date: '2023-05-01'
    }
    const articles = [article, article, article, article, article, article]
    const sourceUrl = ''

    render(
      <MemoryRouter>
        <SimilaritySettings articles={articles} sourceUrl={sourceUrl} />
      </MemoryRouter>
    )

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: 50 } })

    const updatedSlider = screen.getByText('Display articles with similarity above 50 %')
    expect(updatedSlider).toBeInTheDocument()
  })
})
