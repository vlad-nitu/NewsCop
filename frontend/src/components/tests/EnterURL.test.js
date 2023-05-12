import { render, screen, fireEvent } from '@testing-library/react'
import EnterURL from '../EnterURL'

describe('EnterURL', () => {
  test('renders the prompt text', () => {
    const prompt = 'Enter the article\'s URL to check for plagiarism'
    /*
     * By wrapping the ForwardToCheckText component with the MemoryRouter,
     * we provide a routing context that the component can use to render the Link element and trigger navigation events during testing.
    */
    render(
      <EnterURL />
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()
  })

  test('Change input form', () => {
    const PreInputArticlePrompt = "Article's URL"
    const { getByPlaceholderText, getByText } = render(<EnterURL />)
    const input = getByPlaceholderText(PreInputArticlePrompt)
    const submitButton = getByText('Submit')

    fireEvent.change(input, { target: { value: 'http://example.com/article' } })
    expect(input.value).toBe('http://example.com/article')

    fireEvent.click(submitButton)
    // Even after pressing the Submit button (for 5 seconds), the text remains in the form; after 5 seconds, it gets erased
    expect(input.value).toBe('http://example.com/article')
  })
})
