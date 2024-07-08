import React, { memo } from 'react';
import PropTypes from 'prop-types'; // If you decide to use PropTypes for prop validation
import { IssuesTable } from './IssuesTable';
import { ariaObject } from '../../../src/aria-standards/critical/aria-object';

function Issues({ ariaRecommendations }) {
  const issues = [];

  for (const [ariaObjKey, recsArrays] of Object.entries(ariaRecommendations)) {
    if (ariaObjKey === 'totalElements') {
      continue;
    }
    const description = ariaObject[ariaObjKey]?.desc?.replaceAll('```', '') || 'Description not available';
    issues.push(
      <div key={ariaObjKey}>
        <h5>{description}</h5>
        <h6>{recsArrays.length} issues found</h6>
        <IssuesTable ariaObjKey={ariaObjKey} data={recsArrays} />
      </div>
    );
  }

  return (
    <>
      <h2>Summary of Issues: </h2>
      {issues}
    </>
  );
}

export default memo(Issues);