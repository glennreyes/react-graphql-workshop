import React from 'react';
import { Link } from '@reach/router';
import Container from '../components/Container';
import Heading from '../components/Heading';

const NotFound = ({ username }) => (
  <Container>
    <Heading>User "{username}" does not exist :/</Heading>
    <p>
      Not sure what happened... maybe just go <Link to="/">back to home</Link>?
    </p>
  </Container>
);

export default NotFound;
