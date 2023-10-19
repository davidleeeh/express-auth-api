const { EventEmitter } = require("events");
const logEvent = require("./logEvent");

const myEmitter = new EventEmitter();
myEmitter.on("request", (message) => {
  logEvent(`New incoming request from user: ${message}`);
});

setTimeout(() => {
  myEmitter.emit("request", "David Lee");
}, 2000);

// if (!fs.existsSync("./testDir")) {
//   fs.mkdir("./testDir", (err) => {
//     if (err) throw err;

//     console.log("Successfully created a directory.");
//   });
// } else {
//   fs.rmdir("./testDir", (err) => {
//     if (err) throw err;

//     console.log("Successfully deleted a directory.");
//   });
// }
