document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('videoForm');
    form.onsubmit = function(event) {
        event.preventDefault();
        const videoUrl1 = document.getElementById('videoUrl1').value;
        const videoUrl2 = document.getElementById('videoUrl2').value;
        const width = document.getElementById('width').value;
        const height = document.getElementById('height').value;
        const speed1 = document.getElementById('speed1').value;
        const speed2 = document.getElementById('speed2').value;
        const mute1 = document.getElementById('mute1').checked;
        const mute2 = document.getElementById('mute2').checked;
        const lengthAdjust = document.querySelector('input[name="lengthAdjust"]:checked').value;

        const loadingDiv = document.getElementById('loading');
        const progressBar = document.getElementById('progress');
        loadingDiv.style.display = 'block';
        progressBar.innerText = '0';

        let progress = 10; // Initial mock progress
        const interval = setInterval(() => {
            if (progress < 90) {
                progress += 10; // Increment mock progress before completion
                progressBar.innerText = progress;
            }
        }, 1000);

        fetch('/process-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoUrl1, videoUrl2, speed1, speed2, mute1, mute2, width, height, lengthAdjust }),
        })
        .then(response => response.json())
        .then(data => {
            clearInterval(interval);
            progressBar.innerText = data.progress; // Update with actual final progress
            alert(data.message);
            loadingDiv.style.display = 'none';
        })
        .catch(error => {
            alert('Error processing videos: ' + error);
            clearInterval(interval);
            progressBar.innerText = 'Error';
            loadingDiv.style.display = 'none';
        });
    };

    // Functions to update the display of speed values
    document.getElementById('speed1').oninput = function() {
        document.getElementById('speed1Display').textContent = this.value + 'x';
    };

    document.getElementById('speed2').oninput = function() {
        document.getElementById('speed2Display').textContent = this.value + 'x';
    };
});
