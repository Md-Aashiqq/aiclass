import * as faceapi from "face-api.js";

let face = null;
class DetectFace {
  video = null;
  ID = "";
  emotion = "";
  model = "";
  faceapi = null;
  constructor(video, ID) {
   
    return (async () => {
      this.video = video;
      this.ID = ID;
      this.model  = await this.loadmodels()
      this.faceapi = faceapi
      return this
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
    const emo = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
    console.log(emo);
    this.emotion = emo;
  }

  async sendData() {
    console.log(this.video, this.ID);
  }
}
export function detectFaces(video, ID) {
  return (face = new DetectFace(video, ID));
}
