function readNews()
{
    const http = new XMLHttpRequest();
    const url = "https://mgruppi.github.io/news/news.json";
    http.open("GET", url);
    http.send();

    http.onreadystatechange=(e)=>{
        console.log(http.responseText);
    }
}