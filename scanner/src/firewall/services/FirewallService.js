export class FirewallService {
  constructor(parser) {
    this.parser = parser;
  }

  async loadConfig(filePath) {
    return this.parser.parse(filePath);
  }
}