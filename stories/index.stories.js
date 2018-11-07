import React from "react";
import { document, console } from "global";
import { storiesOf } from "@storybook/react";
import { genericParser, wisywygParser } from "./parser";
import { TextareaDecorator, highlightPreText } from "../build";
import { bindKey, insertAtCursor } from "../build/helpers";

import Textarea from "./SimpleTextarea";

storiesOf("Demo", module)
  .add("generic", () => {
    return (
      <Textarea
        onMount={el => {
          el.value = require("raw-loader!./generic.html");
          new TextareaDecorator(el, genericParser);
        }}
      />
    );
  })
  .add("wisywyg", () => {
    return (
      <Textarea
        onMount={el => {
          el.value = `*bold* _underline_ /italic/ -strikethrough-`;
          new TextareaDecorator(el, wisywygParser);
        }}
      />
    );
  })
  .add("custom command", () => {
    return (
      <div>
        <p>Press ctrl-1 or shift-ctrl-2</p>
        <Textarea
          onMount={el => {
            el.value = `*bold* _underline_ /italic/ -strikethrough-`;
            const decorator = new TextareaDecorator(el, wisywygParser);
            bindKey(el, {
              "Ctrl-1": e => {
                insertAtCursor("your  superb text", el);
                decorator.update();
              },
              "Shift-Ctrl-2": e => {
                alert("hello");
              }
            });
          }}
        />
      </div>
    );
  })
  .add("simple highlight", () => {
    return (
      <Textarea
        is={"pre"}
        onMount={el => {
          console.log("highlightPreText: ", highlightPreText);
          highlightPreText(
            require("raw-loader!./generic.html"),
            el,
            genericParser
          );
        }}
      />
    );
  });
