naturalDisasterArray = []; // Declare naturalDisasterArray as a global variable
fetch("MOCK_DATA.csv")
  .then((res) => res.text())
  .then((text) => {
    let lineList = text.split("\n");
    for (let line of lineList) {
      let data = line.trim().split(",");
      name.push(data[0]);
      long.push(data[1]);
      lat.push(data[2]);
      date.push(data[3]);
      intensity.push(data[4]);
      type.push(data[5]);
    }

    for (let i = 1; i < lineList.length - 1; i++) {
      let names = name[i];
      let longt = Number(long[i]);
      if (longt < -180 || longt > 180) {
        longt = "error";
      }
      let latt = Number(lat[i]);
      if (latt < -90 || latt > 90) {
        lat = "error";
      }
      let dates = date[i];
      let intensities = Number(intensity[i]);
      if (intensities < 0 || intensities > 10) {
        intensities = "error";
      }
      let types = type[i];

      let temp = new NaturalDisaster(names, longt, latt, dates, intensities, types);
      naturalDisasterArray.push(temp);
    }
    genTable(naturalDisasterArray);
  })
  .catch((e) => console.error(e));

class NaturalDisaster {
  constructor(name, long, lat, date, intensity, type) {
    this.name = name;
    this.long = long;
    this.lat = lat;
    this.date = date;
    this.intensity = intensity;
    this.type = type;
  }
}

let name = [];
let long = [];
let lat = [];
let date = [];
let intensity = [];
let type = [];

function activateIntensityFilter() {
  let filteredData = intensityFilter();
  genTable(filteredData);
}

function intensityFilter() {
  let swapped;
  let temp;
  for (let i = 0; i < naturalDisasterArray.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < naturalDisasterArray.length - 1 - i; j++) {
      if (naturalDisasterArray[j].intensity > naturalDisasterArray[j + 1].intensity) {
        temp = naturalDisasterArray[j];
        naturalDisasterArray[j] = naturalDisasterArray[j + 1];
        naturalDisasterArray[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return naturalDisasterArray;
}

function activateIntensityFilterReverse() {
  genTable(intensityFilterReverse());
}

function intensityFilterReverse() {
  let swapped;
  let temp;
  for (let i = 0; i < naturalDisasterArray.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < naturalDisasterArray.length - 1 - i; j++) {
      if (naturalDisasterArray[j].intensity < naturalDisasterArray[j + 1].intensity) {
        temp = naturalDisasterArray[j];
        naturalDisasterArray[j] = naturalDisasterArray[j + 1];
        naturalDisasterArray[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return naturalDisasterArray;
}

function activateTypeFilterTornado() {
  genTable(typeFilter("tornado"));
}

function activateTypeFilterHurricane() {
  genTable(typeFilter("hurricane"));
}
function activateTypeFilterEarthquake() {
  genTable(typeFilter("earthquake"));
}
function activateTypeFilterflood() {
  genTable(typeFilter("flood"));
}

function typeFilter(filterByType) {
  let filteredByType = naturalDisasterArray.filter((disaster) =>
    disaster.type.includes(filterByType)
  );
  return filteredByType;
}

function activateSortDatesDesc() {
  genTable(sortDatesDesc());
}

  function sortDatesDesc() {
    return naturalDisasterArray.sort(function (a,b) {
      var dateA = a.date, dateB = b.date;
      var newDateA = new Date(dateA);
      var newDateB = new Date(dateB);

      return newDateB - newDateA;
    });
}

function activateSortDatesAsc() {
  genTable(sortDatesAcs());
}

function sortDatesAcs() {
  return naturalDisasterArray.sort(function (a,b) {
    var dateA = a.date, dateB = b.date;
    var newDateA = new Date(dateA);
    var newDateB = new Date(dateB);

    return newDateA - newDateB;
  });
}

function activateNameFilterAZ() {
  genTable(nameFilterAZ());
}

function nameFilterAZ() {
  this.naturalDisasterArray.sort(function (a, b) {
    var nameA = a.name,
      nameB = b.name;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return naturalDisasterArray;}

  function activateNameFilterZA() {
    genTable(nameFilterZA());
  }

  function nameFilterZA() {
    naturalDisasterArray.sort(function (a, b) {
      var nameA = a.name,
        nameB = b.name;
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    return naturalDisasterArray;}

function genTable(filterCallbackFunction) {
  
  let container = document.body.querySelector(".Filtered");

  let existingTable = container.querySelector("table");
  if (existingTable) {
    container.removeChild(existingTable);
  }

    let table = document.createElement("table");
    let headerRow = table.insertRow();
  
    for (let key in naturalDisasterArray[0]) {
      let headerCell = headerRow.insertCell();
      headerCell.textContent = key;
      headerCell.style.fontWeight = 'bold';
      headerCell.style.textAlign = 'center';
    }

    for (let row of filterCallbackFunction) {
      let dataRow = table.insertRow();
  
      for (let key in row) {
        let newCell = dataRow.insertCell();
        newCell.textContent = row[key];
      }
    }
    document.body.querySelector(".Filtered").appendChild(table);
  }