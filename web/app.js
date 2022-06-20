import {easyScrollSync} from "easy-scroll-sync";

const Typograf = require('typograf');

const typo = new Typograf({locale: ['ru', 'en-US'], live: true});
const $editor = document.querySelector('#editor');
const $result = document.querySelector('#result');

easyScrollSync()

$editor.focus();

let lastValue = $editor.value;

$editor.addEventListener(
  'input',
  async () => {
    const value = $editor.value;
    if (value !== lastValue) {
      const pos = getCaretPosition($editor);
      lastValue = typo.execute(value);
      setCaretPosition($editor, pos === value.length ? lastValue.length : pos);
    }

    $result.value = typo.execute(lastValue);
    await navigator.clipboard.writeText(lastValue);
  },
  false
);

function getCaretPosition(element) {
  return element.selectionStart || 0;
}

function setCaretPosition(element, pos) {
  return typeof element.setSelectionRange === 'function' && element.setSelectionRange(pos, pos);
}
