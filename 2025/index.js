const fs = require("fs");
const path = require("path");

const getLinesFromPath = (inputFile) => {
    const filePath = path.join(__dirname, inputFile);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n");
    return lines;
  };

  module.exports= getLinesFromPath
