const button = document.getElementById('button')

function updateButton(shouldApply) {
  button.textContent = shouldApply ? 'Remove ink style' : 'Apply ink style'
}

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  function (tabs) {
    const tab = tabs[0]
    const host = new URL(tab.url).host
    const key = `e-ink:${host}`
    chrome.storage.sync.get([key], function (items) {
      let shouldApply = items[key]
      updateButton(shouldApply)
      button.addEventListener('click', function () {
        shouldApply = !shouldApply
        chrome.storage.sync.set({ [key]: shouldApply })
        updateButton(shouldApply)
        chrome.tabs.sendMessage(tab.id, shouldApply ? 'apply' : 'remove')
      })
    })
  }
)

document.getElementById('shortcuts').addEventListener('click', () => {
  chrome.tabs.create({
    url: 'chrome://extensions/shortcuts'
  })
})
