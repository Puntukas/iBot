// Name and Version
var NAME = "iBot";
var VERSION = "v1.0.0";


// Plug.DJ Ported API for Dubtrack.FM, this code is made by me, sendChat isnt, it is the creator of MikuPlugin
API = {
	sendChat: function(String){$("#chat-txt-message").val(String);Dubtrack.room.chat.sendMessage();},
	ADVANCE: "realtime:room_playlist-update",
	CHAT: "realtime:chat-message",
	USER_LEAVE: "realtime:user-leave",
	USER_JOIN: "realtime:user-join",
	on: function(Event, Function){Dubtrack.Events.bind(Event, Function);},
	off: function(Event, Function){Dubtrack.Events.unbind(Event, Function);}
};

// Custom stuff
IBot = {
	iBot: NAME + " " + VERSION,
	Tools: {
		lookForUser: function(String) {
			var found = false;
			for(var i = 0; i < $(".username").length; i++) {
				if(String.toLowerCase() == $(".username")[i].innerHTML.toLowerCase()) {
					found = true;
				}
			}
			if(found) {
				return true;
			} else {
				return false;
			}
		}
	}
};

function updateDJ() {
	var tempString = $(".currentDJSong")[0].innerHTML;
	var DJ = tempString.slice(0, tempString.length - 11);
}

function userJoinMsg(data) {
	API.sendChat("Welcome/Welcome back to the room @" + data.user.username + "!");
}

function userLeaveMsg() {
	API.sendChat("Goodbye @" + data.user.username + "!");
}

function commandHandler(data) {
	var msg = data.message;
	
	if(msg.startsWith("!")) {
		if(msg === "!help") {
			API.sendChat(IBot.iBot + " user commands: help, cookie @{User}, autodubup");
		}
		if(msg.startsWith("!cookie")) {
			var UN = msg.substring(9);
			if(UN != "") {
				if(IBot.Tools.lookForUser(UN)) {
					API.sendChat(":cookie: *hands @" + UN + " a cookie, a note on it reads 'With love from @" + data.user.username + "'* :cookie:");
				} else {
					API.sendChat(":x: User not found! :x:");
				}
			} else {
				API.sendChat(":cookie: *hands you a cookie (for @" + data.user.username + ")* :cookie:");
			}
		}
		if(msg === "!autodubup") {
			API.sendChat("Recommended Dubtrack.FM Extensions: iWoot (same creator as me, iBot), MikuPlugin (made by @rubychan), and/or DubX (made by multiple developers)");
		}
	}
}

function nextSongMsg() {
	API.sendChat(":musical_note: Now playing: " + $(".currentSong").text() + "! :musical_note:");
}

function connectAPI() {
	API.on(API.CHAT, commandHandler);
	API.on(API.USER_JOIN, userJoinMsg);
	API.on(API.USER_LEAVE, userLeaveMsg);
	API.on(API.ADVANCE, nextSongMsg);
	API.on(API.ADVANCE, updateDJ);
}

// Just like iWoot, CONNECT EVERYTHING!
function startUp() {
	connectAPI();
	updateDJ();
	API.sendChat(IBot.iBot + " Started!");
}

startUp();
