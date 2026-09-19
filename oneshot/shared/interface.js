/* One Shot's common controller. Game rules, rendering, sound and timelines live in each HTML page. */
(() => {
  'use strict';
  const keyMap = {
    ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
    KeyA: 'left', KeyD: 'right', KeyW: 'up', KeyS: 'down',
    KeyX: 'a', Space: 'a', KeyZ: 'b', Enter: 'start', Escape: 'start',
    ShiftLeft: 'select', ShiftRight: 'select'
  };
  const selectable = 'input, textarea, select, [contenteditable="true"], [data-selectable]';

  function mount(root, options = {}) {
    if (!root) throw new Error('OneShot.mount needs the game shell element.');
    const host = root.querySelector('[data-controller]');
    if (!host) throw new Error('The game shell needs a [data-controller] element.');
    host.classList.add('controller');
    host.setAttribute('aria-label', 'Digital game controller');
    host.innerHTML = `
      <div class="controller-head"><span class="brand">ONE SHOT</span><span class="machine-no" data-meta></span></div>
      <div class="controls">
        <div class="dpad" aria-label="D-pad">
          <div class="cross"></div>
          <button type="button" class="key dir up" data-key="up">▲</button>
          <button type="button" class="key dir left" data-key="left">◀</button>
          <button type="button" class="key dir right" data-key="right">▶</button>
          <button type="button" class="key dir down" data-key="down">▼</button>
        </div>
        <div class="middle">
          <button type="button" class="utility" data-key="select"><span>SELECT</span></button>
          <button type="button" class="utility" data-key="start"><span>START</span></button>
        </div>
        <div class="face">
          <div class="face-wrap"><button type="button" class="key round" data-key="b">B</button><span data-label="b"></span></div>
          <div class="face-wrap"><button type="button" class="key round" data-key="a">A</button><span data-label="a"></span></div>
        </div>
      </div>
      <div class="controller-note"><span data-hint="left"></span><span data-hint="right"></span></div>`;
    host.querySelector('[data-meta]').textContent = options.meta || '';
    for (const key of ['a', 'b']) host.querySelector(`[data-label="${key}"]`).textContent = options.labels?.[key] || key.toUpperCase();
    for (const side of ['left', 'right']) host.querySelector(`[data-hint="${side}"]`).textContent = options.hints?.[side] || '';
    const buttons = [...host.querySelectorAll('[data-key]')];
    for (const button of buttons) button.setAttribute('aria-label', options.ariaLabels?.[button.dataset.key] || button.dataset.key.toUpperCase());
    const held = new Set(), sources = new Map(), lifetime = new AbortController(), timers = new Set();
    const listen = (target, event, handler) => target.addEventListener(event, handler, { signal: lifetime.signal });
    function paint() {
      for (const button of buttons) button.classList.toggle('pressed', held.has(button.dataset.key));
    }
    // Each pointer/keyboard key owns its contribution. Releasing one source cannot release another.
    function setSource(id, keys) {
      const before = new Set(held);
      if (keys.length) sources.set(id, keys); else sources.delete(id);
      held.clear();
      for (const values of sources.values()) for (const key of values) held.add(key);
      paint();
      for (const key of before) if (!held.has(key)) options.onRelease?.(key);
      for (const key of [...held]) if (!before.has(key) && held.has(key)) options.onPress?.(key);
    }
    function clear() {
      const before = [...held];
      sources.clear();
      held.clear();
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
      paint();
      for (const key of before) options.onRelease?.(key);
    }
    const pad = host.querySelector('.dpad');
    function padKeys(event) {
      const r = pad.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width * 2 - 1;
      const y = (event.clientY - r.top) / r.height * 2 - 1;
      const keys = [];
      if (Math.abs(x) > .23 && Math.abs(x) >= Math.abs(y) * .65) keys.push(x < 0 ? 'left' : 'right');
      if (Math.abs(y) > .23 && Math.abs(y) >= Math.abs(x) * .65) keys.push(y < 0 ? 'up' : 'down');
      return keys;
    }
    const releasePointer = event => setSource('p' + event.pointerId, []);
    listen(pad, 'pointerdown', event => {
      if (event.button !== 0) return;
      event.preventDefault();
      pad.setPointerCapture(event.pointerId);
      setSource('p' + event.pointerId, padKeys(event));
    });
    listen(pad, 'pointermove', event => {
      if (pad.hasPointerCapture(event.pointerId) && sources.has('p' + event.pointerId)) setSource('p' + event.pointerId, padKeys(event));
    });
    for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(pad, event, releasePointer);
    for (const button of buttons) {
      if (!pad.contains(button)) {
        listen(button, 'pointerdown', event => {
          if (event.button !== 0) return;
          event.preventDefault();
          button.setPointerCapture(event.pointerId);
          setSource('p' + event.pointerId, [button.dataset.key]);
        });
        for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(button, event, releasePointer);
      }
      // Native keyboard / assistive-technology activation still works without Pointer Events.
      listen(button, 'click', event => {
        if (event.detail !== 0) return;
        const id = 'accessible-' + button.dataset.key;
        setSource(id, [button.dataset.key]);
        const timer = setTimeout(() => { timers.delete(timer); setSource(id, []); }, 150);
        timers.add(timer);
      });
    }
    const mapping = { ...keyMap, ...options.keyMap };
    listen(window, 'keydown', event => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(selectable)) return;
      // Leave activation of focused, visible buttons and links to the browser.
      if ((event.code === 'Space' || event.code === 'Enter') && target?.closest('button,a')?.getClientRects().length) return;
      const key = mapping[event.code];
      if (key) { event.preventDefault(); if (!event.repeat) setSource('k' + event.code, [key]); }
    });
    listen(window, 'keyup', event => { if (mapping[event.code]) setSource('k' + event.code, []); });
    function suspend() { clear(); options.onSuspend?.(); }
    listen(window, 'blur', suspend);
    listen(document, 'visibilitychange', () => { if (document.hidden) suspend(); });
    listen(window, 'pagehide', suspend);
    // CSS handles selection/callouts in WebKit; these cover native selection and dragging elsewhere.
    for (const event of ['selectstart', 'contextmenu', 'dragstart']) listen(root, event, e => {
      const target = e.target instanceof Element ? e.target : e.target.parentElement;
      if (!target?.closest(selectable)) e.preventDefault();
    });
    return {
      held, clear,
      destroy() { lifetime.abort(); clear(); host.replaceChildren(); }
    };
  }
  window.OneShot = Object.freeze({ mount });
})();
