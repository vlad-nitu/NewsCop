import { render, screen } from '@testing-library/react'
import ProgressLineCustom from '../ProgressLineCustom'

const { describe } = require('jest')

describe('ProgressLineCustom', () => {
  test('renders the progress bar with correct sub-progress colors', () => {
    const progress = 60
    render(<ProgressLineCustom progress={progress} />)

    // When rendering the progress bars using the ProgressBar component, it assigns the appropriate ARIA role of "progressbar" to each bar element.
    const progressBarElements = screen.getAllByRole('progressbar')
    expect(progressBarElements).toHaveLength(5)

    const subProgressColors = ['#22a24b', '#bdd537', '#f0dd1f', '#ef9e29', '#eb282c']
    progressBarElements.forEach((element, index) => {
      expect(element).toHaveStyle({ backgroundColor: subProgressColors[index] })
    })
  })

  test('renders the pointer at the correct progress position', () => {
    const progress = 40
    render(<ProgressLineCustom progress={progress} />)
    const pointerElement = screen.getByTestId('progress-line-pointer')
    const pointerLabelElement = screen.getByTestId('progress-label-pointer')
    expect(pointerElement).toBeInTheDocument()
    expect(pointerLabelElement).toBeInTheDocument()
    expect(pointerElement).toHaveStyle({ '--progress': `${progress}%` })
    expect(pointerLabelElement).toHaveStyle({ '--progress': `${progress}%` })
  })
})
