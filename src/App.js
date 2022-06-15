import "./App.css";
import React, { useRef, useEffect, useState } from "react";
//import { FaAngleDown } from "react-icons/fa";
import SeoulRegionList from "./components/SeoulRegionList";
import * as d3 from "d3";
import input_data from "./data/Report.csv";
import SchoolLine from "./SchoolLine";
import StudentLine from "./StudentLine";
import AnimatedPieHooks from "./AnimatedPieHooks";
import Bar from "./4_Bar";
import $ from 'jquery';
window.$ = $;

let load_Data = [];

function App() {
  // ——————————————조건문 지역별 데이터 볼 때는 region에서 seoul삭제. 혼자 값이 너무 큼.
  // 지금 complie 이전에 readcsv가 실행되지않아 받아오는 값이 없다. 따라서 App.js에서 데이터 전처리가 불가능함.
  // ——————————————여기까지 조건문 (이벤트 발생 시) slice전달. 아직 안짬

  /////// 그래프 그리기위한 코드
  // 홍섭
  let [Year, setYears] = useState(2021);
  let [Region, setRegeionName] = useState("Seoul");
  //

  let table = [];
  let year = [];
  let student = [];



  const readCsv = async () => {
    let file = await d3.csv(input_data);
    // 홍섭
    file.map((load_csv) => {
      load_Data.push(load_csv);
    });

  };

  useEffect(() => {
    readCsv();
  }, );

  
  //오오 된다.
  //console.log(Data[1])
  let Data = load_Data.slice(0,234)
  // console.log(Data)
  // console.log(load_Data)
  // console.log(Object.keys(load_Data))
  // console.log(Object.values(load_Data))
  // console.log(load_Data.keys)
  // console.log(Data[1])

  // let tmp = [];
  // Data.map((load_csv) => {
  //   if (load_csv.region === "Seoul") tmp.push(load_csv.year);
  // });
  // console.log(tmp)
  ///////////////////////////////////
  
  // 서울 내 구역별 수(서울시 전체 포함) 26개

  function bar_reload(){  
    $('#bar').load(window.location.href+' #bar');
    console.log("Here")
    //window.location.reload();
  }

  const onClick = (e) => {
    bar_reload();
    let newYear = e.target.value;
    //setYears((Year = parseInt(newYear)));
    setYears((Year = (newYear)));
    setData(generateData());
    generate_total_stu();
    generate_num_class();
    generate_total_teacher();
    generate_num_entrant();

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

  let [total_stu, set_total_stu] = useState([]);
  let [num_class, set_num_class] = useState([]);
  let [total_teacher, set_total_teacher] = useState([]);
  let [num_entrant, set_num_entrant] = useState([]);
  let [x_label, setxlabel] = useState([]);

  let stu_teacher_ratio;
  let RT = document.getElementsByClassName('ratio')[0]
  for(var key in Data){
    var personObj = Data[key]; 

    // stu_teacher_ratio = total_stu / total_teacher
    //console.log(personObj.year === String(Year))
    if (personObj.year === String(Year) && personObj.region === Region){
      stu_teacher_ratio = personObj.total_stu / personObj.total_teacher
      RT.innerHTML = stu_teacher_ratio
    }
  }

  

  //let [year, setyear] = useState([2021]);
  const generate_total_stu = () => {

    set_total_stu([]);
    setxlabel(x_label = [2021,Year]);

    let tmp = [];
    for(var key in Data){
      var personObj = Data[key]; 
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === '2021' && personObj.region === Region){
        tmp.push(parseInt(personObj.total_stu))
      }
    }
    for(key in Data){
      personObj = Data[key]; 
      if (personObj.year === String(Year) && personObj.region === Region){
        tmp.push(parseInt(personObj.total_stu))
      }
    }

    set_total_stu((total_stu = [...tmp]))
    //console.log(total_stu)
  }
  const generate_num_class = () => {

    set_num_class([]);
    setxlabel(x_label = [2021,Year]);

    let tmp = [];
    for(var key in Data){
      var personObj = Data[key]; 
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === '2021' && personObj.region === Region){
        tmp.push(parseInt(personObj.num_class))
      }
    }
    for(key in Data){
      personObj = Data[key]; 
      if (personObj.year === String(Year) && personObj.region === Region){
        tmp.push(parseInt(personObj.num_class))
      }
    }
    
    set_num_class((num_class = [...tmp]))
    //console.log(total_stu)
  }

  const generate_total_teacher = () => {

    set_total_teacher([]);
    setxlabel(x_label = [2021,Year]);

    let tmp = [];
    for(var key in Data){
      var personObj = Data[key]; 
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === '2021' && personObj.region === Region){
        tmp.push(parseInt(personObj.total_teacher))
      }
    }
    for(key in Data){
      personObj = Data[key]; 
      if (personObj.year === String(Year) && personObj.region === Region){
        tmp.push(parseInt(personObj.total_teacher))
      }
    }
    
    set_total_teacher((total_teacher = [...tmp]))
    //console.log(total_stu)
  }

  const generate_num_entrant = () => {

    set_num_entrant([]);
    setxlabel(x_label = [2021,Year]);

    let tmp = [];
    for(var key in Data){
      var personObj = Data[key]; 
      // // personObj로 이제 Data에 json처럼 접근 가능함

      if (personObj.year === '2021' && personObj.region === Region){
        tmp.push(parseInt(personObj.num_entrant))
      }
    }
    for(key in Data){
      personObj = Data[key]; 
      if (personObj.year === String(Year) && personObj.region === Region){
        tmp.push(parseInt(personObj.num_entrant))
      }
    }
    
    set_num_entrant((num_entrant = [...tmp]))
    //console.log(total_stu)
  }

  // /////////////파이차트//////////////
  let number = 10;

  const generateData = (value, length = 2) =>
    d3.range(length).map((index) => ({
      date: index,
      value: value === null || value === undefined ? number : value,
    }));

  const [data, setData] = useState(generateData(0));

  useEffect(() => {
    setData(generateData());
  }, [!data]);

  const canvas1 = useRef();

  return (
    <div className="App">
      <div className="third">
        <SchoolLine Lable={table} Year={year}></SchoolLine>
        <StudentLine Student={student} Year={year}></StudentLine>
        <AnimatedPieHooks
          data={data}
          width={211}
          height={300}
          innerRadius={60}
          outerRadius={100}
        />
      </div>

      <div className="fourth">
        <div className="container">
          <input id="dropdown" type="checkbox" />
          <label className="dropdownLabel" for="dropdown">
            <div>Years</div>
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

        <SeoulRegionList className={"y"} regeionName={Region} setRegeionName={setRegeionName} x={x_label} total_stu={total_stu} num_class={num_class} total_teacher={total_teacher} num_entrant={num_entrant}/>
        <Bar id='bar' x={x_label} y={total_stu}></Bar>
        <Bar x={x_label} y={num_class}></Bar>
        <Bar x={x_label} y={total_teacher}></Bar>
        <Bar x={x_label} y={num_entrant}></Bar>


        <canvas ref={canvas1} className = {"cccc"}></canvas>
        <div>{Region}</div>
        <div className='forJ'> {Year} </div>
        <div className= 'ratio'>21</div>
      </div>
    </div>
  );
}

export default App;
