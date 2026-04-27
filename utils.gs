/**
 * UTILITIES & HELPERS
 */
const Utils = {
    getSheetData: function (sheetName) {

    },

    // Slice the row to exclude the fixed start columns (Name) and fixed end columns}
    sliceRowData: function (row) {
        return row.slice(CONFIG.DATA_START_COLUMN, CONFIG.DATA_END_COLUMN + 1); // TODO: Change start and end columns
    },

    // Helper to pick every Nth element from an array
    filterByStride: function (array, offset) {

    },

    getFormattedDates: function (dateObj) {

    }
};