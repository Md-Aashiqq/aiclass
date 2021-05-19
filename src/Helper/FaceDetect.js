import * as faceapi from "face-api.js";

let face = null;
class DetectFace {
  video = null;
  constructor(video) {
    this.video = video;
    console.log(this.video);
    const re = this.loadmodels();

    // this.detectEmotions();
  }

  async loadmodels() {
    console.log("loaded model");
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/model");
    await faceapi.nets.faceExpressionNet.loadFromUri("/model");
    console.log("model loaded");
    this.detectEmotions();
    return faceapi;
  }

  async detectEmotions() {
    console.log("detect");
    const results = await faceapi
      .detectAllFaces(this.video)
      .withFaceExpressions();
    console.log(results);
    let obj = results[0].expressions;
    const emo = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
    console.log(emo);
  }
}
export function detectFaces(video = null) {
  return (face = new DetectFace(video));
}
