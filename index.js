
const express=require('express');
const app = express();


app.get('/camera/feed', (req, res) => {
    const child_process = require('child_process');
    // Thanks to https://stackoverflow.com/q/28946904/1954789

    res.header('content-type', 'video/webm');
    // const rtsp_url="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"
    const rtsp_url = req.query.rtsp_url;
    console.log(rtsp_url)

    const cmd = `ffmpeg -i ${rtsp_url} -c:v copy -c:a copy -bsf:v h264_mp4toannexb -maxrate 500k -f matroska -`.split(' ');

    var child = child_process.spawn(cmd[0], cmd.splice(1), {
        stdio: ['ignore', 'pipe', process.stderr]
    });

    child.stdio[1].pipe(res);

    res.on('close', () => {
        // Kill ffmpeg if the flow is stopped by the browser
        child.kill();
    })});
app.listen(3002,()=>{console.log("listening on port 3002")});