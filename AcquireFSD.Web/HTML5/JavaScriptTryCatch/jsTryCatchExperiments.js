function SayMeHello() {
    alert("Hello my Lord!")
    expFunct01();
    expFunct03();
}

function expFunct01() {
    try {
        console.log("Hello from expFunct01");
        expFunct02();
    }
    catch (err) {
        console.log(err.message);
    }
}

function expFunct02() {
    debugger;
    console.log("Hello from expFunct02");

    var x = y / z; // exception occures
}

function expFunct03() {
    console.log();
    console.log("Hello from expFunct03");
}

