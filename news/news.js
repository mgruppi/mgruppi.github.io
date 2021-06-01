function displayNews(data)
{
    for (d in data)
    {
        console.log(data[d]);
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

