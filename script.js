const sheets = {
  joglo: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTf9RrlaFN7h2UMkV_KRWJ0hU53Uwp2kCyjwduvxkvhv7rqJc7j71mXBai3hF3aW6R7EGYNzi5TWQSs/pub?gid=0&single=true&output=csv",
  kantin: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp3hZufwknJEpOfvD_6YlB_lQEWwcJ-hMgKVfNoV1-jJAKeQB979Acs69cXCKCZVkf01OhwFn8fHlD/pub?gid=0&single=true&output=csv",
  lt6: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp3hZufwknJEpOfvD_6YlB_lQEWwcJ-hMgKVfNoV1-jJAKeQB979Acs69cXCKCZVkf01OhwFn8fHlD/pub?gid=0&single=true&output=csv"
};

function updateCard(id, data) {
  const elem = document.getElementById(id + "-status");
  const status = data[1]?.trim()?.toUpperCase(); // Kolom B (misal status)
  elem.textContent = status || "No Data";

  // Tambahkan kelas berdasarkan kata kunci
  elem.className = "status";
  if (status.includes("NORMAL")) elem.classList.add("normal");
  else if (status.includes("PENUH")) elem.classList.add("penuh");
  else if (status.includes("KOSONG")) elem.classList.add("kosong");
  else if (status.includes("ON")) elem.classList.add("on");
  else if (status.includes("OFF")) elem.classList.add("off");
}

function fetchCSV(url, id) {
  fetch(url)
    .then(res => res.text())
    .then(text => {
      const rows = text.split("\n");
      const latest = rows[1]?.split(",");
      updateCard(id, latest);
    })
    .catch(() => {
      document.getElementById(id + "-status").textContent = "Error";
    });
}

function refreshAll() {
  fetchCSV(sheets.joglo, "joglo");
  fetchCSV(sheets.kantin, "kantin");
  fetchCSV(sheets.lt6, "lt6");
}

// Mulai polling data setiap 15 detik
refreshAll();
setInterval(refreshAll, 15000);
