var url = 'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vTmFho6ie3IDsHrZcfOASnA4apB5fRbh3HET3dvP_lwd-4ZmMBea66QuhTZI82oD_j-0_BBdsh5a-qb/pub?gid=0&single=true&output=tsv';

d3.tsv( url, function(data) {
  var figures = d3.select("div#news").selectAll("figure").data(data).enter().append("figure");
  figures.append("a")
    .attr("href",function(d,i) {return d.url;})
      .append("img")
      .attr("src",function(d,i) {return d.imagen;})
      .attr("title", function(d,i) {return d.resumen;})
      .attr("width",500);
  figures.append("figcaption")
    .html(function(d,i) {return  "<div>" + d.fecha + "</div><a href='" + d.url + "'>" + d.titulo + "</a>";});
});
