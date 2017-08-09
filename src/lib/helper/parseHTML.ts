export default function parseHTML(elem: string) {
    let fragment = document.createDocumentFragment();
    let newelement = document.createElement('div');
    fragment.appendChild(newelement);
    newelement.innerHTML = elem;
    fragment.removeChild(fragment.firstChild);
    fragment.appendChild(newelement.firstChild);
    return fragment;
}