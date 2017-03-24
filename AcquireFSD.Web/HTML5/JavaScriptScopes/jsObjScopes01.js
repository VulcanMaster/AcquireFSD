$(function () {
        console.log("!!! HEY MAN !!!");

        debugger;
        var youpaObj = window.youpaObj || {};

        youpaObj.ViewModels = youpaObj.ViewModels || {};
    
        youpaObj.ViewModels.SuperViewModel = function () {
            //console.log("!!! HEY SuperViewModel !!!");
            var xyp = 1,
            subWebUrl = "",

            doSomethingForMe03 = function () {
                console.log("!!! HEY doSomethingForMe03 !!!");
                console.log("subWebUrl: "+subWebUrl);
            };


            doSomethingForMe02 = function () {
                console.log("!!! HEY doSomethingForMe02 !!!");
                var webUrl = "google.com";
                subWebUrl = webUrl;
            };


            doSomethingForMe01 = function () {
                console.log("!!! HEY doSomethingForMe01 !!!");
                doSomethingForMe02();
                doSomethingForMe03();
            }(); // IMPORTANT!!! The brackets after function name lead to fire of doSomethingForMe01


        }(); // IMPORTANT!!! The brackets after function name lead to fire of SuperViewModel

});