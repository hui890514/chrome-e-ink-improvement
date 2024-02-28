chrome.commands.onCommand.addListener(command => {
  if (command === 'toggle-ink-style') {
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
          const shouldApply = !items[key]
          chrome.storage.sync.set({ [key]: shouldApply })
          chrome.tabs.sendMessage(tab.id, shouldApply ? 'apply' : 'remove')
        })
      }
    )
  }
})
