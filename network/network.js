var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force('charge', d3.forceManyBody()
      .strength(-200)
      .theta(0.8)
      .distanceMax(150)
    )
 		.force('collide', d3.forceCollide()
       .radius(d => 40)
       .iterations(2)
     )
    .force("center", d3.forceCenter(width / 2, height / 2));


const graph = {
  "nodes": [
    {"id": "1", "group": 1},
    {"id": "2", "group": 2},
    {"id": "4", "group": 3},
    {"id": "8", "group": 4},
    {"id": "16", "group": 5},
    {"id": "11", "group": 1},
    {"id": "12", "group": 2},
    {"id": "14", "group": 3},
    {"id": "18", "group": 4},
    {"id": "116", "group": 5}
  ],
  "links": [
    {"source": "1", "target": "2", "value": 1},
    {"source": "2", "target": "4", "value": 1},
    {"source": "4", "target": "8", "value": 1},
    {"source": "4", "target": "8", "value": 1},
    {"source": "8", "target": "16", "value": 1},
    {"source": "16", "target": "1", "value": 1}
  ]
}


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
            .style("font-size", "16px").style("fill", "#333").style("text-anchor", "middle");
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

    var trial = Math.random().toFixed(6);
    console.log(Object.keys(inverse_cdf));

}

function generate_graph(n, type="random")
{
    var graph = {"nodes": [], "links":[]};

    for(var i=0; i < n; ++i)
    {
        graph["nodes"].push({"id": i});
    }


    if (type === "random"){
    var p = 0.25;

        for(var i=0; i < n; ++i)
        {
            for(var j=0; j < n; ++j)
            {
                if (i == j) continue;

                var trial = Math.random();
                if(trial < p)
                {
                    graph["links"].push({"source": i, "target": j, "weight": 1});
                }
            }
        }
    }

    binomial_sample(10, 0.1);
    binomial_sample(10, 0.9);
    binomial_sample(10, 0.5);
    console.log(graph);
    svg.selectAll("g").remove();
    run(graph);
}

run(graph);