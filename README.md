# E-ink Improvement for Chrome

This is a Chrome extension to improve the websites shown in e-ink displays.

The main idea is to convert dark themes to light themes, and of course, I do some custom works for some useful websites(for example Github).

## Install

1. Clone the source code.

2. Open `chrome://extensions` in Chrome.

3. Enable `Developer mode`.

4. Click `Load unpacked` button and choose the `src` folder.

## Usage

You can click the extension icon on the right of the URL bar, then click the `Apply ink style` button on the popup. The ink style will be added to the current tab. Of course, you can click the `remove ink style` button to remove the ink style.

You can also use the shortcut(<Ctrl-Shift-E>) to toggle the ink style.

It's important to note that when you apply the ink style on a tab, the extension will remember the website host, so when you open the same host website afterward, the ink style will be automatically applied. You don't need to apply it twice(remove ink style is similar). In other words, the toggle ink style option works on each different host website.

## Thanks

This project is heavily inspired by the awesome project [ismartcoding/e-ink-viewable](https://github.com/ismartcoding/e-ink-viewable).

## License

[MIT License](https://github.com/hui890514/chrome-e-ink-improvement/blob/main/LICENSE) © 2024-PRESENT [慧](https://github.com/hui890514)
