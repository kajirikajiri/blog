// https://www.d3-graph-gallery.com/graph/treemap_basic.html

import { TreemapData } from "@/types/treemapData";
import * as d3 from "d3";
import React from "react";

function drawChart(
  svgRef: React.RefObject<SVGSVGElement>,
  treemapData: TreemapData,
  showFirstCategory: boolean
) {
  const data = treemapData as any;
  const svg = d3.select(svgRef.current);
  const height = svgRef.current?.clientHeight as number;
  const width = svgRef.current?.clientWidth as number;

  const root = d3.hierarchy(data).sum(function (d: any) {
    return d.value;
  }); // Here the size of each leave is given in the 'value' field in input data

  d3
    .treemap()
    .size([width, height])
    .paddingRight(1)
    .paddingLeft(1)
    .paddingInner(3) // Padding between each rectangle
    .paddingTop(40)(root);

  const opacity: any = d3.scaleLinear().domain([10, 30]).range([0.5, 1]);

  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("a")
    .attr("xlink:href", function (d: any) {
      return `/category/${d.parent.data.name}/${d.data.name}`;
    }) // <-- reading the new "url" property
    .append("rect")
    .attr("aria-label", function (d: any) {
      return d.data.name;
    })
    .attr("x", function (d: any) {
      return d.x0;
    })
    .attr("y", function (d: any) {
      return d.y0 - 30;
    })
    .attr("width", function (d: any) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d: any) {
      return d.y1 - d.y0 + 10;
    })
    .style("cursor", "pointer")
    .style("stroke", "black")
    .style("fill", function () {
      return "#fff";
    })
    .style("opacity", function (d: any) {
      return opacity(d.data.value);
    });

  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("aria-label", function (d: any) {
      return d.data.name;
    })
    .style("cursor", "pointer")
    .attr("x", function (d: any) {
      return d.x0 + 5;
    }) // +10 to adjust position (more right)
    .attr("y", function (d: any) {
      return d.y0 - 13;
    }) // +20 to adjust position (lower)
    .text(function (d: any) {
      return d.data.name + "↗";
    })
    .attr("font-size", "14px")
    .attr("fill", "#000")
    .on("click", function (_, d: any) {
      location.href = `/category/${d.parent.data.name}/${d.data.name}`;
    }); // e.parent.dataに親要素の名前入ってる

  svg
    .selectAll("vals")
    .data(root.leaves())
    .enter()
    .append("text")
    .style("cursor", "pointer")
    .attr("x", function (d: any) {
      return d.x0 + 5;
    }) // +10 to adjust position (more right)
    .attr("y", function (d: any) {
      return d.y0;
    }) // +20 to adjust position (lower)
    .text(function (d: any) {
      return d.data.value;
    })
    .attr("font-size", "11px")
    .attr("fill", "#000")
    .on("click", function (_, d: any) {
      location.href = `/category/${d.parent.data.name}/${d.data.name}`;
    }); // e.parent.dataに親要素の名前入ってる

  showFirstCategory &&
    svg
      .selectAll("titles")
      .data(
        root.descendants().filter(function (d: any) {
          return d.depth == 1;
        })
      )
      .enter()
      .append("a")
      .attr("xlink:href", function (d: any) {
        return `/category/${d.data.name}`;
      }) // <-- reading the new "url" property
      .attr("aria-label", function (d: any) {
        return d.data.name;
      })
      .append("text")
      .style("cursor", "pointer")
      .attr("x", function (d: any) {
        return d.x0;
      })
      .attr("y", function (d: any) {
        return d.y0;
      })
      .text(function (d: any) {
        return d.data.name + "↗";
      })
      .attr("font-size", "14px") // 18px だとlighthouseに怒られた
      .attr("font-weight", "bold") // 18px だとlighthouseに怒られた
      .attr("fill", function () {
        return "#000";
      });
}

type Props = {
  treemapData: TreemapData;
  showFirstCategory?: boolean;
};

export const Category = ({ treemapData, showFirstCategory = true }: Props) => {
  const svg = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    drawChart(svg, treemapData, showFirstCategory);
  }, [svg]);

  return <svg width="100%" height="100%" ref={svg} />;
};
