import { parseDate } from './parseDate';

//Sorts events by date and name
export const sortEvents = (events, sortType) => {
    switch (sortType) {
        case 'nameAsc':
            return [...events].sort((a, b) => a.title.localeCompare(b.title));
        case 'nameDesc':
            return [...events].sort((a, b) => b.title.localeCompare(a.title));
        case 'dateAsc':
            return [...events].sort(
                (a, b) => parseDate(a.selectDate) - parseDate(b.selectDate)
            );
        case 'dateDesc':
            return [...events].sort(
                (a, b) => parseDate(b.selectDate) - parseDate(a.selectDate)
            );

        default:
            return events;
    }
};
