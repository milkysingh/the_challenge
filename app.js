const { spawn } = require("child_process");
const fs = require("fs");

module.exports = (app) => {
  let job = null;

  app.get("/save", (req, res) => {
    if (job && job.pid) {
      return res
        .status(500)
        .send("Process is already running")
        .end();
    }
    job = spawn("node", ["csvSave.js"], {
      detached: false, // if not detached and your main process dies, the child will be killed too
      stdio: [process.stdin, process.stdout, process.stderr], // those can be file streams for logs or whatever
    });

    job.on("close", () => {
      setTimeout(() => {
        job = null;
        return res.send("Donwe");
      }, 10000);
    });
  });
  app.get("/stopProcess", (req, res) => {
    console.log("Hello world 2");
    if (!job || !job.pid) return res.status(404).send("Error");

    job.kill("SIGTERM");
    // or process.kill(job.pid, 'SIGTERM')
    job = null;
    fs.writeFile(`${__dirname}/csv2.csv`, "", () => res.status(200).send("Deleted"));
  });
};
