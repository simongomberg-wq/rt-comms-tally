// 1. Go to https://sheets.google.com and create a new blank spreadsheet.
//    Name it e.g. "RT Comms Tally Data".
// 2. In that sheet, go to Extensions > Apps Script.
// 3. Delete any starter code and paste this whole file in.
// 4. Click Deploy > New deployment > select type "Web app".
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Click Deploy, authorize when prompted, and copy the Web app URL.
// 6. Paste that URL into SHEET_ENDPOINT near the top of index.html.

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Role', 'Method of Communication', 'Type of Communication',
      'Direction', 'Correct Recipient', 'Urgency'
    ]);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.role || '',
    data.method || '',
    data.typeOfCommunication || '',
    data.direction || '',
    data.correct || '',
    data.urgency || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
