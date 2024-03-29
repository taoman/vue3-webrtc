import pkg from '../package.json'
export const mainfest :chrome.runtime.Manifest  = {
    manifest_version: 3,
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    host_permissions: ['*://*/*'],
    background: {
      service_worker: 'src/entries/background.ts',
    },
    action: {
      default_popup: 'src/entries/popup/index.html',
    },
    options_ui: {
      page: 'src/entries/options/index.html',
      open_in_tab: false,
    },
}