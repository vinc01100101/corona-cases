const xhr1 = new XMLHttpRequest();

const all = document.getElementById("all");

xhr1.open("GET", "https://corona.lmao.ninja/all", true);
xhr1.send();
xhr1.onreadystatechange = () => {
  if (xhr1.readyState == 4 && xhr1.status == 200) {
    const json = JSON.parse(xhr1.responseText);
    const html = `<div class='hd cases'>Total Cases: ${json.cases}</div>
        <div class='hd deaths'>Total Deaths: ${json.deaths}</div>
        <div class='hd recovered'>Recovered: ${json.recovered}</div>
        <div class='hd updated'>Updated: ${new Date(json.updated)}</div>`;
    all.innerHTML = html;
  }
};
__handleShowAll();
function __handleShowAll() {
  const xhr2 = new XMLHttpRequest();

  xhr2.open("GET", "https://corona.lmao.ninja/countries", true);
  xhr2.send();
  xhr2.onreadystatechange = () => {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      const json2 = JSON.parse(xhr2.responseText);
      const html = json2.map(x => {
        return `<tr><td class='item'>${x.country}</td>
                  <td class='item'>${x.cases}</td>
                  <td class='item'>${x.todayCases}</td>
                  <td class='item'>${x.deaths}</td>
                  <td class='item deaths'>${x.todayDeaths}</td>
                  <td class='item recovered'>${x.recovered}</td>
                  <td class='item critical'>${x.critical}</td></tr>`;
      });
      generateHtml(html);

      document.getElementById("show-all").style.display = "none";
      var countries = json2.map(x => x.country);
      document.getElementById("errorMessage").textContent=""
      autocomplete(document.getElementById("myInput"), countries);
    }
  };
}
function __handleSearch(e) {
  const srch = document.getElementById("myInput").value.toLowerCase();
  if (srch) {
    const xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "https://corona.lmao.ninja/countries/" + srch, true);
    xhr3.send();
    xhr3.onreadystatechange = () => {
      if (xhr3.readyState == 4 && xhr3.status == 200) {
        console.log(xhr3.responseText);
        try {
          const json3 = JSON.parse(xhr3.responseText);
          const html = `<tr><td class='item'>${json3.country}</td>
                      <td class='item'>${json3.cases}</td>
                      <td class='item'>${json3.todayCases}</td>
                      <td class='item'>${json3.deaths}</td>
                      <td class='item deaths'>${json3.todayDeaths}</td>
                      <td class='item recovered'>${json3.recovered}</td>
                      <td class='item critical'>${json3.critical}</td></tr>`;

          generateHtml([html]);
          document.getElementById("errorMessage").textContent=""
          document.getElementById("show-all").style.display = "inline";
        } catch (e) {
          console.log("Invalid input");
          document.getElementById("errorMessage").textContent="No match found."
        }
      }
    };
  }
}
function generateHtml(html) {
  const table = document.getElementById("table");

  const thd = `<thead>
  <tr>
    <th class="item">Country</th>
    <th class="item">Total Cases</th>
    <th class="item">New Cases</th>
    <th class="item">Total Deaths</th>
    <th class="item">New Deaths</th>
    <th class="item">Recovered</th>
    <th class="item">Critical</th>
  </tr>
</thead>`;
  table.innerHTML = thd + html.join("");
}
// ---------------------AUTOCOMPLETE-----------------
function autocomplete(inp, arr) {
  var currentFocus;

  inp.addEventListener("input", function(e) {
    var a,
      b,
      i,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");

        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);

        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        b.addEventListener("click", function(e) {
          inp.value = this.getElementsByTagName("input")[0].value;

          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;

      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;

      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}
