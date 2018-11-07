import { Parser } from "./Parser";
export declare class TextareaDecorator {
    textarea: HTMLTextAreaElement;
    parser: Parser;
    output: HTMLPreElement;
    parent: HTMLDivElement;
    constructor(textarea: HTMLTextAreaElement, parser: Parser, className?: string);
    update: () => void;
}
