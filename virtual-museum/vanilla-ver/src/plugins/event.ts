interface CustomEventMap {
  "eResize": CustomEvent;
  "eUpdate": CustomEvent;
}

const emitEvent = <K extends keyof CustomEventMap>(eventType: K): void => {
  // console.log(eventType);
  document.dispatchEvent(new CustomEvent(eventType));
}

export { emitEvent };