export function getStorageAsync(key) {
  return chrome.storage.sync.get([key]).then(items => items[key])
}

export function setStorage(option) {
  chrome.storage.sync.set(option)
}

export function clearStorage() {
  chrome.storage.sync.clear()
}

export function sendMessage(tabId, msg) {
  chrome.tabs.sendMessage(tabId, msg)
}

export function createTab(url) {
  chrome.tabs.create({
    url
  })
}

export async function queryCurrentTab() {
  return chrome.tabs
    .query({
      active: true,
      currentWindow: true
    })
    .then(tabs => tabs[0])
}

export function log(msg) {
  console.log(`%c ${msg}`, 'background: #b4b4b3; color: white')
}
