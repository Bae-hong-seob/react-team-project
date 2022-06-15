import * as d3 from "d3";
import { useEffect, useRef} from "react";


function Bar({ x, y }) {

  let width = 1000;
  let margin = 20;
  let x_label = [...x];
  let y_data = [...y];

  //console.log(x_label)
  //console.log(y_data)

  const svgRef = useRef();
  const height = 500;

  let max = d3.max(y_data);

  useEffect(() => {

    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(y_data.map((v, i) => i))
      .range([20, 800])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0 , max])
      .range([height, 20]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(x_label.length)
      .tickFormat((i) => x_label[i]);
      
    svg.select(".x-axis").style("transform", "translateY(500px)").call(xAxis);
    const yAxis = d3.axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(800px)").call(yAxis);

    //const colorScale = d3.scaleLinear().domain([10, 80]).range(["blue", "red"]);


    svg
      .selectAll(".bar")
      .data(y_data, (d) => d[1]).join(
        // ENTER 
        // new elements
        (enter) => {
          const rect_enter = enter.append('rect').attr("x", (v, i) => xScale(i));
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

      .attr("class", "bar")
      .attr("x", (v, i) => xScale(i))
      .attr("y", -500)
      .attr("width", xScale.bandwidth())
      .style("transform", "scale(1,-1)")
      .transition()
      .duration(2000)
      //.attr("fill", colorScale)
      .attr("fill", '#FE6565')
      .attr("height", (v, i) => 500 - yScale(v))

      svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin/ 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("text-decoration", "underline")  
        .text("Value vs Date Graph");

  }, [y_data]);

  return (
    <>
      <svg ref={svgRef} width={1000} height={1000}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </>
  );
}

export default Bar;
