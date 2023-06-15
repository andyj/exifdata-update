const { ExifTool } = require('exiftool-vendored');
const luxon = require('luxon');
const fs = require('fs');
const path = require('path');

const exiftool = new ExifTool();
const directoryPath = './Path/To/Photos';

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

// Function output the tags
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

// Create an array of promises for each .jpg or .JPG file
const promises = files
.filter(file => file.toLowerCase().endsWith('.jpg'))
.map(file => {
    const filePath = path.join(directoryPath, file);
        // return outPutTags(filePath);
    return updateExifData(filePath);
});

// Wait for all promises to resolve, then close the ExifTool process
Promise.all(promises)
.then(() => exiftool.end())
.then(() => console.log('ExifTool closed'))
.catch(error => console.error('An error occurred:', error));
