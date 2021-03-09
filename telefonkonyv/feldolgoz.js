$(function () {
    $("#beolvas").cick(function () {
        beolvas();
    });

    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adatKuld);
    $("article").delegate(".torol", "click", adatTorol);
    $("article").delegate(".szerkeszt", "click", adatSzerkeszt);
    $("#megse").delegate("click", adatMegse);
});

var telefonkonyvem = [];

function beolvas() {
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result) {
            telefonkonyvem = JSON.parse(result);
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betoltesekor!");
        }
    });
}

function kiir() {
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        let szemely = telefonkonyvem[i];
        let elem = "<div> <h2>" + szemely.nev + "</h2> <p cass='tel'>" + szemely.tel
                + "</p> <p class='ink'>" + szemely.kep + "</p> <button id=" + szemely.ID + " \n\
class='torol'>Töröl</button> <button id=" + i + " class='szerkeszt'>Szerkeszt</button>\n\
<hr></div> ";
        $("article").append(elem);
    }


//    var nev = $("#nev").val();
//    var tel = $("#tel").val();
//    var kep = $("#kep").val();

//var elem = "<div><h2>" + nev + "</h2><p>" + tel + "</p><p>" + kep + "</p><button>Torol</button></div>";

//$("article").append(elem);
}

function adatKuld() {
    var szemely = {
        nev: $("#nev").val(),
        tel: $("#tel").val(),
        kep: $("#kep").val()
    };

    $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        success: function (ujSzemely) {
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok mentesekor!");
        }
    });
}

function adatTorol() {
    console.log("Meghívtam a töröl metódust!");
    var ID = $(this).attr("id");
    console.log(ID);
    var aktElem = $(this).closest("div");
    $.ajax({
        type: "DELETE",
        url: "torles.php?ID=" + ID,
        success: function () {
            console.log("Megtörtént a törlés");
            aktElem.remove();
        },
        error: function () {
            alert("Hiba az adatok törlésekor!");
        }
    });
}

function adatMegse() {
    $(".szerkesztes").addClass("elrejt");
}

function adatSzerkeszt() {
    console.log("yo");
    $(".szerkesztes").removeClass("elrejt");
    var index = $(this).attr("id");
    console.log(index);

    $("#id2").val(telefonkonyvem[index].ID);
    $("#nev2").val(telefonkonyvem[index].nev);
    $("#tel2").val(telefonkonyvem[index].tel);
    $("#kep2").val(telefonkonyvem[index].kep);
}

function adatModosit(){
        var editSzemely = {
        nev: $("#id2").val(),
        nev: $("#nev2").val(),
        tel: $("#tel2").val(),
        kep: $("#kep2").val()
    };

    $.ajax({
        type: "PUT",
        url: "modosit.php",
        data: szemely,
        success: function () {

            beolvas();
        },
        error: function () {
            alert("Hiba az adatok modositásakor!");
        }
    });
    
}