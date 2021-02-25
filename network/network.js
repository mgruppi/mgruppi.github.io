var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force('charge', d3.forceManyBody()
      .strength(-200)
      .theta(0.1)
      .distanceMax(500)
    )
 		.force('collide', d3.forceCollide()
       .radius(d => 40)
       .iterations(2)
     )
    .force("center", d3.forceCenter(width / 2, height / 2));


function run(graph) {

  graph.links.forEach(function(d){
//     d.source = d.source_id;
//     d.target = d.target_id;
  });

  var link = svg.append("g")
                .style("stroke", "#aaa")
                .selectAll("line")
                .data(graph.links)
                .enter().append("line");

  var node = svg.append("g")
            .attr("class", "nodes")
  .selectAll("circle")
            .data(graph.nodes)
  .enter().append("circle")
          .attr("r", 8)
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

  var label = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
        .attr("class", "label")
        .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .style("stroke-width", "2px");

    node
         .attr("r", 20)
         .style("fill", "#efef00")
         .style("stroke", "#424242")
         .style("stroke-width", "1px")
         .attr("cx", function (d) { return d.x+5; })
         .attr("cy", function(d) { return d.y-3; });

    label
            .attr("x", function(d) { return d.x+5; })
            .attr("y", function (d) { return d.y+3; })
            .style("font-size", "16px").style("fill", "#333").style("text-anchor", "middle")
            .style("user-select", "none");
  }
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
//  simulation.fix(d);
}

function dragged(d) {
  d.fx = d3.event.x
  d.fy = d3.event.y
//  simulation.fix(d, d3.event.x, d3.event.y);
}

function dragended(d) {
  d.fx = d3.event.x
  d.fy = d3.event.y
  if (!d3.event.active) simulation.alphaTarget(0);
  //simulation.unfix(d);
}


// Compute factorial
function factorial(x){
    if(x <= 1)
    {
        return 1;
    }
    return x*factorial(x-1);
}

// Math combination
function comb(n, i)
{
    return factorial(n)/(factorial(i)*factorial(n-i));
}


// Draw samples from a binomial distribution
function binomial_sample(n, p, size=1)
{
    inverse_cdf = {};  // Compute the inverse CDF to do inverse transform.
    cumulative = 0;
    for(var i=0; i < n; ++i)
    {
        cumulative += comb(n, i)*p**i * (1-p)**(n-i);
        inverse_cdf[cumulative.toFixed(6)] = i;
    }


    var result = [];

    for(var k = 0; k < size; ++k)
    {
        var trial = Math.random().toFixed(6);
        percentiles = Object.keys(inverse_cdf);
        var i = 0;
        // Inefficient search but I'm feeling Javascript lazy.
        while (trial > percentiles[i] && i < percentiles.length-1)
        {
            i++;
        }

        // console.log(k, trial, percentiles[i], inverse_cdf[percentiles[i]]);
        result.push(percentiles[i]);
    }
    return result;
}


function power_law_sample(n, size=1, xm=1, alpha=2.1)
{
    inverse_cdf = {};
    for(var i=1 ; i < n; ++i)
    {
        p_c = 1 - (xm/i)**alpha;
        inverse_cdf[p_c.toFixed(6)] = i;
    }

    var result = [];
    for (var k = 0; k < size; ++k)
    {
        var trial = Math.random().toFixed(6);
        percentiles = Object.keys(inverse_cdf);
        var i = 0;
        while(trial > percentiles[i] && i < percentiles.length-1)
        {
            ++i;
        }
        result.push(percentiles[i]);
    }
    return result;
}


function generate_graph(n, type="random", p=0.1)
{
    var graph = {"nodes": [], "links":[]};

    for(var i=0; i < n; ++i)
    {
        graph["nodes"].push({"id": i});
    }

    if (type === "random"){
    var p_links = binomial_sample(n, p, n);
    }

    if (type === "scale-free")
    {
        var p_links = power_law_sample(n, n);
    }

    console.log(p_links);
    for(var i=0; i < n; ++i)
    {
        for(var j=0; j < n; ++j)
        {
            if (i == j) continue;

            var trial = Math.random();
            if(trial < p_links[i])
            {
                graph["links"].push({"source": i, "target": j, "weight": 1});
            }
        }
    }

    console.log(graph);
    svg.remove();

    d3.select("#container-svg").append("svg").attr("width", width).attr("height", height);
    svg = d3.select("svg");

    run(graph);
}

generate_graph(10);