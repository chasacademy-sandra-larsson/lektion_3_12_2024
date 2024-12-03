//"2021-10-14" => Due Oct 14, 2021

const formatDueDate = (dateString) => {

    const date = new Date(dateString);
     // const formattedDueDate =  date.format("mmm dd yyyy");
    //console.log(date);

    if(isNaN(date)) {
        throw new Error("Invallid date format");
    }

    const options = {day: "2-digit", month: "short", year: "numeric"};
    const formattedDueDate = date.toLocaleDateString("en-GB", options);

    return formattedDueDate;
    //"Oct 14, 2021"

}

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { formatDueDate, capitalizeFirstLetter }