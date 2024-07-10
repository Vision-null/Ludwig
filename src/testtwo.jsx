import React from 'react';
import PropTypes from 'prop-types';

// Test component to demonstrate ESLint rules
function TestComponent({ title, onClick }) {
  return (
    <div>
      <h1>{title}</h1>
      {/* Missing onClick handler on clickable div */}
      <div role="button">Click me</div>
      {/* Missing alt attribute */}
      <img src="image.jpg" />
      {/* Invalid href attribute value */}
      <a href="google">Google</a>
      {/* Missing form label */}
      <form>
        <input type="text" id="name" />
      </form>
      </div>
  );
}

TestComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TestComponent;
