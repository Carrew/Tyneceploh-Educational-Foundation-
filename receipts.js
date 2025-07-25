// receipts.js

const SCHOOL_NAME = "Tyneceploh Educational Foundation";

function generateReceiptId() {
  // Format: RECEIPT + YYYYMMDD + incremental number
  const datePart = new Date().toISOString().slice(0,10).replace(/-/g,""); // YYYYMMDD
  let counter = parseInt(localStorage.getItem("receipt_counter_" + datePart) || "0") + 1;
  localStorage.setItem("receipt_counter_" + datePart, counter);
  return `RECEIPT${datePart}${String(counter).padStart(3,"0")}`;
}

function saveReceipt(studentName, amount, purpose) {
  if (!studentName || !amount || !purpose) {
    alert("Please fill in all receipt fields.");
    return;
  }
  const receiptId = generateReceiptId();
  const date = new Date().toLocaleString();

  const receipt = {
    id: receiptId,
    studentName,
    amount,
    purpose,
    date
  };

  // Get existing receipts from localStorage for the student
  const allReceipts = JSON.parse(localStorage.getItem("all_receipts") || "{}");

  if (!allReceipts[studentName]) {
    allReceipts[studentName] = [];
  }
  allReceipts[studentName].push(receipt);

  localStorage.setItem("all_receipts", JSON.stringify(allReceipts));

  alert(`Receipt saved successfully!\nReceipt ID: ${receiptId}`);

  return receipt;
}

function loadReceipts() {
  const allReceipts = JSON.parse(localStorage.getItem("all_receipts") || "{}");
  return allReceipts;
}

function printReceipt(receipt) {
  if (!receipt) {
    alert("No receipt to print.");
    return;
  }

  const receiptContent = `
    <html>
    <head>
      <title>Receipt - ${receipt.id}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h2 { text-align: center; color: #a52a2a; }
        .details { margin-top: 20px; }
        .details p { font-size: 16px; }
        hr { margin: 20px 0; }
      </style>
    </head>
    <body>
      <h2>${SCHOOL_NAME}</h2>
      <hr />
      <div class="details">
        <p><strong>Receipt ID:</strong> ${receipt.id}</p>
        <p><strong>Date:</strong> ${receipt.date}</p>
        <p><strong>Student Name:</strong> ${receipt.studentName}</p>
        <p><strong>Amount:</strong> $${receipt.amount}</p>
        <p><strong>Purpose:</strong> ${receipt.purpose}</p>
      </div>
      <hr />
      <p style="text-align:center;">Thank you for your payment.</p>
    </body>
    </html>
  `;

  const printWindow = window.open('', '', 'width=600,height=400');
  printWindow.document.write(receiptContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
    }
