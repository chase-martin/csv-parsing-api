const fs = require('fs');
const Car = require('./mongo-service');
const companyConfig = require('./company-config');

module.exports = class ParsingService {
  constructor(path, name) {
    this.path = path;
    this.columns = companyConfig.companies[name];
    this.headings = companyConfig.headings;
  }

  // Main function of class, reads, parses and saves.
  async parse() {
    const data = await this.readFile();
    const convertedData = this.parseFile(data);
    const car = new Car({csv: convertedData});
    const result = await car.save();
    console.log('Mongoose save result', result);
    
    return convertedData;
  }

  // Read file (path is provided in a form file object);
  async readFile() {
    return fs.readFileSync(this.path).toString().split('\n').map(i => i.split(','));
  }

  // Go through each line and add columns per config.
  parseFile(data) {
    return JSON.stringify(data.map(i => {
      let json = {};

      this.headings.forEach((j, jndex) => {
        // Only add column to csv if required by config.
        if (!this.columns || this.columns.indexOf(j) >= 0) {
          json[j] = i[jndex];
        }
      });

      return json;
    }));
  }
}
