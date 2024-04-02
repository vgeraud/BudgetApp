import Papa from "papaparse";

export const parseCSVtoJSON = (file, callback) => {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLocaleLowerCase(),
        complete: (results) => {
            const dataWithIds = results.data.map(result => ({ id: btoa(JSON.stringify(result)), ...result }));

            callback(dataWithIds)
        },
    });
}