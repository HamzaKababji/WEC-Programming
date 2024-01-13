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

    let naturalDisasterArray = [];
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
      let intensities = intensity[i];
      if (intensities < 0 || intensities > 10) {
        intensities = "error";
      }
      let types = type[i];

      let temp = new NaturalDisaster(names, longt, latt, dates, intensities, types);
      naturalDisasterArray.push(temp);
    }
    genTable(naturalDisasterArray);


    function clearTable() {
        let filteredDiv = document.querySelector(".Filtered");
        while(filteredDiv.firstChild) {
            filteredDiv.removeChild(filteredDiv.firstChild);
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('sortByName').addEventListener('click', function() {
            clearTable();
            naturalDisasterArray = nameFilter(naturalDisasterArray);
            genTable(naturalDisasterArray);
        });
    
        document.getElementById('sortByDate').addEventListener('click', function () {
            clearTable();
            naturalDisasterArray = dateFilter(naturalDisasterArray); // Implement dateFilter
            genTable(naturalDisasterArray);
        });
    
        document.getElementById('sortByIntensity').addEventListener('click', function () {
            clearTable();
            naturalDisasterArray = intensityFilter(naturalDisasterArray);
            genTable(naturalDisasterArray);
        });
    
        document.getElementById('sortByType').addEventListener('click', function () {
            clearTable();
            naturalDisasterArray = typeFilter(naturalDisasterArray, /* type to filter by */);
            genTable(naturalDisasterArray);
        });
    });

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

let intensityFilterUsed = false;

function intensityFilter(naturalDisasterArray) {
  if (!intensityFilterUsed) {
    for (let i = 0; i < naturalDisasterArray.length; i++) {
      for (let j = i + 1; j < naturalDisasterArray.length; j++) {
        if (
          naturalDisasterArray[j].intensity < naturalDisasterArray[i].intensity
        ) {
          let temp = naturalDisasterArray[i];
          naturalDisasterArray[i] = naturalDisasterArray[j];
          naturalDisasterArray[j] = temp;
        }
      }
    }
    intensityFilterUsed = true;
  } else {
    for (let i = 0; i < naturalDisasterArray.length; i++) {
      for (let j = i + 1; j < naturalDisasterArray.length; j++) {
        if (
          naturalDisasterArray[j].intensity > naturalDisasterArray[i].intensity
        ) {
          let temp = naturalDisasterArray[j];
          naturalDisasterArray[j] = naturalDisasterArray[i];
          naturalDisasterArray[i] = temp;
        }
      }
    }
    intensityFilterUsed = false;
  }
  return naturalDisasterArray;
}

function typeFilter(naturalDisasterArray, filterByType) {
  let filteredByType = naturalDisasterArray.filter((disaster) =>
    disaster.type.includes(filterByType)
  );
  return filteredByType;
}

function nameFilter(naturalDisasterArray) {
  naturalDisasterArray.sort(function (a, b) {
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
  return naturalDisasterArray;
}

function genTable(naturalDisasterArray) {
    let table = document.createElement("table");

    // Create header row
    let headerRow = table.insertRow();
    let headerCells = ["Name", "Longitude", "Latitude", "Date", "Intensity", "Type"];
    for (let headerCellText of headerCells) {
        let headerCell = headerRow.insertCell();
        let button = document.createElement("button");
        button.className = "table-button";
        button.textContent = headerCellText;
        headerCell.appendChild(button);
    }

    // Populate table with data rows
    for (let row of naturalDisasterArray) {
        let dataRow = table.insertRow();

        for (let key in row) {
            let newCell = dataRow.insertCell();
            newCell.textContent = row[key];
        }
    }

    document.body.querySelector(".Filtered").appendChild(table);
}

