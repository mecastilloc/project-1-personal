//initial firebase app data
var config = {
    apiKey: "AIzaSyAR4AE4vZ8gZqP46m9Wj1ZOND4d8TaZ4Iw",
    authDomain: "project-1-boot-camp.firebaseapp.com",
    databaseURL: "https://project-1-boot-camp.firebaseio.com",
    projectId: "project-1-boot-camp",
    storageBucket: "project-1-boot-camp.appspot.com",
    messagingSenderId: "523831754951"
};

//initialize firebase app
firebase.initializeApp(config);
//firebase var
var firedB = firebase.database();

var key = "55c220cb58mshee0f3639dbd0c90p1bb460jsn121fe9054ac1";
var keyFun = "test";
var yodaArr = ["yoda", "Jedi", "Dagobah", "The_Force", "Object–subject–verb"];
var sithArr = ["Darth_Maul","Darth_Vader","Darth Maul: Shadow Hunter","Palpatine"];
var klingonArr = ["klingon","Kahless", "The_Klingon_Dictionary"];
var pirateArr = ["Privateer","Commerce_raiding","Ahoy_(greeting)"];
var minionArr = ["Minions_(Despicable_Me)", "Minions_Paradise", "Minions_(film)", "Eruption_(instrumental)"];
var gunganArr = ["Jar_Jar_Binks", "Star_Wars:_Episode_I_–_The_Phantom_Menace", "Jar_Jar_Binks_Must_Die" , "Naboo"];
var ferbArr = ["Ferb_Fletcher", "Phineas_and_Ferb", "Phineas_Flynn", "Perry_the_Platypus"];
var morseArr = ["Morse_code", "Samuel_Morse", "Character_encoding", "Telegraphy", "SOS"];

//Generte translation stats for Stats modal
$("#statsbtn").click(function (event) {
    event.preventDefault();
    //get counts data
    firedB.ref("/counters").on("value", function (snapshot) {
        var yodaStats = snapshot.val().yoda;
        var sithStats = snapshot.val().sith;
        var klingonStats = snapshot.val().klingon;
        var pirateStats = snapshot.val().pirate;
        var minionStats = snapshot.val().minion;
        var gunganStats = snapshot.val().gungan;
        var ferbStats = snapshot.val().ferb;
        var morseStats = snapshot.val().morse;
        $("#yodastats").text(yodaStats + " Traslations");
        $("#sithstats").text(sithStats + " Traslations");
        $("#klingonstats").text(klingonStats + " Traslations");
        $("#piratestats").text(pirateStats + " Traslations");
        $("#minionstats").text(minionStats + " Traslations");
        $("#gunganstats").text(gunganStats + " Traslations");
        $("#ferbstats").text(ferbStats + " Traslations");
        $("#morsestats").text(morseStats + " Traslations");
    }, function (errorObject) {
        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    });
});

$("#newbtn").click(function (event) {
    event.preventDefault();
    $("#error").empty();
    $("#trans-text").val("");
    $("html").css({ "background-color": "black", "background-image": "url(assets/images/fiction.jpg)" });
    $(".jumbotron").show();
    $("#original-h1").empty();
    $("#original-h3").empty();
    $("#trans-h1").empty();
    $("#trans-h3").empty();
    $("#fact-h1").empty();
    $("#fact-h3").empty();
});

$("#yodabtn").click(function (event) {
    event.preventDefault();
    yodaCall();
});

$("#sithbtn").click(function (event) {
    event.preventDefault();
    sithCall();
});

$("#klinbtn").click(function (event) {
    event.preventDefault();
    klingonCall();
});

$("#piratebtn").click(function (event) {
    event.preventDefault();
    pirateCall();
});


$("#minionbtn").click(function (event) {
    event.preventDefault();
    minionCall();
});

$("#gunganbtn").click(function (event) {
    event.preventDefault();
    gunganCall();
});


$("#ferbbtn").click(function (event) {
    event.preventDefault();
    ferbCall();
});

$("#morsebtn").click(function (event) {
    event.preventDefault();
    morseCall();
});

//app  code's functions
function renderTranslation(result) {
    $("#original-h1").text("Your text was:");
    $("#original-h3").text(result.contents.text);
    $("#trans-h1").text('In "' + result.contents.translation + '" You would say:');
    $("#trans-h3").text(result.contents.translated);
}

function facts(frase) {
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + frase + "&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var markup = data.parse.text["*"];
            //$("#response").text(JSON.stringify(data))
            var blurb = $('<div></div>').html(markup);
            // remove links as they will not work
            blurb.find('a').each(function () { $(this).replaceWith($(this).html()); });
            // remove any references
            blurb.find('sup').remove();
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $("#fact-h1").text("Some Facts:");
            $('#fact-h3').html($(blurb).find('p'));
        },

        error: function (errorMessage) {
        }
    });
    ///back to top
    setTimeout(function () {
        $("html, body").animate({ scrollTop: 0 }, '10');
    }, 1000);
}

function eraseIndex() {
    $('#translationModal').modal('toggle');
    $("#jumbotron").hide();
    return;
}

function yodaCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // Yoda translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/yodabg.jpg)" });
        $.ajax({
            url: "https://yodish.p.rapidapi.com/yoda.json?text=" + newInput,
            method: 'POST',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': key,
                'header1': 'header-value-1'
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
             //generate random to retrieve wiki frase
            var x = Math.floor((Math.random() * yodaArr.length));
            console.log(x);
            var frase = yodaArr[x];
            console.log("wiki Frase: " + frase);
            //wikipwdia
            facts(frase);
            // Increment firebase yoda counter by 1.
            var count = firedB.ref('counters/yoda');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        });
    }
}

function sithCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // siith translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/sithbg.jpg)" });
        $.ajax({
            url: "https://sith.p.rapidapi.com/sith.json?text=" + newInput,
            method: 'GET',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': key,
                'header1': 'header-value-1'
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
             //generate random to retrieve wiki frase
             var x = Math.floor((Math.random() * sithArr.length));
             console.log(x);
             var frase = sithArr[x];
             console.log("wiki Frase: " + frase);
             //wikipwdia
             facts(frase);
            // Increment firebase sith counter by 1.
            var count = firedB.ref('counters/sith');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        });
    }
}

function klingonCall() {

    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // kinglon translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/klingonbg.jpg)" });
        $.ajax({
            url: "https://klingon.p.rapidapi.com/klingon?text=" + newInput,
            method: 'GET',
            headers: {
                "X-RapidAPI-Host": "klingon.p.rapidapi.com",
                'X-RapidAPI-Key': key,
                "X-FunTranslations-Api-Secret": keyFun,
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
             //generate random to retrieve wiki frase
             var x = Math.floor((Math.random() * klingonArr.length));
             console.log(x);
             var frase = klingonArr[x];
             console.log("wiki Frase: " + frase);
             //wikipwdia
             facts(frase);
            // Increment firebase klingon counter by 1.
            var count = firedB.ref('counters/klingon');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        }).catch(err => {
            $("#error").text(err.responseJSON.error.message + " Or try another language");
        });
    }
}

function pirateCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // Pirate translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/piratebg.jpg)" });
        $.ajax({
            url: "https://rapidapi.p.rapidapi.com/pirate.json?text=" + newInput,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-RapidAPI-Host": "piratespeak.p.rapidapi.com",
                'X-RapidAPI-Key': key,
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
             //generate random to retrieve wiki frase
             var x = Math.floor((Math.random() * pirateArr.length));
             console.log(x);
             var frase = pirateArr[x];
             console.log("wiki Frase: " + frase);
             //wikipwdia
             facts(frase);
            // Increment firebase pirate counter by 1.
            var count = firedB.ref('counters/pirate');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        });
    }
}

function minionCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // Minion translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/minionbg.jpg)" });
        $.ajax({
            url: "https://rapidapi.p.rapidapi.com/minion.json?text=" + newInput,
            method: 'POST',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-RapidAPI-Host": "minion.https://rapidapi.p.rapidapi.com",
                'X-RapidAPI-Key': key,
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
             //generate random to retrieve wiki frase
             var x = Math.floor((Math.random() * minionArr.length));
             console.log(x);
             var frase = minionArr[x];
             console.log("wiki Frase: " + frase);
             //wikipwdia
             facts(frase);
            // Increment firebase minion counter by 1.
            var count = firedB.ref('counters/minion');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        });
    }
}


function gunganCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // Gungan translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/gunganbg.jpg)" });
        $.ajax({
            url: "https://gungan.p.rapidapi.com/gungan.json?text=" + newInput,
            method: 'GET',
            headers: {
                "X-RapidAPI-Host": "gungan.p.rapidapi.com",
                'X-RapidAPI-Key': key,
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
            //generate random to retrieve wiki frase
            var x = Math.floor((Math.random() * gunganArr.length));
            console.log(x);
            var frase = gunganArr[x];
            console.log("wiki Frase: " + frase);
            //wikipwdia
            facts(frase);
            // Increment firebase gungan counter by 1.
            var count = firedB.ref('counters/gungan');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        });
    }
}


function ferbCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // FerbLatin translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/ferbbg.jpg)" });
        $.ajax({
            url: "https://erblatin.p.rapidapi.com/ferblatin.json?text=" + newInput,
            method: 'GET',
            headers: {
                "X-RapidAPI-Host": "ferblatin.p.rapidapi.com",
                'X-RapidAPI-Key': key,
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
             //generate random to retrieve wiki frase
             var x = Math.floor((Math.random() * ferbArr.length));
             console.log(x);
             var frase = ferbArr[x];
             console.log("wiki Frase: " + frase);
             //wikipwdia
             facts(frase);
            // Increment firebase ferb counter by 1.
            var count = firedB.ref('counters/ferb');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        });
    }
}

function morseCall() {
    var newInput = $("#trans-text").val().trim();
    if (newInput == "") {
        $("#validation-text").text("Type something please");
        setTimeout(function () { $("#validation-text").empty() }, 2000);
    }
    else {
        eraseIndex();
        // Morse code translations
        $("html").css({ "background-color": "black", "background-image": "url(assets/images/morsebg.jpg)" });
        $.ajax({
            url: "https:///morse.p.rapidapi.com/morse.json?text=" + newInput,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-RapidAPI-Host": "morse.p.rapidapi.com",
                'X-RapidAPI-Key': key,
                "X-FunTranslations-Api-Secret": keyFun,
            },
        }).then(function (translation) {
            console.log(translation.contents);
            renderTranslation(translation);
             //generate random to retrieve wiki frase
             var x = Math.floor((Math.random() * morseArr.length));
             console.log(x);
             var frase = morseArr[0];
             console.log("wiki Frase: " + frase);
             //wikipwdia
             facts(frase);
            // Increment firebase morse counter by 1.
            var count = firedB.ref('counters/morse');
            count.transaction(function (currentCount) {
                return currentCount + 1;
            });
        }).catch(err => {
            $("#error").text(err.responseJSON.error.message + " Or try another language");
        });
    }
}