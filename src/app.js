const {clipboard} = require("electron");

const Typo = require("typograf");
const Eyo = require("eyo-kernel");

/**
 * @property {{}} dictionary
 */
const safeEyo = new Eyo();
safeEyo.dictionary.loadSafeSync();

const typo = new Typo({locale: ["ru", "en-US"], live: true});
const $editor = document.querySelector("#editor");
const $result = document.querySelector("#result");

$editor.focus();

let lastValue = $editor.value;

$editor.addEventListener(
  "input",
  () => {
    const value = $editor.value;
    if (value !== lastValue) {
      const pos = getCaretPosition($editor);
      lastValue = typo.execute(value);
      setCaretPosition($editor, pos === value.length ? lastValue.length : pos);
    }

    $result.value = typo.execute(safeEyo.restore(lastValue));
    clipboard.writeText($result.value);
  },
  false,
);

function getCaretPosition(element) {
  return element.selectionStart || 0;
}

function setCaretPosition(element, pos) {
  return typeof element.setSelectionRange === "function" && element.setSelectionRange(pos, pos);
}
