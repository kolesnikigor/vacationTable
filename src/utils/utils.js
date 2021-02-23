function checkVacationsDate(vacations, date) {
    let result = false;
    vacations.forEach((item) => {
        const startDateNumbers = item.startDate.split(".");
        const startDate = `${startDateNumbers[2]}/${startDateNumbers[1]}/${startDateNumbers[0]}`;
        const endDateNumbers = item.endDate.split(".");
        const endDate = `${endDateNumbers[2]}/${endDateNumbers[1]}/${endDateNumbers[0]}`;
        if (date >= new Date(startDate) && date <= new Date(endDate)) {
            result = true;
        }
    });
    return result;
}


export default checkVacationsDate