import { Parser } from "./Parser";

export function highlightPreText(
  input: string,
  output: HTMLPreElement,
  parser: Parser
) {
  var oldTokens = output.childNodes;
  var newTokens = parser.tokenize(input);
  var firstDiff, lastDiffNew, lastDiffOld;
  // find the first difference
  for (
    firstDiff = 0;
    firstDiff < newTokens.length && firstDiff < oldTokens.length;
    firstDiff++
  )
    if (newTokens[firstDiff] !== oldTokens[firstDiff].textContent) break;
  // trim the length of output nodes to the size of the input
  while (newTokens.length < oldTokens.length)
    output.removeChild(oldTokens[firstDiff]);
  // find the last difference
  for (
    lastDiffNew = newTokens.length - 1, lastDiffOld = oldTokens.length - 1;
    firstDiff < lastDiffOld;
    lastDiffNew--, lastDiffOld--
  )
    if (newTokens[lastDiffNew] !== oldTokens[lastDiffOld].textContent) break;
  // update modified spans
  for (; firstDiff <= lastDiffOld; firstDiff++) {
    const el: HTMLElement = oldTokens[firstDiff] as any;
    el.className = parser.identify(newTokens[firstDiff]);
    el.textContent = el.innerText = newTokens[firstDiff];
  }
  // add in modified spans
  for (
    var insertionPt = oldTokens[firstDiff] || null;
    firstDiff <= lastDiffNew;
    firstDiff++
  ) {
    var span = document.createElement("span");
    span.className = parser.identify(newTokens[firstDiff]);
    span.textContent = span.innerText = newTokens[firstDiff];
    output.insertBefore(span, insertionPt);
  }
}
