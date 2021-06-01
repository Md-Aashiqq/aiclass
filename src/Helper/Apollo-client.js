// import { onError } from "@apollo/client/link/error";
// import { WebSocketLink } from '@apollo/client/link/ws';

// import ApolloClient from "apollo-boost";

// import { gql } from "@apollo/client";

// import { useDataLayerValue } from "../DataLayer";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/",
// });



// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:4000/subscriptions',
//   options: {
//     reconnect: true
//   }
// })



import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache  , gql} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

let emotionData = [];
let client;
class apolloClient {
  apollo_client = null;

  constructor() {
    return (async () => {
      this.apollo_client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache()
      });
    })();
    
  }

  getEmotions() {
    console.log(this.apollo_client);
    this.apollo_client
      .query({
        query: gql`
          query getEmotions {
            getEmotions {
              type
              id
            }
          }
        `,
      })
      .then((result) => console.log(result))
      .catch((E) => {
        console.log(E);
      });
  }

  async sendEmotion() {
    let data;

    this.apollo_client
      .mutate({
        mutation: gql`
          mutation {
            addEmotion(id: "12", type: "sad") {
              type
              id
            }
          }
        `,
      })
      .then((res) => {
        console.log(res.data.addEmotion);
      })
      .catch((e) => console.log(e));
  }
}

export function Apollo_Client() {
  return ( client = new apolloClient());
}
