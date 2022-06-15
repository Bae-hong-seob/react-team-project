import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import input_data from "./data/Data.csv";
//import "./components/School.css";

function School() {
  // const [data, setData] = useState([]);
  // const svgRef = useRef();

  // useEffect(() => {
  //     const margin = {top : 10, right : 51, bottom : 50, left :50};
  //     const width = 600 - margin.left - margin.right;
  //     const height = 600 - margin.top - margin.bottom;

  //     const svg = d3.select(svgRef.current);

  //     const years = [];
  //     const schools = [];

  //     d3.csv(input_data).then(data => {
  //         data.forEach(function (d) {
  //             d.year = +parseInt(d.year)
  //             d.num_school = +parseInt(d.num_school);
  //         })
  //         setData(data);

  //     },[]);

  //     const xMinValue = d3.min(data, function(d) {return d.year});
  //     const xMaxValue = d3.max(data, function(d) {return d.year});
  //     const yMinValue = d3.min(data, function(d) {return d.num_school});
  //     const yMaxValue = d3.max(data, function(d) {return d.num_school});

  //     console.log(yMinValue);
  //     console.log(yMaxValue);
  //     console.log(xMaxValue);
  //     console.log(xMinValue);
  //     console.log(schools);

  //     const x = d3.scaleLinear().range([0, width]);
  //     const y = d3.scaleLinear().range([height, 0]);

  // const xScale = d3.scaleLinear()
  //     .domain([0,data.length - 1])
  //     .range([0, width]);

  // const yScale = d3.scaleLinear()
  //     .domain([yMinValue, yMaxValue])
  //     .range([height, 0]);

  // const xAxis = d3.axisBottom(xScale)
  //     .ticks(data.length)
  //     .tickFormat((d) => d.year);
  // svg
  //     .select(".x-axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  // const yAxis = d3.axisRight(yScale);
  // svg
  //     .select(".y-aixs")
  //     .call(yAxis);

  // const line = d3
  //     .line()
  //     .x(function(d) { return x(parseInt(d.year));})
  //     .y(function(d) { return y(parseInt(d.num_school));})
  //     .curve(d3.curveBasis);
  // svg
  //     .selectAll("path")
  //     .data([data])
  //     .join("path")
  //     .attr("d", line)
  //     .attr("fill", "none")
  //     .attr("stroke", "blue")

  // }, []);

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

    // svg.append("g")
    //    .selectAll("dot")
    //    .data(data)
    //    .enter()
    //    .append("circle")
    //    .attr("cx", function (d) {return x(d[0]); } )
    //    .attr("cy", function(d) {return X(d[1]); } )
    //    .attr("r", 2)
    //    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    //    .style("fill", "CC0000");

    // const tooltip = svg.append("g")
    //                    .style("display", "none");

    // tooltip.append("circle")
    //        .attr("class", "y")
    //        .style("fill", "none")
    //        .style("stroke", "blue")
    //        .attr("r", 4);

    // svg.append("rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .style("fill", "none")
    //     .style("pointer-events", "all")
    //     .on("mouseover", function() { tooltip.style("display", null); })
    //     .on("mouseout", function() { tooltip.style("display", "none"); })
    //     .on("mousemove", mousemove);

    // function mousemove(event) {
    //     const x0 = +parseInt(x.invert(d3.pointer(event, this)[0]));
    //     console.log(x0);
    //     const i = d3.bisect(data, x0, 1),
    //         d0 = data[i-1],
    //         d1 = data[i],
    //         d = x0 - d0.year > d1.year - x0 ? d1 : d0;

    //     svg.select("circle.y")
    //     .attr("transform", "translate(" + x(d.year) + "," +y(d.num_school) + ")");

    // }
  };

  useEffect(() => {
    createGraph();
  }, []);

  return <></>;
}

export default School;
