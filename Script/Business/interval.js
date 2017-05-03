function Timer(callback, interval) {
    this.callback = callback;
    this.timerId = null;
    this.setInterval(interval);
}

Timer.prototype.setInterval = function(interval) {
    if (this.timerId !== null) clearInterval(this.timerId);
    this.timerId = setInterval(this.callback, interval);
}