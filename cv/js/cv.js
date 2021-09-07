
function make_header(data)
{
    document.getElementById("fullname").innerHTML = data["fullname"];
    document.getElementById("address").innerHTML = data["address"]["city"] + ", " + data["address"]["state"];
    document.getElementById("email").innerHTML = data["contact"]["email"];
    document.getElementById("phone").innerHTML = data["contact"]["phone_number"];
}


function make_section(sec_data, sec_div)
{
    // Loads the section data into the given section div
    var h = document.createElement("h");
    h.classList.add("h3");
    h.innerHTML = sec_data["name"];

    var dl = document.createElement("dl");
    dl.classList.add("row");

    for (var i=0; i < sec_data["items"].length; ++i)
    {
        var dt = document.createElement("dt");
        dt.classList.add("col-sm-3");
        var desc_str = sec_data["items"][i]["name"];
        desc_str += "<br/>" + sec_data["items"][i]["start"] + " - " + sec_data["items"][i]["end"];
        dt.innerHTML = desc_str;

        var dd = document.createElement("dd");
        dd.classList.add("col-sm-9");

        if ("description" in sec_data["items"][i]){
            dd.innerHTML = sec_data["items"][i]["description"];
        }

        dl.appendChild(dt);
        dl.appendChild(dd);
    }
    sec_div.append(h);
    sec_div.appendChild(dl);

    return sec_div;
}

function make_all_sections(data)
{
    var content = document.getElementById("main-content");

    for(sec in data["sections"])
    {
        if(data["sections"][sec]["items"].length == 0)
        {
            return;
        }
        var sec_div = document.createElement("div");
        sec_div.classList.add("cv-section");
        sec_div.id = sec;
        make_section(data["sections"][sec], sec_div);
        content.appendChild(sec_div);
    }
}

function handle_cv(data){
    make_header(data);
    make_all_sections(data);
}

$(document).ready(function(){
    $.ajax({
        url: "https://mgruppi.github.io/cv/cv.json"
    }).done(function(response){
        handle_cv(response);
    });
});