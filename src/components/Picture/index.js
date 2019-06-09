import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import {observer} from 'mobx-react'
import Loading from '../Loading';
import siteState from '../../state/SiteState';
import HeadlessClient, { SERVER_HOST } from '../../lib/headless-client';

const CALISTA_EN_US_ID = 'ced8921aa7b7f9b736b90e19afc2dd2a'; // TODO Hack
const LANDSCAPE_16x9 = 'landscape_ratio16x9';
const WIDTH = '1920';

const Picture = () => {
  const site = siteState.getSite(CALISTA_EN_US_ID);
  console.log('Site is', site);

  return (
    <Query
      query={gql`
      {
        content {
          picture(id:"5348") {
            creationDate
            name
            title
            alt
            uriTemplate
          }
        }
      }
    `}
    >
      {({ loading, error, data }) => {
        if (loading || !site) return <Loading />;
        if (error) return <p>Error :(</p>;

        const picture = data.content.picture;
        const imgSrc = HeadlessClient.formatImageUrl(picture.uriTemplate, LANDSCAPE_16x9, WIDTH);

        return <div>
          <img src={`${SERVER_HOST}/${imgSrc}`} alt={picture.alt} />
        </div>;
      }}
    </Query>
  );
};

export default observer(Picture);