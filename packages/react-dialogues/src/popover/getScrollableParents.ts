export function getScrollableParents(element: Element) {
  const parents: Array<Element | Document> = [];

  let parent = element.parentElement;
  while (parent) {
    if (isOverflowElement(parent)) {
      parents.push(parent);
    }

    parent = parent.parentElement;
  }

  return [...parents, document];
}

function isOverflowElement(element: Element) {
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !['inline', 'contents'].includes(display)
  );
}
