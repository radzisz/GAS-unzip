# UnzipGs

<a name="top"></a>

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="overview"></a>

# Overview

**This is a GAS library for unzipping a Zip file protected by a password using Google Apps Script - v8 engine.**

<a name="description"></a>

# Description

Recently, I had a situation where it was required to unzip a Zip file protected with a password. Unfortunately, at the current stage, the method of [`Utilities.unzip()`](https://developers.google.com/apps-script/reference/utilities/utilities#unzipblob) cannot unzip such protected files. So when I had been looking for other workarounds, I found [`UnzipGs`](https://github.com/tanaikech/UnzipGs/). However, it does not work due to incompatibility with v8 runtime, and it imports another library ['unzip.min.js'](https://github.com/imaya/zlib.js/blob/develop/bin/unzip.min.js). As the projects seem to be inactive, I've created this library including a fixed version.

# Library's project key

```
16rjLlykbYdCq5RUFukJm9s1xkMNihiACYbKZSFlVV8xrc5qmg8CXFcC7
```

# How to install

- Open Script Editor. And please operate as follows by clicking.
- -> Resource
- -> Library
- -> Input Script ID to the text box. Script ID is **`16rjLlykbYdCq5RUFukJm9s1xkMNihiACYbKZSFlVV8xrc5qmg8CXFcC7`**.
- -> Add library
- -> Please select the latest version
- -> Developer mode ON (If you don't want to use the latest version, please select others.)
- -> Identifier is "**`GASunzip`**". This is set under the default.

[If you want to read about Libraries, please check this.](https://developers.google.com/apps-script/guide_libraries).

## About scopes

This library uses no scopes.

# Methods

In the current stage, there are 2 methods.

1. [unzip(blob, object)](#unzip)

2. [getFilenames(blob, object)](#getfilenames)

<a name="unzip"></a>

## 1. unzip(blob, object)

This method unzips a Zip file. `blob` is the file blob of the Zip file. The protected Zip file can be unzipped by setting the password to `object`. The response value is `[]blob` including the file blobs.

**If `password` is not included in `object`, the zip file is decompressed using `Utilities.unzip()`.**

### Sample script

```javascript

function sample() {
    const fileId = "FILE_ID"; // File ID of Zip file.
    const password = "PASSWORD"; // Password.

    const blob = DriveApp.getFileById(fileId).getBlob();
    const extractedFiles = GASunzip.unzip(blob, { password: password }); 

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
```

<a name="getfilenames"></a>

## 2. getFilenames(blob, object)

This method retrieves the filenames in the Zip file. There are no methods for retrieving the filenames from the Zip file in Google Apps Script. This also uses zlib.js.

### Sample script

```javascript
function sample() {
    var id = "###"; // File ID of Zip file.
    var pass = "###"; // Password.

    var blob = DriveApp.getFileById(id).getBlob();
    var res = GASunzip.getFilenames(blob, { password: pass }); 
    console.info(res);
}
```

# Process cost

About the process cost for decompressing, the cost of `UnzipGs.unzip()` is much higher than that of `Utilities.unzip()`.

- For example, in my environment, when a protected Zip file with the size of 1 MB is unzipped using this library, the process time was about 60 seconds to 90 seconds.

- On the other hand, when `Utilities.unzip()` is used for the same file without the password, the process time was about 1 second.

# IMPORTANT

- When this library is used, please be careful about the file size of the Zip file and unzipped files. Because the maximum size of a blob that can be used for Google Apps Script is 50 MB (52,428,800 bytes).

- **But, when the Zip file is unzipped without using `Utilities.unzip()` by Google Apps Script, the process cost becomes very high. So I think that the practical size will be required to become smaller.**

- By this situation, unfortunately, I couldn't implement the method for zipping.

- **The reason for this issue is due to the process of Google Apps Script. For example, if the v8 engine can be used with Google Apps Script in the future, this situation will be changed. I would like to expect this.**

- Or Google might also update `Utilities.unzip()` by including the method for decompressing the protected Zip file in the future.

# Acknowledgement

- [Kanshi TANAIKE](https://github.com/tanaikech): He is the author of the original library [UnzipGs](https://github.com/tanaikech/UnzipGs).
- [Imaya Yuta](https://github.com/imaya): He is the author of [zlib.js](https://github.com/imaya/zlib.js).
    - This library (UnzipGs) uses [`unzip.min.js`](https://github.com/imaya/zlib.js/blob/develop/bin/unzip.min.js) of `zlib.js`. So this library is a wrapper script for running `unzip.min.js`, which is for Javascript, with Google Apps Script.

---

<a name="Licence"></a>

# Licence

[MIT](LICENCE)

<a name="Author"></a>

# Author

[Dominik Radziszowski](https://github.com/radzisz)

If you have any questions and commissions for me, feel free to contact me.

<a name="Update_History"></a>

# Update History

- v1.0.0 (Oct 30, 2024)

    1. Initial release.

# Testing
- The script works smoothly with v8 runtime.

[TOP](#top)
