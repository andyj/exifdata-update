# EXIF Data Updater

## Just know: This script is for me, but can easily be hacked at for you!

This script allows you to read and update the EXIF data of JPEG (.jpg and .JPG) images within a specified directory. It specifically updates the date and time information in the EXIF data based on the "User Comment" attribute. Optionally, you can use this script to only output the EXIF data without updating it.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (Version 12 or later is recommended)
- [exiftool-vendored](https://www.npmjs.com/package/exiftool-vendored) - A Node.js wrapper for exiftool.
- [luxon](https://www.npmjs.com/package/luxon) - A library for handling dates and times.

### Installation

1. Clone the repository or download the `index.js` script.

2. Navigate to the directory where the `index.js` script is located.

3. Install the required dependencies by running:

    ```sh
    npm install exiftool-vendored luxon
    ```

4. Make sure you have the directory containing the images you want to process.

### Configuration

In the `index.js` file, you need to set the directory path of the images you want to process. Edit the `directoryPath` variable accordingly.

```javascript
const directoryPath = './Path/To/Photos';
```

## Usage

There are two modes you can run the script in:

1. **Update EXIF Data Mode** (default): In this mode, the script reads the "User Comment" attribute in the EXIF data, extracts the date, and updates the relevant date fields in the EXIF data. It also updates the file's modification and access timestamps.

    Run the script with the command:

    ```sh
    node index.js
    ```

2. **Output Tags Mode**: In this mode, the script will only read and output the EXIF data without updating it. To use this mode, pass `outputTags` as an argument.

    Run the script with the command:

    ```sh
    node index.js outputTags
    ```

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

---

You can save this content in a file named `README.md` in the root directory of your project. This README provides a brief overview of the script, prerequisites, installation steps, and usage instructions.