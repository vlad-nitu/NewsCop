import React from 'react';
import ProgressBar from 'react-customizable-progressbar'

export default function ProgressBarCustom(similarity) {

 // Function to obtain the color needed for interpolation
 const colorInterpolation = (similarityScore) =>  {

    if (similarityScore >= 0  && similarityScore <= 20)
      return "#28aa4a" // Green
    else if (similarityScore > 20 && similarityScore <= 40)
      return "#8abb3c" // Yellow
    else if (similarityScore > 40 && similarityScore <= 60)
      return "#eeea24" // Yellow
    else if (similarityScore > 60 && similarityScore <= 80)
      return "#ed9e28"
    else
      return "#e73626"
 }


  // Function to interpolate the similarity value
  const interpolateSimilarity = (similarity) => {
    const similarityScore = similarity.similarity
    const color = colorInterpolation(similarityScore)
    console.log(similarity)
    console.log(similarityScore)
    return color;
  };

  return (
    <div className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProgressBar
        radius={100}
        progress={similarity.similarity}
        counterClockwise
        strokeWidth={18}
        strokeColor={interpolateSimilarity(similarity)}
        trackStrokeWidth={18}
        trackStrokeColor="#f4f4f4"
        pointerRadius={10}
        pointerStrokeWidth={1}
        pointerStrokeColor="#ffffff"
        pointerFillColor="#000000"
    />
    </div>
  );
};
