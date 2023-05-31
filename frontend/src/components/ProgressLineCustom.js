import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

/**
 * Represents a number in the range of 0 to 100 (inclusive).
 * @typedef {number} Range0To100
 */

/**
 * A custom progress bar component with colored sub-progress bars and a movable pointer.
 * The sub-progress bars are "stacked" usign Bootstrap CSS
 * Movable pointer is implemented in `general.css` from scratch
 * @param {Range0To100} progress - The overall progress value.
 * @returns {JSX.Element} - The rendered progress bar component.
 */
const ProgressLineCustom = ({ progress }) => {
  /**
   * An array of sub-progress bars that get stacked hoizontally.
   * Each object contains a value (percentage) and a color.
   * 0-20% -> Green
   * 20-40% -> Yellow
   * 40-60% -> Light orange
   * 60-80% -> Dark orange
   * 80-100% -> Red
   *
   */
  const subProgress = [
    { value: 20, color: '#22a24b' }, // Green
    { value: 20, color: '#bdd537' }, // Yellow
    { value: 20, color: '#f0dd1f' }, // Light orange
    { value: 20, color: '#ef9e29' }, // Dark orange
    { value: 20, color: '#eb282c' } // Red
  ]

  return (
    <div className='my-4' style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '400px', position: 'relative' }}>
        <ProgressBar style={{ height: '20px' }}>
          {subProgress.map((sub, index) => (
            <ProgressBar
              striped
              animated
              key={index}
              now={sub.value}
              label={`${sub.value * index} - ${sub.value * (index + 1)}%`}
              style={{ backgroundColor: sub.color }}
            />
          ))}
        </ProgressBar>
        <div
          className='pointer'
          data-testid='progress-line-pointer'
          style={{ '--progress': `${progress}%` }}
        />
        <div
          className='progress-label'
          data-testid='progress-label-pointer'
          style={{ '--progress': `${progress}%` }}
        >
          {`${progress}%`}
        </div>
      </div>
    </div>
  )
}

export default ProgressLineCustom
