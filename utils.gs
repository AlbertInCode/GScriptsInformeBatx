/**
 * UTILITIES & HELPERS
 */
const Utils = {
    getSheetData: function (sheetName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

        if (!sheet) throw new Error(`Sheet "${sheetName}" not found.`);

        return sheet.getDataRange().getValues();
    },

    // Slice the row to exclude the fixed start columns (Name) and fixed end columns}
    sliceRowData: function (row) {
        return row.slice(CONFIG.SHEET.SUBJECT_START_COL);
    },

    getFormattedDates: function (dateObj) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return {
            currentDate: dateObj.currentDate,
            currentDayOfWeek: dateObj.currentDayOfWeek,
            currentYear: dateObj.currentYear
        }
    }
};