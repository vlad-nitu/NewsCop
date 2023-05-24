import React from 'react'
import ProgressBar from 'react-customizable-progressbar'

const CustomProgressBar = ({ similarity }) => {
  const interpolateColor = (similarity) => {
    const percentage = similarity / 100
    console.log(percentage)

    // Define the start and end colors (red and green)
    const [startR, startG, startB] = [0, 255, 0] // Red
    const [endR, endG, endB] = [255, 0, 0] // Green

    // Calculate the interpolated RGB values
    const interpolatedR = Math.round(startR + (endR - startR) * percentage)
    const interpolatedG = Math.round(startG + (endG - startG) * percentage)
    const interpolatedB = Math.round(startB + (endB - startB) * percentage)

    // Convert the interpolated RGB values to a hexadecimal string
    const interpolatedHex = `#${componentToHex(interpolatedR)}${componentToHex(interpolatedG)}${componentToHex(interpolatedB)}`

    console.log(interpolatedHex)
    console.log(interpolatedR + ' ' + interpolatedG + ' ' + interpolatedB)

    // Return the interpolated color as a hexadecimal string
    return interpolatedHex
  }

  // Helper function to convert a decimal color component to a two-digit hexadecimal string
  function componentToHex (c) {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  };

  return (
    <div className='mb-3 mt-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProgressBar
        radius={100}
        progress={similarity}
        counterClockwise
        strokeWidth={18}
        strokeColor={interpolateColor(similarity)}
        trackStrokeWidth={18}
        trackStrokeColor='#f4f4f4'
        pointerRadius={10}
        pointerStrokeWidth={1}
        pointerStrokeColor='#ffffff'
        pointerFillColor='#000000'
      />
    </div>
  )
}

export default CustomProgressBar
