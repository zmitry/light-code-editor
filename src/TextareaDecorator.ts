/*
 * Builds and maintains a styled output layer under a textarea input layer
 */
import { Parser } from "./Parser";
import { highlightPreText } from "./highlight";

export class TextareaDecorator {
  output: HTMLPreElement;
  parent: HTMLDivElement;

  constructor(
    public textarea: HTMLTextAreaElement,
    public parser: Parser,
    className?: string
  ) {
    // construct editor DOM
    this.update = this.update.bind(this);

    var parent = document.createElement("div");
    parent.classList.add(className);
    var output = document.createElement("pre");
    parent.appendChild(output);
    var label = document.createElement("label");
    parent.appendChild(label);
    // replace the textarea with RTA DOM and reattach on label
    textarea.parentNode.replaceChild(parent, textarea);
    label.appendChild(textarea);
    // transfer the CSS styles to our editor
    parent.className = "ldt " + textarea.className;
    textarea.className = "";
    // turn off built-in spellchecking in firefox
    textarea.spellcheck = false;
    // turn off word wrap
    textarea.wrap = "off";
    textarea.addEventListener("input", this.update, false);
    this.output = output;
    this.parent = parent;
    this.update();
  }

  update = () => {
    var input = this.textarea.value;
    if (input) {
      highlightPreText(input, this.output, this.parser);
      // determine the best size for the textarea
      var lines = input.split("\n");
      // find the number of columns
      var maxlen = 0;
      var curlen: any;
      for (var i = 0; i < lines.length; i++) {
        // calculate the width of each tab
        var tabLength = 0,
          offset = -1;
        while ((offset = lines[i].indexOf("\t", offset + 1)) > -1) {
          tabLength += 7 - ((tabLength + offset) % 8);
        }
        curlen = lines[i].length + tabLength;
        // store the greatest line length thus far
        maxlen = maxlen > curlen ? maxlen : curlen;
      }
      this.textarea.cols = maxlen + 1;
      this.textarea.rows = lines.length + 1;
    } else {
      // clear the display
      this.output.innerHTML = "";
      // reset textarea rows/cols
      this.textarea.cols = this.textarea.rows = 1;
    }
  };
}
