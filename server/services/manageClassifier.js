const axios = require("axios");
const fs = require("fs");
class TextRazorClassifierManager {
  constructor() {
    this.apiKey = process.env.TEXTRAZOR_API_KEY;
    this.classifierData = fs.readFileSync(
      "../data/community-classifier.csv",
      "utf8"
    );
    this.classifierId = "community";
    this.url = process.env.TEXTRAZOR_API_URL;
  }

  create() {
    axios
      .put(`${this.url}/categories/${this.classifierId}`, this.classifierData, {
        headers: {
          "X-TextRazor-Key": this.apiKey,
          "Content-Type": "application/csv",
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  get() {
    axios
      .get(
        `${this.url}/categories/${this.classifierId}/_all?limit=20&offset=0`,
        {
          headers: {
            "X-TextRazor-Key": this.apiKey,
          },
        }
      )
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delete() {
    axios
      .delete(`${this.url}/categories/${this.classifierId}`, {
        headers: {
          "X-TextRazor-Key": this.apiKey,
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  handleResponse(response) {
    console.log(JSON.stringify(response.data, null, 2));
  }

  handleError(error) {
    console.error(error);
  }
}

module.exports = TextRazorClassifierManager;
