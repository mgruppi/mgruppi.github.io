function makeNewsItem(data)
{
    // Creates an entry to the news feed.
    var li = document.createElement("li");
    // Create date
    if ("date" in data){
        var date = document.createElement("p");
        date.classList.add("date");
        date.innerHTML = data["date"];

        li.appendChild(date);
    }

    // Add text
    if ("text" in data){
        var text = document.createElement("p");
        text.classList.add("news");
        text.innerHTML = data["text"];
        li.appendChild(text);
    }

    // Add links
    if ("links" in data){
        var links = document.createElement("ul");
        links.classList.add("list-group");
        links.classList.add("list-group-horizontal");
        links.classList.add("border-0");
        links.classList.add("news-links");

        for (l in data["links"])
        {
            var li_link = document.createElement("li");
            li_link.classList.add("list-group-item");
            li_link.classList.add("bg-dark");
            li_link.classList.add("py-0");
            li_link.classList.add("px-1");
            li_link.classList.add("border-0");

            var a = document.createElement("a");
            a.href = data["links"][l];
            a.innerHTML = l;
            a.classList.add("btn");
            a.classList.add("btn-sm");
            a.classList.add("btn-primary");
            a.target = "_blank";
            li_link.appendChild(a);
            links.appendChild(li_link);
        }

        li.appendChild(links);
    }

    li.classList.add("list-group-item");
    li.classList.add("bg-dark");

    return li;
}

function displayNews(data)
{
    // Given a JSON list of articles, display them at the desired location.
    var ul = document.getElementById("news-list");
    for (d in data)
    {
        li = makeNewsItem(data[d]);
        ul.appendChild(li);
    }
}

function readNews()
{
    const http = new XMLHttpRequest();
    const url = "https://mgruppi.github.io/news/news.json";
    http.responseType = "json";
    http.open("GET", url);
    http.send();

    http.onreadystatechange=(e)=>{
        var r = http.response;
        displayNews(r);
    };
}

