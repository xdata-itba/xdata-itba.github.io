var color = d3.scale.category20();

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if (dd < 10) { dd = '0'+dd }
if (mm < 10) { mm = '0'+mm }
today = yyyy + "-" + mm + "-" + dd; // today en formato 'YYYY-MM-DD'

var width   = 900;
var height  = 500;
var limit   = 200; // cantidad de palabras a recuperar
var d_from  = today; // fecha desde formato 'yyyy-mm-dd'
var d_to    = today; // fecha hasta formato 'yyyy-mm-dd'
var search  = "";
var url     = "//pf2.it.itba.edu.ar/api/nube-de-palabras?d_from="+d_from+"&d_to="+d_to+"&words="+search+"&limit="+limit;
var font    = "Montserrat";
var datos;

function hex2a(hexx) {
  var hex = hexx.toString();
  var str = '';
  for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

function draw(words) {
  // console.log("end")
  d3.select("#cloud").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + ~~(width / 2) + "," + ~~(height / 2) + ")")
    .selectAll("text")
    .data(words)
    .enter()
      .append("a")
        .attr("xlink:href", function(d,i) { return "//news.google.com/news/search/section/q/" + d.text + "/" + d.text + "?hl=es-419&gl=AR&ned=es_ar"; } )
        .attr("target", "_blank")
    .append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("-webkit-touch-callout", "none")
    .style("-webkit-user-select", "none")
    .style("-khtml-user-select", "none")
    .style("-moz-user-select", "none")
    .style("-ms-user-select", "none")
    .style("user-select", "none")
    .style("cursor", "default")
    .style("font-family", font  )
    .style("fill", function(d, i) { return color(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
    .text(function(d) { return d.text; });
}

function palabra(w) {
  // console.log(w.word)
}

var scale = d3.scale.linear();

d3.json(url, function(data) {
  if (data.status == "success") {
    datos = data.data;
    datos.forEach(function(d) {
      d.text = d.word;
      d.size = d.word_count;
    });

    scale
      .domain([1, d3.max(datos.map(function(d){return d.size;})) ])
      .range([2,50]);

    d3.layout.cloud()
      .size([width, height])
      .words(datos)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font( font )
      .fontSize(function(d) { return scale(d.word_count); })
      // .on("word", palabra)
      .on("end", draw)
      .start();

    var svg = document.getElementsByTagName("svg")[0];
    var bbox = svg.getBBox();
    var viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ");
    svg.setAttribute("viewBox", viewBox);

  }
});
