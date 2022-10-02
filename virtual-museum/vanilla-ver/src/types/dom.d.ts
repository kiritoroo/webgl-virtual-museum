interface CustomEventMap {
  "eResize": CustomEvent;
  "eUpdate": CustomEvent;
  "eDiscover": CustomEvent;
}

declare global {
  interface Document { 
    addEventListener<K extends keyof CustomEventMap>(type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void): void;
  }
}

export {};