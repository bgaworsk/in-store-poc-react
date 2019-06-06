import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

export const client = new ApolloClient({
  uri: "https://caas-1901.livecontext.coremedia.com/graphql"
});

export default {

  test: function() {
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
  }

}

