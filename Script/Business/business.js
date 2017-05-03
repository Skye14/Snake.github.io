function Business(model, handler) {
    this.model = model;
    this.speed = this.model.speed;
    this.handler = handler;
    this.currentDirection = enums.enumPressedKey.keyRight;
    this.timer = null;
    this.lastPressedKey = "";
    this.watchers_score = [];
}

Business.prototype.changeDirectionOfFirstPiece = function() {

    switch (this.lastPressedKey) {
        case enums.enumPressedKey.keySpace:
            this.lastPressedKey = enums.enumPressedKey.keyRight;
            break;
        case enums.enumPressedKey.keyLeft:
            if (this.currentDirection != enums.enumPressedKey.keyRight) {
                this.currentDirection = enums.enumPressedKey.keyLeft;
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posX)) {
                    this.model.snake.pieces[0].posX -= 1;
                }
            } else {
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posX)) {
                    this.model.snake.pieces[0].posX += 1;
                }
            }
            break;
        case enums.enumPressedKey.keyUp:
            if (this.currentDirection != enums.enumPressedKey.keyDown) {
                this.currentDirection = enums.enumPressedKey.keyUp;
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posY)) {
                    this.model.snake.pieces[0].posY -= 1;
                }
            } else {
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posY)) {
                    this.model.snake.pieces[0].posY += 1;
                }
            }
            break;
        case enums.enumPressedKey.keyDown:
            if (this.currentDirection != enums.enumPressedKey.keyUp) {
                this.currentDirection = enums.enumPressedKey.keyDown;
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posY)) {
                    this.model.snake.pieces[0].posY += 1;
                }
            } else {
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posY)) {
                    this.model.snake.pieces[0].posY -= 1;
                }
            }
            break;
        case enums.enumPressedKey.keyRight:
            if (this.currentDirection != enums.enumPressedKey.keyLeft) {
                this.currentDirection = enums.enumPressedKey.keyRight;
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posX)) {
                    this.model.snake.pieces[0].posX += 1;
                }
            } else {
                if (!this.isExitOfBorder(this.model.snake.pieces[0].posX)) {
                    this.model.snake.pieces[0].posX -= 1;
                }
            }
            break;
    }
}

Business.prototype.isExitOfBorder = function(position) {
    var isExitOverBorder = false;
    if (this.currentDirection == enums.enumPressedKey.keyRight) {
        if (position === this.model.field.width - 1) {
            isExitOverBorder = true;
            this.model.stateOfGame = enums.enumStateOfGame.finish;
        }
    } else if (this.currentDirection == enums.enumPressedKey.keyDown) {
        if (position === this.model.field.height - 1) {
            isExitOverBorder = true;
            this.model.stateOfGame = enums.enumStateOfGame.finish;
        }
    } else {
        if (position === 0) {
            isExitOverBorder = true;
            this.model.stateOfGame = enums.enumStateOfGame.finish;
        }
    }
    return isExitOverBorder;
}

Business.prototype.getStartPosition = function() {
    this.model.snake.pieces[0].posX = 0;
    this.model.snake.pieces[0].posY = 0;
    this.model.snake.pieces.length = 1;
    this.currentDirection = enums.enumPressedKey.keyRight;
    this.lastPressedKey = enums.enumPressedKey.keyRight;
    this.createNewApple();
    this.handler.pressedKey = [enums.enumPressedKey.keyRight];
    this.speed = this.model.speed;
    this.setSpeed();
    this.changeOfInterval();
    this.invokeOfWatcherScore(this.model.snake.pieces.length);
}

Business.prototype.createNewApple = function() {
    var random = [];
    var piceDirectionPosX = this.model.snake.pieces[0].posX;
    var piceDirectionPosY = this.model.snake.pieces[0].posY;

    for (var x = 0; x < this.model.field.width; x++) {
        for (var y = 0; y < this.model.field.height; y++) {
            for (var i = 0; i < this.model.snake.pieces.length; i++) {
                var posXY = x + "," + y;
                var firstPicePos = this.model.snake.pieces[i].posX + "," + this.model.snake.pieces[i].posY;
                if (posXY == firstPicePos) {
                    break;
                } else if (i == this.model.snake.pieces.length - 1) {
                    if (posXY != firstPicePos) {
                        if (this.lastPressedKey == enums.enumPressedKey.keyRight || this.lastPressedKey == "") {
                            var piceDirectionRight = piceDirectionPosX + 1 + "," + piceDirectionPosY;
                            if (posXY == piceDirectionRight) {
                                break;
                            }
                        } else if (this.lastPressedKey == enums.enumPressedKey.keyLeft) {
                            var piceDirectionLeft = piceDirectionPosX - 1 + "," + piceDirectionPosY;
                            if (posXY == piceDirectionLeft) {
                                break;
                            }
                        } else if (this.lastPressedKey == enums.enumPressedKey.keyDown) {
                            var piceDirectionDown = piceDirectionPosX + "," + (piceDirectionPosY + 1);
                            if (posXY == piceDirectionDown) {
                                break;
                            }
                        } else if (this.lastPressedKey == enums.enumPressedKey.keyUp) {
                            var piceDirectionUp = piceDirectionPosX + "," + (piceDirectionPosY - 1);
                            if (posXY == piceDirectionUp) {
                                break;
                            }
                        }
                        random.push({ x: x, y: y });
                    }
                }
            }
        }
    }

    var randObj = random[this.getRandomNumber(0, random.length)];
    if (randObj == undefined) {
        this.model.stateOfGame = enums.enumStateOfGame.win;
    } else {
        this.model.apple.posX = randObj.x;
        this.model.apple.posY = randObj.y;
        this.model.apple.color = this.getColorApple();
    }
}

