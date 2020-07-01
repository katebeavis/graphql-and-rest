import * as React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { InputText } from '@zopauk/react-components';

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

  const [{ loading, error, data }] = useQuery(UserQuery, {
    variables: { username: 'katebeavis' },
  });

  const {
    loading: loadingGithubStatus,
    error: errorGithubStatus,
    data: dataGithubStatus,
  } = useQuery(GithubStatusQuery);

  if (loading || loadingGithubStatus) return <>Loading....</>;
  if (error || errorGithubStatus) return <>Error</>;

  const { description } = dataGithubStatus.status.status;

  return (
    <>
      <h1>Github status is {description}</h1>
      <p>Find a user:</p>
      <InputText name='default' defaultValue='example of input' />;
      <p>Hello {data.user.name}</p>
    </>
  );
};

export default Home;
