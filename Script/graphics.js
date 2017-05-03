function Graphics(model) {
    this.speedOfInterval = 100;
    this.countOfPieces = 1;
    this.stepPX = 20;
    this.model = model;
}

Graphics.prototype.drawField = function() {
    $(".block-field").prepend("<div></div>");
    $(".block-field div").eq(0).addClass("field")
        .css({
            width: this.model.field.width * this.stepPX,
            height: this.model.field.height * this.stepPX,
            "background-color": this.model.field.color
        });
}

Graphics.prototype.drawPiece = function() {
    $(".field").prepend("<div></div>");
    $(".field div").eq(0).addClass("piece")
        .css({
            width: this.stepPX,
            height: this.stepPX,
            "background-color": this.model.snake.color
        });
}

Graphics.prototype.drawApple = function() {
    $(".field").prepend("<div></div>");
    $(".field div").eq(0).addClass("apple")
        .css({
            width: this.stepPX,
            height: this.stepPX,
            left: this.model.apple.posX * this.stepPX,
            top: this.model.apple.posY * this.stepPX,
            "background-color": this.model.apple.color,
        });
}

Graphics.prototype.updateApple = function() {
    $(".apple").css({
        left: this.model.apple.posX * this.stepPX,
        top: this.model.apple.posY * this.stepPX,
        "background-color": this.model.apple.color,
    });
}

Graphics.prototype.addPieceSnake = function() {
    if (this.model.snake.pieces.length != this.countOfPieces) {
        $(".piece:last").after("<div class='piece'></div>");
        $(".piece:last")
            .css({
                width: this.stepPX,
                height: this.stepPX,
            });
        this.countOfPieces = this.model.snake.pieces.length;
    }
}

Graphics.prototype.uptadeSnake = function() {
    for (var i = 0; i < this.model.snake.pieces.length; i++) {
        $(".piece").eq(i).css({
            left: this.model.snake.pieces[i].posX * this.stepPX,
            top: this.model.snake.pieces[i].posY * this.stepPX,
        });
    }
}

Graphics.prototype.start = function() {
    this.addBlockStart();
    this.drawField();
    this.drawPiece();
    this.drawApple();

    setInterval(this.updateGraphics.bind(this), this.speedOfInterval);
}

Graphics.prototype.updateGraphics = function() {
    if (this.model.stateOfGame == enums.enumStateOfGame.waitingForStart) {
        $(".field").remove();
        this.drawField();
        this.drawPiece();
        this.drawApple();
        this.countOfPieces = this.model.snake.pieces.length;
    } else if (this.model.stateOfGame == enums.enumStateOfGame.start) {
        this.updateApple();
        this.addPieceSnake();
        this.uptadeSnake();
        this.flashOfSnake();
    }
    this.isPause();
}

Graphics.prototype.addBlockStart = function() {
    $(".block-field").prepend("<div></div>")
        .find(':first-child').addClass("block-state-game");
    $(".block-state-game").prepend("<p>Start</p>")
        .find(':first-child').addClass("state-game-value")
        .after("<p class='state-game-title'>click on space</p>");
}

Graphics.prototype.isPause = function() {
    switch (this.model.stateOfGame) {
        case enums.enumStateOfGame.waitingForStart:
            $(".block-state-game").show().find(':first-child').text(enums.enumStateOfGame.start);
            $(".block-state-game").css("opacity", "1");
            break;
        case enums.enumStateOfGame.start:
            $(".block-state-game").hide();
            break;
        case enums.enumStateOfGame.pause:
            $(".block-state-game").show().find(':first-child').text(enums.enumStateOfGame.pause);
            $(".block-state-game").css("opacity", ".5");
            break;
        case enums.enumStateOfGame.finish:
            $(".block-state-game").show().find(':first-child').text(enums.enumStateOfGame.finish);
            $(".block-state-game").css("opacity", "1");
            break;
        case enums.enumStateOfGame.win:
            $(".block-state-game").show().find(':first-child').text(enums.enumStateOfGame.win);
            $(".block-state-game").css("opacity", "1");
    }
}

Graphics.prototype.flashOfSnake = function() {
    if (this.model.snake.pieces[0].posX == this.model.apple.posX && this.model.snake.pieces[0].posY == this.model.apple.posY) {
        $(".piece").css({
            "background-color": "rgb(167, 255, 10)"
        });
    } else {
        $(".piece").css({
            "background-color": this.model.snake.color
        });
    }
}