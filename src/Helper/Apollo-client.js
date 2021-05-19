import { onError } from "@apollo/client/link/error";

import ApolloClient from "apollo-boost";

import { gql } from "@apollo/client";

import { useDataLayerValue } from "../DataLayer";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

let emotionData = [];
class apolloClient {
  apollo_client = null;

  constructor() {
    // this.apollo_client = new ApolloClient({
    //   uri: "http://localhost:4000/",
    //   cache: new InMemoryCache(),
    // });
  }

  intilaziseClient() {}
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

  async sendEmotion() {
    let data;
    client
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
        emotionData = data.addEmotion;
        console.log(res.data.addEmotion);
        data = res.data;
      })
      .catch((e) => console.log(e));
  }
}
let apollo_client;
export function Apollo_Client() {
  return (apollo_client = new apolloClient());
}
