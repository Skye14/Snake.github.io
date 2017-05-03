function EventHandler() {
    this.pressedKey = [enums.enumPressedKey.keyRight];
}

EventHandler.prototype.start = function() {
    function keyPress(handler) {
        window.onkeydown = function(e) {
            e = e || window.event;
            switch (e.keyCode) {
                case 32:
                    handler.pressedKey.push(enums.enumPressedKey.keySpace);
                    break;
                case 37:
                    handler.pressedKey.push(enums.enumPressedKey.keyLeft);
                    break;
                case 40:
                    handler.pressedKey.push(enums.enumPressedKey.keyDown);
                    break;
                case 38:
                    handler.pressedKey.push(enums.enumPressedKey.keyUp);
                    break;
                case 39:
                    handler.pressedKey.push(enums.enumPressedKey.keyRight);
                    break;
            }
        }
    }
    keyPress(this);
}