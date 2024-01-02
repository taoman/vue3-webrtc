<template>
  <div class="btn">
    <button @click="startCall">开始通话</button>
    <button @click="endCall">挂断通话</button>
  </div>
  <div class="video-voice">
    <video ref="remoteVideo" autoplay playsinline></video>
    <video ref="localVideo" autoplay playsinline muted></video>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";

  const remoteVideo = ref();
  const localVideo = ref();
  const socket = new WebSocket("ws://localhost:5173");
  const peer = new RTCPeerConnection();
  const init = () => {
    socket.onmessage = (e) => {
      const { type, sdp, iceCandidate } = JSON.parse(e.data);
      if (type === "offer") {
        navigator.mediaDevices.getUserMedia();
        const offerSdp = new RTCSessionDescription({ type, sdp });
        peer.setRemoteDescription(offerSdp).then(() => {
          peer.createAnswer((answer:any) => {
            socket.send(JSON.stringify(answer));
            peer.setLocalDescription(answer);
          });
        });
      }
    };
    peer.ontrack = (e) => {
        if(e && e.streams){
            remoteVideo.value.srcObject = e.streams[0];
        }
    };
  };

  const startCall = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideo.value.srcObject = stream;
          stream.getTracks().forEach((track) => peer.addTrack(track, stream));
        });
    }

    peer.createOffer().then((offre) => {
      peer.setLocalDescription(offre);
      socket.send(JSON.stringify(offre));
    });
    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socket.send(
          JSON.stringify({
            type: "offer_ice",
            candidate: e.candidate,
          })
        );
      }
    };
    
    socket.onmessage = (e) => {
      const { type, sdp, iceCandidate } = JSON.parse(e.data);
      if (type === "offer_ice") {
        peer.addIceCandidate(iceCandidate);
      }
    };
    console.log('开始了')
  };
  const endCall = () => {
    if (localVideo.value.srcObject) {
      localVideo.value.srcObject.getTracks().forEach((track) => track.stop());
    }
  };
  onMounted(() => {
    init();
  })
</script>

<style lang="scss" scoped>
  .btn button {
    width: 100px;
    height: 40px;
    border: 1px solid #ccc;
    margin-right: 20px;
    background: gold;
    color: black;
    cursor: pointer;
  }
  button:hover {
    background: bisque;
  }
  .video-voice {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }
</style>
