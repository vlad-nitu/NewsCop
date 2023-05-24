import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

const ProgressLineCustom = ({ progress }) => {
  const subProgress = [
    { value: 20, color: '#22a24b' }, // Green
    { value: 20, color: '#bdd537' }, // Yellow
    { value: 20, color: '#f0dd1f' }, // Light orange
    { value: 20, color: '#ef9e29' }, // Dark orange
    { value: 20, color: '#eb282c' } // Red
  ]

  return (
    <div className='mb-3 mt-5' style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '400px', position: 'relative' }}>
        <ProgressBar style={{ height: '20px' }}>
          {subProgress.map((sub, index) => (
            <ProgressBar
              key={index}
              now={sub.value}
              style={{ backgroundColor: sub.color }}
            />
          ))}
        </ProgressBar>
        <div
          className='pointer'
          data-testid='progress-line-pointer'
          style={{ left: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressLineCustom
