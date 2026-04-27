/**
 * ADD SCRIPT TO GOOGLE SHEETS MENU
 */
function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('📚Informes Batx')
        .addItem('📑 Generar Informes', 'generateReports')
        .addToUi();
}

/**
 * ENTRY POINT
 */
function generateReports() {
    const reportsFolder = getReportsFolder();

    CLASS_GROUPS.forEach(groupName => {
        console.info(`Processing group: ${groupName}`);
        processGroupReports(groupName, reportsFolder);
    });

    SpreadsheetApp.getUi().alert(`Informes generats correctament! Revisa la carpeta: ${reportsFolder.getName()}`);
}

function getReportsFolder() {
    const rootFolder = DriveApp.getFolderById(CONFIG.ROOT_FOLDER_ID);

    // We fetch the folder for the current school year
    const metaData = Utils.getSheetData('Inici');
    const currentReportsName = metaData[0][0];

    return rootFolder.createFolder(currentReportsName);
}

/**
 * CORE LOGIC
 * Handles the logic for a single class group: parsing data and generating reports.
 */
function processGroupReports(groupName, parentFolder) {
    const destinationFolder = parentFolder.createFolder(groupName);
    const templateFile = DriveApp.getFileById(CONFIG.TEMPLATE_FILE_ID);

    const rawData = Utils.getSheetData(groupName);

    // 1. Parse Data (Domain Layer)
    const students = DataParser.parse(rawData);

    // 2. Generate Reports (Presentation Layer)
    students.forEach(student => {
        ReportService.generateStudentReport(student, templateFile, destinationFolder);
    });
}