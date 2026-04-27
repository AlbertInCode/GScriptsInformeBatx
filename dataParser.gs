const DataParser = {
    parseStudentData: function (values) {
        const subjectNames = this.extractSubjectNames(values[0]); // ALBERT: Try to know value index

        // Slice the array to get only student rows
        const studentRows = values.slice(1); // ALBERT: Change start and end columns        

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

        return Utils.filterByStride(rawValues, 0).map(name => name.replace('\n', ' '));
    },

    extractSubjectsData: function (row, subjectNames) {
        const subjectsMap = {};
        const rawValues = Utils.sliceRowData(row);
        const valuesPerSubject = Utils.filterByStride(rawValues, 0);

        valuesPerSubject.forEach((value, index) => {
            if (subjectNames[index]) {
                subjectsMap[subjectNames[index]] = {
                    pending: value
                };
            }
        });

        return subjectsMap;
    }
}