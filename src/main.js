import { getInvoices } from "./api.js";

const invoiceUL = document.querySelector(".invoice__list");
const sortSelect = document.querySelector("#sort-filter")


const renderInvoices = async () => {

    const invoices = await getInvoices();
    
    let compare;
    // Sort 
    if(sortSelect.value === "newest") {
        compare = (a, b) => new Date(b.paymentDue) - new Date(a.paymentDue);
    } else if(sortSelect.value === "oldest") {
        compare = (a, b) => new Date(a.paymentDue) - new Date(b.paymentDue);
    }

    const sortedInvoiceList = invoices.sort(compare);


    // Map - html runt varje objekt property
    const invoiceList = sortedInvoiceList.map(invoice => 
        `<li class="invoice__item">
          <div class="invoice__item-header">
            <p>#${invoice.id}</p>
          </div>
          <div class="invoice__item-details">
            <p>Due ${invoice.paymentDue}</p>
          </div>
          <div>
            <p class="invoice__item-name">${invoice.clientName}</p>
          </div>
          <div class="invoice__item-total">
            <p>$${invoice.total}</p>
          </div>
          <div class="invoice__item-status">
            <p>${invoice.status}</p>
          </div>
        </li>`)
        .join("");

        invoiceUL.innerHTML = invoiceList;

}

renderInvoices();

sortSelect.addEventListener("change", renderInvoices);