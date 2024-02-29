let shouldApply
let tabId
let key
chrome.tabs
  .query({
    active: true,
    currentWindow: true
  })
  .then(tabs => {
    const tab = tabs[0]
    const host = new URL(tab.url).host
    tabId = tab.id
    key = `e-ink:${host}`
    chrome.storage.sync.get([key]).then(items => {
      shouldApply = items[key]
      button.textContent = shouldApply ? 'Remove ink style' : 'Apply ink style'
    })
  })

const button = document.getElementById('button')
button.addEventListener('click', () => {
  chrome.storage.sync.set({ [key]: !shouldApply })
  chrome.tabs.sendMessage(tabId, !shouldApply ? 'apply' : 'remove')
  window.close()
})

document
  .getElementById('clear-storage-button')
  .addEventListener('click', () => {
    chrome.storage.sync.clear()
    if (shouldApply) chrome.tabs.sendMessage(tabId, 'remove')
    else if (shouldApplyCodeBlockStyle)
      chrome.tabs.sendMessage(tabId, 'removeCodeBlockStyle')
    window.close()
  })

const checkbox = document.getElementById('checkbox')
let shouldApplyCodeBlockStyle
checkbox.addEventListener('click', () => {
  shouldApplyCodeBlockStyle = checkbox.checked
  chrome.storage.sync.set({ shouldApplyCodeBlockStyle })
  chrome.tabs.sendMessage(
    tabId,
    shouldApplyCodeBlockStyle ? 'applyCodeBlockStyle' : 'removeCodeBlockStyle'
  )
})
chrome.storage.sync.get(['shouldApplyCodeBlockStyle']).then(items => {
  shouldApplyCodeBlockStyle = checkbox.checked =
    items['shouldApplyCodeBlockStyle']
})

document.getElementById('shortcuts').addEventListener('click', () => {
  chrome.tabs.create({
    url: 'chrome://extensions/shortcuts'
  })
})
