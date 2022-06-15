import * as d3 from "d3";
import { axisLeft } from "d3";
import { axisRight } from "d3";
import { range } from "d3";
import { useEffect, useState, useRef } from "react";

function SchoolLine({ Lable, Year }) {
  const w = 600;
  const h = 310;

  const [data, setdata] = useState(Lable);
  const svgRef1 = useRef(null);
  //console.log(data);
  //console.log(Lable);
  //console.log(Year);
  useEffect(() => {
    const svg = d3.select(svgRef1.current);
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([30, w]);
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d;
        }),
        d3.max(data, function (d) {
          return d;
        }),
      ])
      .range([h, h - 300]);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((i) => Year[i]);
    svg.select(".x-axis").style("transform", "translateY(310px)").call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(30px)").call(yAxis);

    const Line = d3
      .line()
      .x((v, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveBasis);

    svg
      .selectAll(".line")
      .data([data])
      .join((enter) => enter.append("path"))
      .attr("class", "line")
      .attr("d", (v) => Line(v))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <>
      <svg className="y" ref={svgRef1} width={650} height={350}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  );
}

export default SchoolLine;
