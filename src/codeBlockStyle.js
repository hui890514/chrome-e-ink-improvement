import { getStorageAsync, log } from './chrome'

let style

export function applyCodeBlockStyle() {
  if (!style) {
    style = document.createElement('style')
    style.textContent =
      'pre{border:1px solid #000!important}pre,pre *{background-color:#fff!important;color:#000!important;filter:none!important}'
  }
  document.body.appendChild(style)
  log('chrome-e-ink-improvement: apply code block style')
}

export function removeCodeBlockStyle() {
  style?.parentNode?.removeChild(style)
  log('chrome-e-ink-improvement: remove code block style')
}

export async function shouldApplyCodeBlockStyle() {
  return await getStorageAsync('shouldApplyCodeBlockStyle')
}
