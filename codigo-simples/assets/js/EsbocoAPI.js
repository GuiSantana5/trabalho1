function cacheTout() {
    $(".contenant").hide()
}

function montre(id) {
    for (i in id) {
        console.log($("#" + id[i]))
        $("#" + id[i]).each(
            function(idx) { $(this).show() }
        )
    }
}
var unitesPossibles = {
    temp: ["°C", "°F", "K"],
    vent: ["m/s", "km/h"],
    visib: ["m", "km"],
}
var unitesChoisies = {
    temp: 0,
    vent: 1,
    visib: 0,
}
var valeursCourantes = {
    temp: -42,
    vent: 100,
    visib: 8,
    nuage: "Partiellement nuageux"
}

function afficher() {
    if (unitesChoisies.temp == 0) {
        $("#temp").text((valeursCourantes.temp.toFixed(2) + unitesPossibles.temp[0]))
    } else if (unitesChoisies.temp == 1) {
        f = valeursCourantes.temp * 9 / 5 + 32
        $("#temp").text(f.toFixed(2) + unitesPossibles.temp[1])
    } else if (unitesChoisies.temp == 2) {
        k = valeursCourantes.temp + 273.15
        $("#temp").text(k.toFixed(2) + unitesPossibles.temp[2])
    }
    if (unitesChoisies.vent == 0) {
        $("#vent").find(".contenu").text(valeursCourantes.vent.toFixed(2))
        $("#vent").find(".unite").text(unitesPossibles.vent[0])
    } else if (unitesChoisies.vent == 1) {
        ms = valeursCourantes.vent * 3.6
        $("#vent").find(".contenu").text(ms.toFixed(2))
        $("#vent").find(".unite").text(unitesPossibles.vent[1])
    }
    if (unitesChoisies.visib == 0) {
        $("#visib").find(".contenu").text(valeursCourantes.visib.toFixed())
        $("#visib").find(".unite").text(unitesPossibles.visib[0])
    } else if (unitesChoisies.visib == 1) {
        m = valeursCourantes.visib / 10000
        $("#visib").find(".contenu").text(m)
        $("#visib").find(".unite").text(unitesPossibles.visib[1])
    }
    $("#nuage").find(".contenu").text(valeursCourantes.nuage)
}

function litDonnees(callback) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: {
            q: "Limeira,BR",
            appid: "22e21ef649526ef2b1be4db6d2b0857d",
            units: "metric",
            lang: "pt"
        },
        dataType: "json",
        type: "GET",
        error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown + " : " + textStatus); },
        success: function(xmlDocument) {
            valeursCourantes.temp = xmlDocument.main.temp
            valeursCourantes.visib = xmlDocument.visibility
            valeursCourantes.vent = xmlDocument.wind.speed
            valeursCourantes.nuage = xmlDocument.weather[0].description
            callback()
            console.log(xmlDocument)
            console.log(xmlDocument.weather[0].description)
            console.log(valeursCourantes.nuage)
        },
    });
}

function litConfig() {
    $.ajax({
        url: "/config",
        dataType: "json",
        type: "GET",
        error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown + " : " + textStatus); },
        success: function(pref) {
            var mont = ["lune", "soleil", "jour"]
            cacheTout()
            for (var i in pref) {
                if (pref[i].state == 1) {
                    mont.push(i)
                } else if (pref[i].status == 1) {
                    mont.push("nuage")
                    if (pref[i].visib.state == 1) {
                        mont.push("visib")
                    }
                }
            }
            console.log(mont)
            montre(mont)
            unitesChoisies.vent = pref.vent.unite
            unitesChoisies.temp = pref.temp.unite
            unitesChoisies.visib = pref.nuage.visib.unite
            litDonnees(afficher)
        }
    })
}

function changeUniteTemp() {
    var unit = parseInt($("[name=Temp]:checked").attr("id"))
    $.ajax({
        url: "/setTemp",
        data: {
            unite: unit
        },
        dataType: "json/application",
        type: "POST",
        error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown + " : " + textStatus); },
        success: function(xmlDocument) {
            alert("changed")
        },
    });
}

function changeUniteVit() {
    var unit = parseInt($("[name=Vitesse]:checked").attr("id"))
    $.ajax({
        url: "/setVit",
        data: {
            unite: unit
        },
        dataType: "json/application",
        type: "POST",
        error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown + " : " + textStatus); },
        success: function(xmlDocument) {
            alert("changed")
        },
    });
}

function changeUniteVisib() {
    var unit = parseInt($("[name=Visib]:checked").attr("id"))
    $.ajax({
        url: "/setVisib",
        data: {
            unite: unit
        },
        dataType: "json/application",
        type: "POST",
        error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown + " : " + textStatus); },
        success: function(xmlDocument) {
            alert("changed")
        },
    });
}

function changeAffiche() {
    var temp = $("#temp[name=Choice]:checked").length
    var vent = $("#vent[name=Choice]:checked").length
    var visib = $("#visib[name=Choice]:checked").length
    console.log(temp)
    console.log(vent)
    console.log(visib)
    $.ajax({
        url: "/setChoice",
        data: {
            tem: temp,
            ven: vent,
            visi: visib
        },
        dataType: "json/application",
        type: "POST",
        error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown + " : " + textStatus); },
        success: function(xmlDocument) {
            alert("changed")
        },
    });
}