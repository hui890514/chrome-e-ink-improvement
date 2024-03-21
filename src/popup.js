import { shouldApplyCodeBlockStyle } from './codeBlockStyle'
import {
  setStorage,
  sendMessage,
  queryCurrentTab,
  createTab,
  clearStorage
} from './chrome'
import { shouldApplyInkStyle } from './inkStyle'

const tab = await queryCurrentTab()
const tabId = tab.id

// ink style
const button1 = document.getElementById('button1')
const host = `e-ink: ${new URL(tab.url).host}`
const _shouldApplyInkStyle = await shouldApplyInkStyle(host)
button1.textContent = _shouldApplyInkStyle
  ? 'Remove ink style'
  : 'Apply ink style'
button1.addEventListener('click', () => {
  setStorage({ [host]: !_shouldApplyInkStyle })
  sendMessage(tabId, !_shouldApplyInkStyle ? 'applyInkStyle' : 'removeInkStyle')
  window.close()
})

// code block style
const checkbox = document.getElementById('checkbox')
let _shouldApplyCodeBlockStyle = (checkbox.checked =
  await shouldApplyCodeBlockStyle())
checkbox.addEventListener('click', () => {
  _shouldApplyCodeBlockStyle = checkbox.checked
  setStorage({
    shouldApplyCodeBlockStyle: _shouldApplyCodeBlockStyle
  })
  sendMessage(
    tabId,
    _shouldApplyCodeBlockStyle ? 'applyCodeBlockStyle' : 'removeCodeBlockStyle'
  )
})

// clear storage
document.getElementById('button2').addEventListener('click', () => {
  clearStorage()
  setStorage({
    shouldApplyCodeBlockStyle: true
  })
  if (_shouldApplyInkStyle) sendMessage(tabId, 'removeInkStyle')
  else if (!_shouldApplyCodeBlockStyle)
    sendMessage(tabId, 'applyCodeBlockStyle')
  window.close()
})

// shortcuts
document.getElementById('shortcuts').addEventListener('click', () => {
  createTab('chrome://extensions/shortcuts')
})
