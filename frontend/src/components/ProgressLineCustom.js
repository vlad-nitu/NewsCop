import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressLineCustom = ({ progress }) => {
  const getVariant = (value) => {
    if (value <= 20) {
      return 'success'; // Green
    } else if (value <= 40) {
      return 'warning'; // Yellow
    } else if (value <= 60) {
      return 'light'; // Light orange
    } else if (value <= 80) {
      return 'dark'; // Dark orange
    } else {
      return 'danger'; // Red
    }
  };

  const getColor = (variant) => {
    switch (variant) {
      case 'success':
        return '#28a745'; // Green
      case 'warning':
        return '#ffc107'; // Yellow
      case 'light':
        return '#ff7f50'; // Light orange
      case 'dark':
        return '#ff4500'; // Dark orange
      case 'danger':
        return '#dc3545'; // Red
      default:
        return '#dc3545'; // Red (fallback)
    }
  };

  return (
    <div className='mb-3 mt-5 d-flex justify-content-center'>
      <ProgressBar now={progress} variant={getVariant(progress)} style={{ width: '400px' }} />
      <style>
        {`
          .progress-bar-success {
            background-color: ${getColor('success')};
          }

          .progress-bar-warning {
            background-color: ${getColor('warning')};
          }

          .progress-bar-light {
            background-color: ${getColor('light')};
          }

          .progress-bar-dark {
            background-color: ${getColor('dark')};
          }

          .progress-bar-danger {
            background-color: ${getColor('danger')};
          }
        `}
      </style>
    </div>
  );
};

export default ProgressLineCustom;
