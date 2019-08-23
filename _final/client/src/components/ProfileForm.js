import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import RawInput from './Input';
import { userQuery } from '../queries';

const updateUserMutation = gql`
  mutation updateUser(
    $id: ID!
    $bio: String
    $displayName: String
    $photo: String
    $username: String!
  ) {
    updateUser(
      id: $id
      bio: $bio
      displayName: $displayName
      photo: $photo
      username: $username
    ) {
      id
    }
  }
`;

const Form = styled.form`
  margin: 16px 0;
`;

const Input = styled(RawInput)`
  margin: 8px 0;
`;

const Actions = styled.div`
  display: flex;
  margin: 8px 0;
`;

const SaveButton = styled(Button).attrs({ primary: true })`
  margin-left: 16px;
`;

const ProfileForm = ({ user, setEditing }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [photo, setPhoto] = useState(user.photo);
  const [updateUser] = useMutation(updateUserMutation, {
    onCompleted: () => reset(),
    refetchQueries: [
      { query: userQuery, variables: { username: user.username } },
    ],
    awaitRefetchQueries: true,
    variables: {
      id: user.id,
      displayName,
      bio,
      photo,
      username: user.username,
    },
  });

  const reset = () => {
    setDisplayName(user.displayName);
    setBio(user.bio);
    setPhoto(user.photo);
    setEditing(false);
  };

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        updateUser();
      }}
    >
      <Input
        placeholder="Name"
        value={displayName}
        onChange={event => setDisplayName(event.target.value)}
        big
      />
      <Input
        placeholder="Bio"
        value={bio}
        onChange={event => setBio(event.target.value)}
      />
      <Input
        placeholder="Avatar URL"
        value={photo}
        onChange={event => setPhoto(event.target.value)}
      />
      <Actions>
        <Button type="reset" onClick={() => reset()}>
          Cancel
        </Button>
        <SaveButton
          primary
          disabled={displayName === '' || !photo.startsWith('http')}
        >
          Save
        </SaveButton>
      </Actions>
    </Form>
  );
};

export default ProfileForm;
