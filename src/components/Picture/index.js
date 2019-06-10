import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import {observer} from 'mobx-react'
import styled from 'styled-components'
import Loading from '../Loading';
import siteState from '../../state/SiteState';
import HeadlessClient, { SERVER_HOST } from '../../lib/coremedia-client';

const CALISTA_EN_US_ID = 'ced8921aa7b7f9b736b90e19afc2dd2a'; // TODO Hack
const LANDSCAPE_16x9 = 'landscape_ratio16x9';

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
    min-width: 100%;
    height: 100%;
    max-height: 100%;
`;

// TODO No polyfill for img srcset loaded, this will not work in IE
const Picture = () => {
  const site = siteState.getSite(CALISTA_EN_US_ID);
  let imageWidths = siteState.getCropWidthsOf(CALISTA_EN_US_ID, LANDSCAPE_16x9);

  // TODO Debug
  console.log('Site crops', imageWidths);

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
        const srcSet = imageWidths.map(
          width => {
            const imgSrc = HeadlessClient.formatImageUrl(picture.uriTemplate, LANDSCAPE_16x9, width);
            return `${SERVER_HOST}/${imgSrc} ${width}w`
          })
          .join(', ');
        let sizes = imageWidths
          .map(width => `(min-width: ${width}px) ${width}px`); // Convert to sizes string
        sizes.push('100vw'); // Add default add the end
        sizes = sizes.join(', ');

        return (
          <ImgContainer>
            <Img src="data:image/gif;base64,R0lGODlhAQABAAAAADs=" srcSet={srcSet} alt={picture.alt} sizes={sizes} />
          </ImgContainer>
        );
      }}
    </Query>
  );
};

export default observer(Picture);