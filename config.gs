const CLASS_GROUPS = ['2n A', '2n B'];

/**
 * CONFIGURATION & CONSTANTS
 * Centralized configuration to avoid magic numbers scattered throughout the code.
 */
const CONFIG = {
    ROOT_FOLDER_ID: '1bpGhD2GC6cViNI96LaofaA2qNOFMy6AO',
    TEMPLATE_FILE_ID: '1rU19Ef6JMdq2hDT4NAfN7joTNFCDQZ5t4obpXQ7hWwg',
    TEMPLATE_ROW_INDEX: 1,
    DATE_LOCALE: 'ca-ES',
    // Spreadsheet Structure Definitions
    SHEET: {
        HEADER_ROWS: 2, // Number of rows before student data starts
        FOOTER_ROWS: 0, // Number of rows to ignore at the bottom
        IGNORED_END_COLS: 0, // Number of columns to ignore at the end
        SUBJECT_START_COL: 1, // Index where subjects start (0-based)
    }
};