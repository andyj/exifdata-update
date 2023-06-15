const { ExifTool } = require('exiftool-vendored');
const luxon = require('luxon');
const fs = require('fs');
const path = require('path');

const exiftool = new ExifTool();
const directoryPath = './Path/To/Photos';

/**
 * Updates the EXIF data of an image file. Reads the 'UserComment' field from the EXIF data,
 * extracts the date from it, and updates the 'DateTimeOriginal', 'ModifyDate', and 'FileModifyDate'
 * fields in the EXIF data. Also updates the file's modification and access timestamps.
 *
 * @async
 * @param {string} filePath - The path to the image file to update.
 */
const updateExifData = async (filePath) => {
  try {
    const metadata = await exiftool.read(filePath);

    if (metadata.UserComment) {
      const dateStr = metadata.UserComment.split('@')[0];

            // Parse the date string and add the timezone offset
      const parsedDate = luxon(dateStr, 'YYYY-MM-DDTHH:mm:ss');
      const newDate = parsedDate.tz('Etc/GMT-6').format('YYYY:MM:DD HH:mm:ssZ');
      const newDateInMilliseconds = parsedDate.valueOf();

            // Update the EXIF data
      await exiftool.write(filePath, {
        DateTimeOriginal: newDate,
        ModifyDate: newDate,
        FileModifyDate: newDate
      });

      console.log(`Updated EXIF data for: ${filePath} ${newDate}`);

            // Update File Modification Date/Time and Access Time
      fs.utimes(filePath, newDateInMilliseconds / 1000, newDateInMilliseconds / 1000, (err) => {
        if (err) {
          console.error(`Error updating file timestamps for: ${filePath}`, err);
        } else {
          console.log(`Updated file timestamps for: ${filePath} ${newDate} ${parsedDate}`);
        }
      });
    }
  } catch (error) {
    console.error(`Error updating EXIF data for: ${filePath}`, error);
  }
};

/**
 * Asynchronously reads and logs the EXIF metadata tags of a given image file.
 *
 * @async
 * @param {string} filePath - The path to the image file to read EXIF metadata from.
 */
const outputTags = async (filePath) => {
  try {
    const metadata = await exiftool.read(filePath);
    console.log(metadata)
  } catch (error) {
    console.error(`Error updating EXIF data for: ${filePath}`, error);
  }
};

// Read all the files from the directory synchronously
const files = fs.readdirSync(directoryPath);

/**
 * Creates an array of promises by filtering and mapping over each file in the directory.
 * Each promise corresponds to reading and possibly updating EXIF data of a .jpg or .JPG file.
 * If 'outputTags' is passed as a command-line argument, it will output the tags.
 * Otherwise, it will update the EXIF data.
 *
 * @type {Promise[]}
 */
const promises = files
.filter(file => file.toLowerCase().endsWith('.jpg'))
.map(file => {
  const filePath = path.join(directoryPath, file);

        // Check if a specific argument is passed, for example 'outputTags'
  if (process.argv[2] === 'outputTags') {
    return outputTags(filePath);
  } else {
    return updateExifData(filePath);
  }
});

/**
 * Waits for all promises created above to resolve, then closes the ExifTool process.
 * Logs to the console if there is an error or when ExifTool is closed.
 */
Promise.all(promises)
.then(() => exiftool.end())
.then(() => console.log('ExifTool closed'))
.catch(error => console.error('An error occurred:', error));
