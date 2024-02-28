function updateUI(paused) {
  $('#toggle').text(paused ? 'Remove ink style' : 'Apply ink style')
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
      updateUI(shouldApply)

      $('#toggle').on('click', function () {
        shouldApply = !shouldApply
        chrome.storage.sync.set({ [key]: shouldApply })
        updateUI(shouldApply)
        chrome.tabs.sendMessage(tab.id, shouldApply ? 'apply' : 'remove')
      })
    })
  }
)

$('#shortcuts').click(() =>
  chrome.tabs.create({
    url: 'chrome://extensions/shortcuts'
  })
)
