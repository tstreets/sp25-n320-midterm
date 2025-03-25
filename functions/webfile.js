const path = require("path");
const fs = require("fs");

const mimeType = require("mime-types");

class WebFile {
  reqUrl = "";
  reqDetails = {};

  constructor(reqUrl) {
    this.reqUrl = reqUrl;
    this.reqDetails = path.parse(reqUrl);
    if (!this.reqDetails.base) {
      this.reqUrl += "index.html";
    } else if (!this.reqDetails.ext) {
      this.reqUrl += ".html";
    }
  }

  getMimeType() {
    const filePath = path.join(__dirname, "../views", this.reqUrl);
    if (fs.existsSync(filePath)) {
      return mimeType.lookup(this.reqUrl);
    } else {
      return "text/html";
    }
  }

  getFileToRender() {
    const filePath = path.join(__dirname, "../views", this.reqUrl);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    } else {
      return fs.readFileSync(path.join(__dirname, "../views/404.html"));
    }
  }
}

module.exports = WebFile;
