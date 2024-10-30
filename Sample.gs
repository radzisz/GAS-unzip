
function sample() {
  const fileId = "FILE_ID"; // File ID of Zip file.
  const password = "PASSWORD"; // Password.

  const blob = DriveApp.getFileById(fileId).getBlob();
  const extractedFiles = unzip(blob, { password: password }); // or UnzipGs.unzip(blob); if used as a lib.

  extractedFiles.forEach(file => {
    console.info(
      "filename: %s, mimeType: %s, size: %s",
      file.getName(),
      file.getContentType(),
      file.getBytes().length
    );
    console.info(file.getDataAsString());
  });
}