function parseRgbString(rgb) {
  return rgb.replace(/[^\d,]/g, '').split(',')
}
//http://www.w3.org/TR/AERT#color-contrast
function getBrightness(color) {
  const c = parseRgbString(color)
  return (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000
}
function isDark(color) {
  return getBrightness(color) < 128
}

const ignoreTagNames = [
  'html',
  'head',
  'script',
  'style',
  'link',
  'meta',
  'title',
  'img',
  'video',
  'audio'
]
function ignoreTag(node) {
  if (!node.tagName) {
    return true
  }
  const tag = node.tagName.toLowerCase()
  if (ignoreTagNames.includes(tag)) {
    return true
  }
  // ignore custom tags which contain video, audio, img...
  if (['video', 'audio', 'img'].some(it => tag.includes(it))) {
    return true
  }
  if (tag === 'input' && ['checkbox', 'radio'].includes(node.type)) {
    return true
  }
}

function updateStyle(node) {
  if (ignoreTag(node)) {
    return
  }
  const style = window.getComputedStyle(node)
  const tag = node.tagName.toLowerCase()
  const backgroundColor = style.backgroundColor
  if (
    backgroundColor &&
    backgroundColor !== 'transparent' &&
    backgroundColor !== 'rgb(255, 255, 255)' &&
    backgroundColor !== 'rgba(0, 0, 0, 0)'
  ) {
    const alpha = parseFloat(backgroundColor.split(',')[3])
    if (!isNaN(alpha) && alpha < 0.5) {
      // ignore this
    } else if (
      node.textContent.trim() ||
      tag === 'input' ||
      isDark(backgroundColor)
    ) {
      // has text content
      node.style.setProperty('background-color', '#fff', 'important')
      // add border for code block
      if (tag === 'pre' && node.className.trim() !== 'CodeMirror-line') {
        node.style.setProperty('border', '1px solid #000', 'important')
      }
    }
  }
  if (style.background.indexOf('linear-gradient') !== -1) {
    // remove linear gradient
    node.style.setProperty('background', '#fff', 'important')
  }
  node.style.setProperty('color', '#000', 'important')
  const borderColor = style.borderColor
  if (borderColor && borderColor !== 'rgb(0, 0, 0)') {
    if (!isDark(borderColor)) {
      // too light
      node.style.setProperty('border-color', '#000', 'important')
    }
  }
  if (tag === 'svg') {
    node.style.setProperty('fill', 'currentColor', 'important')
  }
}

function applyStyle() {
  document.querySelectorAll('*').forEach(node => {
    updateStyle(node)
  })

  const observer = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      if (mutation.target) {
        updateStyle(mutation.target)
        mutation.target.childNodes.forEach(node => {
          updateStyle(node)
        })
      }
    }
  })

  observer.observe(document.getElementsByTagName('body')[0], {
    attributes: true,
    childList: true,
    subtree: true
  })
}

function applyCustomStyle() {
  const style = document.createElement('style')
  style.textContent = custom[host]
  document.body.appendChild(style)
}

let style
function applyCodeBlockStyle() {
  if (!style) {
    style = document.createElement('style')
    style.textContent =
      'pre{border:1px solid #000!important}pre,pre *{background-color:#fff!important;color:#000!important;filter:none!important}'
  }
  document.body.appendChild(style)
}

function removeCodeBlockStyle() {
  style?.parentNode?.removeChild(style)
}

function apply() {
  custom[host] ? applyCustomStyle() : applyStyle()
}

const host = window.location.host

chrome.storage.sync.get(['shouldApplyCodeBlockStyle']).then(items => {
  items['shouldApplyCodeBlockStyle'] && applyCodeBlockStyle()
})

chrome.storage.sync.get([`e-ink:${host}`]).then(items => {
  const shouldApply = items[`e-ink:${host}`]
  shouldApply && apply()
})

chrome.runtime.onMessage.addListener(request => {
  if (request === 'remove') {
    window.location.reload()
  } else if (request === 'apply') {
    apply()
  } else if (request === 'removeCodeBlockStyle') {
    removeCodeBlockStyle()
  } else if (request === 'applyCodeBlockStyle') {
    applyCodeBlockStyle()
  }
  return true
})

const custom = {
  'github.com':
    '.hx_IssueLabel{background: white !important;color:black !important;border-color: black !important;}'
}
