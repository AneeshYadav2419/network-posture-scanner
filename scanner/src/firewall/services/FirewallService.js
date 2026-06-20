export class FirewallService {
  constructor(parser) {
    this.parser = parser;
  }

//   async loadRules(filePath) {
//     return this.parser.parse(filePath);
//   }
async loadConfig(filePath) {
  return this.parser.parse(filePath);
}
}