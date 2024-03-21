import { applyInkStyle, removeInkStyle, shouldApplyInkStyle } from './inkStyle'
import {
  applyCodeBlockStyle,
  removeCodeBlockStyle,
  shouldApplyCodeBlockStyle
} from './codeBlockStyle'

if (await shouldApplyCodeBlockStyle()) applyCodeBlockStyle()
if (await shouldApplyInkStyle(`e-ink: ${window.location.host}`)) applyInkStyle()

chrome.runtime.onMessage.addListener(request => {
  if (request === 'removeInkStyle') {
    removeInkStyle()
  } else if (request === 'applyInkStyle') {
    applyInkStyle()
  } else if (request === 'removeCodeBlockStyle') {
    removeCodeBlockStyle()
  } else if (request === 'applyCodeBlockStyle') {
    applyCodeBlockStyle()
  }
  return true
})
