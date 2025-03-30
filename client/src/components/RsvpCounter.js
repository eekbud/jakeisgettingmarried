import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

/**
 * Component to display the RSVP counter showing participation status
 * for Jake's bachelor golf trip with an encouraging message
 */
const RsvpCounter = ({ confirmedCount, maxCount }) => {
  const progressPercentage = (confirmedCount / maxCount) * 100;
  
  return (
    <Card className="rsvp-counter mb-4">
      <Card.Body>
        <h5 className="text-center mb-3">Group Status</h5>
        <div className="d-flex justify-content-between mb-2">
          <span><strong>{confirmedCount}</strong> friends joining</span>
          <span><strong>{maxCount}</strong> total spots</span>
        </div>
        <ProgressBar 
          now={progressPercentage} 
          variant="success" 
          label={`${Math.round(progressPercentage)}%`}
        />
        <p className="text-center mt-3 mb-0">
          {confirmedCount === 0 ? (
            <span>Be the first to join Jake's epic golf weekend!</span>
          ) : confirmedCount < maxCount / 2 ? (
            <span>Join the crew for an unforgettable golf experience!</span>
          ) : confirmedCount < maxCount ? (
            <span>The group is coming together! Add your name to the list!</span>
          ) : (
            <span className="text-success">Full house! It's going to be legendary!</span>
          )}
        </p>
      </Card.Body>
    </Card>
  );
};

export default RsvpCounter;
