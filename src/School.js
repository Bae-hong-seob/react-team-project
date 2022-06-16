import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import input_data from "./data/Data.csv";
//import "./components/School.css";

function School() {
  

  const createGraph = async () => {
    const parseTime = d3.timeFormat("%Y");
    let data = await d3.csv(input_data);
    data.forEach((d) => {
      d.year = +parseInt(d.year);
      d.num_school = +parseInt(d.num_school);
    });
    console.log(data);

    const X = d3.map(data, (d) => {
      return d.year;
    });
    const Y = d3.map(data, (d) => {
      return d.num_school;
    });
    const O = d3.map(data, (d) => d);

    const div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const margin = { top: 10, right: 51, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(
      d3.extent(data, (d) => {
        return d.year;
      })
    );
    y.domain(
      d3.extent(data, (d) => {
        return d.num_school;
      })
    );

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const SchoolLine = d3
      .line()
      .x((d) => {
        return x(d.year);
      })
      .y((d) => {
        return y(d.num_school);
      })
      .curve(d3.curveLinear);
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", SchoolLine);

  };

  useEffect(() => {
    createGraph();
  }, []);

  return <></>;
}

export default School;
