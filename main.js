const swapi = "https://swapi.co/api/";

const getData = (type, callBack) => {
  /* XMLHttpRequest() is a JS method created for consuming API requests; */
  const xhr = new XMLHttpRequest();

  /* readyState changes from 0 to 1 when the open method is used; */
  xhr.open("GET", swapi + type + "/");

  /* readyState changes from 1 to 2 when the send method is used;
(3 is processing so no method is required to initialise this as send already has); */
  xhr.send();

  /* The below function is a listener listening for the xhrs state to change to 4;
 4 means the XMLHttpRequest is finished (but can be either failed or successful; */
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callBack(JSON.parse(this.responseText));
    }
  };
};

const getFirstKey = obj => {
  var firstKey = [];

  Object.keys(obj).forEach(key => firstKey.push(`<td>${key}</td>`));

  return `<tr>${firstKey}</tr>`;
};

const writeToDoc = type => {
  var tableRows = [];
  const el = document.getElementById("data");

  //use the below to reset after every new click (otherwise you just kep adding the same data to the page over and over)
  el.innerHTML = "";

  getData(type, data => {
    // data.results (results is the name of the array in the api)
    data = data.results;
    const firstKeys = getFirstKey(data[0]);

    data.forEach(element => {
      var dataRow = [];

      Object.keys(element).forEach(key => {
        var rowData = element[key].toString();
        var truncatedData = rowData.substring(0, 15);
        dataRow.push(`<td>${truncatedData}</td>`);
      });
      tableRows.push(`<tr>${dataRow}</tr>`);
    });

    el.innerHTML = `<table>${firstKeys}${tableRows}</table>`;
  });
};
