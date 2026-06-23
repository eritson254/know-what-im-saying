const FIXATION_ATTR = "data-kwis-fixation";

const EXCLUDED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "CODE",
  "PRE",
  "BUTTON",
  "A",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "NAV",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
]);

const MIN_WORD_LENGTH_TO_EMPHASIZE = 4;
const FIXATION_RATIO = 0.4;

function isExcluded(node: Node, root: HTMLElement): boolean {
  let current: Node | null = node;
  while (current && current !== root) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      const element = current as Element;
      if (EXCLUDED_TAGS.has(element.tagName)) return true;
      if (element.hasAttribute("data-kwis-skip")) return true;
    }
    current = current.parentNode;
  }
  return false;
}

function collectTextNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    if (current.textContent && !isExcluded(current, root)) {
      nodes.push(current as Text);
    }
    current = walker.nextNode();
  }
  return nodes;
}

const WORD_SPLIT_PATTERN = /([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’-]*)/;

function buildFixationFragment(text: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const pieces = text.split(WORD_SPLIT_PATTERN);

  pieces.forEach((piece, index) => {
    if (piece === "") return;
    const isWord = index % 2 === 1;

    if (isWord && piece.length >= MIN_WORD_LENGTH_TO_EMPHASIZE) {
      const fixationLength = Math.max(1, Math.ceil(piece.length * FIXATION_RATIO));
      const span = document.createElement("span");
      span.setAttribute(FIXATION_ATTR, "true");
      span.style.fontWeight = "600";
      span.textContent = piece.slice(0, fixationLength);
      fragment.appendChild(span);

      const remainder = piece.slice(fixationLength);
      if (remainder) fragment.appendChild(document.createTextNode(remainder));
    } else {
      fragment.appendChild(document.createTextNode(piece));
    }
  });

  return fragment;
}

/** Wraps the leading portion of long words in fixation spans. Operates on real text nodes, skipping code/links/headings/etc. */
export function applyFocusReading(root: HTMLElement): void {
  const textNodes = collectTextNodes(root);
  for (const textNode of textNodes) {
    if (!textNode.textContent || !textNode.textContent.trim()) continue;
    const fragment = buildFixationFragment(textNode.textContent);
    textNode.replaceWith(fragment);
  }
}
