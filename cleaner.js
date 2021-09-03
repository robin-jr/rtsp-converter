const findRemoveSync = require("find-remove");

setInterval(() => {
  var result = findRemoveSync("./ip_cam_videos", {
    age: { seconds: 30 },
    extensions: ".ts",
  });
  console.log("cleaning ----->", result);
}, 5000);
