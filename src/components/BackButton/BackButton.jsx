import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ArrowBackIos } from '@material-ui/icons';

function BackButton({ destination }) {

  const handleClick = (route) => {
      console.log(route);
  }

  return (
    <div>
        <Button
            onClick={() => handleClick(destination)}
        >
            <ArrowBackIos />
            Back
        </Button>
    </div>
  );
}

export default BackButton;
