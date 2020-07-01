import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { InputLabel, TextField, Heading, Text } from '@zopauk/react-components';
import style from 'styled-components';

import gql from 'graphql-tag';

const Home = () => {
  const UserQuery = gql`
    query UserQuery($username: String!) {
      user(login: $username) {
        avatarUrl
        bio
        company
        email
        name
        location
        login
        websiteUrl
      }
    }
  `;

  const GithubStatusQuery = gql`
    query GithubStatusQuery {
      status @rest(type: "Status", path: "/status.json") {
        status @type(name: "String") {
          description
        }
      }
    }
  `;
  const [user, setUser] = useState(null);

  const [getUser, { loading, error, data }] = useLazyQuery(UserQuery, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (!loading && data && data.user) {
      setUser(data.user);
    }
  }, [loading]);

  const {
    loading: loadingGithubStatus,
    error: errorGithubStatus,
    data: dataGithubStatus,
  } = useQuery(GithubStatusQuery);

  const handleSubmit = (e: any) => {
    if (e.key === 'Enter') {
      console.log(e.currentTarget.value);
      getUser({ variables: { username: e.currentTarget.value } });
    }
  };

  if (loading || loadingGithubStatus) return <>Loading....</>;
  if (error || errorGithubStatus) return <>Error</>;

  const { description } = dataGithubStatus.status.status;

  return (
    <Container>
      <h1>Github status is: {description}</h1>
      <InputContainer>
        <InputLabel htmlFor='user'>Find a user:</InputLabel>
        <TextField inputSize='medium' onKeyDown={handleSubmit} name='user' />
      </InputContainer>
      {user && (
        <UserContainer>
          <ImageContainer>
            <Image src={data.user.avatarUrl} height='100px' width='100px' />
            <TextContainer>
              <SHeading as='h4'>Hello and welcome {data.user.name}!</SHeading>
            </TextContainer>
          </ImageContainer>
          <InfoContainer>
            {data.user.company && (
              <Text as='p'>You work for {data.user.company}</Text>
            )}
            {data.user.location && (
              <Text as='p'>You are located in {data.user.location}</Text>
            )}
          </InfoContainer>
        </UserContainer>
      )}
    </Container>
  );
};

export default Home;

const Container = style.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = style.div`
  display: flex;
  flex-direction: column;
`;

const Image = style.img`
  border-radius: 5px;
`;

const UserContainer = style.div`
  display: flex;
  margin-top: 2em;
  flex-direction: column;
`;

const ImageContainer = style.div`
  display: flex;
`;

const InfoContainer = style.div`
  margin-top: 2em;
`;

const TextContainer = style.div`
  display: flex;
  margin-left: 1em;
`;

const SHeading = style(Heading)`
  align-self: center;
`;
