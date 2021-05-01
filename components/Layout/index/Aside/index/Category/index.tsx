// https://www.d3-graph-gallery.com/graph/treemap_basic.html

import * as d3 from "d3";
import React from "react";

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
  const data = [
    {
      name: "Origin",
      parent: "",
      value: "",
    },
    {
      name: "grp1",
      parent: "Origin",
      value: "12",
    },
    {
      name: "grp2",
      parent: "Origin",
      value: "23",
    },
    {
      name: "grp3",
      parent: "Origin",
      value: "11",
    },
    {
      name: "grp4",
      parent: "Origin",
      value: "40",
    },
    {
      name: "grp5",
      parent: "Origin",
      value: "30",
    },
    {
      name: "grp6",
      parent: "Origin",
      value: "25",
    },
  ] as any;
  const svg = d3.select(svgRef.current);
  const h = svgRef.current?.clientHeight as number;
  const w = svgRef.current?.clientWidth as number;

  // svg
  //   .attr("width", w)
  //   .attr("height", h)
  //   .style("margin-top", 50)
  //   .style("margin-left", 50);

  // svg
  //   .selectAll("rect")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d, i) => i * 40)
  //   .attr("y", (d, i) => h - 10 * d)
  //   .attr("width", 20)
  //   .attr("height", (d, i) => d * 10)
  //   .attr("fill", "steelblue");

  // (async()=>{
  // const a = await d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv')
  // console.log(a, 1)
  // })()

  const root = d3
    .stratify()
    .id(function (d: any) {
      return d.name;
    })
    .parentId(function (d: any) {
      return d.parent;
    })(data);
  root.sum(function (d: any) {
    return +d.value;
  });
  d3.treemap().size([w, h]).padding(4)(root);
  root.leaves();

  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("a")
    .attr("xlink:href", function (d: any) {
      return "http://en.wikipedia.org/wiki/" + d.data.name;
    })
    .append("rect")
    .attr("x", function (d: any) {
      return d.x0;
    })
    .attr("y", function (d: any) {
      return d.y0;
    })
    .attr("width", function (d: any) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d: any) {
      return d.y1 - d.y0;
    })
    .style("stroke", "black")
    .style("fill", "#69b3a2");

  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", function (d: any) {
      return d.x0 + 10;
    }) // +10 to adjust position (more right)
    .attr("y", function (d: any) {
      return d.y0 + 20;
    }) // +20 to adjust position (lower)
    .text(function (d: any) {
      return d.data.name;
    })
    .attr("font-size", "15px")
    .attr("fill", "white");
}

export const Category: React.FunctionComponent = () => {
  const svg = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return <svg width="100%" height="100%" ref={svg} />;
};
