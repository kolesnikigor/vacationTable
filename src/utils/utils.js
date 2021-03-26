export const getDaysOfActivePeriod = (state) => {
    const year = state.date.getFullYear();
    const month = state.date.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        const item = new Date(date);
        days.push({
            dayName: item.toLocaleDateString("en-US", {weekday: "short"}),
            date: item.getDate(),
            isDayOff: item.getDay() === 0 || item.getDay() === 6,
            fullDate: item,
        });
        date.setDate(date.getDate() + 1);
    }
    return days
}

export function checkVacationsDate(vacations, date) {
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

export function convertDateToShow(date) {
    const incomingDate = date.split("/");
    const outgoingDate = `${incomingDate[2]}-${incomingDate[0]}-${incomingDate[1]}`;
    return outgoingDate
}

export function convertDateForStore(date) {
    const incomingDate = date.split("-");
    const outgoingDate = `${incomingDate[2]}.${incomingDate[1]}.${incomingDate[0]}`;
    return outgoingDate
}

export function convertDateToCompare(date) {
    const incomingDate = date.split('-')
    const outgoingDate = `${incomingDate[0]}/${incomingDate[1]}/${incomingDate[2]}`
    return new Date(outgoingDate)
}
