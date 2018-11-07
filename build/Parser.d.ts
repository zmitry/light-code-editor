interface RegExpMap {
    [k: string]: RegExp;
}
export declare class Parser {
    i: string;
    parseRE: RegExp;
    ruleSrc: string[];
    ruleMap: RegExpMap;
    constructor(rules: RegExpMap, i: string);
    tokenize: (input: string) => RegExpMatchArray;
    add: (rules: RegExpMap) => void;
    identify: (token: string) => string;
}
export {};
