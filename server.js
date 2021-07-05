const {GoogleSpreadsheet} = require('google-spreadsheet');
const creds = require('./precise-reality-317109-6b78b34aa523.json');
const doc = new GoogleSpreadsheet('1loEGKXeD5EukJvPA7q-NKw1D1gAlohnJ06QYqNXuxBE');
const fs = require('fs');
const table = async () => {
    let tableMas = [];
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0];
    const allD2 = await sheet.getCellsInRange('D2:D28339');
    const allF2 = await sheet.getCellsInRange('F2:F28339');
    const allA2 = await sheet.getCellsInRange('A2:A28339');
    Object.keys(allF2).forEach(key => {
        if (key <= 10) {
            tableMas.push({
                title: allD2[key][0],
                county_name: {
                    title: allF2[key][0], city: {
                        title: allA2[key][0]
                    }
                }
            });
        }
    });
    fs.writeFile('city.json', JSON.stringify(tableMas, null, 2), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Saved city!')
        }
    })
}

table().then(r => {
    console.log(r);
})