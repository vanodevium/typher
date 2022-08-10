import {easyScrollSync} from "easy-scroll-sync";
import copy from "copy-text-to-clipboard";

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

// $result.addEventListener(
//   'click',
//   async () => {
//     copy($result.value)
//   }
// )

function getCaretPosition(element) {
  return element.selectionStart || 0;
}

function setCaretPosition(element, pos) {
  return typeof element.setSelectionRange === 'function' && element.setSelectionRange(pos, pos);
}

window.dataLayer = window.dataLayer || [];
window.gtag = function gtag(){dataLayer.push(arguments);}
window.gtag('js', new Date());
window.gtag('config', 'G-X8YC3F72DB');
