// const express = require("express");
// const app = express();

// app.get("/camera/feed", (req, res) => {
//   const child_process = require("child_process");
//   // Thanks to https://stackoverflow.com/q/28946904/1954789

//   res.header("content-type", "video/webm");
const rtsp_url =
  "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov";
//   const rtsp_url = req.query.rtsp_url;
//   console.log(rtsp_url);

//   // .\server\libs\ffmpeg.exe -i rtsp://{username}:{password}@{ip}:554/stream1 -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -vcodec copy -y .\videos\ipcam\index.m3u8
//   // const cmd =
//   //   `ffmpeg -i ${rtsp_url} -c:v copy -c:a copy -bsf:v h264_mp4toannexb -maxrate 500k -f matroska -`.split(
//   //     " "
//   //   );

//   // res.on("close", () => {
//   //   // Kill ffmpeg if the flow is stopped by the browser
//   //   child.kill();
//   // });
// });
// app.listen(3002, () => {
//   console.log("listening on port 3002");
// });
// const child_process = require("child_process");

const urls = new Map();

urls.set(
  "stream1",
  "rtsp://freja.hiof.no:1935/rtplive/_definst_/hessdalen02.stream"
);
urls.set(
  "stream2",
  "rtsp://freja.hiof.no:1935/rtplive/_definst_/hessdalen03.stream"
);

let cmd = [];
const child_process = require("child_process");

urls.forEach((key, value) => {
  console.log("Key", key, "value: ", value);
  cmd =
    `ffmpeg -i ${key} -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -vcodec copy -y ip_cam_videos/${value}.m3u8`.split(
      " "
    );

  console.log(cmd);
  child_process.spawn(cmd[0], cmd.splice(1), {
    stdio: ["ignore", "pipe", process.stderr],
  });
});

// -i rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -vcodec copy -y ip_cam_videos/stream5.m3u8

// ffmpeg -i rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov -c:v copy -c:a copy -bsf:v h264_mp4toannexb -maxrate 500k -f matroska -
