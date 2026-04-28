const DataParser = {
    parseStudentData: function (values) {
        const subjectNames = this.extractSubjectNames(values[1]); // ALBERT: Try to know value index

        // Slice the array to get only student rows
        const studentRows = values.slice(2); // ALBERT: Change start and end columns        

        return studentRows.map(row => {
            const studentName = row[0];
            const subjectsData = this.extractSubjectsData(row, subjectNames);

            return {
                name: studentName,
                subjects: subjectsData,
            }
        });
    },

    extractSubjectNames: function (row) {
        const rawValues = Utils.sliceRowData(row);

        return rawValues.map(name => name.replace('\n', ' '));
    },

    extractSubjectsData: function (row, subjectNames) {
        const subjectsMap = {};
        const rawValues = Utils.sliceRowData(row);
        const valuesPerSubject = rawValues;

        valuesPerSubject.forEach((value, index) => {
            if (subjectNames[index]) {
                subjectsMap[subjectNames[index]] = {
                    pending: value
                };
            }
        });

        return subjectsMap;
    },

    extractMetadata: function (values) {
        return {
            currentDate: values[0][1], // dia entrega
            retakeStartDate: values[1][1],
            retakeEndDate: values[2][1],
            reportDate: values[3][1]
        };
    }
}