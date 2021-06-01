// import { onError } from "@apollo/client/link/error";
// import { WebSocketLink } from '@apollo/client/link/ws';

import ApolloClient from "apollo-boost";
import { gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:4000/subscriptions',
//   options: {
//     reconnect: true
//   }
// })

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

let emotionData = [];
class apolloClient {
  apollo_client = null;

  constructor() {}

  getEmotions() {
    console.log(client);
    client
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

  async sendEmotion(type, id) {
    let data;
    console.log("asdasd");
    console.log(type, id);
    await client
      .mutate({
        mutation: gql`
          mutation addEmotion($id: String!, $type: String) {
            addEmotion(id: $id, type: $type) {
              type
              id
            }
          }
        `,
        variables: { id, type },
      })
      .then((res) => {
        console.log(res.data.addEmotion);
        data = res.data.addEmotion;
      })
      .catch((e) => console.log(e));

    return data;
  }
}
let clients;
export function Apollo_Client() {
  return (clients = new apolloClient());
}
