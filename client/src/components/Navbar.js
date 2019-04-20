import React from 'react';
import {
  Bell as Notifications,
  Home,
  Mail as DirectMessages,
} from 'react-feather';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Avatar from './Avatar';
import Container from './Container';

const Header = styled.header`
  border-bottom: 1px solid #999;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  align-items: center;
  display: flex;
`;

const NavLink = styled(Link)`
  align-items: center;
  border-bottom: 4px solid transparent;
  border-top: 4px solid transparent;
  color: #000;
  display: flex;
  height: 64px;
  justify-content: center;
  width: 96px;
`;

const InactiveNavLink = styled.div`
  align-items: center;
  color: #999;
  display: flex;
  height: 64px;
  justify-content: center;
  width: 96px;
`;

const Navbar = ({ me }) => (
  <Header>
    <Container>
      <Content>
        <Nav>
          <NavLink
            to="/"
            getProps={({ isCurrent }) => ({
              style: {
                borderBottomColor: `${isCurrent ? 'black' : 'transparent'}`,
              },
            })}
          >
            <Home />
          </NavLink>
          <InactiveNavLink>
            <Notifications />
          </InactiveNavLink>
          <InactiveNavLink>
            <DirectMessages />
          </InactiveNavLink>
        </Nav>
        {me && (
          <Link to={`/${me.username}`}>
            <Avatar src={me.photo} alt={`@${me.username}`} />
          </Link>
        )}
      </Content>
    </Container>
  </Header>
);

export default Navbar;
