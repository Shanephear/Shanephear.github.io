"use client";
import React, { useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import 'videojs-contrib-quality-levels';
import 'videojs-quality-selector-hls'
export const Player = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // videojs.registerPlugin('hlsQualitySelector',qualitySelectorHls)
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);
      if (options.sources[0].type != 'application/x-mpegURL') {

      }
      const player = (playerRef.current = videojs(videoElement, {
        ...options,
      }, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
      player.qualitySelectorHls()
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);

      const qualityButton = document.querySelector('.vjs-quality-selector');
      if (qualityButton) {
        if (options.sources[0].type != 'application/x-mpegURL') {
          qualityButton.style.display = 'none';
        }
        else {
          qualityButton.style.display = 'block';
        }
      }
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
      <div data-vjs-player>
        <div className="video-js" ref={videoRef} />
      </div>
    </>
  );
};

export default Player;