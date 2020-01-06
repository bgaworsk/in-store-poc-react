import React, { useState } from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import {observer} from 'mobx-react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import Moment from 'react-moment'
import Loading from '../Loading';
import siteState from '../../state/SiteState';
import HeadlessClient from '../../lib/coremedia-client';
import colors from '../../lib/coremedia-colors';
import simplonNormRegular from '../../fonts/simplonnorm-regular-webxl-woff2-data.woff2';
import simplonNormMedium from '../../fonts/simplonnorm-medium-webxl-woff2-data.woff2';

const SITE_ID = process.env.REACT_APP_SITE_ID; // TODO Hack
const LANDSCAPE_16x9 = 'landscape_ratio16x9';

const ImgContainer = styled.div`
  @font-face {
    font-family: "Simplon Norm Regular";
    font-weight: 500;
    font-style: normal;
    src: url(${simplonNormRegular}) format("woff2");
  }
  @font-face {
    font-family: "Simplon Norm Medium";
    font-weight: 700;
    font-style: normal;
    src: url(${simplonNormMedium}) format("woff2");
  }

  font-family: "Simplon Norm Regular", "Lucida Sans", "Lucida Sans Unicode", "Lucida Grande", Arial, Helvetica, sans-serif;
  position: relative;
  width: 100%;
  height: 100%;
  
  strong {
    font-family: "Simplon Norm Medium", "Lucida Sans", "Lucida Sans Unicode", "Lucida Grande", Arial, Helvetica, sans-serif;
    font-weight: 700;
  }
`;

const Img = styled(animated.img)`
  position: absolute;
  min-width: 100%;
  height: 100%;
  max-height: 100%;
  will-change: transform, opacity;
`;

const Back = styled(animated.div)`
  position: absolute;
  background-color: ${colors.gray};
  height: 100%;
  width: 100%;
  padding: 4vw;
  will-change: transform, opacity;
  color: #000;
`;

// TODO No polyfill for img srcset loaded, this will not work in IE, e.g. https://www.npmjs.com/package/picturefill
const Picture = () => {
  React.useEffect(() => {
    siteState.loadSites();
  }, []);
  const site = siteState.getSite(SITE_ID);
  let imageWidths = siteState.getCropWidthsOf(SITE_ID, LANDSCAPE_16x9);

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  return (
    <Query
      query={gql`
      {
        content {
          picture(id:"${process.env.REACT_APP_PICTURE_ID}") {
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
        console.log(loading, error, data, site);
        if (loading) return <Loading />;
        if (!site) return <p>Could not load site</p>;
        if (error) {
          console.log(error);
          return <p>Error :(</p>;
        }

        const picture = data.content.picture;
        console.log(data);

        const srcSet = imageWidths.map(
          width => {
            const imgSrc = HeadlessClient.formatImageUrl(picture.uriTemplate, LANDSCAPE_16x9, width);
            return `${process.env.REACT_APP_SERVER_HOST}/${imgSrc} ${width}w`
          })
          .join(', ');
        let sizes = imageWidths
          .map(width => `(min-width: ${width}px) ${width}px`); // Convert to sizes string
        sizes.push('100vw'); // Add default add the end
        sizes = sizes.join(', ');

        return (
          <ImgContainer onClick={() => set(state => !state)}>
            <Img src="data:image/gif;base64,R0lGODlhAQABAAAAADs="
                 srcSet={srcSet}
                 sizes={sizes}
                 alt={picture.alt}
                 style={{opacity: opacity.interpolate(o => 1 - o), transform}} />
            <Back style={{opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`)}}>
              <h3>{picture.__typename}</h3>
              <p><strong>Title:</strong> {picture.title}</p>
              <p>
                <strong>Created:</strong>&nbsp;
                <Moment format='DD.MM.YYYY HH:mm'>{HeadlessClient.dateToISO(picture.creationDate)}</Moment>
              </p>
            </Back>
          </ImgContainer>
        );
      }}
    </Query>
  );
};

export default observer(Picture);