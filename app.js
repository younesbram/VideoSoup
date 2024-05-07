const express = require('express');
const { execFile } = require('child_process');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/process-video', (req, res) => {
    const { videoUrl1, videoUrl2, speed1, speed2, mute1, mute2, width, height } = req.body;
    execFile('powershell.exe', [
        './windows_process_videos.ps1',
        videoUrl1,
        videoUrl2,
        speed1.toString(),
        speed2.toString(),
        mute1.toString(),
        mute2.toString(),
        width.toString(),
        height.toString()
    ], (error, stdout, stderr) => {
        if (error) {
            console.error(`execFile error: ${error}`);
            return res.status(500).send(`Error processing videos: ${error.message}`);
        }
        res.send({message: "Videos processed successfully!", progress: 100});
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
