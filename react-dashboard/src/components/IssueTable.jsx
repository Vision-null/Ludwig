import { ariaObject } from '../../../src/aria-standards/critical/aria-object';
import React, { useState, useRef, memo } from 'react';

function IssueTable ({ariaObjKey, data}) {
  
  const elements = data.map((el) => {
    return(
      <tr key={crypto.randomUUID()} >
          <td>{el[0]}</td>
          <td><code>{el[1]}</code></td>
          <td><a href={ariaObject[ariaObjKey].link}>Link</a></td>
      </tr>
    );
  });
  
  return(
    <>
      <table>
        <thead>
          <tr>
            <th>Line Number</th>
            <th>Element</th>
            <th>Further Reading</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
      </table>
    </>
  );
}

export default memo(IssueTable);