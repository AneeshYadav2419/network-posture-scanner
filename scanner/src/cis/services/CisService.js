import { BenchmarkRunner } from "../BenchmarkRunner.js";

export class CisService {
  constructor() {
    this.runner = new BenchmarkRunner();
  }

  evaluate({ rules, configContent }) {
    return this.runner.run({
      rules,
      configContent,
    });
  }
}