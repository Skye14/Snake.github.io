window.onload = function() {
    var baseModel = new BaseModel();
    var handler = new EventHandler();
    var graphics = new Graphics(baseModel);
    var business = new Business(baseModel, handler);

    handler.start();
    business.start();
    graphics.start();

    business.addWatcherToListScore(changeOfScore);
}