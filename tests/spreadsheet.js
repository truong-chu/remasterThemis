/* 

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./credentials.json');

async function accessSpreadSheet() {
    const doc = new GoogleSpreadsheet('1jcZmbHNVA8xS5btKpkGsu5JurvhwBzcWR5hyTCB0OSM');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
};
*/

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./credentials.json');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1jcZmbHNVA8xS5btKpkGsu5JurvhwBzcWR5hyTCB0OSM');

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,

  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  
  //const rows = await sheet.getRows(1, (err, data) => {})
  const rows = await sheet.getRows({ 
    query: 'TIMESTAMP.isDigit() == false' });

  rows.map(row => console.log(row.rowIndex));

  console.log("bengals")

  /* 
  for (var i = 0; i < 5; i++) {
      if (row.TIMESTAMP.isDigit() == false) {
        // const STATUS = function to 
        if (STATUS) {
          console.log("        ---> Write to file")
        } else {
          console.log("        ---> Not a valid contestant")
        }
      } else {
        console.log("        ---> Row updated")
      }
    }
  */
}

accessSpreadsheet();