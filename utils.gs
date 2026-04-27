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

    }
};