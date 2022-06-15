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
import Bar_teacher from "./4_Bar_teacher"

let load_Data = [];

function App() {
  // ——————————————조건문 지역별 데이터 볼 때는 region에서 seoul삭제. 혼자 값이 너무 큼.
  // 지금 complie 이전에 readcsv가 실행되지않아 받아오는 값이 없다. 따라서 App.js에서 데이터 전처리가 불가능함.
  // ——————————————여기까지 조건문 (이벤트 발생 시) slice전달. 아직 안짬

  /////// 그래프 그리기위한 코드
  // 홍섭
  // year,region,num_school,num_class,total_stu,man_stu,women_stu,total_teacher,man_teacher,women_teacher,total_employee,man_employee,women_emplyee,num_graduate,num_entrant,area,build_area
  //let Year = "2014";
  let Region = "Seoul";
  let year_list = [];
  let region_list = [];
  let num_school_list = [];
  let num_class_list = [];
  let total_stu_list = [];
  let total_teacher_list = [];
  let num_entrant_list = [];

  let [Year, setYears] = useState(2021);
  //

  let table = [];
  let year = [];
  let student = [];
  let teacher = [];



  const readCsv = async () => {
    let file = await d3.csv(input_data);
    // 홍섭

    // // year_list 추출
    // file.map((load_csv) => {
    //   year_list.push(load_csv.year);
    // });
    // // region_list 추출
    // file.map((load_csv) => {
    //   region_list.push(load_csv.region);
    // });
    // // num_school_list 추출
    // file.map((load_csv, index) => {
    //   num_school_list.push(parseInt(load_csv.num_school));
    // });
    // // num_class_list 추출
    // file.map((load_csv, index) => {
    //   num_class_list.push(parseInt(load_csv.num_class));
    // });
    // // 지역이 seoul일때 total_stu추출
    // file.map((load_csv) => {
    //   total_stu_list.push(load_csv.total_stu);
    // });
    // // 지역이 seoul일때 학급수(num_class)추출
    // file.map((load_csv) => {
    //   num_class_list.push(load_csv.num_class);
    // });
    // // 지역이 seoul일때 교원 수(total_teacher_list)추출
    // file.map((load_csv) => {
    //   total_teacher_list.push(load_csv.total_teacher);
    // });
    // // 지역이 seoul일때 입학자 수(num_entrant)추출
    // file.map((load_csv) => {
    //   num_entrant_list.push(load_csv.num_entrant);
    // });

    file.map((load_csv) => {
      load_Data.push(load_csv);
    });

    // 홍섭

    // file.map((load_csv) => {
    //   if (load_csv.region === "Seoul") table.push(load_csv.num_school);
    // });

    // file.map((load_csv) => {
    //   if (load_csv.region === "Seoul") year.push(load_csv.year);
    // });

    // file.map((load_csv) => {
    //   if (load_csv.region === "Seoul") student.push(load_csv.total_stu);
    // });

    // file.map((load_csv) => {
    //   if (load_csv.region === "Seoul") teacher.push(load_csv.total_teacher);
    // });


  };

  useEffect(() => {
    readCsv();
  }, );


  //오오 된다.
  //console.log(Data[1])
  let Data = load_Data.slice(0,234)
  console.log(Data)
  console.log(load_Data)
  console.log(Object.keys(load_Data))
  console.log(Object.values(load_Data))
  console.log(load_Data.keys)
  console.log(Data[1])

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
    setYears((Year = (newYear)));
    setData(generateData());
    generate_total_stu();
  };

  useEffect(() => {
    generate_total_stu();
  }, [Year]);

  //let total_stu = [];
  let [total_stu, set_total_stu] = useState([]);
  let [x_label, setxlabel] = useState([]);
  let [y_label, setylabel] = useState([]);

  let stu_teacher_ratio;
  for(var key in Data){
    var personObj = Data[key]; 

    // stu_teacher_ratio = total_stu / total_teacher
    console.log(personObj.year === String(Year))
    if (personObj.year === String(Year) && personObj.region === Region){
      stu_teacher_ratio = personObj.total_stu / personObj.total_teacher
      console.log(stu_teacher_ratio)
    }
  }

  //let [year, setyear] = useState([2021]);
  const generate_total_stu = () => {
    set_total_stu([]);
    setxlabel(x_label = [2021,Year]);

    let tmp = [];
    // Data.map((load_csv) => {
    //   if (load_csv.year === Year && load_csv.region === 'Seoul') tmp.push(load_csv.total_stu);
    // });
    // console.log(Data)
    // console.log(tmp)
    console.log('here')
    for(var key in Data){
      var personObj = Data[key]; 
      // // personObj로 이제 Data에 json처럼 접근 가능함
      // console.log(key + ", " + personObj.year + ", " + personObj.region);  
      // console.log(typeof(personObj.region))
      // console.log(typeof(Region))
      // console.log(Year)

      console.log(personObj.year === String(Year))
      if (personObj.year === String(Year) && personObj.region === Region){
        console.log(personObj.year)
        tmp.push(399435)
        tmp.push(parseInt(personObj.total_stu))
        console.log(tmp)
      }
      //결과 : 
      //pk11, 홍길동, 29 
      //pk22, 손흥민, 34
      //pk33, 배수도, 33
    }
    setylabel(y_label = ['2021',Year])

    let temp = [];
    let tem = Year.toString();
    let index = year_list.indexOf(tem)

    // 지역이 seoul일때 total_stu추출
    temp.push('399435')
    temp.push(total_stu_list[index])

    set_total_stu((total_stu = [...tmp]))
    //set_total_stu((total_stu = ['399435',String(total_stu_list[index])]))

    console.log(total_stu)
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
              <li onClick={onClick} value="2022" className="list">
                2022
              </li>
              <li onClick={onClick} value="2021" className="list">
                2021
              </li>
              <li onClick={onClick} value="2020" className="list">
                2020
              </li>
            </ul>
          </div>
        </div>

        <SeoulRegionList className={"y"} />

        <Bar x={x_label} y={total_stu}></Bar>
        <Bar_teacher/>
        <Bar x={year_list} y={num_entrant_list}></Bar>
        <Bar x={year_list} y={num_class_list}></Bar>
        <Bar x={year_list} y={total_teacher_list}></Bar>

        <b>{total_stu}</b>

        {/*<canvas ref={canvas1} className = {"cccc"}></canvas>*/}
      </div>
    </div>
  );
}

export default App;
