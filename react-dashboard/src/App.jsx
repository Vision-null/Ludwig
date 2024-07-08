import React, { useState, useEffect } from 'react';
import Score from './components/Score';
import Issues from './components/Issues';


export default function App() {

  const [ariaRecommendations, setAriaRecommendations] = useState({});

  useEffect(() =>{
    window.addEventListener('message', (event) => {
 
      const recs = event.data;
      if(recs) {
        setAriaRecommendations(recs);
        // console.log('Received message in Dashboard App:', message);
      }
    });
  }, []);
 
  return (
    <div style={{margin:15}}>
      <Score ariaRecommendations={ariaRecommendations}/>
      <Issues ariaRecommendations={ariaRecommendations}/>
    </div>
  );
}