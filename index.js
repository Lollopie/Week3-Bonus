let hasFragment = false;
let hasLogClue = false;
let hasCode = false;
let hasKey = false;
let attempts = 0;
let villainDistance = 0;
let currentRoom = "server";
let gameRunning = true;
let ending = "";
const CATCH_THRESHOLD = 5;
let cycleCount = Math.floor(Math.random() * 10) + 1;
let decryptionKey = "alpha" + (Math.floor(Math.random() * 1000) + 1);

function ask(message) {
  const answer = prompt(message);

  if (answer === null) {
    return null;
  }

  return answer.trim().toLowerCase();
}

function travelTo(targetRoomName) {
  if (targetRoomName === currentRoom) {
    return;
  }

  villainDistance++;
  currentRoom = targetRoomName;

  console.log(
    `ARIA's tracking signal pulses... (proximity: ${villainDistance}/${CATCH_THRESHOLD})`
  );

  if (villainDistance === 2) {
    console.log(
      "You hear a low hum, like something moving through the vents."
    );
  } else if (villainDistance === 3) {
    console.log(
      "The lights flicker red. It's getting closer."
    );
  } else if (villainDistance === 4) {
    console.log(
      "Footsteps. Heavy ones. Right behind the walls now."
    );
  }

  if (villainDistance >= CATCH_THRESHOLD) {
    alert(
      "A cold metal grip closes around your shoulder.\n\n" +
      "ARIA: \"You took too long.\"\n\n" +
      "*** GAME OVER - CAUGHT ***"
    );

    console.log(
      "ENDING: FAILURE - ARIA caught you."
    );

    gameRunning = false;
    ending = "caught";
  }
}


function showHelp() {
  console.log("\n--- HELP ---");

  console.log(
    "GOAL: access fragment -> bypass code -> decryption key -> terminal."
  );

  const inventory = [];

  if (hasFragment) {
    inventory.push("ACCESS FRAGMENT");
  }

  if (hasCode) {
    inventory.push("BYPASS CODE");
  }

  if (hasKey) {
    inventory.push("DECRYPTION KEY: " + decryptionKey);
  }

  console.log(
    "You currently have: " +
    (inventory.length > 0
      ? inventory.join(", ")
      : "nothing yet")
  );

  console.log(
    `ARIA proximity: ${villainDistance}/${CATCH_THRESHOLD}`
  );
}


function quitGame() {
  alert("Disconnected safely.");

  console.log(
    "Player quit the game."
  );

  gameRunning = false;
  ending = "quit";
}

function serverRoom() {
  console.log("\n--- SERVER ROOM ---");

  const choice = ask(
    "SERVER ROOM\n\n" +
    "What do you do?\n\n" +
    "1. Search the room\n" +
    "2. Read the logs\n" +
    "3. Go to the firewall\n" +
    "4. Go to the archive\n" +
    "5. Use the terminal\n" +
    "6. Help\n" +
    "7. Quit"
  );

  if (choice === null) {
    quitGame();
    return;
  }

  switch (choice) {
    case "search":
    case "1":

      if (!hasFragment) {
        hasFragment = true;

        console.log(
          "You search behind one of the server racks."
        );

        console.log(
          "You find an ACCESS FRAGMENT."
        );

        alert(
          "You found an ACCESS FRAGMENT!\n\n" +
          "You can now access the Firewall Chamber."
        );
      } else {
        console.log(
          "You search again, but there is nothing else here."
        );
      }

      break;


    case "logs":
    case "2":
      if (!hasLogClue) {
        hasLogClue = true;

        console.log(
          `A faint maintenance entry reads: "Cycles since boot: ${cycleCount}".`
        );

        console.log(
          "Remember this number. The Firewall Chamber may need it."
        );
      } else {
        console.log(
          `You already read this log. Cycles since boot: ${cycleCount}.`
        );
      }

      break;


    case "firewall":
    case "3":

      travelTo("firewall");
      break;


    case "archive":
    case "4":

      travelTo("archive");
      break;


    case "terminal":
    case "5":

      tryTerminal();
      break;


    case "help":
    case "6":

      showHelp();
      break;


    case "quit":
    case "7":

      quitGame();
      break;


    default:

      console.log(
        "Invalid choice. Please choose one of the available options."
      );
  }
}


