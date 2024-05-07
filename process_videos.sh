#!/bin/bash
# use this script if you are linuxchad, otherwise use the one in the repo for windows
# Check if the arguments are passed correctly
echo "Video URL 1: $1"
echo "Video URL 2: $2"

# Download videos using yt-dlp
yt-dlp -o "video1.mp4" "$1"
yt-dlp -o "video2.mp4" "$2"

# Use ffmpeg to process the videos
# Mute and speed up the first video
ffmpeg -i video1.mp4 -filter_complex "[0:v]setpts=0.75*PTS,scale=1280:360[top];[0:a]atempo=1.33,anull[a]" -map "[top]" -map "[a]" processed_video1.mp4

# Leave the second video as is but scale to the same width and half the height
ffmpeg -i video2.mp4 -filter:v scale=1280:360 -c:a copy processed_video2.mp4

# Combine the two processed videos into one, one on top of the other
ffmpeg -i processed_video2.mp4 -i processed_video1.mp4 -filter_complex "[0:v][1:v]vstack=inputs=2[v]" -map "[v]" -map 0:a final_video.mp4

# Clean up temporary files
rm processed_video1.mp4 processed_video2.mp4

# Output final video is 'final_video.mp4'
echo "Video processing complete. Output is 'final_video.mp4'"
