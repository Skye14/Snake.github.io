Business.prototype.addWatcherToListScore = function(changeOfScore) {
    this.watchers_score.push(changeOfScore);
}

Business.prototype.invokeOfWatcherScore = function(countOfPiece) {
    for (var i = 0; i < this.watchers_score.length; i++) {
        this.watchers_score[i](countOfPiece);
    }
}