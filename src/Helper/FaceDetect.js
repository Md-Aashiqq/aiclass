import * as faceapi from "face-api.js";
// import { Apollo_Client } from "./Apollo-client";

import ApolloClient from "apollo-boost";
import { gql } from "@apollo/client";
import { calcEAR } from "./earCalc";
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
  interval = 0;
  tick = 0;
  tickProcess = 0;
  tickBlink = 0;
  socket = null;
  constructor(video, ID, socket) {
    return (async () => {
      this.video = video;
      this.ID = ID;
      this.socket = socket;
      this.model = await this.loadmodels();
      this.detectEmotions();
      return this;
    })();
  }

  async loadmodels() {
    console.log("loaded model");
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/model");
    await faceapi.nets.faceExpressionNet.loadFromUri("/model");
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/model");
    await faceapi.nets.tinyFaceDetector.loadFromUri("/model");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/model");
    console.log("model loaded");
    return faceapi;
  }

  async detectEmotions() {
    console.log("detect");
    let results;
    const tend = performance.now();
    this.tickProcess = Math.floor(tend - this.tick);
    const tickProcess = this.tickProcess.toString() + " ms";
    this.tick = tend;
    console.log(this.socket);
    setInterval(async () => {
      let text = [];
      results = await faceapi
        .detectSingleFace(this.video)
        .withFaceLandmarks(true)
        .withFaceExpressions();

      const leftEye = results?.landmarks?.getLeftEye();
      const rightEye = results?.landmarks?.getRightEye();

      console.log("detect detected", leftEye, rightEye);
      const EAR = calcEAR(leftEye) + calcEAR(rightEye);
      console.log("detect detected", EAR);
      if (EAR < 50) {
        this.tickBlink += this.tickProcess;
        text.push("Time:" + this.tickBlink.toString());
        text.push("DROWSINESS ALERT!!");
        this.socket.emit("send-alert", { data: this.ID });
        console.log(text.join(" "));
      } else {
        this.tickBlink = 0;
      }
    }, 1000);

    console.log(results);
    let obj = results?.expressions;
    let emo;
    if (obj) {
      emo = Object?.keys(obj)?.reduce((a, b) => (obj[a] > obj[b] ? a : b));
    }
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
export function detectFaces(video, ID, socket) {
  return (face = new DetectFace(video, ID, socket));
}
