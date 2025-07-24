let submitted = false;

function addSubjectRow(studentTable) {
  if (submitted) return;

  const tbody = studentTable.querySelector("tbody");
  const row = document.createElement("tr");

  const subjectCell = document.createElement("td");
  const subjectInput = document.createElement("input");
  subjectInput.placeholder = "Subject";
  subjectCell.appendChild(subjectInput);

  const gradeCell = document.createElement("td");
  const gradeInput = document.createElement("input");
  gradeInput.type = "number";
  gradeInput.placeholder = "Grade";
  gradeInput.addEventListener("input", () => {
    const val = parseInt(gradeInput.value);
    if (!isNaN(val)) {
      gradeInput.style.color = val < 70 ? "red" : "blue";
    } else {
      gradeInput.style.color = "black";
    }
    calculateAverage(studentTable);
  });
  gradeCell.appendChild(gradeInput);

  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    if (!submitted) {
      tbody.removeChild(row);
      calculateAverage(studentTable);
    }
  };
  deleteCell.appendChild(deleteBtn);

  row.appendChild(subjectCell);
  row.appendChild(gradeCell);
  row.appendChild(deleteCell);
  tbody.appendChild(row);
}

function calculateAverage(table) {
  const rows = table.querySelectorAll("tbody tr");
  let total = 0;
  let count = 0;
  rows.forEach((row, index) => {
    if (index === 0) return; // skip name/period row
    const gradeInput = row.cells[1].querySelector("input");
    const val = parseFloat(gradeInput.value);
    if (!isNaN(val)) {
      total += val;
      count++;
    }
  });
  const avg = count ? (total / count).toFixed(2) : "--";
  table.querySelector(".average").textContent = avg;
}

function createStudentTable() {
  if (submitted) return;

  const container = document.getElementById("studentTables");

  const table = document.createElement("table");
  table.classList.add("studentTable");

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  ["Name", "Period", "Subject", "Grade", "Action"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  const tbody = document.createElement("tbody");

  const nameRow = document.createElement("tr");

  const nameCell = document.createElement("td");
  const nameInput = document.createElement("input");
  nameInput.placeholder = "Enter Name";
  nameCell.appendChild(nameInput);

  const periodCell = document.createElement("td");
  const periodInput = document.createElement("input");
  periodInput.placeholder = "Enter Period";
  periodCell.appendChild(periodInput);

  const blank1 = document.createElement("td");
  const blank2 = document.createElement("td");
  const blank3 = document.createElement("td");

  nameRow.appendChild(nameCell);
  nameRow.appendChild(periodCell);
  nameRow.appendChild(blank1);
  nameRow.appendChild(blank2);
  nameRow.appendChild(blank3);

  tbody.appendChild(nameRow);

  const footer = document.createElement("tfoot");
  const avgRow = document.createElement("tr");
  const avgCell = document.createElement("td");
  avgCell.colSpan = 5;
  avgCell.innerHTML = "Average: <span class='average'>--</span>";
  avgRow.appendChild(avgCell);
  footer.appendChild(avgRow);

  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(footer);
  container.appendChild(table);

  // Add first subject row
  addSubjectRow(table);

  // Add "Add Subject" button below each table
  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Subject";
  addBtn.onclick = () => addSubjectRow(table);
  container.appendChild(addBtn);
}

document.getElementById("addStudentBtn").addEventListener("click", createStudentTable);
document.getElementById("submitBtn").addEventListener("click", () => {
  submitted = true;
  document.querySelectorAll("input").forEach(input => input.disabled = true);
});
