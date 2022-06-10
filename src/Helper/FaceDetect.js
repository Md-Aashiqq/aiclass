import * as faceapi from "face-api.js";
// import { Apollo_Client } from "./Apollo-client";

import ApolloClient from "apollo-boost";
import { gql } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://aiclass-graphql-endpoint.herokuapp.com/",
  // uri: "http://localhost:4000/",
});

let face = null;
class DetectFace {
  video = null;
  ID = "";
  emotion = "";
  model = "";
  faceapi = null;
  client = null;
  constructor(video, ID) {
    return (async () => {
      this.video = video;
      this.ID = ID;
      this.model = await this.loadmodels();
      this.detectEmotions();
      return this;
    })();
  }

  async loadmodels() {
    console.log("loaded model");
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/model");
    await faceapi.nets.faceExpressionNet.loadFromUri("/model");
    console.log("model loaded");
    return faceapi;
  }

  async detectEmotions() {
    console.log("detect");

    const results = await faceapi
      .detectAllFaces(this.video)
      .withFaceExpressions();
    console.log(results);
    let obj = results[0]?.expressions;
    let emo = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
    console.log(emo);
    this.emotion = emo;

    if (emo === undefined || emo === null) {
      emo = "neural";
    }

    await client
      .mutate({
        mutation: gql`
          mutation addEmotion($id: String!, $type: String!) {
            addEmotion(id: $id, type: $type) {
              type
              id
            }
          }
        `,
        variables: { id: this.ID, type: emo },
      })
      .then((res) => {
        console.log(res.data.addEmotion);
      })
      .catch((e) => console.log(e));
  }

  async sendData() {
    console.log(this.video, this.ID);
  }
}
export function detectFaces(video, ID) {
  return (face = new DetectFace(video, ID));
}
