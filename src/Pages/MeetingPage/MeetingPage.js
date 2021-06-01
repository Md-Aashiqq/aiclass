import React, { useState, useEffect, useRef } from "react";

import Chat from "../../components/Chat/Chat";
import Chart from "../../components/Chart/Chart";

import { detectFaces } from "../../Helper/FaceDetect";

import { createSocketConnectionInstance } from "../../Helper/socketConnection";
import { useDataLayerValue } from "../../DataLayer";

import { CopyToClipboard } from "react-copy-to-clipboard";

import CallIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ChatIcon from "@material-ui/icons/Chat";
import MenuIcon from "@material-ui/icons/Menu";

import "./style.css";
import CustomMutaion from "./CustomMutaion";
function MeetingPage(props) {
  const [count, showCount] = useState(false);

  let socketInstance = useRef(null);

  const [model, setModel] = useState(null);

  const [micStatus, setMicStatus] = useState(true);
  const [camStatus, setCamStatus] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [chatToggle, setChatToggle] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "ashick" });
  const [displayStream, setDisplayStream] = useState(false);
  const [messages, setMessages] = useState([]);

  const [displayMenu, setDisplayMenu] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [wholeRoomID, setwholeRoomID] = useState("");

  const [sendData, setSendData] = useState(false);
  const [sendDetail, setSendDetail] = useState({});
  const [{ userID , isHost }, dispatch] = useDataLayerValue();

  useEffect(() => {
    return () => {
      socketInstance.current?.destoryConnection();
    };
  }, []);

  useEffect(() => {
    if (userDetails) startConnection();
  }, [userDetails]);

  const startDetect = () => {
    console.log(userID);
  };

  const handleDisconnect = () => {
    socketInstance.current?.destoryConnection();
    props.history.push("/");
  };

  useEffect(() => {
    if (window.innerWidth > 400) {
      setShowChart(true);
      setShowChat(false);
    } else {
      setShowChart(false);
      setShowChat(false);
    }
  }, []);

  const startConnection = () => {
    let params = { quality: 12 };
    socketInstance.current = createSocketConnectionInstance({
      updateInstance: updateFromInstance,
      params,
      userDetails,
    });
  };

  const updateFromInstance = (key, value) => {
    if (key === "streaming") setStreaming(value);
    if (key === "message") setMessages([...value]);
    if (key === "displayStream") setDisplayStream(value);
  };

  const handleMyCam = () => {
    if (!displayStream) {
      const { toggleVideoTrack } = socketInstance.current;
      toggleVideoTrack({ video: !camStatus, audio: micStatus });
      setCamStatus(!camStatus);
    }
  };
  const copyLink = (link) => {
    setwholeRoomID(link);
  };

  return (
    <div className="meeting__container">
      <div className="meeting__header">
        <h1>Realification</h1>
        <MenuIcon
          className="menu__icon"
          onClick={() => {
            setDisplayMenu(!displayMenu);
          }}
        />
      </div>
      {displayMenu && (
        <div className="phone__menu">
          <div
            onClick={() => {
              setShowChart(false);
              setShowChat(false);
              setShowVideo(true);
            }}
          >
            {" "}
            Vidoe{" "}
          </div>
          <div
            onClick={() => {
              setShowChart(true);
              setShowChat(false);
              setShowVideo(false);
            }}
          >
            {" "}
            Chart{" "}
          </div>
          <div
            onClick={() => {
              setShowChart(false);
              setShowChat(true);
              setShowVideo(false);
            }}
          >
            {" "}
            Chat{" "}
          </div>
        </div>
      )}

      <div className="side__nav">
        <span className="active">
          <VideocamIcon />
        </span>
        <span>
          <CallIcon />
        </span>
        <span>
          <VideocamIcon />
        </span>
      </div>
      {showVideo && (
        <div className="main__container">
          <div className="mini__nav">
            <div className="option__section">
              <div className="select__icon">
                <div className="people">p</div>
                <div className="person__count">
                  <div>4</div>{" "}
                  <svg
                    className="arrow__icon"
                    viewBox="0 0 17 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 3.95837V15.0417"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.4582 9.5L8.49984 15.0417L3.5415 9.5"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <CopyToClipboard
              text={wholeRoomID}
              // onCopy={() => this.setState({ copied: true })}
            >
              <div
                className="invite__link"
                onClick={() => {
                  copyLink(socketInstance.current.wholeRoomID);
                }}
              >
                Invite
              </div>
            </CopyToClipboard>
          </div>

          <div className="vidoe__section" id="vidoe__container"></div>
        </div>
      )}

      <div className="chat__chart">
        <div>
          {!chatToggle && (
            <div className="toogle__grp">
              <div
                className="chart__toogle"
                onClick={() => {
                  setShowChart(true);
                  setShowChat(false);
                }}
              >
                {" "}
                Chart{" "}
              </div>
              <div
                className="chat__toogle"
                onClick={() => {
                  setShowChart(false);
                  setShowChat(true);
                }}
              >
                {" "}
                Chat{" "}
              </div>
            </div>
          )}
        </div>

        {(showChart && isHost)  && (
          <div
            className="chart__section"
            style={showChart ? { display: "grid" } : { display: "none" }}
            // style={`${showChart ? "display:grid" : "display:none"}`}
          >
            <Chart />
          </div>
        )}

        {showChat && (
          <div
            className="chat__section"
            style={showChat ? { display: "block" } : { display: "none" }}
            // style={`${showChart ? "display:grid" : "display:none"}`}
          >
            <Chat
              socketInstance={socketInstance.current}
              myDetails={userDetails}
              messages={messages}
            />
          </div>
        )}
      </div>

      {showVideo && (
        <div className="btn__section">
          <div className="controller__container">
            <div>
              {micStatus ? (
                <MicIcon className="mic__icon icon" />
              ) : (
                <MicOffIcon className="micOff__icon icon" />
              )}
            </div>

            <CallIcon className="call__icon icon" onClick={handleDisconnect} />
            <div onClick={handleMyCam}>
              {camStatus ? (
                <VideocamIcon className="video__icon icon" />
              ) : (
                <VideocamOffIcon className="vidoeOff__icon icon" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeetingPage;
