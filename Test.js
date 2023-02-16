
const onVid = document.getElementById("local_video");

onVid.addEventListener("onload",invite());

function handleUserlistMsg(msg) {
    const listElem = document.querySelector(".userlistbox");
  
    while (listElem.firstChild) {
      listElem.removeChild(listElem.firstChild);
    }
  
    msg.users.forEach((username) => {
      const item = document.createElement("li");
      item.appendChild(document.createTextNode(username));
      item.addEventListener("click", invite, false);
  
      listElem.appendChild(item);
    });
  }
  

const mediaConstraints = {
    audio: true, // We want an audio track
    video: true, // And we want a video track
  };
  
  function invite(evt) {
    if (myPeerConnection) {
      alert("You can't start a call because you already have one open!");
    } else {
      const clickedUsername = evt.target.textContent;
  
      if (clickedUsername === myUsername) {
        alert(
          "I'm afraid I can't let you talk to yourself. That would be weird."
        );
        return;
      }
  
      targetUsername = clickedUsername;
      createPeerConnection();
  
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then((localStream) => {
          document.getElementById("local_video").srcObject = localStream;
          localStream
            .getTracks()
            .forEach((track) => myPeerConnection.addTrack(track, localStream));
        })
        .catch(handleGetUserMediaError);
    }
  }
  