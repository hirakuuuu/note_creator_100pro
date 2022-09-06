// application.js
import Trix from 'trix';

// Import trix's css for simplicity.
import 'trix/dist/trix.css';

Trix.config.toolbar.getDefaultHTML = toolbarDefaultHTML;

document.addEventListener('trix-initialize', updateToolbars, { once: true });

function updateToolbars(event) {
  const toolbars = document.querySelectorAll('trix-toolbar');
  const html = Trix.config.toolbar.getDefaultHTML();
  toolbars.forEach((toolbar) => (toolbar.innerHTML = html));
}

function toolbarDefaultHTML() {
  const { lang } = Trix.config;
  // omitted for brevity.
  return ``
}

function toolbarDefaultHTML() {
  const { lang } = Trix.config;
  return `
  <div class="trix-button-row">
    <span class="trix-button-group trix-button-group--alignment-tools">
      <button type="button" class="trix-button trix-button--icon trix-button--icon-align-left" data-trix-attribute="alignLeft" title="Align Left" tabindex="-1">Align Left</button>

      <button type="button" class="trix-button trix-button--icon trix-button--icon-align-center" data-trix-attribute="alignCenter" title="Align Left" tabindex="-1">Align Center</button>

      <button type="button" class="trix-button trix-button--icon trix-button--icon-align-right" data-trix-attribute="alignRight" title="Align Right" tabindex="-1">Align Right</button>
    </span>
    <!-- Other default HTML below -->
  </div>`
}
