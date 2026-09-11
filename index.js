let room = "server";
let hasFragment = false;
let hasCode = false;
let hasKey = false;
let attempts = 0;
let playing = true;

function ask(message) {
  const answer = prompt(message);
  return answer === null ? "quit" : answer.trim().toLowerCase();
}

alert(
  "THE CLOUD SERVER\n\n" +
  "GOAL: find an ACCESS FRAGMENT, trade it for a BYPASS CODE, use that to get the DECRYPTION KEY, then reach the terminal to escape.\n\n" +
  "Open DevTools (F12), then click the 'Console' tab at the bottom, to read the story as you play.\n" +
  "Type your choices in the pop-up boxes.\n" +
  "Type 'help' anytime to see your goal again.\n" +
  "Click OK to begin."
);

console.log("You are trapped inside a mainframe.");
console.log("GOAL: find an ACCESS FRAGMENT, use it to get a BYPASS CODE, use that to find the DECRYPTION KEY, then reach the terminal to escape.");
console.log("Rooms: server, firewall, archive");

while (playing) {
  if (room === "server") {
    console.log("\n--- SERVER ROOM ---");
    const choice = ask("What do you do? (search, firewall, archive, terminal, help, quit)");

    if (choice === "search" && !hasFragment) {
      hasFragment = true;
      console.log("You find an ACCESS FRAGMENT.");
    } else if (choice === "firewall" || choice === "archive") {
      room = choice;
    } else if (choice === "terminal") {
      if (!hasKey) {
        console.log("You need a decryption key first.");
      } else {
        const key = ask("Enter the decryption key:");
        if (key === "decryption key") {
          alert("You escaped the system!");
          playing = false;
        } else {
          attempts++;
          console.log(`Wrong key. Attempts left: ${3 - attempts}`);
          if (attempts >= 3) {
            alert("Too many failed attempts. You were deleted.");
            playing = false;
          }
        }
      }
    } else if (choice === "quit") {
      alert("Disconnected safely.");
      playing = false;
    } else if (choice === "help") {
      console.log("GOAL: access fragment → bypass code → decryption key → terminal.");
      console.log(`You currently have: ${[hasFragment && "access fragment", hasCode && "bypass code", hasKey && "decryption key"].filter(Boolean).join(", ") || "nothing yet"}`);
    } else {
      console.log("Nothing happens.");
    }

  } else if (room === "firewall") {
    console.log("\n--- FIREWALL CHAMBER ---");

    if (!hasFragment) {
      console.log("Blocked by red light. You need an access fragment.");
      room = "server";
    } else {
      console.log("A daemon asks: 'I have keys but no locks, space but no room. What am I?'");
      const choice = ask("What do you do? (answer, server, archive, help, quit)");

      if (choice === "answer") {
        const guess = ask("Your answer:");
        if (guess === "keyboard") {
          hasCode = true;
          console.log("Correct! You get a BYPASS CODE.");
        } else {
          console.log("Wrong. Try again.");
        }
      } else if (choice === "server" || choice === "archive") {
        room = choice;
      } else if (choice === "quit") {
        alert("Disconnected safely.");
        playing = false;
      } else if (choice === "help") {
        console.log("GOAL: access fragment → bypass code → decryption key → terminal.");
        console.log(`You currently have: ${[hasFragment && "access fragment", hasCode && "bypass code", hasKey && "decryption key"].filter(Boolean).join(", ") || "nothing yet"}`);
      } else {
        console.log("Nothing happens.");
      }
    }

  } else if (room === "archive") {
    console.log("\n--- BACKUP ARCHIVE ---");

    const options = hasCode
      ? "search, firewall, server, help, quit"
      : "firewall, server, help, quit";
    console.log(hasCode ? "Vault is open." : "Vault is locked. You need a bypass code.");
    const choice = ask(`What do you do? (${options})`);

    if (choice === "search" && hasCode && !hasKey) {
      hasKey = true;
      console.log("You find the DECRYPTION KEY!");
    } else if (choice === "firewall" || choice === "server") {
      room = choice;
    } else if (choice === "quit") {
      alert("Disconnected safely.");
      playing = false;
    } else if (choice === "help") {
      console.log("GOAL: access fragment → bypass code → decryption key → terminal.");
      console.log(`You currently have: ${[hasFragment && "access fragment", hasCode && "bypass code", hasKey && "decryption key"].filter(Boolean).join(", ") || "nothing yet"}`);
    } else {
      console.log("Nothing happens.");
    }
  }
}