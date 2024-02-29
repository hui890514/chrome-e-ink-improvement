chrome.commands.onCommand.addListener(command => {
  if (command === 'toggle-ink-style') {
    chrome.tabs
      .query({
        active: true,
        currentWindow: true
      })
      .then(tabs => {
        const tab = tabs[0]
        const host = new URL(tab.url).host
        const key = `e-ink:${host}`
        chrome.storage.sync.get([key]).then(items => {
          const shouldApply = !items[key]
          chrome.storage.sync.set({ [key]: shouldApply })
          chrome.tabs.sendMessage(tab.id, shouldApply ? 'apply' : 'remove')
        })
      })
  } else if (command === 'toggle-code-block-style') {
    chrome.tabs
      .query({
        active: true,
        currentWindow: true
      })
      .then(tabs => {
        const tab = tabs[0]
        chrome.storage.sync.get(['shouldApplyCodeBlockStyle']).then(items => {
          const shouldApplyCodeBlockStyle = !items['shouldApplyCodeBlockStyle']
          chrome.tabs.sendMessage(
            tab.id,
            shouldApplyCodeBlockStyle
              ? 'applyCodeBlockStyle'
              : 'removeCodeBlockStyle'
          )
          chrome.storage.sync.set({ shouldApplyCodeBlockStyle })
        })
      })
  }
})
