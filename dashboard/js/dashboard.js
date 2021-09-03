
 // This dictionary holds the chart objects plotted in this function
var charts = {};
var chart_inspect = 0;
var border_colors = ["rgb(0, 255, 0)", "rgb(255, 0, 0)", "rgb(0, 0, 255)"];  // Stores colors for multiple series
var fill_colors = ["rgba(0, 255, 0, 0.2)", "rgb(255, 0, 0, 0.2)", "rgb(0, 0, 255, 0.2)"];

function draw_chart_inspect(elem, chart)
{
    var ctx = document.getElementById(elem).getContext("2d");
    if (chart_inspect != 0)
    {
        chart_inspect.destroy();
    }

    var c_data = chart.data;
    for (var i = 0; i < c_data.datasets.length; ++i)
    {
        c_data.datasets[i]["pointHoverRadius"] = 4;
        c_data.datasets[i]["pointHoverBackgroundColor"] = c_data.datasets[i]["borderColor"];
    }

    chart_inspect = new Chart(ctx, {
        type: chart.chart.config.type,
        data: c_data,
        options: {
            responsive: true,
            scales: {
                    yAxes: [{
                        gridLines: {
                         display: true
                        },
                        ticks: {
                            beginAtZero: true
                        },
                        display: true
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        display: true
                    }]
            },
            tooltips: {
                    mode: 'index',
                    intersect: false,
                    },
                    hover: {
                        mode: 'index',
                        intersect: false
            },
        }
    });
}

// ======= Chart.js functions
function draw_chart_js(elem, x, y, labels=[])
{
    // var ctx = document.getElementById(elem).getContext("2d");
    var ctx = elem.getContext("2d");

    // Construct series from input data
    var series = [];
    var j = 0;
    for (j = 0; j < y.length; ++j)
    {
        var tmp_series = {};
        tmp_series["data"] = [];
        tmp_series["label"] = labels[j];
        tmp_series["backgroundColor"] = fill_colors[j];
        tmp_series["borderColor"] = border_colors[j];
        tmp_series["borderWidth"] = 1;
        tmp_series["pointRadius"] = 0;
        var i = 0;
        for (i = 0; i < x.length; ++i)
        {
            tmp_series["data"].push({x: x[i], y: y[j][i]});
        }
        series.push(tmp_series);
    }

    var newChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: series
        },
        options: {
            responsive: true,
            legend: false,
            scales: {
                yAxes: [{
                    gridLines: {
                     display: false
                    },
                    ticks: {
                        beginAtZero: true
                    },
                    display: false
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    display: false
                }]
        },
        tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
            },
        },
    });

    return newChart;
}


function openTab(event, target)
{
    var to_hide = document.getElementsByClassName("data-tab");
    var target_tab = document.getElementById(target);
    for (var i = 0; i < to_hide.length; ++i)
    {
        var tab = to_hide[i];
        tab.style.display = "none";  // Hide all other tabs
    }
    target_tab.style.display = "block";
}


function toggleDarkMode()
{
    var element = document.body;
    element.classList.toggle("bg-dark");
    element.classList.toggle("text-light");
    localStorage.setItem("darkMode", document.body.classList.contains("bg-dark"));

    var darkMode = element.classList.contains("bg-dark");

    tables = document.getElementsByTagName("table");
    for(var i = 0; i < tables.length; ++i)
    {
        if(darkMode){
            tables[i].classList.add("table-dark");
        }
        else{
            tables[i].classList.remove("table-dark");
        }
    }

    return darkMode;
}


function updateActivityChart(btnElem, chart, days)
{

}


// Toggle active links in sidebar
$(document).on("click", '.nav-link', function() {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
});

// Activity chart behavior
$(document).on("click", ".activity-chart", function() {
    var currentChart = charts[$(this).attr("id")];
    draw_chart_inspect("chart-inspect", currentChart);
});


function load_data(endpoint, params, callback=function(){})
{
    $.ajax({
        url: "http://192.168.1.104:5000/"+endpoint,
        data: params
    }).done(function(response){
        callback(response);
    });
}


