const fs = require("fs");

/**
 * @function <b>saveCsv</b><br>
 * Hash Password
 */
const saveCsv = () => {
  const writeable = fs.createWriteStream("./csv2.csv");
  console.log("hello world");
  fs
    .createReadStream(`${__dirname}/SampleCSVFile_5300kb.csv`)
    .pipe(writeable)
    .on("error", () => {
      console.log("Error>>>>");
    });
};
saveCsv();
