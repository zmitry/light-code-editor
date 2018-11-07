const keyNames: { [k: number]: string } = {
  8: "Backspace",
  9: "Tab",
  13: "Enter",
  16: "Shift",
  17: "Ctrl",
  18: "Alt",
  19: "Pause",
  20: "CapsLk",
  27: "Esc",
  33: "PgUp",
  34: "PgDn",
  35: "End",
  36: "Home",
  37: "Left",
  38: "Up",
  39: "Right",
  40: "Down",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  145: "ScrLk"
};

function keyEventNormalizer(e: KeyboardEvent, keymap: any) {
  // get the event object and start constructing a query
  e = e || (window.event as any);
  var query = "";
  // add in prefixes for each key modifier
  e.shiftKey && (query += "Shift-");
  e.ctrlKey && (query += "Ctrl-");
  e.altKey && (query += "Alt-");
  e.metaKey && (query += "Meta-");
  // determine the key code
  var key = e.which || e.keyCode || e.charCode;
  // if we have a name for it, use it
  if (keyNames[key]) query += keyNames[key];
  // otherwise turn it into a string
  else query += String.fromCharCode(key).toUpperCase();
  // try to run the keybinding, cancel the event if it returns true
  if (keymap[query] && keymap[query]()) {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    return false;
  }
  return true;
}

export function bindKey(element: HTMLElement, keymap: any) {
  // capture onkeydown and onkeypress events to capture repeating key events
  // maintain a boolean so we only fire once per character
  var fireOnKeyPress = true;
  element.onkeydown = e => {
    fireOnKeyPress = false;
    return keyEventNormalizer(e, keymap);
  };
  element.onkeypress = e => {
    if (fireOnKeyPress) return keyEventNormalizer(e, keymap);
    fireOnKeyPress = true;
    return true;
  };
}

export function insertAtCursor(x: string, element: HTMLTextAreaElement) {
  var s = element.selectionStart,
    e = element.selectionEnd,
    v = element.value;
  element.value = v.substring(0, s) + x + v.substring(e);
  s += x.length;
  element.setSelectionRange(s, s);
}
