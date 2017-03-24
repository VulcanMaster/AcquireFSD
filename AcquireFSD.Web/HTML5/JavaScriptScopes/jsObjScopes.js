$(function () {
        console.log("!!! HEY MAN !!!");

        var youpaObj = window.youpaObj || {};

        youpaObj.ViewModels = youpaObj.ViewModels || {};
    
        youpaObj.ViewModels.SuperViewModel = function () {
            var subWebUrl = "",
                x = 1;

            console.log("!!! HEY BABE !!!");
            if (true) {
                youpaObj.ViewModels.Sweet();
        }

        youpaObj.ViewModels.Sweet = function () {
            console.log("Sweet!");
        };
    }();



});