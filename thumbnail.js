import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

const getVideoThumbnail = (videoFile, videoTimeInSeconds) => {
  return new Promise((resolve, reject) => {
    if (videoFile.type.match("video")) {
      const outputPath = `./thumbnails/${videoFile.name}.jpg`;
      ffmpeg(videoFile.path)
        .inputOptions(`-ss ${videoTimeInSeconds}`)
        .screenshots({
          count: 1,
          folder: "./thumbnails",
          filename: `${videoFile.name}.jpg`,
        })
        .on("end", () => {
          fs.readFile(outputPath, (err, data) => {
            if (err) {
              reject(err);
            } else {
              const thumbnail = Buffer.from(data).toString("base64");
              resolve(thumbnail);
            }
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    } else {
      reject("file not valid");
    }
  });
};

// const videoFile = {
//   path: "./Demon Slayer.mkv",
//   name: "Demon Slayer.mkv",
//   type: "video/mkv",
// };

const videoFile = {
  path: "./vid10001-0360.mp4",
  name: "vid10001-0360.mp4",
  type: "video/mp4",
};

const timestamp = 10; // 10 seconds
getVideoThumbnail(videoFile, timestamp)
  .then((thumbnail) => {
    // Use the thumbnail image
    // console.log(thumbnail);
  })
  .catch((error) => {
    console.error(error);
  });
