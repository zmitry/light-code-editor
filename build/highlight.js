export function highlightPreText(input, output, parser) {
    var oldTokens = output.childNodes;
    var newTokens = parser.tokenize(input);
    var firstDiff, lastDiffNew, lastDiffOld;
    for (firstDiff = 0; firstDiff < newTokens.length && firstDiff < oldTokens.length; firstDiff++)
        if (newTokens[firstDiff] !== oldTokens[firstDiff].textContent)
            break;
    while (newTokens.length < oldTokens.length)
        output.removeChild(oldTokens[firstDiff]);
    for (lastDiffNew = newTokens.length - 1, lastDiffOld = oldTokens.length - 1; firstDiff < lastDiffOld; lastDiffNew--, lastDiffOld--)
        if (newTokens[lastDiffNew] !== oldTokens[lastDiffOld].textContent)
            break;
    for (; firstDiff <= lastDiffOld; firstDiff++) {
        const el = oldTokens[firstDiff];
        el.className = parser.identify(newTokens[firstDiff]);
        el.textContent = el.innerText = newTokens[firstDiff];
    }
    for (var insertionPt = oldTokens[firstDiff] || null; firstDiff <= lastDiffNew; firstDiff++) {
        var span = document.createElement("span");
        span.className = parser.identify(newTokens[firstDiff]);
        span.textContent = span.innerText = newTokens[firstDiff];
        output.insertBefore(span, insertionPt);
    }
}