Business.prototype.getColorApple = function() {
    return this.model.apple.enumColor[this.getRandomNumber(0, this.model.apple.enumColor.length)];
}

Business.prototype.getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Business.prototype.tryEatApple = function() {
    if (this.model.snake.pieces[0].posX == this.model.apple.posX && this.model.snake.pieces[0].posY == this.model.apple.posY) {
        this.addPieceSnake();
        this.createNewApple();
        this.invokeOfWatcherScore(this.model.snake.pieces.length);
    }
}

Business.prototype.addPieceSnake = function() {
    var lastPiece = this.model.snake.pieces[this.model.snake.pieces.length - 1];
    this.model.snake.pieces.push({ posX: lastPiece.posX, posY: lastPiece.posY });
    this.changeOfSpeed();
    this.changeOfInterval();

}

Business.prototype.changePositionOfPieces = function() {
    for (var i = this.model.snake.pieces.length - 1; i > 0; i--) {
        this.model.snake.pieces[i].posX = this.model.snake.pieces[i - 1].posX;
        this.model.snake.pieces[i].posY = this.model.snake.pieces[i - 1].posY;
    }
}

Business.prototype.changeElementsOfModel = function() {
    switch (this.model.stateOfGame) {
        case enums.enumStateOfGame.waitingForStart:
            if (this.handler.pressedKey[this.handler.pressedKey.length - 1] == enums.enumPressedKey.keySpace) {
                this.handler.pressedKey.push(enums.enumPressedKey.keyRight);
                this.model.stateOfGame = enums.enumStateOfGame.start;
            }
            break;
        case enums.enumStateOfGame.pause:
            if (this.handler.pressedKey[this.handler.pressedKey.length - 1] == enums.enumPressedKey.keySpace) {
                this.handler.pressedKey.push(this.lastPressedKey);
                this.model.stateOfGame = enums.enumStateOfGame.unPause;
            }
            break;
        case enums.enumStateOfGame.unPause:
            if (this.handler.pressedKey[this.handler.pressedKey.length - 1] == enums.enumPressedKey.keySpace) {
                this.model.stateOfGame = enums.enumStateOfGame.start;
                this.handler.pressedKey.push(this.lastPressedKey);
                this.tryEatApple();
                this.changePositionOfPieces();
                this.changeDirectionOfFirstPiece();
                this.checkStrikeSnakeYourself();
            }
            break;
        case enums.enumStateOfGame.start:
            if (this.handler.pressedKey[this.handler.pressedKey.length - 1] == enums.enumPressedKey.keySpace) {
                this.model.stateOfGame = enums.enumStateOfGame.pause;
            } else {
                this.lastPressedKey = this.handler.pressedKey[this.handler.pressedKey.length - 1];
                this.tryEatApple();
                this.changePositionOfPieces();
                this.changeDirectionOfFirstPiece();
                this.checkStrikeSnakeYourself();
            }
            break;
        case enums.enumStateOfGame.finish:
            if (this.handler.pressedKey[this.handler.pressedKey.length - 1] == enums.enumPressedKey.keySpace) {
                this.handler.pressedKey.push(enums.enumPressedKey.keyRight);
                this.model.stateOfGame = enums.enumStateOfGame.waitingForStart;
                this.getStartPosition();
            }
            break;
        case enums.enumStateOfGame.win:
            if (this.handler.pressedKey[this.handler.pressedKey.length - 1] == enums.enumPressedKey.keySpace) {
                this.handler.pressedKey.push(enums.enumPressedKey.keyRight);
                this.model.stateOfGame = enums.enumStateOfGame.waitingForStart;
                this.getStartPosition();
            }
            break;
    }
}

Business.prototype.start = function() {
    this.setSpeed();
    this.createNewApple();
    this.timer = new Timer(this.changeElementsOfModel.bind(this), this.speed);
}

Business.prototype.checkStrikeSnakeYourself = function() {
    for (var i = 1; i < this.model.snake.pieces.length; i++) {
        if (this.model.snake.pieces[0].posX == this.model.snake.pieces[i].posX && this.model.snake.pieces[0].posY == this.model.snake.pieces[i].posY) {
            this.model.stateOfGame = enums.enumStateOfGame.finish;
        }
    }
}

Business.prototype.setSpeed = function() {
    switch (this.speed) {
        case 1:
            this.speed = 500;
            break;
        case 2:
            this.speed = 400;
            break;
        case 3:
            this.speed = 300;
            break;
        case 4:
            this.speed = 200;
            break;
        case 5:
            this.speed = 150;
            break;
    }
}

Business.prototype.changeOfSpeed = function() {
    if (this.speed > 100) {
        var x = this.speed * 2 / 100;
        this.speed = this.speed - x;
    }
}

Business.prototype.changeOfInterval = function() {
    this.timer.setInterval(this.speed);
}