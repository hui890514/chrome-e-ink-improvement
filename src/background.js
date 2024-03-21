import { queryCurrentTab, sendMessage, setStorage } from './chrome'
import { shouldApplyInkStyle } from './inkStyle'
import { shouldApplyCodeBlockStyle } from './codeBlockStyle'

setStorage({
  shouldApplyCodeBlockStyle: true
})

chrome.commands.onCommand.addListener(async command => {
  const tab = await queryCurrentTab()
  const tabId = tab.id
  if (command === 'toggle-ink-style') {
    const host = `e-ink: ${new URL(tab.url).host}`
    const _shouldApplyInkStyle = await shouldApplyInkStyle(host)
    setStorage({ [host]: !_shouldApplyInkStyle })
    sendMessage(
      tabId,
      !_shouldApplyInkStyle ? 'applyInkStyle' : 'removeInkStyle'
    )
  } else if (command === 'toggle-code-block-style') {
    const _shouldApplyCodeBlockStyle = await shouldApplyCodeBlockStyle()
    setStorage({
      shouldApplyCodeBlockStyle: !_shouldApplyCodeBlockStyle
    })
    sendMessage(
      tabId,
      !_shouldApplyCodeBlockStyle
        ? 'applyCodeBlockStyle'
        : 'removeCodeBlockStyle'
    )
  }
})
