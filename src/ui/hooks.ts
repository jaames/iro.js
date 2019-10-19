
import { useRef, useState, useEffect } from 'preact/hooks';
import { listen, unlisten } from '../util/dom';

enum EventType {
  MouseDown = 'mousedown',
  MouseMove = 'mousemove',
  MouseUp = 'mouseup',
  TouchStart = 'touchstart',
  TouchMove = 'touchstart',
  TouchEnd = 'touchend'
}

export enum EventResult {
  start,
  move,
  end
}

export function useUniqueId() {
  const randomString = (Math.random() + 1).toString(36).substring(5);
  const [ uid ] = useState(randomString);
  return uid;
}

export function usePointerInput(callback) {

  const el = useRef(null);
  
  function handleInput(e: MouseEvent & TouchEvent) {
    e.preventDefault();
    const base = el.current;
    const point = e.touches ? e.changedTouches[0] : e;
    const x = point.clientX;
    const y = point.clientY;
    const bounds = base.getBoundingClientRect();

    switch (e.type) {
      case EventType.MouseDown:
      case EventType.TouchStart:
        listen(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], handleInput, { passive: false });
        callback(x, y, bounds, EventResult.start);
        break;
      case EventType.MouseMove:
      case EventType.TouchMove:
        callback(x, y, bounds, EventResult.move);
        break;
      case EventType.MouseUp:
      case EventType.TouchEnd:
        callback(x, y, bounds, EventResult.end);
        unlisten(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], handleInput, { passive: false });
        break;
    }
  }

  useEffect(() => {
    const base = el.current;
    listen(base, [EventType.MouseDown, EventType.TouchStart], handleInput, { passive: false });

    return () => {
      unlisten(base, [EventType.MouseDown, EventType.TouchStart], handleInput);
    }
  }, []);

  return el;
}