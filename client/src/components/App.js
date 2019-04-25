import React from 'react';
import { Router } from '@reach/router';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

// TODO: Delete those variables after exercise
const me = {};
const loading = false;

const App = () => (
  <>
    <Navbar me={me} />
    <Router primary={false}>
      <Home loading={loading} me={me || {}} path="/" />
      <Profile loading={loading} me={me || {}} path="/:username" />
    </Router>
  </>
);

export default App;
