import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="not-found-page">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <a href="/" className="btn btn-primary">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
