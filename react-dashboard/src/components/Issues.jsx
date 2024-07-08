import React, { memo } from 'react';
import { IssuesTable } from './IssuesTable';
import { ariaObject } from '../../../src/aria-standards/critical/aria-object';

function Issues (ariaRecommendations) {

  const issues = [];

  for (const [ariaObjKey, recsArrays] of Object.entries(ariaRecommendations)) {
    // skip totalElements key
    if (ariaObjKey === 'totalElements') {
        continue;
    }
    issues.push(
        <div>
            <h5>{ariaObject[ariaObjKey].desc.replaceAll('```','')}</h5>
            <h5>{recsArrays.length} issues found</h5>
            <IssuesTable ariaObjKey={ariaObjKey} data={recsArrays} />
        </div>
    );
  }
  
  return(
    <>
    <h2>Summary of Issues: </h2>
    {issues}
    </>
  );
}

export default memo(Issues);