function create_table(n_rows, n_cols, col_header=true, row_header=true)
{
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
//    if(col_header){
//        var tr = document.createElement("tr");
//        if(row_header){ //Create the row header for the header too
//            var th = document.createElement("th");
//            th.scope="col";
//            tr.appendChild(th);
//        }
//        for(var i = 0; i < n_cols; ++i)
//        {
//            var th = document.createElement("th");
//            th.scope="col";
//            tr.appendChild(th);
//        }
//        thead.appendChild(tr);
//    }
//
//    for(var i = 0; i < n_rows; ++i)
//    {
//        var tr = document.createElement("tr");
//        if(row_header)
//        {
//            var th = document.createElement("th");
//            th.scope="row";
//            tr.appendChild(th);
//        }
//        for(var j = 0; j < n_cols; ++j)
//        {
//            var td = document.createElement("td");
//            tr.appendChild(td);
//        }
//        tbody.appendChild(tr);
//    }

    if(col_header){
        var header_row = thead.insertRow(-1);
        if (row_header)
        {
            var th = document.createElement("th");
            th.scope="col";
            header_row.appendChild(th);
        }
        for (var i = 0; i < n_cols; ++i)
        {
            var th = document.createElement("th");
            th.scope="col";
            header_row.appendChild(th);
        }
    }

    for(var i = 0; i < n_rows; ++i)
    {
        var row = tbody.insertRow(-1);
        if(row_header){
            var th = document.createElement("th");
            th.scope="row";
            row.appendChild(th);
        }
        for(var j = 0; j < n_cols; ++j)
        {
            row.insertCell(-1);
        }
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

function make_nela_navtabs(data)
{
    var navlist = document.getElementById("navtab-workers");
    for(var worker in data["data"])
    {
        var li = document.createElement("li");
        li.classList.add("nav-item");
        li.classList.add("presentation");
        li.innerHTML = "<a href='#' class='nav-link nela-tab-link' data-bs-toggle='tab' data-bs-target='#tab-"+worker+"'aria-current='page' role='tab' >"+worker+"</a>";
        navlist.appendChild(li);
    }

    navlist.getElementsByTagName("a")[0].classList.add("active");
}


function make_nela_tables(data)
{
    var content = document.getElementById("content-nela");

    for(worker in data["data"])
    {
        var new_div = document.createElement("div");
        new_div.id = "tab-"+worker;
        new_div.classList.add(...["tab-pane", "fade"]);
        new_div.role = "tabpanel";

        var n_rows = data["data"][worker].length;
        var n_cols = data["data"][worker][0]["display"].length+1;

        var table = create_table(n_rows, n_cols);
        table.classList.add(...["table", "table-dark", "table-striped", "table-hover"]);

        thead = table.getElementsByTagName("thead")[0];
        tbody = table.getElementsByTagName("tbody")[0];

        var header_data = thead.getElementsByTagName("th");
        header_data[1].innerHTML = "Last Collection" + '<a href="#" class="btn-sort"><i class="fas fa-caret-down"></i></a>';
        header_data[2].innerHTML = "Articles" + '<a href="#" class="btn-sort"><i class="fas fa-caret-down"></i></a>';
        header_data[3].innerHTML = "Sources" + '<a href="#" class="btn-sort"><i class="fas fa-caret-down"></i></a>';
        header_data[4].innerHTML = "Total articles" + '<a href="#" class="btn-sort"><i class="fas fa-caret-down"></i></a>';
        header_data[5].innerHTML = "Least recent" + '<a href="#" class="btn-sort"><i class="fas fa-caret-down"></i></a>';
        header_data[6].innerHTML = "Most recent" + '<a href="#" class="btn-sort"><i class="fas fa-caret-down"></i></a>';
        header_data[7].innerHTML = "Activity" + '<a href="#" class="btn-sort"><i class="fas fa-caret-down"></i></a>';

        for (var i=0; i < header_data.length; ++i)
        {
            header_data[i].classList.add("nela-header");
        }

        var cells = tbody.getElementsByTagName("td");
        for (var i = 0; i < cells.length; ++i)
        {
            cells[i].classList.add("value-cell");
        }

        for (var i = 0; i < data["data"][worker].length; ++i)
        {
            var row = tbody.rows[i];
            var cells = row.cells;
            cells[0].innerHTML = data["data"][worker][i]["title"];
            cells[0].classList.add("database-cell");
            for(var j = 1; j < data["data"][worker][i]["display"].length+1; ++j)
            {
                cells[j].innerHTML = data["data"][worker][i]["values"][data["data"][worker][i]["display"][j-1]];
            }
            // Add activity chart
            var inspect_link = document.createElement("a");
            inspect_link.href = "#chart-inspect";
            var chart_div = document.createElement("div");
            var chart_canvas = document.createElement("canvas");
            chart_canvas.id = "chart-"+data["data"][worker][i]["name"]+"-"+worker;
            chart_canvas.classList.add("activity-chart");
            chart_div.appendChild(chart_canvas);
            inspect_link.appendChild(chart_div);
            cells[cells.length-1].appendChild(inspect_link);

            var n_days = 30;
            var newChart = draw_chart_js(chart_canvas,
                                        data["data"][worker][i]["series"]["Article-History"]['x'].slice(-n_days),
                                        [data["data"][worker][i]["series"]["Article-History"]['y'].slice(-n_days)],
                                        ["articles"]);
            charts[chart_canvas.id] = newChart;
        }

        new_div.appendChild(table);
        content.appendChild(new_div);
    }
    content.getElementsByClassName("tab-pane")[0].classList.add(...["show", "active"]);
}


function make_bitchute_table(data){
    var content = document.getElementById("content-bitchute");
    var table = create_table(1, 5); // BitChute, currently, only has 1 row

    var new_div = document.createElement("tab-bitchute");


    thead = table.getElementsByTagName("thead")[0];
    tbody = table.getElementsByTagName("tbody")[0];
    table.classList.add(...["table", "table-dark", "table-striped", "table-hover"]);

    var header_data = thead.getElementsByTagName("th");
    header_data[0].innerHTML = "";
    header_data[1].innerHTML = "Recent video";
    header_data[2].innerHTML = "Total videos";
    header_data[3].innerHTML = "Recent comments";
    header_data[4].innerHTML = "Total comments";
    header_data[5].innerHTML = "Activity";

    for(var i=0; i < tbody.rows.length; ++i)
    {

        var cells = tbody.rows[i].cells;
        cells[0].innerHTML = data["data"]["title"];
        cells[1].innerHTML = data["data"]["total_videos"];
        cells[2].innerHTML = data["data"]["recent_video"];
        cells[3].innerHTML = data["data"]["recent_comment"];
        cells[4].innerHTML = data["data"]["total_comments"];

        cells[0].classList.add("database-cell");
        for(var i = 1; i < cells.length; ++i)
        {
            cells[i].classList.add("value-cell");
        }

        // Make BitChute activity chart
        var inspect_link = document.createElement("a");
        inspect_link.href = "#chart-inspect";
        var chart_div = document.createElement("div");
        var chart_canvas = document.createElement("canvas");
        chart_canvas.id = "chart-bitchute";
        chart_canvas.classList.add("activity-chart");
        chart_div.appendChild(chart_canvas);
        inspect_link.appendChild(chart_div);
        cells[cells.length-1].appendChild(inspect_link);

        var n_days = 72;
        var newChart = draw_chart_js(chart_canvas,
                                     data["data"]["activity"]["dates"].slice(-n_days),
                                     [data["data"]["activity"]["videos"].slice(-n_days),
                                     data["data"]["activity"]["comments"].slice(-n_days)],
                                     ["videos", "comments"]);
        charts["chart-bitchute"] = newChart;
    }



    new_div.appendChild(table);
    content.appendChild(new_div);
}

function add_alert(data, alert_type)
{
    if(alert_type == "critical")
    {
        a_class = "alert-danger";
    }
    else{
        a_class = "alert-warning";
    }
    var alert_div = document.getElementById("alerts");
    for(var msg in data)
    {
        var new_alert = document.createElement("div");
        new_alert.classList.add(...["alert", a_class, "alert-dismissible", "fade", "show"]);
        new_alert.innerHTML = data[msg];
        new_alert.innerHTML += "<a href='#' class='btn-close' data-bs-dismiss='alert' style='text-decoration: none; aria-label='Close'></a>";
        alert_div.appendChild(new_alert);
    }
}

function load_nela_data(data)
{
    var alert_div = document.getElementById("alerts");
    add_alert(data["critical"], "critical");
    add_alert(data["warnings"], "warnings");
    make_nela_navtabs(data);
    make_nela_tables(data);
}


function load_bitchute_data(data)
{
    var alert_div = document.getElementById("alerts");
    add_alert(data["critical"], "critical");
    add_alert(data["warnings"], "warnings");
    make_bitchute_table(data);
}

$(document).ready(function(){
    let mode;
    mode = localStorage.getItem("darkMode");

    load_data("collection", {"name": "nela"}, load_nela_data);
    load_data("collection", {"name": "bitchute"}, load_bitchute_data);

    if (mode == "true")
    {
        var d = toggleDarkMode();
    }

});