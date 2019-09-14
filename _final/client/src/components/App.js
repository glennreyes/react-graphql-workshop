import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Router } from '@reach/router';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const currentUserQuery = gql`
  query getCurrentUser {
    me {
      id
      username
      displayName
      photo
    }
  }
`;

const App = () => {
  const { loading, error, data = {} } = useQuery(currentUserQuery);

  if (error) return `Error: ${error.message}`;

  const { me } = data;

  return (
    <>
      <Navbar me={me} />
      <Router primary={false}>
        <Home loading={loading} me={me || {}} path="/" />
        <Profile loading={loading} me={me || {}} path="/:username" />
      </Router>
    </>
  );
};

export default App;
