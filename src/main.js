import { getInvoices } from "./api.js";
import { formatDueDate, capitalizeFirstLetter } from "./helpers.js";



const invoiceUL = document.querySelector(".invoice__list");
const sortSelect = document.querySelector("#invoice-sort");
const filterSelect = document.querySelector("#status-filter");


const renderInvoices = async () => {

    const invoices = await getInvoices();


      // Comparison-funktion för hur arrayen ska sorteras
    // let compare;
    // // Sort 
    // if(sortSelect.value === "newest") {
    //     compare = (a, b) => new Date(b.paymentDue) - new Date(a.paymentDue);
    // } else if(sortSelect.value === "oldest") {
    //     compare = (a, b) => new Date(a.paymentDue) - new Date(b.paymentDue);
    // }

    const compare = sortSelect.value === "newest" 
    ? (a,b) => new Date(b.paymentDue) - new Date(a.paymentDue) 
    : (a,b) => new Date(a.paymentDue) - new Date(b.paymentDue)

    // Kan bli snyggt med chaining - eller mer läsbart
    const invoiceList = invoices
        .sort(compare)
        // .filter(invoice => {
        //        if(filterSelect.value !== 'all')  {
        //          return invoice.status === filterSelect.value;
        //        } 
        //        return invoice;
        //     })
        .filter(invoice => filterSelect.value !== 'all' ? invoice.status === filterSelect.value : true)        .map(invoice => 
                `<li class="invoice__item">
                  <div class="invoice__item-header">
                    <p>#${invoice.id}</p>
                  </div>
                  <div class="invoice__item-details">
                    <p>Due ${formatDueDate(invoice.paymentDue)}</p>
                  </div>
                  <div>
                    <p class="invoice__item-name">${invoice.clientName}</p>
                  </div>
                  <div class="invoice__item-total">
                    <p>$${invoice.total}</p>
                  </div>
                  <div class="invoice__item-status">
                    <p>${capitalizeFirstLetter(invoice.status)}</p>
                  </div>
                </li>`)
        .join("");

    
    //  // Själva sorteringen
    // const sortedInvoiceList = invoices.sort(compare);

    // // Filterera 
    // const filteredInvoiceList = sortedInvoiceList.filter(invoice => {
    //    if(filterSelect.value !== 'all')  {
    //      return invoice.status === filterSelect.value;
    //    } 
    //    return invoice;
    // })

    // // Map - html runt varje objekt property
    // const invoiceList = filteredInvoiceList.map(invoice => 
    //     `<li class="invoice__item">
    //       <div class="invoice__item-header">
    //         <p>#${invoice.id}</p>
    //       </div>
    //       <div class="invoice__item-details">
    //         <p>Due ${formatDueDate(invoice.paymentDue)}</p>
    //       </div>
    //       <div>
    //         <p class="invoice__item-name">${invoice.clientName}</p>
    //       </div>
    //       <div class="invoice__item-total">
    //         <p>$${invoice.total}</p>
    //       </div>
    //       <div class="invoice__item-status">
    //         <p>${capitalizeFirstLetter(invoice.status)}</p>
    //       </div>
    //     </li>`)
    //     .join("");

        invoiceUL.innerHTML = invoiceList;

        const totalAmount = invoices.reduce((acc, invoice) => acc + invoice.total, 0);

        // Reduce - beräkna totala summan och lägg till direkt efter ul-listan 
        invoiceUL.insertAdjacentHTML("beforeend", 
            `<div class="invoice__item-total-amount">
               <h2>$${totalAmount.toFixed(2)}</h2>
            </div>`
        );

}

renderInvoices();

sortSelect.addEventListener("change", renderInvoices);
filterSelect.addEventListener("change", renderInvoices);