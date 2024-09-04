import { getDb, putDb } from './database';
import { header } from './header';

// Initialize CodeMirror editor
const loadEditor = () => {
  const editor = CodeMirror(document.querySelector('#main'), {
    value: '',
    mode: 'javascript',
    theme: 'monokai',
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    indentUnit: 2,
    tabSize: 2,
  });

  // Retrieve content from IndexedDB and set it in the editor
  getDb().then((data) => {
    console.info('Loaded data from IndexedDB, inserting into editor');
    editor.setValue(data || header);
  });

  // Save the content in IndexedDB on each change
  editor.on('change', () => {
    console.log('Editor content changed, saving to IndexedDB');
    putDb(editor.getValue());
  });
};

// If the DOM is fully loaded, load the editor
window.addEventListener('DOMContentLoaded', () => {
  loadEditor();
});

// Export the loadEditor function as the default export
export default loadEditor;
