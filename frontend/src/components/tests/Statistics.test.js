import { act, render, screen } from '@testing-library/react'
import Statistics from '../Statistics'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'

jest.mock('axios')

describe('Statistics', () => {
  test('statistics properly render', async () => {
    jest.useFakeTimers() /* Mock the timer */

    const title1 = 'Did you know that...'
    const title2 = 'Number of overlapping articles for each threshold'
    const title3 = 'from the last URL similarity checks'

    const expectedData = {
      users: 32,
      performed_queries: 43,
      stored_articles: 140,
      similarities_retrieved: [20, 15, 8, 2, 30]
    }

    axios.get = jest.fn().mockResolvedValue({ data: expectedData })

    const statisticsTitles = [' articles', ' users', ' articles']
    const statisticsDescription = ['are stored in the database', 'have used the application', 'have been checked for overlapping']
    const statisticsImages = ['newspaper-regular.svg', 'user-regular.svg', 'list-check-solid.svg']

    render(
      <MemoryRouter>
        <Statistics titles={statisticsTitles} descriptions={statisticsDescription} images={statisticsImages} />
      </MemoryRouter>
    )

    // Resolve the axios post promise
    await act(async () => {
      await axios.get.mock.results[0].value
    })

    // Check if all titles are included in the page
    const firstTitle = screen.getByText(title1)
    expect(firstTitle).toBeInTheDocument()

    const secondTitle = screen.getByText(title2)
    expect(secondTitle).toBeInTheDocument()

    const thirdTitle = screen.getByText(title3)
    expect(thirdTitle).toBeInTheDocument()

    // Check if the title of the first card is displayed
    const card1title = screen.getByText('140 articles')
    expect(card1title).toBeInTheDocument()
    // Check if the description of the first card is displayed
    const card1description = screen.getByText('are stored in the database')
    expect(card1description).toBeInTheDocument()

    // Check if the title of the second card is displayed
    const card2title = screen.getByText('32 users')
    expect(card2title).toBeInTheDocument()
    // Check if the description of the second card is displayed
    const card2description = screen.getByText('have used the application')
    expect(card2description).toBeInTheDocument()

    // Check if the title of the third card is displayed
    const card3title = screen.getByText('43 articles')
    expect(card3title).toBeInTheDocument()
    // Check if the description of the third card is displayed
    const card3description = screen.getByText('have been checked for overlapping')
    expect(card3description).toBeInTheDocument()

    const percentages = ['0 - 20%', '20 - 40%', '40 - 60%', '60 - 80%', '80 - 100%']
    for (let i = 0; i < 5; ++i) {
      const barPercentage = screen.getByText(percentages[i])
      expect(barPercentage).toBeInTheDocument()

      const barValue = screen.getByText(expectedData.similarities_retrieved[i])
      expect(barValue).toBeInTheDocument()
    }
  })
  test('check one user test', async () => {
    jest.useFakeTimers() /* Mock the timer */

    const expectedData = {
      users: 1,
      performed_queries: 43,
      stored_articles: 140,
      similarities_retrieved: [20, 15, 8, 2, 30]
    }

    axios.get = jest.fn().mockResolvedValue({ data: expectedData })

    const statisticsTitles = [' articles', ' users', ' articles']
    const statisticsDescription = ['are stored in the database', 'have used the application', 'have been checked for overlapping']
    const statisticsImages = ['newspaper-regular.svg', 'user-regular.svg', 'list-check-solid.svg']

    render(
      <MemoryRouter>
        <Statistics titles={statisticsTitles} descriptions={statisticsDescription} images={statisticsImages} />
      </MemoryRouter>
    )

    // Resolve the axios post promise
    await act(async () => {
      await axios.get.mock.results[0].value
    })

    // Check if the title of the second card is displayed
    const card2title = screen.getByText('1 user')
    expect(card2title).toBeInTheDocument()
  })

  test('statistics properly render2', async () => {
    jest.useFakeTimers() /* Mock the timer */

    const expectedData = null

    axios.get = jest.fn().mockResolvedValue({ data: expectedData })

    const statisticsTitles = [' articles', ' users', ' articles']
    const statisticsDescription = ['are stored in the database', 'have used the application', 'have been checked for overlapping']
    const statisticsImages = ['newspaper-regular.svg', 'user-regular.svg', 'list-check-solid.svg']

    const { container } = render(
      <MemoryRouter>
        <Statistics titles={statisticsTitles} descriptions={statisticsDescription} images={statisticsImages} />
      </MemoryRouter>
    )

    // Resolve the axios post promise
    await act(async () => {
      await axios.get.mock.results[0].value
    })

    expect(container.firstChild).toBeNull()
  })
  test('statistics avoid division by 0 when no queries were effected', async () => {
    jest.useFakeTimers() /* Mock the timer */

    const expectedData = {
      users: 32,
      performed_queries: 0,
      stored_articles: 140,
      similarities_retrieved: [0, 0, 0, 0, 0]
    }

    axios.get = jest.fn().mockResolvedValue({ data: expectedData })

    const statisticsTitles = [' articles', ' users', ' articles']
    const statisticsDescription = ['are stored in the database', 'have used the application', 'have been checked for overlapping']
    const statisticsImages = ['newspaper-regular.svg', 'user-regular.svg', 'list-check-solid.svg']

    render(
      <MemoryRouter>
        <Statistics titles={statisticsTitles} descriptions={statisticsDescription} images={statisticsImages} />
      </MemoryRouter>
    )

    // Resolve the axios post promise
    await act(async () => {
      await axios.get.mock.results[0].value
    })

    const percentages = ['0 - 20%', '20 - 40%', '40 - 60%', '60 - 80%', '80 - 100%']
    for (let i = 0; i < 5; ++i) {
      const barPercentage = screen.getByText(percentages[i])
      expect(barPercentage).toBeInTheDocument()
    }
  })

  test('bad weather test', () => {
    const titles = ['Fake title'] // !!! Should be exactly named `titles`
    const descriptions = ['Description 1', 'Description 2', 'Description 3']
    const images = ['image1.jpg', 'image2.jpg']

    // Act & Assert
    expect(() => {
      Statistics({ titles, descriptions, images })
    }).toThrowError('Different lengths of the arrays.')
  })
})