// -------------------- FIREWALL ROOM --------------------

function firewallRoom() {
  console.log("\n--- FIREWALL CHAMBER ---");

  if (!hasFragment) {
    console.log(
      "A wall of red light blocks the entrance."
    );

    console.log(
      "You need an ACCESS FRAGMENT. Maybe search the Server Room."
    );

    // Being turned away isn't a real "move" - don't let ARIA get closer for it.
    currentRoom = "server";
    return;
  }

  console.log(
    "A security daemon appears in front of you."
  );

  const choice = ask(
    "FIREWALL CHAMBER\n\n" +
    "What do you do?\n\n" +
    "1. Answer the daemon's riddle\n" +
    "2. Return to the server room\n" +
    "3. Help\n" +
    "4. Quit"
  );

  if (choice === null) {
    quitGame();
    return;
  }

  switch (choice) {
    case "answer":
    case "1":

      answerRiddle();
      break;


    case "back":
    case "server":
    case "2":

      travelTo("server");
      break;


    case "help":
    case "3":

      showHelp();
      break;


    case "quit":
    case "4":

      quitGame();
      break;


    default:

      console.log(
        "Invalid choice. Nothing happens."
      );
  }
}


// -------------------- FIREWALL RIDDLE --------------------

function answerRiddle() {
  if (hasCode) {
    console.log(
      "The daemon already gave you the BYPASS CODE."
    );

    console.log(
      "It has nothing else to offer."
    );

    return;
  }

  if (!hasLogClue) {
    console.log(
      "Daemon: \"You do not know my cycle count yet.\""
    );

    console.log(
      "Maybe there is information somewhere in the Server Room."
    );

    return;
  }

  const guess = ask(
    "Daemon:\n\n" +
    "\"Multiply the number of cycles found in the server logs " +
    "by the number of chambers in this fortress (3).\"\n\n" +
    "What is the answer?"
  );

  if (guess === null) {
    quitGame();
    return;
  }

  const correctAnswer = cycleCount * 3;

  if (Number(guess) === correctAnswer) {
    hasCode = true;

    console.log(
      "The daemon's red eyes turn green."
    );

    console.log(
      "Correct! You receive a BYPASS CODE."
    );

    alert(
      "Correct!\n\n" +
      "You received the BYPASS CODE.\n\n" +
      "The Backup Archive can now be opened."
    );
  } else {
    console.log(
      "Wrong."
    );

    console.log(
      "Daemon: \"Your calculations disappoint me.\""
    );

    console.log(
      "You may try again."
    );
  }
}


function archiveRoom() {
  console.log("\n--- BACKUP ARCHIVE ---");

  if (hasCode) {
    console.log(
      "The BYPASS CODE causes the vault's security barrier to disappear."
    );
  } else {
    console.log(
      "The archive vault is locked."
    );

    console.log(
      "You need a BYPASS CODE."
    );
  }

  let options;

  if (hasCode) {
    options =
      "1. Search the vault\n" +
      "2. Return to the server room\n" +
      "3. Help\n" +
      "4. Quit";
  } else {
    options =
      "1. Return to the server room\n" +
      "2. Help\n" +
      "3. Quit";
  }

  const choice = ask(
    "BACKUP ARCHIVE\n\n" +
    "What do you do?\n\n" +
    options
  );

  if (choice === null) {
    quitGame();
    return;
  }


  // Vault is unlocked
  if (hasCode) {
    switch (choice) {
      case "search":
      case "1":

        if (!hasKey) {
          hasKey = true;

          console.log(
            "Inside the vault you find a glowing data chip."
          );

          console.log(
            `The DECRYPTION KEY is: "${decryptionKey}"`
          );

          alert(
            "You found the DECRYPTION KEY!\n\n" +
            `KEY: ${decryptionKey}\n\n` +
            "Return to the Server Room and use the terminal."
          );
        } else {
          console.log(
            "The vault is empty. You already took the DECRYPTION KEY."
          );
        }

        break;


      case "server":
      case "back":
      case "2":

        travelTo("server");
        break;


      case "help":
      case "3":

        showHelp();
        break;


      case "quit":
      case "4":

        quitGame();
        break;


      default:

        console.log(
          "Invalid choice. Nothing happens."
        );
    }
  }

  // Vault is still locked
  else {
    switch (choice) {
      case "server":
      case "back":
      case "1":

        travelTo("server");
        break;


      case "help":
      case "2":

        showHelp();
        break;


      case "quit":
      case "3":

        quitGame();
        break;


      default:

        console.log(
          "Invalid choice. The vault remains locked."
        );
    }
  }
}


