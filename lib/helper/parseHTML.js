"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseHTML(elem) {
    let fragment = document.createDocumentFragment();
    let newelement = document.createElement('div');
    fragment.appendChild(newelement);
    newelement.innerHTML = elem;
    fragment.removeChild(fragment.firstChild);
    fragment.appendChild(newelement.firstChild);
    return fragment;
}
exports.default = parseHTML;
//# sourceMappingURL=parseHTML.js.map