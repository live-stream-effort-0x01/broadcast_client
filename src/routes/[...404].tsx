import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  return (
    <main>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <h1>Page Not Found</h1>

    </main>
  );
};

export default NotFound;