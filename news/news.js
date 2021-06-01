function displayNews(data)
{
    console.log(data);
}

function readNews()
{
    const http = new XMLHttpRequest();
    const url = "https://mgruppi.github.io/news/news.json";
    http.open("GET", url);
    http.send();

    http.onreadystatechange=(e)=>{
        var d = JSON.parse(http.responseText);
        console.log(d);
    }
}