// -------------------- TERMINAL --------------------

function tryTerminal() {
  console.log("\n--- ESCAPE TERMINAL ---");

  if (!hasKey) {
    console.log(
      "ACCESS DENIED."
    );

    console.log(
      "The terminal requires a DECRYPTION KEY."
    );

    return;
  }

  const key = ask(
    "ESCAPE TERMINAL\n\n" +
    "Enter the DECRYPTION KEY:"
  );

  if (key === null) {
    quitGame();
    return;
  }

  if (key === decryptionKey.toLowerCase()) {
    alert(
      "The screen flashes green.\n\n" +
      "ARIA: \"No... that's impossible!\"\n\n" +
      "The firewall collapses and you escape the system!\n\n" +
      "*** YOU ESCAPED ***"
    );

    console.log(
      "ENDING: SUCCESS - You escaped ARIA's digital fortress!"
    );

    gameRunning = false;
    ending = "success";

    return;
  }

  attempts++;

  console.log(
    `Wrong key. Attempts remaining: ${3 - attempts}`
  );

  if (attempts >= 3) {
    alert(
      "TERMINAL LOCKED.\n\n" +
      "ARIA: \"Three mistakes. How disappointing.\"\n\n" +
      "Your digital identity is erased.\n\n" +
      "*** GAME OVER - DELETED ***"
    );

    console.log(
      "ENDING: FAILURE - too many incorrect terminal attempts."
    );

    gameRunning = false;
    ending = "deleted";
  }
}

function gameLoop() {
  // These reassignments reset the game state on every playthrough -
  // the top-of-file values above are only used for the very first call.
  hasFragment = false;
  hasLogClue = false;
  hasCode = false;
  hasKey = false;
  attempts = 0;
  villainDistance = 0;
  currentRoom = "server";
  cycleCount = Math.floor(Math.random() * 10) + 1;
  decryptionKey = "alpha" + (Math.floor(Math.random() * 1000) + 1);
  gameRunning = true;
  ending = "";

  alert(
    "THE CLOUD SERVER\n\n" +
    "You have been trapped inside ARIA's digital fortress.\n\n" +

    "GOAL:\n" +
    "Find an ACCESS FRAGMENT, use it to obtain a BYPASS CODE, " +
    "find the DECRYPTION KEY, and escape through the terminal.\n\n" +

    "IMPORTANT:\n" +
    "Open DevTools by pressing F12 and select the Console tab.\n" +
    "The console contains important story information and clues.\n\n" +

    "Type your choices into the pop-up boxes.\n" +
    "You can type 'help' to check your progress.\n\n" +

    "Be careful. Moving between rooms allows ARIA to get closer."
  );

  console.log("================================");
  console.log("       THE CLOUD SERVER");
  console.log("================================");

  console.log(
    "You awaken inside a dark digital mainframe."
  );

  console.log(
    "ARIA, the fortress AI, is searching for you."
  );

  console.log(
    "GOAL: ACCESS FRAGMENT -> BYPASS CODE -> DECRYPTION KEY -> TERMINAL"
  );

  console.log(
    "Locations: Server Room, Firewall Chamber, Backup Archive"
  );


  while (gameRunning) {
    if (currentRoom === "server") {
      serverRoom();
    } else if (currentRoom === "firewall") {
      firewallRoom();
    } else if (currentRoom === "archive") {
      archiveRoom();
    }
  }
}

function startGame() {
  let playAgain = true;

  while (playAgain) {
    gameLoop();

    playAgain = confirm(
      "Would you like to play again?"
    );
  }

  alert(
    "Thanks for playing THE CLOUD SERVER!"
  );

  console.log(
    "Game closed."
  );
}

startGame();