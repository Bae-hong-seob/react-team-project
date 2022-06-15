import * as d3 from "d3";
import { setMapProjection } from "../helpers/setMapProjection";
import { useMapTools } from "../hooks/useMapTools";
import SeoulRegion from "./SeoulRegion";
import "./SeoulRegionList.css";

export default function SeoulRegionList({Region, setRegeionName}) {
  // step 1: load geoJSON and create tooltip
  const { mapData } = useMapTools();
  // render map only when map data is fully loaded
  if (!mapData.loading) {
    // step 2: render the regions
    // compute a path function based on correct projections that we will use later
    const path = d3.geoPath().projection(setMapProjection(mapData.data));

    // for each geoJSON coordinate, compute and pass in the equivalent svg path
    const seoulRegions = mapData.data.features.map((data) => {
      //console.log(data.properties.name);
      const region_name = data.properties.name;
      return (
        <SeoulRegion
          key={data.properties.code}
          path={path(data)}
          tooltipData={region_name}
          regionName={Region}
          setRegeionName={setRegeionName}
        />
      );
    });

    return (
      <>
        <svg className="map-canvas">
          <g>{seoulRegions}</g>
        </svg>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
