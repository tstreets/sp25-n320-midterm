import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

export class InvoicePDFGenerator {
  position = {
    x: 0,
    y: 0,
  };

  margin = {
    x: 5,
    y: 10,
  };

  pageCounter = 0;
  doc = null;

  constructor() {
    this.doc = new jsPDF();
    this.doc.setProperties({ title: "Blah.pdf " });
    this.doc.setFontSize(11);
    // this.doc.setName("Invoice.pdf");
    this.position = this.margin;
    this.pageCounter = 1;
  }

  getUrl(showToolbar = 1) {
    return this.doc.output("bloburl") + `#toolbar=${showToolbar}`;
  }

  download() {
    this.doc.save("Invoice.pdf");
  }

  reset() {
    for (let i = this.pageCounter; i > 0; i--) {
      this.doc.deletePage(i);
    }
    this.pageCounter = 1;
    this.doc.addPage();
    this.position = { ...this.margin };
  }

  addCompanyDetails() {
    this.addLineItem("Streets Waffle Fighters", 16);

    this.doc.setFontSize(11);
    "123 Cafe St.|Indianpolis, IN|Office: 098.765.4321"
      .split("|")
      .forEach((item) => this.addLineItem(item));
  }

  addCustomerDetails(name, email) {
    this.position.y += 11;
    this.addLineItem("Customer Details", 16);

    [`Name: ${name}`, `Email: ${email}`].forEach((item) =>
      this.addLineItem(item)
    );
  }

  addInvoiceNumberAndDate() {
    this.position.y += 11;
    let invoiceNum = "";
    for (let i = 0; i < 8; i++) {
      invoiceNum += Math.floor(Math.random() * 10);
    }
    this.addLineItem("Invoice #" + invoiceNum, 16);

    const today = new Date();
    this.addLineItem(
      "Date of Purchase: " +
        `${
          today.getMonth() + 1
        }/${today.getDate()}/${today.getFullYear()} ${today.toLocaleTimeString()}`
    );
  }

  showCart(cartItems = []) {
    this.position.y += 11;
    const items = [];
    cartItems.forEach(function (item) {
      const indexFound = items.findIndex(
        (cartItem) => cartItem.name === item.name
      );
      console.log(indexFound, item.name);
      if (indexFound >= 0) {
        const oldItem = items[indexFound];
        items.splice(indexFound, 1, {
          ...oldItem,
          quantity: oldItem.quantity + 1,
        });
      } else {
        items.push({ ...item, quantity: 1 });
      }
    });

    let total = 0;

    //   Name
    this.doc.text("Name", this.position.x, this.position.y);

    //   Price
    this.position.x = 40;
    this.doc.text("Price", this.position.x, this.position.y);

    //   Quantity
    this.position.x = 80;
    this.doc.text("Quantity", this.position.x, this.position.y);

    //   Total
    this.position.x = 120;
    this.doc.text("Line Total", this.position.x, this.position.y);

    this.position.x = this.margin.x;
    this.addLineBreak();

    items.forEach((item) => {
      total += item.quantity * item.price;

      //   Name
      this.doc.text(item.name, this.position.x, this.position.y);

      //   Price
      this.position.x = 40;
      this.doc.text(String(item.price), this.position.x, this.position.y);

      //   Quantity
      this.position.x = 80;
      this.doc.text(String(item.quantity), this.position.x, this.position.y);

      //   Total
      this.position.x = 120;
      this.doc.text(
        String(item.quantity * item.price),
        this.position.x,
        this.position.y
      );

      this.position.x = this.margin.x;
      this.addLineBreak();
    });
    const tax = 0.07 * total;

    this.addLineItem("Sub-total: $" + total.toFixed(2));
    this.addLineItem("Tax: $" + tax.toFixed(2));
    this.addLineItem("Total: $" + (tax + total).toFixed(2), 16);
  }

  addLineItem(item, fontSize = 11) {
    this.doc.setFontSize(fontSize);
    this.doc.text(item, this.position.x, this.position.y);
    this.addLineBreak();
    this.doc.setFontSize(11);
  }

  addLineBreak(lineHeight = 11) {
    this.position.y += lineHeight / 2;
  }
}
