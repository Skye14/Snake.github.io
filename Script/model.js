function BaseModel() {
    this.speed = 3;
    this.stateOfGame = enums.enumStateOfGame.waitingForStart;

    this.field = {
        width: 35,
        height: 25,
        color: "rgb(25, 25, 25)"
    };

    this.snake = {
        color: "rgb(37, 230, 37)",
        pieces: [{
            posX: 0,
            posY: 0,
        }],
    };

    this.apple = {
        enumColor: ["rgb(255, 42, 0)", "rgb(171, 28, 171)", "rgb(7, 222, 204)", "rgb(211, 222, 7)", "rgb(27, 27, 201)"],
    }
}