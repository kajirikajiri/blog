// https://www.d3-graph-gallery.com/graph/treemap_basic.html

import { TreemapData } from "@/types/treemapData";
import {
  blue,
  green,
  indigo,
  pink,
  purple,
  red,
} from "@material-ui/core/colors";
import * as d3 from "d3";
import React from "react";

function drawChart(
  svgRef: React.RefObject<SVGSVGElement>,
  treemapData: TreemapData
) {
  // const data=treemapData
  const data = treemapData as any;
  // const data = {
  //   name: 'flare',
  //   children: [
  //     {
  //       name: 'a',
  //       children: [
  //         {
  //           name: 'b',
  //           value: 111
  //         }
  //       ]
  //     }
  //   ]
  // }
  // const data={
  //   "children": [
  //     {
  //       "name": "boss1",
  //       "children": [
  //         {
  //           "name": "mister_a",
  //           "value": 28,
  //         },
  //         {
  //           "name": "mister_b",
  //           "value": 19,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_c",
  //           "value": 18,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_d",
  //           "value": 19,
  //           "colname": "level3"
  //         }
  //       ],
  //       "colname": "level2"
  //     },
  //     {
  //       "name": "boss2",
  //       "children": [
  //         {
  //           "name": "mister_e",
  //           "group": "C",
  //           "value": 14,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_f",
  //           "group": "A",
  //           "value": 11,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_g",
  //           "group": "B",
  //           "value": 15,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_h",
  //           "group": "B",
  //           "value": 16,
  //           "colname": "level3"
  //         }
  //       ],
  //       "colname": "level2"
  //     },
  //     {
  //       "name": "boss3",
  //       "children": [
  //         {
  //           "name": "mister_i",
  //           "group": "B",
  //           "value": 10,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_j",
  //           "group": "A",
  //           "value": 13,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_k",
  //           "group": "A",
  //           "value": 13,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_l",
  //           "group": "D",
  //           "value": 25,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_m",
  //           "group": "D",
  //           "value": 16,
  //           "colname": "level3"
  //         },
  //         {
  //           "name": "mister_n",
  //           "group": "D",
  //           "value": 28,
  //           "colname": "level3"
  //         }
  //       ],
  //       "colname": "level2"
  //     }
  //   ],
  //   "name": "CEO"
  // }
  const svg = d3.select(svgRef.current);
  const height = svgRef.current?.clientHeight as number;
  const width = svgRef.current?.clientWidth as number;

  const root = d3.hierarchy(data).sum(function (d: any) {
    return d.value;
  }); // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3
    .treemap()
    .size([width, height])
    .paddingRight(2)
    .paddingLeft(2)
    .paddingInner(1) // Padding between each rectangle
    .paddingTop(28)(root);
  // .paddingOuter(6)
  // .padding(20)

  // prepare a color scale
  const color: any = d3
    .scaleOrdinal()
    .range([
      blue[600],
      purple[600],
      green[600],
      indigo[600],
      pink[600],
      red[600],
    ]);

  // And a opacity scale
  const opacity: any = d3.scaleLinear().domain([10, 30]).range([0.5, 1]);

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
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
    .style("cursor", "pointer")
    .style("stroke", "black")
    .style("fill", function (d: any) {
      console.log(d, 2222);
      return color(d.parent.data.name);
    })
    .style("opacity", function (d: any) {
      return opacity(d.data.value);
    })
    .on("click", function (_, d: any) {
      location.href = `/category/${d.parent.data.name}/${d.data.name}`;
    }); // e.parent.dataに親要素の名前入ってる

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .style("cursor", "pointer")
    .attr("x", function (d: any) {
      return d.x0 + 5;
    }) // +10 to adjust position (more right)
    .attr("y", function (d: any) {
      return d.y0 + 20;
    }) // +20 to adjust position (lower)
    .text(function (d: any) {
      return d.data.name;
    })
    .attr("font-size", "14px")
    .attr("fill", "white")
    .on("click", function (_, d: any) {
      location.href = `/category/${d.parent.data.name}/${d.data.name}`;
    }); // e.parent.dataに親要素の名前入ってる
  // clickでページ移動。hrefと一緒の場所

  // and to add the text labels
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
      return d.y0 + 35;
    }) // +20 to adjust position (lower)
    .text(function (d: any) {
      return d.data.value;
    })
    .attr("font-size", "11px")
    .attr("fill", "white")
    .on("click", function (_, d: any) {
      location.href = `/category/${d.parent.data.name}/${d.data.name}`;
    }); // e.parent.dataに親要素の名前入ってる
  // clickでページ移動
  // clickでページ移動。hrefと一緒の場所

  // Add title for the 3 groups
  svg
    .selectAll("titles")
    .data(
      root.descendants().filter(function (d: any) {
        return d.depth == 1;
      })
    )
    .enter()
    .append("text")
    .style("cursor", "pointer")
    .attr("x", function (d: any) {
      return d.x0;
    })
    .attr("y", function (d: any) {
      return d.y0 + 21;
    })
    // .attr("xlink:href", function (d: any) {
    //   return `/category/${d.data.name}`;
    // })
    .text(function (d: any) {
      return d.data.name;
    })
    .attr("font-size", "16px")
    .attr("fill", function (d: any) {
      return color(d.data.name);
    })
    .on("click", function (_, d) {
      location.href = `/category/${d.data.name}`;
    }); // e.parent.dataに親要素の名前入ってる

  // Add title for the 3 groups
  svg
    .append("text")
    .attr("x", "50%")
    .attr("y", 24) // +20 to adjust position (lower)
    .text("カテゴリ")
    .attr("text-anchor", "middle")
    .attr("font-family", "DotGothic 16")
    .attr("font-size", "19px")
    .attr("fill", "grey");

  // var root = d3.hierarchy(data).sum(function(d:any){ return d.value}) // Here the size of each leave is given in the 'value' field in input data

  // d3.treemap()
  //   .size([width, height])
  //   .padding(2)
  //   (root)

  // // use this information to add rectangles:
  // svg
  //   .selectAll("rect")
  //   .data(root.leaves())
  //   .enter()
  //   .append("rect")
  //     .attr('x', function (d:any) { return d.x0; })
  //     .attr('y', function (d:any) { return d.y0; })
  //     .attr('width', function (d:any) { return d.x1 - d.x0; })
  //     .attr('height', function (d:any) { return d.y1 - d.y0; })
  //     .style("stroke", "black")
  //     .style("fill", "slateblue")

  // // and to add the text labels
  // svg
  //   .selectAll("text")
  //   .data(root.leaves())
  //   .enter()
  //   .append("text")
  //     .attr("x", function(d:any){ return d.x0+5})    // +10 to adjust position (more right)
  //     .attr("y", function(d:any){ return d.y0+20})    // +20 to adjust position (lower)
  //     .text(function(d:any){ return d.data.name })
  //     .attr("font-size", "15px")
  //     .attr("fill", "white")

  // // svg
  // //   .attr("width", w)
  // //   .attr("height", h)
  // //   .style("margin-top", 50)
  // //   .style("margin-left", 50);

  // // svg
  // //   .selectAll("rect")
  // //   .data(data)
  // //   .enter()
  // //   .append("rect")
  // //   .attr("x", (d, i) => i * 40)
  // //   .attr("y", (d, i) => h - 10 * d)
  // //   .attr("width", 20)
  // //   .attr("height", (d, i) => d * 10)
  // //   .attr("fill", "steelblue");

  // // (async()=>{
  // // const a = await d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv')
  // // console.log(a, 1)
  // // })()
  // const root = d3
  //   .stratify()
  //   .id(function (d: any) {
  //     return d.name;
  //   })
  //   .parentId(function (d: any) {
  //     return d.parent;
  //   })(data);
  // root.sum(function (d: any) {
  //   return +d.value;
  // });
  // d3.treemap().size([w, h]).padding(4)(root);
  // root.leaves();

  // svg
  //   .selectAll("rect")
  //   .data(root.leaves())
  //   .enter()
  //   .append("a")
  //   .attr("xlink:href", function (d: any) {
  //     return "http://en.wikipedia.org/wiki/" + d.data.name;
  //   })
  //   .append("rect")
  //   .attr("x", function (d: any) {
  //     return d.x0;
  //   })
  //   .attr("y", function (d: any) {
  //     return d.y0;
  //   })
  //   .attr("width", function (d: any) {
  //     return d.x1 - d.x0;
  //   })
  //   .attr("height", function (d: any) {
  //     return d.y1 - d.y0;
  //   })
  //   .style("stroke", "black")
  //   .style("fill", blue[600]);

  // svg
  //   .selectAll("text")
  //   .data(root.leaves())
  //   .enter()
  //   .append("text")
  //   .attr("x", function (d: any) {
  //     return d.x0 + 10;
  //   }) // +10 to adjust position (more right)
  //   .attr("y", function (d: any) {
  //     return d.y0 + 20;
  //   }) // +20 to adjust position (lower)
  //   .text(function (d: any) {
  //     return d.data.name;
  //   })
  //   .attr("font-size", "15px")
  //   .attr("fill", "white");
}

type Props = {
  treemapData: TreemapData;
};

export const Category = ({ treemapData }: Props) => {
  const svg = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    drawChart(svg, treemapData);
  }, [svg]);

  return <svg width="100%" height="100%" ref={svg} />;
};
