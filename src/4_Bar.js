import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import "./components/4_Bar.css";

function Bar({ x, y }) {

  let x_label = [...x];
  let y_data = [...y];

  //let y_data = [24, 70, 35, 65, 80];

  //console.log(x_label)
  console.log(y_data);

  const svgRef = useRef();
  const height = 240;

  let max = d3.max(y_data);
  let min = d3.min(y_data);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    //const barElements = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(y_data.map((v, i) => i))
      .range([0, 370])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, max])
      //.domain([min-1000 , max])
      .range([height, 20]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(x_label.length)
      //.outerTickSize(1)
      //.tickFormat((i) => region_list2[i]);
      .tickFormat((i) => x_label[i]);

    svg.select(".x-axis").style("transform", "translateY(0px)").call(xAxis);
    //svg.select(".x-axis").style("transform", 'translate(0,-1000)').call(xAxis);
    const yAxis = d3.axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    const colorScale = d3.scaleLinear().domain([10, 80]).range(["blue", "red"]);

    const colors = ["#FE6565","#808080"];
    //const colors = d3.scaleOrdinal(d3.schemeCategory10);
    console.log(colors)
    svg
      .selectAll(".bar")
      .data(y_data, (d) => d[1])
      .join(
        // ENTER
        // new elements
        (enter) => {
          const rect_enter = enter
            .append("rect")
            .attr("x", (v, i) => xScale(i));
          //rect_enter.append('title');
          return rect_enter;
        },
        // UPDATE
        // update existing elements
        (update) => update,
        // EXIT
        // elements that aren't associated with data
        (exit) => exit.remove()
      )
      //.data(y_data)
      //svg
      //.enter()
      //.append("rect")
      .attr("class", "bar")
      .attr("x", (v, i) => xScale(i))
      .attr("y", -500)
      .attr("width", xScale.bandwidth())
      .style("transform", "scale(1,-1)")
      .transition()
      .duration(1000)
      //.attr("fill", "#FE6565")
      .attr("fill", (d, i) => colors[i])
      
      .attr("height", (v, i) => 500 - yScale(v));
  }, [y_data]);

  return (
    <>
      <svg className="bar-canvas" fill={'red'} ref={svgRef} width={1000} height={1000}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </>
  );
}

export default Bar;
