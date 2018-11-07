# Lightweight Decorator for Textareas

```
yarn add light-code-editor
# or
npm install light-code-editor
```

# How to use [codesandbox](https://codesandbox.io/s/k91x8593w3)

1. include styles "light-code-editor/styles.css"
2. create parser

```js
const genericParser = new Parser({
  whitespace: /\s+/,
  comment: /\/\*([^\*]|\*[^\/])*(\*\/?)?|(\/\/|#)[^\r\n]*/,
  string: /"(\\.|[^"\r\n])*"?|'(\\.|[^'\r\n])*'?/,
  number: /0x[\dA-Fa-f]+|-?(\d+\.?\d*|\.\d+)/,
  keyword: /(and|as|case|catch|class|const|def|delete|die|do|else|elseif|esac|exit|extends|false|fi|finally|for|foreach|function|global|if|new|null|or|private|protected|public|published|resource|return|self|static|struct|switch|then|this|throw|true|try|var|void|while|xor)(?!\w|=)/,
  variable: /[\$\%\@](\->|\w)+(?!\w)|\${\w*}?/,
  define: /[$A-Z_a-z0-9]+/,
  op: /[\+\-\*\/=<>!]=?|[\(\)\{\}\[\]\.\|]/,
  other: /\S+/
});
```

3. style your items

```css
.ltd .comment {
  color: red;
}

.ltd .keyword {
  color: black;
}
```

```js
var textarea = $("codeArea");
textarea.value = "<!DOCTYPE html>\n<html>\n\t" + "\n</html>";
decorator = new TextareaDecorator(textarea, parser);
```

```js
var textarea = $("codeArea");
textarea.value = "<!DOCTYPE html>\n<html>\n\t" + "\n</html>";
decorator = new TextareaDecorator(textarea, parser);
bindKey(textarea, {
  "Ctrl-1": e => {
    insertAtCursor("your  superb text", el);
    decorator.update();
  },
  "Shift-Ctrl-2": e => {
    alert("hello");
  }
});
```

see detailed examples in stories

## In browser live syntax highlighting

<pre>
&lt;!-- normal textarea fall-back, add an id to access it from javascript --&gt;
&lt;textarea id='codeArea' class='ldt'&gt;&lt;/textarea&gt;
&lt;noscript&gt;Please enable JavaScript to allow syntax highlighting.&lt;/noscript&gt;
</pre>

### JS

<pre>
// create a parser with a mapping of css classes to regular expressions
// everything must be matched, so 'whitespace' and 'other' are commonly included
var parser = new Parser(
  { whitespace: /\s+/,
    comment: /\/\/[^\r\n]*/,
    other: /\S+/ } );
// get the textarea with $ (document.getElementById)
// pass the textarea element and parser to LDT
var ldt = new TextareaDecorator( $('codeArea'), parser );
</pre>

### CSS

<pre>
/* editor styles */
.ldt {
	width: 400px;
	height: 300px;
	border: 1px solid black;
}
/* styles applied to comment tokens */
.ldt .comment {
    color: silver;
}
</pre>

## API

### TextareaDecorator

- `new TextareaDecorator( textarea, parser )` Converts a HTML `textarea` element into an auto highlighting TextareaDecorator. `parser` is used to determine how to subdivide and style the content. `parser` can be any object which defines the `tokenize` and `identify` methods as described in the Parser API below.
- `.input` The input layer of the LDT, a `textarea` element.
- `.output` The output layer of the LDT, a `pre` element.
- `.update()` Updates the highlighting of the LDT. It is automatically called on user input. You shouldn't need to call this unless you programmatically changed the contents of the `textarea`.

### Parser

- `new Parser( [rules], [i] )` Creates a parser. `rules` is an object whose keys are CSS classes and values are the regular expressions which match each token. `i` is a boolean which determines if the matching is case insensitive, it defaults to `false`.
- `.add( rules )` Adds a mapping of CSS class names to regular expressions.
- `.tokenize( string )` Splits `string` into an array of tokens as defined by `.rules`.
- `.identify( string )` Finds the CSS class name associated with the token `string`.

### Keybinder

This is a singleton, you do not need to instantiate this object.

- `.bindKey( element, [keymap] )` Adds Keybinder methods to `element`, optionally setting the element's `keymap`.

### SelectHelper

This is a singleton, you do not need to instantiate this object.

- `.add( element )` Adds SelectHelper methods to `element`.
- `element.insertAtCursor( string )` Inserts `string` into the `element` before the current cursor position.
