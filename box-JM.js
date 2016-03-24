(function() {

// Inspired by http://informationandvisualization.de/blog/box-plot
      d3.box = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = boxWhiskers,
      quartiles = boxQuartiles,
      namesArray = [],
      tickFormat = null;

  // For each small multiple…
  function box(g) {
    g.each(function(d, i) {
      d = d.map(value).sort(d3.ascending);
      var g = d3.select(this),
          n = d.length,
          min = d[0],
          max = d[n - 1];

      // Compute quartiles. Must return exactly 3 elements.
      // quartiles is a d3 funtion: d3.quartiles([...],.25)
      var quartileData = d.quartiles = quartiles(d);
      // why does he do ths? quariles(d) or d.quartiles?
      console.log('quartileData', quartileData);
      console.log('d.quartiles', d.quartiles);
      console.log('quartiles(d)', quartiles(d));

      // Compute whiskers. Must return exactly 2 elements, or null.
      var whiskerIndices = whiskers && whiskers.call(this, d, i),
          whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

      // Compute outliers. If no whiskers are specified, all data are "outliers".
      // We compute the outliers as indices, so that we can join across transitions!
      var outlierIndices = whiskerIndices
          ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
          : d3.range(n);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [min, max])
          .range([height, 0]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Define the div for the tooltip for mouse-over outliers
      var div = d3.select("body").append("div") 
      .attr("class", "tooltip")       
      .style("opacity", 0);

      var divB = d3.select("body").append("div") 
      .attr("class", "tooltipBox")       
      .style("opacity", 0);

      var table = d3.select("body").append("table") 
      .attr("class", "tooltipTable")       
      .style("opacity", 0);

      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.

      // Update center line: the vertical line spanning the whiskers.
      var center = g.selectAll("line.center")
          .data(whiskerData ? [whiskerData] : []);

      center.enter().insert("line", "rect")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x0(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x0(d[1]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); })
          .remove();

      // Update innerquartile box.
      var box = g.selectAll("rect.box")
          .data([quartileData]);

      box.enter().append("rect")
          .attr("class", "box")
          .attr("x", 0)
          .attr("y", function(d) { return x0(d[2]); })                    // returns 500 the width 
          .attr("width", width)
          .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })    // returns 0
          .on("mouseover", function(d) {    
              divB.transition()    
                  .duration(200)    
                  .style("opacity", .9);    
              divB.html("<table style='width:100%'>"+
                            "<tr>"+
                              "<td>"+"75th Quartile: "+"</td>"+
                              "<td>"+d[2]+"</td>"+
                            "</tr>" +
                            "<tr>"+
                              "<td>"+"Mean: "+"</td>"+
                              "<td>"+d[1]+"</td>"+
                            "</tr>" +
                            "<tr>"+
                              "<td>"+"25th Quartile: "+"</td>"+
                              "<td>"+d[0]+"</td>"+
                            "</tr>" +
                             "<tr>"+
                              "<td>"+"Population: "+"</td>"+
                              "<td>"+ n+"</td>"+
                             "</tr>" +
                        "</table>")    
            //"75th Quartile: "+d[2]+"<br>" + "Mean: "+d[1]+"<br>"+ "25th Quartile: "+d[0])  
                  .style("left", (d3.event.pageX + 10) + "px")   
                  .style("top", (d3.event.pageY - 50) + "px");   
                })
          .on("mouseout", function(d) {   
              divB.transition()    
                  .duration(500)    
                  .style("opacity", 0); 
                }) 
        .transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });
          
      box.transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      // Update median line.
      var medianLine = g.selectAll("line.median")
          .data([quartileData[1]]);

      medianLine.enter().append("line")
          .attr("class", "median")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      medianLine.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData || []);

      whisker.enter().insert("line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
          .on("mouseover", function(i) {   
                div.transition()    
                    .duration(200)    
                    .style("opacity", .9);    
                div.html("Fence Value: "+"<br>"+i)  
                    .style("left", (d3.event.pageX) + "px")   
                    .style("top", (d3.event.pageY - 28) + "px");  
                })
                .on("mouseout", function(d) {   
                div.transition()    
                    .duration(500)    
                    .style("opacity", 0); 
                })          
          .style("opacity", 1e-6)               
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.exit().transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1e-6)
          .remove();
     
      // Update outliers.
      var outlier = g.selectAll("circle.outlier")
          .data(outlierIndices, Number);

      /* 
      call explicit works, whereas in a function it doesn't
      */

      if (n===533){
        outlier.enter().insert("circle", "text")
              .attr("class", "outlier")
              .attr("r", 5)
              .attr("cx", width / 2)
              .attr("cy", function(i) {return x0(d[i]); })
              .on("mouseover", function(i) { x1(d[i]);   
                div.transition()    
                    .duration(200)    
                    .style("opacity", .9);    
                div.html(d[i]+"<br>"+namesArray[0][i][1])  
                    .style("left", (d3.event.pageX) + "px")   
                    .style("top", (d3.event.pageY - 28) + "px");  
                })
                .on("mouseout", function(d) {   
                div.transition()    
                    .duration(500)    
                    .style("opacity", 0); 
                })          
              .style("opacity", 1e-6)
              .transition()
              .duration(duration)
              .attr("cy", function(i) { return x1(d[i]); })
              .style("opacity", 1);
        };

      if (d.length===254){
        outlier.enter().insert("circle", "text")
              .attr("class", "outlier")
              .attr("r", 5)
              .attr("cx", width / 2)
              .attr("cy", function(i) {return x0(d[i]); })
              .on("mouseover", function(i) { x1(d[i]);   
                div.transition()    
                    .duration(200)    
                    .style("opacity", .9);    
                div.html(d[i]+"<br>"+namesArray[1][i][1])  
                    .style("left", (d3.event.pageX) + "px")   
                    .style("top", (d3.event.pageY - 28) + "px");  
                })
                .on("mouseout", function(d) {   
                div.transition()    
                    .duration(500)    
                    .style("opacity", 0); 
                })          
              .style("opacity", 1e-6)
              .transition()
              .duration(duration)
              .attr("cy", function(i) { return x1(d[i]); })
              .style("opacity", 1);
        };

      if (d.length===83){
        outlier.enter().insert("circle", "text")
          .attr("class", "outlier")
          .attr("r", 5)
          .attr("cx", width / 2)
          .attr("cy", function(i) {return x0(d[i]); })
          .on("mouseover", function(i) { x1(d[i]);   
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div.html(d[i]+"<br>"+namesArray[2][i][1])  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })
            .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
            })          
          .style("opacity", 1e-6)
          .transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);
        };
 
      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);
      console.log("computing the tickFormat");
      console.log('tickFormat', tickFormat);
      console.log('x1.tickFormat', x1.tickFormat(8));

      // Update box ticks.
      var boxTick = g.selectAll("text.box")
          .data(quartileData);

      /* 
        - uses ternary operator: 
          condition ? expr 1 : expr 2
        - quartileData is array with 25th, 50th, and 75th percentile 
        - turned off
      */
      if (false) {
      boxTick.enter().append("text")
          .attr("class", "box")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })   //returns +6pixels(1) or -6pixels (0,2)
          .attr("x", function(d, i) { return i & 1 ? width : 0 }) //returns width(1) or zero (0,2)
          .attr("y", x0)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })                                
          //anchors text @ start(1) or end (0,2). 
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);

      boxTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1);
      };

      // Update whisker ticks. These are handled separately from the box
      // ticks because they may or may not exist, and we want don't want
      // to join box ticks pre-transition with whisker ticks post-.
      
      if (false){
      var whiskerTick = g.selectAll("text.whisker")
          .data(whiskerData || []);

      whiskerTick.enter().append("text")
          .attr("class", "whisker")
          .attr("dy", ".3em")
          .attr("dx", 6)
          .attr("x", width)
          .attr("y", x0)
          .text(format)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.exit().transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1e-6)
          .remove();

    };

    });
    
    d3.timer.flush();
  
  }

  box.names = function(x) {
    namesArray = x;
    return namesArray;
  };

  box.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    //console.log("in bar.width:", width);
    //console.log(width);
    return box;
  };

  box.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return box;
  };

  box.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return box;
  };

  box.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return box;
  };

  box.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return box;
  };

  box.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return box;
  };

  box.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return box;
  };

  box.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return box;
  };

  return box;
};

function boxWhiskers(d) {
  return [0, d.length - 1];
}

function boxQuartiles(d) {
  return [
    d3.quantile(d, .25),
    d3.quantile(d, .5),
    d3.quantile(d, .75)
  ];
}

})();