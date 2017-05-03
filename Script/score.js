function changeOfScore(arg) {
    var score = arg - 1;
    $(".score-value").animate({ "opacity": "0" }, {
        duration: 200,
        complete: function() {
            $(".score-value").text(score).animate({ "opacity": "1" });
        }
    });
}