import React, {
  useEffect, useRef, useState, useContext, useMemo,
} from 'react';
import './capture.scss';
import { Context as ModalContext } from '../components/modal/modal-context';

const IMG_WIDTH = 1280;
const IMG_HEIGHT = 720;

export default function Capture () {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [notAllowed, changeNotAllowed] = useState(true);
  const [imgSrc, changeImgSrc] = useState<string>('');

  const modal = useContext(ModalContext);
  const modalComponent = useMemo(() => (
    <>
      <img src={imgSrc} alt="Camera capture" />
    </>
  ), [imgSrc]);

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
    if (canvas?.current && video?.current) {
      const context = canvas.current.getContext('2d');
      canvas.current.width = IMG_WIDTH;
      canvas.current.height = IMG_HEIGHT;

      context?.translate(IMG_WIDTH / 2, IMG_WIDTH / 2);
      context?.scale(-1, 1);
      context?.translate(-(IMG_WIDTH / 2), -(IMG_WIDTH / 2));
      context?.drawImage(video.current, 0, 0, IMG_WIDTH, IMG_HEIGHT);

      const data = canvas.current.toDataURL('image/png');

      changeImgSrc(data);
    }
  };

  useEffect(createVideoStream, []);
  useEffect(() => {
    if (imgSrc) {
      modal.set?.({ component: modalComponent, props: { modalClass: 'capture-modal' } });
    }
  }, [imgSrc]);
  useEffect(() => {
    if (modal.val) video.current?.pause();
    else video.current?.play();
  }, [modal.val]);

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
        <video style={{ display: notAllowed ? 'none' : 'block' }} autoPlay ref={video}>Video stream not available.</video>
      </div>

      <canvas ref={canvas} />
    </section>
  );
}
