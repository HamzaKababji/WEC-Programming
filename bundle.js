(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fs = require('uniq');

class NaturalDisaster{
    constructor(name, long, lat, date, intensity, type){
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

let dataFile = fs.readFileSync('MOCK_DATA.csv', 'utf-8');
let lineList = dataFile.split('\n');

for (let line of lineList) {
    let data = line.trim().split(",");
    name.push(data[0]);
    long.push(data[1]);
    lat.push(data[2]);
    date.push(data[3]);
    intensity.push(data[4]);
    type.push(data[5]);
}
    
let naturalDisasterArray= [];
for(let i = 1; i < dataFile.length; i++) {

    let names = name[i];
    let longt = Number(long[i]);
    if (longt < -180  || longt > 180){
        longt = "error";
    }
    let latt = Number(lat[i]);
    if (latt < -90  || latt > 90){
        lat= "error";
    }
    let dates = date[i];
    let intensities = intensity[i];
    if (intensities < 0  || intensities > 10){
        intensities= "error";
    }
    let types = type[i];

    let temp = new NaturalDisaster(names, longt, lat, dates, intensities, types);
    naturalDisasterArray.push(temp);
}

let intensityFilterUsed = false;

function intensityFilter(naturalDisasterArray) {
    if (!intensityFilterUsed) {
        for (let i = 0; i < naturalDisasterArray.length; i++) {
            for (let j = i + 1; j < naturalDisasterArray.length; j++) {
                if (naturalDisasterArray[j].intensity < naturalDisasterArray[i].intensity) {
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
                if (naturalDisasterArray[j].intensity > naturalDisasterArray[i].intensity) {
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
    let filteredByType = naturalDisasterArray.filter(disaster => disaster.type.includes(filterByType));
    return filteredByType;
}


function nameFilter(naturalDisasterArray)
{
    naturalDisasterArray.sort(function(a,b)
    {
        var nameA = a.name, nameB = b.name;
        if(nameA < nameB)
        {
            return -1
        }
        if(nameA > nameB)
        {
            return 1
        }
        return 0;
    });
    return naturalDisasterArray;
}

function genTable(naturalDisasterArray){
    let table = document.createElement('table')

    for (let row of naturalDisasterArray) {
    
          table.insertRow();
        
          for (let cell of row) {
        
            let newCell = table.rows[table.rows.length - 1].insertCell();
            newCell.textContent = cell;
          }
        }
    document.body.querySelector('.Filtered').appendChild(table);
}

genTable(naturalDisasterArray)

},{"uniq":2}],2:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
