import './app.css'

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

      if (!value) {
        lastValue = '';
        $result.value = lastValue;
        return;
      }

      lastValue = typo.execute(value);
      $result.value = lastValue;
      await navigator.clipboard.writeText(lastValue);
    }
  },
  false
);

$result.addEventListener(
  'click',
  async () => {
    await navigator.clipboard.writeText($result.value)
  }
)

window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() {
  dataLayer.push(arguments);
}
window.gtag('js', new Date());
window.gtag('config', 'G-X8YC3F72DB');
