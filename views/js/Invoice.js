import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

export class InvoicePDFGenerator {
  position = {
    x: 0,
    y: 0,
  };

  margin = {
    x: 5,
    y: 5,
  };

  pageCount = 0;
  doc = null;

  constructor() {
    this.doc = new jsPDF();
    this.doc.setFontSize(11);
    // this.doc.setName("Invoice.pdf");
    this.position = this.margin;
    this.pageCount = 1;
  }

  getUrl() {
    return this.doc.output("bloburl") + "#toolbar=0";
  }

  download() {
    this.doc.save("Invoice.pdf");
  }
}
