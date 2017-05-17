var post = $.ajax({
    url: "/echo/json/",
    data: { json: JSON.stringify({ firstName: "Jose", lastName: "Romaniello" }) },
    type: "POST"
});

post.done(function (p) {
    alert(p.firstName + " saved.");
});

post.fail(function () {
    alert("error!");
});

//-------------------------------------------
// very simple
$.ajax({
    url: "/echo/json/",
    data: { json: JSON.stringify({ firstName: "Jose", lastName: "Romaniello" }) },
    type: "POST",
    success: function (person) {
        alert(person.firstName + " saved.");
    },
    error: function () {
        alert("error!");
    }
});