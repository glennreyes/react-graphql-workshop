import dayjs from 'dayjs';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Calendar } from 'react-feather';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import Container from '../components/Container';
import Tweets from '../components/Tweets';
import { userQuery } from '../queries';

const Header = styled.header`
  background: #000;
  height: 160px;
`;

const Photo = styled.div`
  align-items: center;
  background: #fff;
  border-radius: 50%;
  display: flex;
  height: 136px;
  justify-content: center;
  margin-top: -96px;
  width: 136px;
`;

const DisplayName = styled.div`
  font-size: 32px;
  font-weight: 900;
  margin: 16px 0 4px;
`;

const Handle = styled.div`
  color: #bbb;
  margin-bottom: 16px;
`;

const Bio = styled.div``;

const Info = styled.div`
  align-items: center;
  color: #bbb;
  display: flex;
  margin: 16px 0 32px;
`;

const StyledCalendar = styled(Calendar)`
  margin-right: 8px;
`;

const Profile = ({ loading, me, username }) => (
  <div>
    <Query query={userQuery} variables={{ username }}>
      {({ data, loading: loadingUser, error }) => {
        if (loadingUser) return 'Loading User ...';
        if (error) return `Error: ${error.message}`;

        const { user } = data;

        if (!user) return 'User not found';

        return (
          <div>
            <Header />
            <Container>
              {user.photo && (
                <Photo>
                  <Avatar
                    src={user.photo}
                    alt={`@${user.username}`}
                    size={128}
                  />
                </Photo>
              )}
              <DisplayName>{user.displayName}</DisplayName>
              <Handle>@{user.username}</Handle>
              <Bio>{user.bio}</Bio>
              <Info>
                <StyledCalendar /> Joined{' '}
                {dayjs(user.createdAt).format('MMMM YYYY')}
              </Info>
              <Tweets loading={loading} me={me} tweets={user.tweets} />
            </Container>
          </div>
        );
      }}
    </Query>
  </div>
);

export default Profile;
