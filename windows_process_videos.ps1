param (
    [String]$videoUrl1,
    [String]$videoUrl2,
    [float]$speed1,
    [float]$speed2,
    [String]$mute1,
    [String]$mute2,
    [int]$width,
    [int]$height,
    [String]$lengthAdjust
)

$mute1 = [bool]::Parse($mute1)
$mute2 = [bool]::Parse($mute2)

$audioFilter1 = if ($mute1) { "anull" } else { "atempo=$speed1" }
$audioFilter2 = if ($mute2) { "anull" } else { "atempo=$speed2" }

yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "video1.mp4" $videoUrl1
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "video2.mp4" $videoUrl2

# Determine video duration and decide whether to cut or loop based on lengthAdjust
# Implement logic to handle "cut" or "loop"

# Process videos using ffmpeg with conditional logic based on lengthAdjust
# Use ffmpeg to cut to shortest length or loop to match the longer video

# Output the final video
ffmpeg -i processed_video1.mp4 -i processed_video2.mp4 -filter_complex "[0:v][1:v]vstack=inputs=2[v]" -map "[v]" final_video.mp4

Remove-Item processed_video1.mp4, processed_video2.mp4

Write-Output "Video processing complete. Output is 'final_video.mp4'"
