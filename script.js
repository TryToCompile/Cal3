const monthNames = [
    "Выбрать месяц",
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ];
  
  const years = [
    "Выбрать год",
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021"
  ];
  
  function createHeader(elementId) {
    if (elementId == false) elementId = "header";
    let element = document.getElementById(`${elementId}`);
    let header = document.createElement("section");
    header.className = "head";
    element.append(header);
    // create calendar button
    let createBtn = document.createElement("button");
    createBtn.innerText = "Создать";
    createBtn.className = "createBtn";
    createBtn.addEventListener("click", function () {
      const year = Number(selectYear.options[selectYear.selectedIndex].text);
      const month = Number(selectMonth.options[selectMonth.selectedIndex].value);
      const date = new Date(year, month, 1, 0, 0, 0);
      if (date.toString() == "Invalid Date") console.error("Invalid Date");
      else {
        createCalendar(year, month);
        deleteBtn.disabled = false;
      }
    })
    header.append(createBtn);
    // selects
    let selectMonth = document.createElement("select");
    let selectYear = document.createElement("select");
    for (let i = 0; i < monthNames.length; i++) {
      let opt = document.createElement("option");
      opt.value = i;
      opt.text = monthNames[i];
      selectMonth.add(opt, null);
    }
    for (let i = 0; i < years.length; i++) {
      let opt = document.createElement("option");
      //opt.value = i;
      opt.text = years[i];
      selectYear.add(opt, null);
    }
    header.append(selectMonth);
    header.append(selectYear);
    // delete calendar button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Удалить";
    deleteBtn.className = "deleteBtn";
    deleteBtn.disabled = true;
    deleteBtn.addEventListener("click", function () {
        deleteCalendar();
    })
    header.append(deleteBtn);
  }

  
function deleteCalendar(){
    let node = document.getElementById("main");
    node.firstChild.remove();
};

/*== Но если в селектах будет хотя бы одно из default’ных значений (“Выбрать месяц” или “Выбрать год”),
 то кнопка задизейблена, т.е. не активна.
== Если нет календарей для удаления, то кнопка задизейблена, т.е. не активна.
 */

//  let month = 12;
//  let year = 1999;
  //let month = Number(prompt("Введите месяц(номер):"));
  //let year = Number(prompt("Введите год(номер):"));
  
  let i = 0;
  function createCalendar(year = 1999, month = 12, elementId, className = "cal") {
    if (elementId == undefined) elementId = "main";
    ++i;
    className = className + i;
    // Точная дата в данный момент, первый день этого месяца
    let specificDate = new Date(year, month - 1, 1, 0, 0, 0);
    // Последний день этого же месяца, который мы достаём с помощью обращения к следующему месяцу через
    // нулевой день этого следующего месяца
    let nextDate = new Date(year, month, 0, 0, 0, 0);
    console.log(nextDate);
    let element = document.getElementById(`${elementId}`);
    let daysInMonth = getDayOfMonth(nextDate);
    let firstDay = getFirstDayOfWeek(specificDate);
    let days = [];
    for (let i = 1; days.length < daysInMonth; i++) {
      days.push(i);
    }
    let section = document.createElement("section");
    section.className = className;
    debugger;
    element.append(section);
  
    let div = document.createElement("div");
    div.className = `${className}-head cal-head`;
    section.append(div);
    let btnLastYear = document.createElement("span");
    let btnLastMonth = document.createElement("span");
    btnLastYear.className = `${className}-btn btnLastYear cal-btn`;
    btnLastMonth.className = `${className}-btn btnLastMonth cal-btn`;
    btnLastYear.innerText = "<<";
    btnLastMonth.innerText = "<";
    btnLastYear.addEventListener("click", lastYear);
    btnLastMonth.addEventListener("click", lastMonth);
    function lastYear() {
      let mode = "specific";
      clearCalendar(`${className}`);
      year -= 1;
      fillCalendar(year, month, mode);
    }
    function lastMonth() {
      let mode = "specific";
      clearCalendar(`${className}`);
      if (month === 1) {
        year -= 1;
        month = 12;
      } else {
        --month;
      }
      fillCalendar(year, month, mode);
    }
    div.append(btnLastYear);
    div.append(btnLastMonth);
    let txtDate = document.createElement("span");
    let temp = specificDate.toLocaleString("ru", {
      year: "numeric",
      month: "long"
    });
    txtDate.innerText = temp;
    div.append(txtDate);
    let btnNextYear = document.createElement("span");
    let btnNextMonth = document.createElement("span");
    btnNextYear.className = `${className}-btn btnNextYear cal-btn`;
    btnNextMonth.className = `${className}-btn btnNextMonth cal-btn`;
    btnNextYear.innerText = ">>";
    btnNextMonth.innerText = ">";
    btnNextYear.addEventListener("click", nextYear);
    btnNextMonth.addEventListener("click", nextMonth);
    function nextYear() {
      let mode = "specific";
      clearCalendar(`${className}`);
      year += 1;
      fillCalendar(year, month, mode);
    }
    function nextMonth() {
      let mode = "specific";
      clearCalendar(`${className}`);
      if (month === 12) {
        year += 1;
        month = 1;
      } else {
        ++month;
      }
      fillCalendar(year, month, mode);
    }
    div.append(btnNextMonth);
    div.append(btnNextYear);
  
    let calBody = document.createElement("div");
    calBody.className = `${className}-body cal-body`;
    section.append(calBody);
  
    function fillCalendar(year, month, mode) {
      let dayNames = "пн вт ср чт пт сб вс";
      dayNames = dayNames.split(" ");
      for (let i = 0; i < dayNames.length; i++) {
        let div = document.createElement("div");
        div.className = `dayName`;
        div.innerText = `${dayNames[i]}`;
        calBody.append(div);
      }
      calBody.addEventListener('click', calBodyClickHandler);
      calBody.addEventListener('blur', calBodyBlurHandler);
      if (mode === "specific") {
        console.log(year, " ", month);
        specificDate = new Date(year, month - 1, 1, 0, 0, 0);
        nextDate = new Date(year, month, 0, 0, 0, 0);
        daysInMonth = getDayOfMonth(nextDate);
        firstDay = getFirstDayOfWeek(specificDate);
        days = [];
        for (let i = 1; days.length < daysInMonth; i++) {
          days.push(i);
        }
        let temp = specificDate.toLocaleString("ru", {
          year: "numeric",
          month: "long"
        });
        txtDate.innerText = temp;
      }
  
      for (let i = 1; i < days.length + firstDay; i++) {
        //debugger;
        let temp = document.createElement(`div`);
        if (
          i === 6 ||
          i === 7 ||
          i === 13 ||
          i === 14 ||
          i === 20 ||
          i === 21 ||
          i === 27 ||
          i === 28 ||
          i === 34 ||
          i === 35
        ) {
          temp.className = `${className}-elem${i} weekend`;
        } else {
          temp.className = `${className}-elem${i}`;
        }
        calBody.append(temp);
      }
  
      for (let i = 0; i < days.length; i++) {
        let temp = document.getElementsByClassName(
          `${className}-elem${firstDay + i}`
        )[0];
        temp.innerText = `${days[i]}`;
      }
    }
    fillCalendar();
    function clearCalendar(className) {
      let calBody = document.querySelector(`.${className}-body`);
      while (calBody.firstChild) {
        calBody.removeChild(calBody.firstChild);
      }
    }
    function calBodyClickHandler(event){
      const activeElement = event.currentTarget.querySelector('.active');
      console.log(this,'dasdas');
      if (  
        event.target.className !== 'dayName' && 
        !event.target.classList.contains('cal-body') && 
        event.target.innerText !== ''
      ) {
        if (activeElement != event.target && activeElement) {
          activeElement.classList.remove('active');
        }

        event.target.classList.add('active');
      }
   }
    function calBodyBlurHandler(event){
      if (event.target.className != 'dayName' && 
          !event.target.classList.contains('cal-body') &&
          event.target.innerText != ''){
//        event.target.classList.remove('active');
      }
    }
  }
  createHeader("header");  
