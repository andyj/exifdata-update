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

This project is licensed under the MIT License.

---

You can save this content in a file named `README.md` in the root directory of your project. This README provides a brief overview of the script, prerequisites, installation steps, and usage instructions.