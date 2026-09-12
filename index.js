let hasFragment;
let hasLogClue;
let hasCode;
let hasKey;
let attempts;
let villainDistance;
let currentRoom;
let gameRunning;
const CATCH_THRESHOLD = 8;
let cycleCount;
let decryptionKey;

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

  let flavorText = "";

  if (villainDistance === 2) {
    flavorText = "You hear a low hum, like something moving through the vents.";
  } else if (villainDistance === 3) {
    flavorText = "The lights flicker red. It's getting closer.";
  } else if (villainDistance === 4) {
    flavorText = "Footsteps. Heavy ones. Right behind the walls now.";
  }

  if (flavorText !== "") {
    console.log(flavorText);
  }

  if (villainDistance < CATCH_THRESHOLD) {
    alert(
      `ARIA proximity: ${villainDistance}/${CATCH_THRESHOLD}` +
      (flavorText !== "" ? `\n\n${flavorText}` : "")
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

  const inventoryText = inventory.length > 0
    ? inventory.join(", ")
    : "nothing yet";

  console.log(
    "You currently have: " + inventoryText
  );

  console.log(
    `ARIA proximity: ${villainDistance}/${CATCH_THRESHOLD}`
  );

  alert(
    "HELP\n\n" +
    "GOAL: access fragment -> bypass code -> decryption key -> terminal.\n\n" +
    "You currently have: " + inventoryText + "\n\n" +
    `ARIA proximity: ${villainDistance}/${CATCH_THRESHOLD}`
  );
}


function quitGame() {
  alert("Disconnected safely.");

  console.log(
    "Player quit the game."
  );

  gameRunning = false;
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
          "You search behind one of the server racks.\n\n" +
          "You found an ACCESS FRAGMENT!\n\n" +
          "You can now access the Firewall Chamber."
        );
      } else {
        console.log(
          "You search again, but there is nothing else here."
        );

        alert(
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

        alert(
          `A faint maintenance entry reads:\n\n"Cycles since boot: ${cycleCount}"\n\n` +
          "Remember this number. The Firewall Chamber may need it."
        );
      } else {
        console.log(
          `You already read this log. Cycles since boot: ${cycleCount}.`
        );

        alert(
          `You already read this log.\n\nCycles since boot: ${cycleCount}.`
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

      alert(
        "Invalid choice. Please choose one of the available options."
      );
  }
}


function firewallRoom() {
  console.log("\n--- FIREWALL CHAMBER ---");

  if (!hasFragment) {
    console.log(
      "A wall of red light blocks the entrance."
    );

    console.log(
      "You need an ACCESS FRAGMENT. Maybe search the Server Room."
    );

    alert(
      "A wall of red light blocks the entrance.\n\n" +
      "You need an ACCESS FRAGMENT. Maybe search the Server Room."
    );

    currentRoom = "server";
    return;
  }

  console.log(
    "A security daemon appears in front of you."
  );

  const choice = ask(
    "FIREWALL CHAMBER\n\n" +
    "A security daemon appears in front of you.\n\n" +
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

      alert(
        "Invalid choice. Nothing happens."
      );
  }
}

function answerRiddle() {
  if (hasCode) {
    console.log(
      "The daemon already gave you the BYPASS CODE."
    );

    console.log(
      "It has nothing else to offer."
    );

    alert(
      "The daemon already gave you the BYPASS CODE.\n\n" +
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

    alert(
      "Daemon: \"You do not know my cycle count yet.\"\n\n" +
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

    alert(
      "Wrong.\n\n" +
      "Daemon: \"Your calculations disappoint me.\"\n\n" +
      "You may try again."
    );
  }
}


function archiveRoom() {
  console.log("\n--- BACKUP ARCHIVE ---");

  let intro;

  if (hasCode) {
    intro = "The BYPASS CODE causes the vault's security barrier to disappear.";
  } else {
    intro = "The archive vault is locked. You need a BYPASS CODE.";
  }

  console.log(intro);

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
    intro + "\n\n" +
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
            "Inside the vault you find a glowing data chip.\n\n" +
            "You found the DECRYPTION KEY!\n\n" +
            `KEY: ${decryptionKey}\n\n` +
            "Return to the Server Room and use the terminal."
          );
        } else {
          console.log(
            "The vault is empty. You already took the DECRYPTION KEY."
          );

          alert(
            "The vault is empty. You already took the DECRYPTION KEY.\n\n" +
            `KEY: ${decryptionKey}`
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

        alert(
          "Invalid choice. Nothing happens."
        );
    }
  }

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

        alert(
          "Invalid choice. The vault remains locked."
        );
    }
  }
}

function tryTerminal() {
  console.log("\n--- ESCAPE TERMINAL ---");

  if (!hasKey) {
    console.log(
      "ACCESS DENIED."
    );

    console.log(
      "The terminal requires a DECRYPTION KEY."
    );

    alert(
      "ACCESS DENIED.\n\n" +
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
  } else {
    alert(
      `Wrong key.\n\nAttempts remaining: ${3 - attempts}`
    );
  }
}

function gameLoop() {
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

  alert(
    "ESCAPE THE MAINFRAME\n\n" +
    "You have been trapped inside ARIA's digital fortress.\n\n" +

    "GOAL:\n" +
    "Find an ACCESS FRAGMENT, use it to obtain a BYPASS CODE, " +
    "find the DECRYPTION KEY, and escape through the terminal.\n\n" +

    "IMPORTANT:\n" +
    "Open DevTools by pressing F12 and select the Console tab.\n" +
    "The console contains some extra story flavor, but everything " +
    "you need to play is shown in these pop-up boxes.\n\n" +

    "Type your choices into the pop-up boxes.\n" +
    "You can type 'help' to check your progress.\n\n" +

    "Be careful. Moving between rooms allows ARIA to get closer."
  );

  console.log("================================");
  console.log("       ESCAPE THE MAINFRAME");
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
    "Thanks for playing ESCAPE THE MAINFRAME!"
  );

  console.log(
    "Game closed."
  );
}

startGame();