//  createCalendar(year, month, "main", "cal");
  // createCalendar(1999, 1, "", "cal");
  // createCalendar(1999, 2, "", "cal");
  // createCalendar(1999, 3, "", "cal");
  // createCalendar(1999, 4, "", "cal");
  // createCalendar(1999, 5, "", "cal");
  // createCalendar(1999, 6, "", "cal");
  // createCalendar(1999, 7, "", "cal");
  // createCalendar(1999, 8, "", "cal");
  // createCalendar(1999, 9, "", "cal");
  // createCalendar(1999, 10, "", "cal");
  // createCalendar(1999, 11, "", "cal");
  // createCalendar(1999, 12, "", "cal");
  
  function getDayOfMonth(date) {
    let dayOfMonth = date.getDate();
    return dayOfMonth;
  }
  
  function getFirstDayOfWeek(date) {
    let firstDay = date.getDay();
    if (firstDay == 0) firstDay = 7;
    return firstDay;
  }
  
  // месяц идет от 0 до 11, ноль в nextDate берет нулевой день следующего, за выбранным месяца, но
  // так как дни считаются от 1, то 0 - это последний день предыдущего (выбранного) месяца
  // const specificDate = new Date(year, month - 1, 1, 0, 0, 0);
  // const nextDate = new Date(year, month, 0, 0, 0, 0);
  // const daysInMonth = nextDate.getDate();
  // let firstDay = specificDate.getDay();
  // if (firstDay == 0) firstDay = 7;
  // console.log(daysInMonth);
  // console.log(firstDay);
  // const days = [];
  // for (let i = 1; days.length < daysInMonth; i++) {
  //   days.push(i);
  // }
  // console.log(days);
  
  // let section = document.createElement("section");
  // section.className = "cal";
  // document.body.append(section);
  
  // let div = document.createElement("div");
  // div.className = "cal-head";
  // let temp = specificDate.toLocaleString("ru", {
  //   year: "numeric",
  //   month: "long"
  // });
  // div.innerText = temp;
  // section.append(div);
  
  // let calBody = document.createElement("div");
  // calBody.className = "cal-body";
  // section.append(calBody);
  
  // let dayNames = "пн вт ср чт пт сб вс";
  // dayNames = dayNames.split(" ");
  // for (let i = 0; i < dayNames.length; i++) {
  //   let div = document.createElement("div");
  //   div.className = `dayName`;
  //   div.innerText = `${dayNames[i]}`;
  //   calBody.append(div);
  // }
  
  // for (let i = 1; i < days.length + firstDay; i++) {
  //   let temp = document.createElement(`div`);
  //   temp.className = `elem${i}`;
  //   calBody.append(temp);
  // }
  
  // for (let i = 0; i < days.length; i++) {
  //   let temp = document.getElementsByClassName(`elem${firstDay + i}`)[0];
  //   temp.innerText = `${days[i]}`;
  // }
  
  // getDate(date) = день месяца, 1-31, если такого дня в этом месяце нету - то NaN
  // getDay(date) = 0 = воскресенье
  
  //let month = prompt("Введите месяц(номер):");
  //let year = prompt("Введите год(номер):");
  