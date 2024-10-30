

function sample() {
  var id = "FILE_ID"; // File ID of Zip file.
  var pass = "PASSWORD"; // Password.

  var blob = DriveApp.getFileById(id).getBlob();
  var res = unzip(blob, { password: pass }); // or UnzipGs.unzip(blob);
  res.forEach(function(e) {
    Logger.log(
      "filename: %s, mimeType: %s, size: %s",
      e.getName(),
      e.getContentType(),
      e.getBytes().length
    );
    console.log(e.getDataAsString())
  });
}