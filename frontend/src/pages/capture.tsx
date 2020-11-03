import React, {useEffect, useRef, useState} from 'react';
import './capture.css';

const IMG_WIDTH = 1280;
const IMG_HEIGHT = 720;

export default function Capture () {
  const video = useRef<HTMLVideoElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [notAllowed, changeNotAllowed] = useState(true);

  const createVideoStream = () => {
    const constraints = { audio: false, video: { width: IMG_WIDTH, height: IMG_HEIGHT } };
    if (!navigator.mediaDevices) return;

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        if (video?.current) {
          video.current.srcObject = mediaStream;
          video.current.onloadedmetadata = () => video?.current?.play();
          changeNotAllowed(false);
        }
      })
      .catch((err) => {
        changeNotAllowed(true);
        console.warn(`${err.name}: ${err.message}`);
      });
  };

  const takePhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    if (photo?.current && canvas?.current && video?.current) {
      const context = canvas.current.getContext('2d');
      canvas.current.width = IMG_WIDTH;
      canvas.current.height = IMG_HEIGHT;
      context?.drawImage(video.current, 0, 0, IMG_WIDTH, IMG_HEIGHT);

      const data = canvas.current.toDataURL('image/png');
      photo.current.setAttribute('src', data);
    }
  };

  useEffect(createVideoStream, []);

  return (
    <section className="page capture">
      <div className="camera">
        {notAllowed ? (
          <div
            className="not-allowed"
            role="button"
            tabIndex={0}
            onKeyPress={createVideoStream}
            onClick={createVideoStream}
          >
            <img src="/icons/denied.svg" alt="Video not available" className="pointer" />
            <p className="pointer">
              Please, allow the website to use the camera.
              <br />
              Click here to try again.
            </p>
          </div>
        ) : (
          <button type="button" onClick={takePhoto}>
            <img src="/icons/cam.svg" alt="Use your camera" />
          </button>
        )}
        <video style={{display: notAllowed ? 'none' : 'block'}} autoPlay ref={video}>Video stream not available.</video>
      </div>

      <canvas ref={canvas} />
      <div className="output">
        <img alt="The screen capture" ref={photo} />
      </div>
    </section>
  );
}
