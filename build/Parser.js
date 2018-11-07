export class Parser {
    constructor(rules, i) {
        this.tokenize = (input) => input.match(this.parseRE);
        this.add = (rules) => {
            for (var rule in rules) {
                var s = rules[rule].source;
                this.ruleSrc.push(s);
                this.ruleMap[rule] = new RegExp("^(" + s + ")$", this.i);
            }
            this.parseRE = new RegExp(this.ruleSrc.join("|"), "g" + this.i);
        };
        this.identify = (token) => {
            for (var rule in this.ruleMap) {
                if (this.ruleMap[rule].test(token)) {
                    return rule;
                }
            }
        };
        this.i = i ? "i" : "";
        this.parseRE = null;
        this.ruleSrc = [];
        this.ruleMap = {};
        this.add(rules);
    }
}
