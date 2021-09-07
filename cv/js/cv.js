
function make_header(data)
{
    document.getElementById("fullname").innerHTML = data["fullname"];
    document.getElementById("address").innerHTML = data["address"]["city"] + ", " + data["address"]["state"];
    document.getElementById("email").innerHTML = data["contact"]["email"];
    document.getElementById("phone").innerHTML = data["contact"]["phone_number"];
    document.getElementById("website").innerHTML = data["contact"]["website"];
}


function make_section(sec_data, sec_div)
{
    // Loads the section data into the given section div
    var h = document.createElement("h");
    h.classList.add("h3");
    h.classList.add("section-title");
    h.innerHTML = sec_data["name"];

    var dl = document.createElement("dl");
    dl.classList.add("row");

    for (var i=0; i < sec_data["items"].length; ++i)
    {
        var dt = document.createElement("dt");
        dt.classList.add("col-sm-3");

        if("start" in sec_data["items"][i])
        {
            var p = document.createElement("p");
            p.classList.add("item-years");
            p.innerHTML = sec_data["items"][i]["start"];

            if ("end" in sec_data["items"][i])
            {
                p.innerHTML += " - " + sec_data["items"][i]["end"];
            }
            dt.appendChild(p);
        }

        if("name" in sec_data["items"][i])
        {
            var p = document.createElement("p");
            p.classList.add("item-name");
            p.innerHTML = sec_data["items"][i]["name"];

            dt.appendChild(p);
        }

        var dd = document.createElement("dd");
        dd.classList.add("col-sm-9");



        if ("school" in sec_data["items"][i])
        {
            var div_academic = document.createElement("div");
            div_academic.classList.add(...["d-flex", "flex-column", "description-top"]);

            var div_school = document.createElement("div");
            div_school.classList.add(...["d-flex", "flex-row", "description-field"]);

            var p = document.createElement("p");
            p.classList.add("item-school");
            p.innerHTML = sec_data["items"][i]["school"];
            div_school.appendChild(p);

            if ("country" in sec_data["items"][i])
            {
                var p = document.createElement("p");
                p.classList.add("item-country");
                p.innerHTML = sec_data["items"][i]["country"];
                div_school.appendChild(p);
            }

            div_academic.appendChild(div_school);

            if ("advisor" in sec_data["items"][i])
            {
                var div_advisor = document.createElement("div");
                div_advisor.classList.add(...["d-flex", "flex-row", "description-field"]);

                var p = document.createElement("p");
                p.classList.add("item-header");
                p.innerHTML = "Advisor";
                div_advisor.appendChild(p);

                var p = document.createElement("p");
                p.classList.add("item-advisor");
                p.innerHTML = sec_data["items"][i]["advisor"];
                div_advisor.appendChild(p);

                div_academic.appendChild(div_advisor);
            }

            if ("research_topics" in sec_data["items"][i])
            {
                var div_research = document.createElement("div");
                div_research.classList.add(...["d-flex", "flex-row"]);

                var p = document.createElement("p");
                p.classList.add("item-header");
                p.innerHTML = "Research Topics";
                div_research.appendChild(p);

                var p = document.createElement("p");
                p.classList.add("item-research-topics");
                p.innerHTML = sec_data["items"][i]["research_topics"];
                div_research.appendChild(p);

                div_academic.appendChild(div_research);
            }

                dd.appendChild(div_academic);
            }


            if ("description" in sec_data["items"][i]){
                var p = document.createElement("p");
                p.classList.add("item-description");
                p.innerHTML = sec_data["items"][i]["description"];

                dd.appendChild(p);
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