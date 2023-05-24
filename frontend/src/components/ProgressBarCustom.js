import React from 'react';
import ProgressBar from 'react-customizable-progressbar'

export default function ProgressBarCustom(similarity) {
  // Function to interpolate the similarity value
  const interpolateSimilarity = (similarity) => {
    const percentage = similarity.similarity
    console.log(similarity)
    console.log(percentage)
    return percentage;
  };

  return (
    <div className='mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProgressBar
        radius={100}
        progress={interpolateSimilarity(similarity)}
        counterClockwise
        strokeWidth={18}
        strokeColor="#a0d468"
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
