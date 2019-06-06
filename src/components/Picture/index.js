import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Loading from '../Loading';

const Picture = () => (
  <Query
    query={gql`
      {
        content {
          picture(id:"5348") {
            creationDate
            name
            title
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error :(</p>;

      return <div>{data.content.picture.name}</div>;
    }}
  </Query>
);

export default Picture;