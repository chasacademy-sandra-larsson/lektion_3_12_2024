

export const getInvoices = async () => {

    try {
        const response = await fetch("data.json");
        const data = await response.json();
        console.log(data);
        return data;

    } catch(error) {
        console.error("Error fethcing", error);
    }
}

