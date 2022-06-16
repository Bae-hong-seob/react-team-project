import "./App.css";
import React, { useRef, useEffect, useState } from "react";
//import { FaAngleDown } from "react-icons/fa";
import SeoulRegionList from "./components/SeoulRegionList";
import * as d3 from "d3";
import input_data from "./data/Report.csv";
import School from "./School";
import AnimatedPieHooks from "./AnimatedPieHooks";
import Bar from "./4_Bar";
import SeoulSchool from "./Seoul_School"
import SeoulStudent from "./Seoul_Student"

let load_Data = [];

function App() {
  // ——————————————조건문 지역별 데이터 볼 때는 region에서 seoul삭제. 혼자 값이 너무 큼.
  // 지금 complie 이전에 readcsv가 실행되지않아 받아오는 값이 없다. 따라서 App.js에서 데이터 전처리가 불가능함.
  // ——————————————여기까지 조건문 (이벤트 발생 시) slice전달. 아직 안짬
  let proportion = [
    18396, 6436, 18561, 6407, 18690, 6312, 18585, 6457, 18625, 6445, 18621,
    6368, 18780, 6154, 18854, 936, 19149, 969,
  ];
  /////// 그래프 그리기위한 코드
  // 홍섭
  // year,region,num_school,num_class,total_stu,man_stu,women_stu,total_teacher,man_teacher,women_teacher,total_employee,man_employee,women_emplyee,num_graduate,num_entrant,area,build_area
  //let Year = "2014";
  // let Region = "Seoul";
  let [Year, setYears] = useState(2021);
  let [Region, setRegeionName] = useState("Seoul");
  //

  const readCsv = async () => {
    let file = await d3.csv(input_data);
    // 홍섭
    file.map((load_csv) => {
      load_Data.push(load_csv);
    });
  };

  useEffect(() => {
    readCsv();
  });

  //오오 된다.
  //console.log(Data[1])
  let Data = load_Data.slice(0, 234);

  // let tmp = [];
  // Data.map((load_csv) => {
  //   if (load_csv.region === "Seoul") tmp.push(load_csv.year);
  // });
  // console.log(tmp)
  ///////////////////////////////////

  // 서울 내 구역별 수(서울시 전체 포함) 26개

  const onClick = (e) => {
    let newYear = e.target.value;
    //setYears((Year = parseInt(newYear)));
    setYears((Year = newYear));
    setData(generateData(2 * (2021 - newYear)));
    generate_total_stu();
    generate_num_class();
    generate_total_teacher();
    generate_num_entrant();
    setNumber(newYear);
  };

  useEffect(() => {
    generate_total_stu();
    generate_num_class();
    generate_total_teacher();
    generate_num_entrant();
  }, [Year]);

  useEffect(() => {
    generate_total_stu();
    generate_num_class();
    generate_total_teacher();
    generate_num_entrant();
  }, [Region]);

  //let total_stu = [];
  let [total_stu, set_total_stu] = useState([]);
  let [num_class, set_num_class] = useState([]);
  let [total_teacher, set_total_teacher] = useState([]);
  let [num_entrant, set_num_entrant] = useState([]);
  let [x_label, setxlabel] = useState([]);
  let [y_label, setylabel] = useState([]);

  let stu_teacher_ratio;
  let RT = document.getElementsByClassName("ratio")[0];
  for (var key in Data) {
    var personObj = Data[key];

    // stu_teacher_ratio = total_stu / total_teacher
    console.log(personObj.year === String(Year));
    if (personObj.year === String(Year) && personObj.region === Region) {
      stu_teacher_ratio = personObj.total_stu / personObj.total_teacher;
      RT.innerHTML = stu_teacher_ratio;
      console.log(stu_teacher_ratio);
    }
  }

  //let [year, setyear] = useState([2021]);
  const generate_total_stu = () => {
    set_total_stu([]);
    //setxlabel((x_label = [2021, Year]));
    setxlabel((x_label = [Year,2021]));

    let tmp = [];

    for (var key in Data) {
      var personObj = Data[key];
      if (personObj.year === String(Year) && personObj.region === Region) {
        tmp.push(parseInt(personObj.total_stu));
      }
    }

    for (var key in Data) {
      var personObj = Data[key];
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === "2021" && personObj.region === Region) {
        tmp.push(parseInt(personObj.total_stu));
      }
    }

    setylabel((y_label = ["2021", Year]));
    set_total_stu((total_stu = [...tmp]));
    //console.log(total_stu)
  };

  const generate_num_class = () => {
    set_num_class([]);
    setxlabel((x_label = [Year,2021]));

    let tmp = [];

    for (var key in Data) {
      var personObj = Data[key];
      if (personObj.year === String(Year) && personObj.region === Region) {
        tmp.push(parseInt(personObj.num_class));
      }
    }

    for (var key in Data) {
      var personObj = Data[key];
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === "2021" && personObj.region === Region) {
        tmp.push(parseInt(personObj.num_class));
      }
    }

    setylabel((y_label = ["2021", Year]));
    set_num_class((num_class = [...tmp]));
    //console.log(total_stu)
  };

  const generate_total_teacher = () => {
    set_total_teacher([]);
    setxlabel((x_label = [Year,2021]));

    let tmp = [];

    for (var key in Data) {
      var personObj = Data[key];
      if (personObj.year === String(Year) && personObj.region === Region) {
        tmp.push(parseInt(personObj.total_teacher));
      }
    }

    for (var key in Data) {
      var personObj = Data[key];
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === "2021" && personObj.region === Region) {
        tmp.push(parseInt(personObj.total_teacher));
      }
    }

    setylabel((y_label = ["2021", Year]));
    set_total_teacher((total_teacher = [...tmp]));
    //console.log(total_stu)
  };

  const generate_num_entrant = () => {
    set_num_entrant([]);
    setxlabel((x_label = [Year,2021]));

    let tmp = [];

    for (var key in Data) {
      var personObj = Data[key];
      if (personObj.year === String(Year) && personObj.region === Region) {
        tmp.push(parseInt(personObj.num_entrant));
      }
    }

    for (var key in Data) {
      var personObj = Data[key];
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === "2021" && personObj.region === Region) {
        tmp.push(parseInt(personObj.num_entrant));
      }
    }

    setylabel((y_label = ["2021", Year]));
    set_num_entrant((num_entrant = [...tmp]));
    //console.log(total_stu)
  };

  // /////////////파이차트//////////////
  let number = 10;

  const generateData = (value, length = 2) =>
    d3.range(length).map((i) => ({ value: proportion[i + value] }));

  const [data, setData] = useState(generateData(0));
  const [target, setNumber] = useState(2021);
  useEffect(() => {
    setData(generateData(0));
  }, [!data]);

  const canvas1 = useRef();

  return (
    <div className="App">
      <div className="container">
        <input id="dropdown" type="checkbox" />
        <label className="dropdownLabel" for="dropdown">
          <div>{target}년</div>
          {/*<FaAngleDown className="caretIcon" />*/}
        </label>
        <div className="content">
          <ul>
            <li onClick={onClick} value="2021" className="list">
              2021
            </li>
            <li onClick={onClick} value="2020" className="list">
              2020
            </li>
            <li onClick={onClick} value="2019" className="list">
              2019
            </li>
            <li onClick={onClick} value="2018" className="list">
              2018
            </li>
            <li onClick={onClick} value="2017" className="list">
              2017
            </li>
            <li onClick={onClick} value="2016" className="list">
              2016
            </li>
            <li onClick={onClick} value="2015" className="list">
              2015
            </li>
            <li onClick={onClick} value="2014" className="list">
              2014
            </li>
            <li onClick={onClick} value="2013" className="list">
              2013
            </li>
          </ul>
        </div>
      </div>
      <span className="Ustu"><b>총 학생수</b></span>
      <span className="Uclass"><b>총 학교수</b></span>
      <div className="third">
        <SeoulStudent></SeoulStudent>
        <SeoulSchool></SeoulSchool>
        <span className="dddd">
        <AnimatedPieHooks
          data={data}
          width={211}
          height={300}
          innerRadius={60}
          outerRadius={100}
        />
        </span>
        <span className="label1">■ 공실수</span>
        <span className="label2">■ 학급수</span>
        <span className="label3">{target}년</span>
      </div>

      <div className="fourth">
        <SeoulRegionList
          className={"y"}
          regeionName={Region}
          setRegeionName={setRegeionName}
        />
        <canvas ref={canvas1} className={"cccc"}></canvas>
        <Bar id="bar" x={x_label} y={total_stu}></Bar>
        <Bar x={x_label} y={num_class}></Bar>
        <Bar x={x_label} y={num_entrant}></Bar>
        <Bar x={x_label} y={total_teacher}></Bar>

        {/* <div className="forJ"> {Year} </div> */}
        <div className="ratio">21</div>
        <span className="Tstu">총 학생수</span>
        <span className="Tclass">총 학급수</span>
        <span className="Tteacher">총 입학자수</span>
        <span className="Tentrant">총 선생님수</span>
      </div>
    </div>
  );
}

export default App;
