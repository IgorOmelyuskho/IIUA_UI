import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoSizeService {

  constructor() { }

  init = (textArea: HTMLElement) => {
    let observe;
    if (window['attachEvent']) {
      observe = (element, event, handler) => {
        element.attachEvent('on' + event, handler);
      };
    } else {
      observe = (element, event, handler) => {
        element.addEventListener(event, handler, false);
      };
    }

    const resize = () => {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    };

    const delayedResize = () => {
      requestAnimationFrame(() => {
        resize();
      });
    };

    const whenKeyDown = (event) => {
      if (event.code === 'Enter' && event.ctrlKey === true) {
        const cursorPos = getCursorPos();
        const textBeforeCursor = textArea['value'].substring(0, cursorPos);
        const textAfterCursor = textArea['value'].substring(cursorPos, textArea['value'].length);
        const newValue = textBeforeCursor + '\n' + textAfterCursor;
        textArea['value'] = newValue;
        textArea['selectionStart'] = cursorPos + 1;
        textArea['selectionEnd'] = cursorPos + 1;
        delayedResize();
        return;
      }

      if (event.code === 'Enter') {
        event.preventDefault();

      } else {
        delayedResize();
      }
    };

    const getCursorPos = () => {
      if ('selectionStart' in textArea && document.activeElement === textArea) {
        return textArea['selectionStart'];
      }
      return -1;
    };

    observe(textArea, 'change', resize);
    observe(textArea, 'cut', delayedResize);
    observe(textArea, 'paste', delayedResize);
    observe(textArea, 'drop', delayedResize);
    observe(textArea, 'keydown', whenKeyDown);

    textArea.focus();
    resize();
  }
}


