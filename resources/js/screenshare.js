// global configuration
var config = {
    signalServer: socketUrl,
    uniqueId: Math.random().toString(36).substr(2, 35),
    isBroadcaster: false,
};

var mediaStream = null;
var sockConn = null;
var remoteStream = null;
var remotePeers = {};
var remoteLinks = {};
var pendingCandidates = {};

function connectSocket(){
	return new Promise((resolve, reject) => {
	    if (sockConn) {
	        resolve(sockConn);
	    }
	    sockConn = new WebSocket(config.signalServer+"?id="+config.uniqueId);
	    sockConn.onopen = () => {
	        resolve(sockConn);
	    };
	    sockConn.onerror = (err) => {
	    	console.log(err)
	        reject(err);
	    };
	});
}

function sendToSocket(event, message){
    if (sockConn) {
        const reqPayload = {
            "event": event,
            "data": message
        };
        console.log("sent:", reqPayload);
        sockConn.send(JSON.stringify(reqPayload));
    } else {
        console.log("Socket not available");
    }
}

async function initApp() {
    try {
        await connectSocket();
        if(requestTo){
        	sendToSocket("req_join_user", {
                uniqid: config.uniqueId,
                user: requestTo,
            });
        }
        sockConn.onmessage = async (message) => {
            await messageHandler(message);
        };
    }catch(err) {
        console.log(err);
    }
}

//start connecting to websocket
initApp();
// Start initilizing peer connection
//end of initilizing
function initPc (remotePeer) {
	const rtcConfig = null;//{iceServers: [{"urls":["stun:stun.l.google.com:19302"]}]};
	const pc = new RTCPeerConnection(rtcConfig);
	pc.ontrack = (ev) => {
	    showStream(ev);
	};

	pc.onconnectionstatechange = (ev) => {
		console.log("ICE St Ch.",ev);
	    if (pc.connectionState === 'connected') {
	        console.log("peers connected..");
	    }
	};

	pc.onicecandidate = (ev) => {
		//console.log("ICE Cand. ",ev.candidate);
	    if (ev.candidate) {
	    	//console.log("onicecand: ",ev.candidate.usernameFragment);
	        sendToSocket("candidate", {candidate: ev.candidate,to: remotePeer,from:config.uniqueId});
	    }
	};
	return pc;
}

// Shows the screen to the joiner
function  showStream(ev){
	var video = document.getElementById("screen");
	video.style.width = "900px";
	showMessage("<h1>Remote Screen..</h1>");;
	if (ev.streams && ev.streams[0]) {
		console.log("stream");
		video.srcObject = ev.streams[0];
	  } else {
		if (!remoteStream) {
			console.log("track");
			remoteStream = new MediaStream();
			video.srcObject = remoteStream;
		}
		remoteStream.addTrack(ev.track);
	  }
	video.play();
}

async function messageHandler(ev){
    var message = JSON.parse(ev.data);
    console.log("Received: ",message);
    switch (message.event) {
        case "req_join":
            await sendOffer(message.data);
            break;
        case "offer":
            await sendAnswer(message.data);
            break;
        case "answer":
            await setAnswer(message.data);
            break;
        case "candidate":
            await setCandidate(message.data);
            break;
		case "req_join_user_discover":
			sendReqJoin(message.data);
			break;
        default:
            console.log("not implemented event yet");
    }
}

function sendReqJoin(data){
	sendToSocket("req_join", {
            to: data.from,
            from: config.uniqueId
        });
}

async function sendOffer(data) {
    remotePeerId = data.from;
    var pc = initPc(remotePeerId);
    if(config.isBroadcaster){
    	console.log("broadcasted..stream")
		mediaStream.getTracks().forEach(track => pc.addTrack(track, mediaStream));
	}
    try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        sendToSocket("offer", {
            offer: offer,
            to: remotePeerId,
            from: config.uniqueId
        });
        
        remotePeers[remotePeerId] = pc;
    } catch (err) {
        console.log(err);
    }
}

async function sendAnswer(offerData) {
    const offer = offerData.offer;
    const offerer = offerData.from;
	const pc = initPc(offerer);
    try {
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        remotePeers[offerer] = pc;
        sendToSocket("answer", {
            answer: answer,
            to: offerer,
            from: config.uniqueId
        });
		// check if candidates are pending
		const from = offerer;
		if(pendingCandidates.hasOwnProperty(from)){
			pendingCandidates[from].forEach(cand =>{
				console.log("cand: ",cand);
				pc.addIceCandidate(cand);
			});
			delete pendingCandidates[from];
		}
    } catch (err) {
        console.log(err);
    }
}

async function setAnswer(answerData)  {
	var answer = answerData.answer;
	console.log(answerData.from);
	console.log(remotePeers);
	var pc = remotePeers[answerData.from];
    try {
        const remoteDesc = new RTCSessionDescription(answer);
        await pc.setRemoteDescription(remoteDesc);
    } catch (err) {
        console.log(err);
    }
}

async function setCandidate(candidateData){
	var candidate = candidateData.candidate;
	var from = candidateData.from;
	if(remotePeers.hasOwnProperty(from)){
		try {
    	console.log("on adding cand: ",candidate);
		const pc = remotePeers[from];
        await pc.addIceCandidate(candidate);
	    } catch (e) {
	        console.error('Error adding received ice candidate', e);
	    }
	}else{
		if(pendingCandidates.hasOwnProperty(from)){
			pendingCandidates[from].push(candidate);
		}else{
			pendingCandidates[from] = [];
			pendingCandidates[from].push(candidate);
		}
	}
}

function joinScreen (toUniqueId) {
    config.isBroadcaster = false;
    sendToSocket("req_join", {
        from: config.uniqueId,
        to: toUniqueId
    });
}


function shareScreen(video,callback) {
    config.isBroadcaster = true;
    const options = {video:true};
	const dispMedia = navigator.mediaDevices.getDisplayMedia(options) || navigator.getDisplayMedia(options);
		dispMedia.then(stream => {
			mediaStream = stream;
			video.srcObject = stream;
			config.isBroadcaster = true;
			sendToSocket("req_join_user_discover", {
	            user: selfId,
	        });
			callback && callback();
        }).catch(err=>{
			console.log(err);
		});
}

function stopSharingScreen(callback) {
	if(mediaStream){
		mediaStream.getTracks().forEach(track=>{
			track.stop();
		});
		mediaStream = null;
		callback && callback();
	}
}