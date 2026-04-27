const ReportService = {
    /**
     * DOCUMENT GENERATION
     * Creates and populates a single Google Doc.
     */
    createStudentReport: function (student, courseMetadata, templateFile, folder) {
        const filename = student.name.replace(/\s+/g, '_');
        const fileCopy = templateFile.makeCopy(filename, folder);
        const doc = DocumentApp.openById(fileCopy.getId());

        const body = doc.getBody();
        const header = doc.getHeader();
        const table = body.getTables()[0];

        this.populatePlaceholders(body, {
            ...courseMetadata,
            ...Utils.getFormattedDates(courseMetadata.rawDate),
            'NOM': student.name
        });

        // Fill Dynamic Table (Subjects)
        this.fillSubjectsTable(table, student.subjects);

        doc.saveAndClose();
    },

    /**
     * Helper to replace text placeholders in the document.
     * Placeholders format: {{KEY}}
     * @param {GoogleAppsScript.Document.Body|Header|Footer} element - The element to search within.
     * @param {Object} dataMap - A map of keys and values to replace.
     */
    populatePlaceholders: function (element, dataMap) {
        Object.entries(dataMap).forEach(([key, value]) => {
            const tagMap = {
                'NOM': '{{NOM}}',
                'currentDayOfWeek': '{{DIA}}',
                'currentDate': '{{DATA}}',
                'retakeStartDate': '{{INICI_RECUPERACIONS}}',
                'retakeEndDate': '{{FINAL_RECUPERACIONS}}',
                'retakeMonth': '{{MES_RECUPERACIONS}}',
                'reportDate': '{{DATA_ENTREGA_NOTES}}',
                'currentYear': '{{YEAR}}'
            };

            const tag = tagMap[key] || `{{${key}}}`; // Fallback
            if (value !== undefined) element.replaceText(tag, value.toString());
        });
    },


    /**
     * Helper to fill the subjects table
     * @param {GoogleAppsScript.Document.Table} table - The table to fill
     * @param {Object} subjects - An object containing the subjects data
     */
    fillSubjectsTable: function (table, subjects) {
        const templateRow = table.getRow(CONFIG.TEMPLATE_ROW_INDEX);
        let insertionOffset = 1;

        Object.entries(subjects).forEach(([subjectName, subjectData]) => {
            const newRow = templateRow.copy();

            newRow.replaceText("{{ASSIG}}", subjectName);
            newRow.replaceText("{{PEND}}", subjectData.pending);

            // Insert relative to the template row index
            table.insertRow(CONFIG.TEMPLATE_ROW_INDEX + insertionOffset, newRow);
            insertionOffset++;
        });

        // Cleanup: Remove the original template row
        table.removeRow(CONFIG.TEMPLATE_ROW_INDEX);
    }
}