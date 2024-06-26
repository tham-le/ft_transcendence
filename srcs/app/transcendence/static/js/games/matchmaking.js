import * as JS_UTILS from "./jsUtils.js";
// ----------------- Send functions -----------------

export function sendMatchmakingJoin(socket, infos) {
  const message = {
    matchmaking: "join",
    gameId: infos["gameId"],
  };
  JS_UTILS.sendMessageToSocket(socket, message);
}

export function sendMatchmakingLeave(socket, infos) {
  const message = {
    matchmaking: "leave",
    gameId: infos["gameId"],
  };
  JS_UTILS.sendMessageToSocket(socket, message);
}

function showModal() {
  const modal = document.querySelector(".loading-modal");
  const overlay = document.querySelector(".loading-overlay");
  modal.classList.remove("loading-hidden");
  overlay.classList.remove("loading-hidden");
}

function hideModal() {
  const modal = document.querySelector(".loading-modal");
  const overlay = document.querySelector(".loading-overlay");
  modal.classList.add("loading-hidden");
  overlay.classList.add("loading-hidden");
}

function setupMatchmakingButton(socket) {
  const matchmakingButton = document.querySelector(".matchmaking-btn");
  matchmakingButton.addEventListener("click", function () {
    const gameId = this.getAttribute("data-game-id");
    const infos = { gameId: gameId };

    if (matchmakingButton.innerHTML.includes("Cancel")) {
      sendMatchmakingLeave(socket, infos);
    } else {
      sendMatchmakingJoin(socket, infos);
    }
  });
}

function setupCancelButton(socket) {
  const cancelButton = document.querySelector(".loading-modal .cancel-button");
  cancelButton.addEventListener("click", function () {
    hideModal();

    const gameId = document
      .querySelector(".matchmaking-btn")
      .getAttribute("data-game-id");
    const infos = { gameId: gameId };

    const button = document.querySelector(".matchmaking-btn");
    button.innerHTML = "Matchmaking";
    sendMatchmakingLeave(socket, infos);
  });
}

function parseMessage(message, infos) {
  const button = document.querySelector(".matchmaking-btn");
  if ("matchmaking" in message) {
    switch (message["matchmaking"]) {
      case "waitlist joined":
        button.innerHTML = "Cancel matchmaking";
        showModal();
        break;
      case "waitlist leaved":
      case "match found":
        // if in matchmaking, reset button to "Matchmaking"
        if (button && button.innerHTML.includes("Cancel")) {
          button.innerHTML = "Matchmaking";
          hideModal();
        }
        if (message["matchmaking"] === "match found") {
          window.location.hash = `${message["game"]}?party_id=${message["party_id"]}&url=${encodeURI(message["url"])}`;
        }
        break;
      default:
        console.error("Unhandled matchmaking status:", message["matchmaking"]);
    }
  }
}

// ----------------- Listeners -----------------
function socketListener(socket) {
  socket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    parseMessage(data);
  };

  socket.onclose = function () {
  };

  socket.onerror = function (error) {
    // console.error(error);
  };
}

function windowListener(socket, infos, btn) {
  window.addEventListener("hashchange", function () {
    if (socket.readyState == 1) {
      socket.close();
      window.socketMatchmaking = null;
    }
  });

  window.addEventListener("beforeunload", function () {
    if (socket.readyState == 1) {
      socket.close();
      window.socketMatchmaking = null;
    }
  });
}

export async function connectWebsocketMatchmacking() {
  const url = `wss://${window.location.host}/ws/matchmaking/`;
  window.socketMatchmaking = new WebSocket(url);

  socketMatchmaking.onopen = function () {
    setupMatchmakingButton(socketMatchmaking);
    setupCancelButton(socketMatchmaking);
  };

  socketListener(socketMatchmaking);
  // windowListener(socketMatchmaking);
}
