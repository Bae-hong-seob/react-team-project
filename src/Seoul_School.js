import * as d3 from "d3";
import { useEffect, useState } from "react";
import input_data from "./data/Data.csv";

function Seoul_School() {
  const w = 500;
  const h = 300;

  const [data, setData] = useState([]);

  const Data = async () => {
    const chartData = [];
    let file = await d3.csv(input_data);
    file.map((load_csv) =>
      chartData.push({
        label: load_csv.year,
        value: load_csv.num_school,
      })
    );
    setData(chartData);
  };

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      Data();
    }
  }, [data]);

  function drawChart() {
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);
    const xMinValue = d3.min(data, (d) => d.label);
    const xMaxValue = d3.max(data, (d) => d.label);

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, w]);

    const yScale = d3
      .scaleLinear()
      .domain([yMinValue, yMaxValue])
      .range([h, 0]);

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(xScale).tickSize(-h).tickFormat(""));
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-w).tickFormat(""));
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${h})`)
      .call(
        d3
          .axisBottom()
          .scale(xScale)
          .tickSize(data.length - 1)
      );
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    const line = d3
      .line()
      .x((d) => xScale(d.label))
      .y((d) => yScale(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#1f77b4")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);
  }

  //     fileRead();
  //     const svg = d3.select(svgRef.current);

  //     const xScale = d3.scaleLinear()
  //                      .domain(d3.extent(Seoul_year))
  //                      .range([0, w]);

  //     const yScale = d3.scaleLinear()
  //                      .domain(d3.extent(Seoul_num_school))
  //                      .range([h,0]);

  //     const xAxis = d3.axisBottom(xScale)
  //                     .ticks(Seoul_num_school.length)
  //                     .tickFormat((i) => Seoul_year[i]);
  // svg
  //     .select(".x-axis")
  //     .attr("transform",`translate(0, ${h})`)
  //     .call(xAxis);

  // const yAxis = d3.axisRight(yScale);
  // svg
  //     .select(".y-axis")
  //     .call(yAxis);

  // const Line = d3
  //                 .line()
  //                 .x((v, i) => xScale(i))
  //                 .y(yScale)
  //                 .curve(d3.curveBasis);

  // svg
  //     .selectAll(".line")
  //     .data(Seoul_num_school)
  //     .join((enter) => enter.append("path"))
  //     .attr("class", "line")
  //     .attr("d", (v) =>Line(v))
  //     .attr("fill", "none")
  //     .attr("stroke", "blue");

  return (
    <>
      <div id="container" />
    </>
  );
}

export default Seoul_School;
