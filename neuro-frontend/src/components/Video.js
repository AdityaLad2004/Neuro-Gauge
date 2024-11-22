import { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const Video = () => {
  const client = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const initClient = async () => {
      // Create an AgoraRTC client instance
      client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      
      const appId = '34ef327a7c644beca1d1060f8c33533d'; // Replace with your Agora App ID
      const channelName = 'aditya'; // Replace with your channel name
      const token = '007eJxTYDhSstE6rTS/SJQzWXvnoidvOnUmdF5zk/3N45mwIS7vioECg7FJapqxkXmiebKZiUlSanKiYYqhgZlBmkWysbGpsXGKeYttekMgIwMXyzsGRigE8dkYElMySyoTGRgAMwoeaA=='; // Replace with your generated token
      
      await client.current.join(appId, channelName, token, null);

      // Create local tracks
      const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      
      // Play the local video track
      localVideoTrack.play(localVideoRef.current);

      // Publish the local tracks to the channel
      await client.current.publish([localAudioTrack, localVideoTrack]);

      // Subscribe to a remote user when they publish a track
      client.current.on('user-published', async (user, mediaType) => {
        await client.current.subscribe(user, mediaType);

        if (mediaType === 'video') {
          // Play the remote user's video track
          const remoteVideoTrack = user.videoTrack;
          remoteVideoTrack.play(remoteVideoRef.current);
        }

        if (mediaType === 'audio') {
          // Play the remote user's audio track
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
      });
    };

    initClient();

    return () => {
      if (client.current) {
        client.current.leave();
        client.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div ref={localVideoRef} style={{ width: '400px', height: '300px' }}></div>
      <div ref={remoteVideoRef} style={{ width: '400px', height: '300px' }}></div>
    </div>
  );
};

export default Video;
