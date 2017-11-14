d3.tsv("data.tsv", function(data) {
  var figures = d3.select("div#news").selectAll("figure").data(data).enter().append("figure");
  figures.append("a")
    .attr("href",function(d,i) {return d.url;})
      .append("img")
      .attr("src",function(d,i) {return d.imagen;})
      .attr("width",500);
  figures.append("figcaption")
    .html(function(d,i) {return  "<div align='left'>" + d.fecha + "</div><b>" + d.titulo + "</b>";});
});
