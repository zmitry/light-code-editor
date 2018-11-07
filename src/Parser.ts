/*
* Generates a tokenizer from regular expressions for TextareaDecorator
*/

interface RegExpMap {
  [k: string]: RegExp;
}
export class Parser {
  i: string;
  parseRE: RegExp;
  ruleSrc: string[];
  ruleMap: RegExpMap;
  constructor(rules: RegExpMap, i: string) {
    this.i = i ? "i" : "";
    this.parseRE = null;
    this.ruleSrc = [];
    this.ruleMap = {};

    this.add(rules);
  }
  tokenize = (input: string) => input.match(this.parseRE);

  add = (rules: RegExpMap) => {
    for (var rule in rules) {
      var s = rules[rule].source;
      this.ruleSrc.push(s);
      this.ruleMap[rule] = new RegExp("^(" + s + ")$", this.i);
    }
    this.parseRE = new RegExp(this.ruleSrc.join("|"), "g" + this.i);
  };
  identify = (token: string) => {
    for (var rule in this.ruleMap) {
      if (this.ruleMap[rule].test(token)) {
        return rule;
      }
    }
  };
}
