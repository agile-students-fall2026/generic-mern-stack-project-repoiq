import './AnalysisComplete.css';
import { useState, useEffect } from 'react';
import { repository } from '../data/mockData';

function AnalysisComplete({ setPage }) {
  return (
    <div className="complete phone">
      <h1>✓</h1>
      <h1>Analysis Complete</h1>
      <button className="back" onClick={() => setPage('progress')}>
        ←
      </button>
      <p>We successfully analysed your repository</p>

      <div className="stats">
        <div>{repository.files} Files</div>
        <div>{repository.functions} Functions</div>
        <div>{repository.classes} Classes</div>
        <div>{repository.relationships} Relationships</div>
      </div>

      <div className="repository">
        <h3>{repository.name}</h3>
        <p>{repository.url}</p>
      </div>

      <button onClick={() => setPage('map')}>Explore Codebase</button>

      <button onClick={() => setPage('progress')}>Remove Repository</button>
    </div>
  );
}

export default AnalysisComplete;
