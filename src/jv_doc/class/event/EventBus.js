export class EventBus {
  constructor() {
    this.eventMap = {};
  }
  $on = (event, cb) => {
    console.log(event, "on");
    let currentlist = this.eventMap[event];
    if (currentlist) {
      currentlist.push(cb);
    } else {
      this.eventMap[event] = [cb];
    }
  };
  $emit = (event, ...args) => {
    console.log(event, "emit");
    let currentlist = this.eventMap[event];
    if (!currentlist) return;
    currentlist.forEach((cb) => {
      cb(...args);
    });
  };
  $off = (event) => {
    let currentlist = this.eventMap[event];
    if (currentlist) {
      currentlist = null;
    }
  };
  $clear = () => {
    this.eventMap = {};
  };
}
