/**
 * UTILITIES & HELPERS
 */
const Utils = {
    getSheetData: function (sheetName) {

    },

    // Slice the row to exclude the fixed start columns (Name) and fixed end columns}
    sliceRowData: function (row) {
        return row.slice(CONFIG.SHEET.SUBJECT_START_COL);
    },

    getFormattedDates: function (dateObj) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();

        return {
            currentDate: today.toLocaleDateString(CONFIG.DATE_LOCALE, options),
            currentDayOfWeek: today.toLocaleDateString(CONFIG.DATE_LOCALE, { weekday: 'long' }),
            currentYear: today.getFullYear()
        }
    }
};