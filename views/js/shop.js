import { InvoicePDFGenerator } from "./Invoice.js";

// Referencing elements on the page
const catalogRef = document.querySelector("#catalog");
const nameRef = document.querySelector("#name");
const emailRef = document.getElementById("email");
const viewBtnRef = document.querySelector("button#view");
const downloadBtnRef = document.querySelector("button#download");
const pdfPreviewRef = document.querySelector("#pdf-preview");

// Data
const catalog = [
  { name: "Syrup Sword", price: "199.99" },
  { name: "Waffle Encyclopedia", price: "59.99" },
  { name: "fork", price: "599.99" },
];

const cart = [];

catalogRef.innerHTML = "";
for (let i = 0; i < catalog.length; i++) {
  const item = catalog[i];
  const newTr = document.createElement("tr");

  newTr.innerHTML += `<td>${item.name}</td>`;
  newTr.innerHTML += `<td>$${item.price}</td>`;

  const newTd = document.createElement("td");
  const newBtn = document.createElement("button");
  newBtn.classList.add("add");
  newBtn.dataset.id = i;
  newBtn.innerHTML = "+";
  newBtn.onclick = addItemToCart;
  newTd.appendChild(newBtn);

  newTr.appendChild(newTd);

  catalogRef.appendChild(newTr);
}

nameRef.oninput = checkPdfButtons;
emailRef.oninput = checkPdfButtons;

function addItemToCart(e) {
  const index = e.currentTarget.dataset.id;
  cart.push(catalog[index]);
  checkPdfButtons();
}

function checkPdfButtons() {
  if (!cart.length || !emailRef.value || !nameRef.value) {
    viewBtnRef.disabled = "true";
    downloadBtnRef.disabled = "true";
  } else {
    viewBtnRef.disabled = "";
    downloadBtnRef.disabled = "";
  }
}

viewBtnRef.onclick = viewPdf;
downloadBtnRef.onclick = downloadPdf;

const invoice = new InvoicePDFGenerator();

function viewPdf() {
  pdfPreviewRef.src = invoice.getUrl();
  pdfPreviewRef.style.display = "block";
}

function downloadPdf() {
  invoice.download();
}
checkPdfButtons();
