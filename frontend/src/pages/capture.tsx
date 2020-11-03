import React, {useEffect, useRef} from 'react';
import './capture.css';

const IMG_WIDTH = 640;
const IMG_HEIGHT = 360;

export default function Capture () {
  const video = useRef<HTMLVideoElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // On component load, start streaming the video
    const constraints = { audio: false, video: { width: IMG_WIDTH, height: IMG_HEIGHT } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        if (video?.current) {
          video.current.srcObject = mediaStream;
          video.current.onloadedmetadata = () => video?.current?.play();
        }
      })
      .catch((err) => {
        console.warn(`${err.name}: ${err.message}`);
      });
  }, []);

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

  return (
    <section className="page capture">
      <div className="camera">
        <video autoPlay ref={video}>Video stream not available.</video>
        <button type="button" onClick={takePhoto}>Take photo</button>
      </div>

      <canvas ref={canvas} />
      <div className="output">
        <img alt="The screen capture" ref={photo} />
      </div>
    </section>
  );
}
