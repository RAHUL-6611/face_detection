import { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
import * as faceapi from '@vladmandic/face-api';

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);
  console.log(faces)

  const imgRef = useRef();
  const canvasRef = useRef();

  // runs the detection
  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    console.log(detections);
    setFaces(detections.map((d) => Object.values(d.box)));
  };

  handleImage();

  // take faces from handleImage and draw draw face rectangle
  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    faces.map((face) => ctx.strokeRect(...face));
  };

  
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };

    imgRef.current && loadModels();
  }, []);

  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(friends);
  return (
    <div className="container"> 
      <div className="left" style={{ width:"500px", height:"500px" }}>
        <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" width="500px" height="500px"/>
        <canvas
          onMouseEnter={enter}
          ref={canvasRef}
          width={"500px"}
          height={"500px"}
        />
        {faces.map((face, i) => (
          <input
            name={`input${i}`}
            style={{ left: face[0], top: face[1] + face[3] + 5 }}
            placeholder="Tag a friend"
            key={i}
            className="friendInput"
            onChange={addFriend}
          />
        ))}
      </div>    
      <div className="right">
        <h1>Share your post</h1>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="rightInput"
        />
        {friends && (
          <span className="friends">
            with <span className="name">{Object.values(friends) + " "}</span>
          </span> 
        )}
        <button className="rightButton">Send</button>
      </div>
    </div>
  );
};

export default NewPost;
