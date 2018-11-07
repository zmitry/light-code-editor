import { highlightPreText } from "./highlight";
export class TextareaDecorator {
    constructor(textarea, parser, className) {
        this.textarea = textarea;
        this.parser = parser;
        this.update = () => {
            var input = this.textarea.value;
            if (input) {
                highlightPreText(input, this.output, this.parser);
                var lines = input.split("\n");
                var maxlen = 0;
                var curlen;
                for (var i = 0; i < lines.length; i++) {
                    var tabLength = 0, offset = -1;
                    while ((offset = lines[i].indexOf("\t", offset + 1)) > -1) {
                        tabLength += 7 - ((tabLength + offset) % 8);
                    }
                    curlen = lines[i].length + tabLength;
                    maxlen = maxlen > curlen ? maxlen : curlen;
                }
                this.textarea.cols = maxlen + 1;
                this.textarea.rows = lines.length + 1;
            }
            else {
                this.output.innerHTML = "";
                this.textarea.cols = this.textarea.rows = 1;
            }
        };
        this.update = this.update.bind(this);
        var parent = document.createElement("div");
        parent.classList.add(className);
        var output = document.createElement("pre");
        parent.appendChild(output);
        var label = document.createElement("label");
        parent.appendChild(label);
        textarea.parentNode.replaceChild(parent, textarea);
        label.appendChild(textarea);
        parent.className = "ldt " + textarea.className;
        textarea.className = "";
        textarea.spellcheck = false;
        textarea.wrap = "off";
        textarea.addEventListener("input", this.update, false);
        this.output = output;
        this.parent = parent;
        this.update();
    }
}
