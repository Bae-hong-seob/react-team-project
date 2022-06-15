import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "../helpers/handleTooltip";
import "./SeoulRegion.css";

export default function SeoulRegion({path, tooltipData, setRegeionName, Region}) {

  let regeionNameToEng = {
    "종로구": 'Jongno-gu',
    '중구': 'Jung-gu',
    '용산구': 'Yongsan-gu' ,
    '성동구': 'Seongdong-gu',
    '광진구': 'Gwangjin-gu',
    '동대문구': 'Dongdaemun-gu',
    '중랑구': 'Jungnang-gu',
    '성북구': 'Seongbuk-gu',
    '강북구': 'Gangbuk-gu',
    '도봉구': 'Dobong-gu',
    '노원구': 'Nowon-gu',
    '은평구': 'Eunpyeong-gu',
    '서대문구': 'Seodaemun-gu',
    '마포구': 'Mapo-gu',
    '양천구': 'Yangcheon-gu',
    '강서구': 'Gangseo-gu',
    '구로구': 'Guro-gu',
    '금천구': 'Geumcheon-gu',
    '영등포구': 'Yeongdeungpo-gu',
    '동작구': 'Dongjak-gu',
    '관악구': 'Gwanak-gu',
    '서초구': 'Seocho-gu',
    '강남구': 'Gangnam-gu',
    '송파구': 'Songpa-gu',
    '강동구': 'Gang Dong-gu'
  }
  
  // const { path, tooltipData } = props;
  console.log(tooltipData)
  //each path defines the shape of a region in the map
  return (
    <>
      <path
        id="path"
        className="path"
        d={path}
        onClick={(event) => {
          setRegeionName(Region = regeionNameToEng[tooltipData])
          // regeionName.innerHTML = regeionNameToEng[tooltipData]
          //alert(event.screenX, event.screenY);
        }}
        onMouseOver={() => {
          handleMouseOver(tooltipData);
        }}
        onMouseOut={handleMouseOut}
        onMouseMove={(event) => {
          handleMouseMove(event);
        }}
        // value = {tooltipData}
        // onClick ={props.onClick}
      />
      {/*<text x="240" y="270" fontSize="20" fill="black">
        강서구
      </text>*/}
    </>
  );
}
