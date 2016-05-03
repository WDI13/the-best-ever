var person;
var board;

var pad2 = function(number) {
    return (number < 10 ? '0' : '') + number;
};

personControls = {

    new: function(name) {
        person = {
                name: name,
                row: 26,
                column: 9,
                angle: 1
        };
        this.place(person);
    },

    place: function(person) {
        $('.person').remove();
        var $personImg = $('<img src="person.png"></img>');
        $personImg.addClass('person');
        $('#cell' + pad2(person.row) + pad2(person.column)).append($personImg);
        switch (person.angle) {
            case 1:
                $('.person').addClass('north');
                break;
            case 2:
                $('.person').addClass('east');
                break;
            case 3:
                $('.person').addClass('south');
                break;
            case 4:
                $('.person').addClass('west');
                break;
        }
        $(window).scrollTop(  $('.person').offset().top - $(window).height()/2  );
    },

    left: function(person) {
        if (person.angle === 1) {
            person.angle = 4;
        } else {
            person.angle -= 1;
        }
        this.place(person);
    },

    right: function(person) {
        if (person.angle === 4) {
            person.angle = 1;
        } else {
            person.angle += 1;
        }
        this.place(person);
    },

    forward: function(person) {
        if (person.angle === 1) {
            person.row -= 1;
        } else if (person.angle === 2) {
            person.column += 1;
        } else if (person.angle === 3) {
            person.row += 1;
        } else if (person.angle === 4) {
            person.column -= 1;
        }
        this.place(person);
    },

    reset: function(){
        $('.person').remove();
    }


};

var board = {

    make: function(rowNum, columnNum, rowStart, columnStart, element) {
        // board = {row: row, column: column};
        for (var i = rowStart; i < (rowStart + rowNum); i++) {
            for (var j = columnStart; j < (columnStart + columnNum); j++) {
                  var $cell = $('<div class="cell"></div>');
                  $cell.addClass('row' + pad2(i)).addClass('column' + pad2(j)).attr('id','cell' + pad2(i) + pad2(j) );
                  $(element).append($cell);
            }
            $(element).append('<br>');
        }

    },

    reset: function() {


    }

};

$(function() {
    board.make(3,17,1,1,'#top-walk');
    board.make(21,5,4,1,'#left-walk');
    board.make(21,5,4,13,'#right-walk');
    board.make(3,17,25,1,'#bottom-walk');
    personControls.new('Wolf');
    $('body').keydown(function(e){
        if(e.keyCode == 37){
            e.preventDefault();
            personControls.left(person);
        }
        if(e.keyCode == 39){
            e.preventDefault();
            personControls.right(person);
        }
        if(e.keyCode == 38){
            e.preventDefault();
            personControls.forward(person);
        }
    });

    setTimeout($('body').animate({scrollTop:$(document).height()}, 4000), 2000);
});
