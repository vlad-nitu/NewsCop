import {render, screen, fireEvent, waitFor, act} from '@testing-library/react'
import EnterURL from '../EnterURL'
import {MemoryRouter} from 'react-router'
import axios from "axios";

describe('EnterURL', () => {
    test('renders the prompt text', () => {
        const prompt = 'Enter the article\'s URL to check for plagiarism'
        /*
             * By wrapping the ForwardToCheckText component with the MemoryRouter,
             * we provide a routing context that the component can use to render the Link element and trigger navigation events during testing.
            */
        render(
            <MemoryRouter>
                <EnterURL/>
            </MemoryRouter>
        )

        // Check if the text element containing the prompt text
        const promptElement = screen.getByText(prompt)
        expect(promptElement).toBeInTheDocument()
    })

    test('Change input form', async () => {
        jest.useFakeTimers() /* Mock the timer */
        const expectedData = 's'
        axios.post = jest.fn().mockResolvedValueOnce({data: expectedData})

        const PreInputArticlePrompt = "Article's URL"
        render(<EnterURL/>)

        const input = screen.getByPlaceholderText(PreInputArticlePrompt)
        const submitButton = screen.getByText('Submit')
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
        fireEvent.change(input, {target: {value: 'http://example.com/article'}})
        expect(input.value).toBe('http://example.com/article')
        expect(submitButton).toBeEnabled()
        fireEvent.click(submitButton)
        expect(submitButton).toBeDisabled()

        await act(async () => {
            await axios.post.mock.results[0].value
        })

        act(() => {
            jest.advanceTimersByTime(5000) /* Advance timer by 5 seconds */
        })
        await waitFor(() => {
            expect(submitButton).toBeEnabled() /* Button should be re-enabled after 10 seconds */
        })
        // Even after pressing the Submit button (for 5 seconds), the text remains in the form; after 5 seconds, it gets erased
        expect(input.value).toBe('http://example.com/article')
    })
})
