import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

export const SERVER_URL = `${process.env.REACT_APP_SERVER_HOST}/graphql`;

export const client = new ApolloClient({
  uri: SERVER_URL
});

export const URI_TEMPLATE_CROP_NAME = '{cropName}';
export const URI_TEMPLATE_WIDTH = '{width}';

export default {

  test() {
    client
      .query({
        query: gql`
          query {
            content {
              sites {
                name
              }
            }
          }
    `
      })
      .then(result => console.log(result));
  },

  getSites() {
    return client.query({ query: gql`
      {
        content {
          sites {
            id
            name
            locale
            crops {
              name
              aspectRatio {
                width
                height
              }
              sizes {
                width
                height
              }
            }
          }
        }
      }
    `});
  },

  formatImageUrl: (uriTemplate, cropName, width) => uriTemplate
    .replace(URI_TEMPLATE_CROP_NAME, cropName)
    .replace(URI_TEMPLATE_WIDTH, width),

  // TODO Why is this hack needed?
  dateToISO: date => (date && date.substr(0, date.length-5)) || null

}

