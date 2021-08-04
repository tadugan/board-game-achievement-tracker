import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

function BoardgameDetails() {

  const params = useParams(); 

  return (
    <div>
      <h2>Boardgame Details</h2>
      <p>Game Id: {params.id}</p>
    </div>
  );
}

export default BoardgameDetails;
