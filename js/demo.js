(function() {
    let time;
    let percent = 0;
    const audioContainer = document.getElementsByClassName('audio-container');
    const audioBtn = document.getElementById('audiobutton');

    // const audio = element.querySelector('.audio');
    const doc = document.documentElement;
    const audioSrc = audioBtn.getAttribute('data-src');
    const audio = new Audio(audioSrc);
    const parentEl = audioBtn.closest('.hasAudio');
    const viewportOffset = parentEl.getBoundingClientRect();
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);

    let isPlaying = false;

    // audio.muted = true;
    const audioDurationDestination = audioBtn.querySelector('.audio-duration');
    // const audio = element.querySelector('.audio');
    audioBtn.addEventListener('click', function(event) {
        console.log('click play now');

        if (!audio.paused) {
            audioBtn.classList.add('audio-pause');
            audioBtn.classList.remove('audio-active');
            audio.pause();
        } else {
            audioBtn.classList.remove('audio-init');
            audioBtn.classList.remove('audio-pause');
            audioBtn.classList.add('audio-active');
            audio.play();
        }
    });

    window.onload = function() {
        audio.controls;
        audio.preload = 'auto';
        audio.loop = true;
        // audio.muted = true;
        getDuration(audioSrc, audioDurationDestination);
    };

    window.addEventListener('scroll', function() {
        const parentElTop = viewportOffset.top;
        const parentElHeight = parentEl.offsetHeight;
        const windowHeight = window.innerHeight;
        const windowScrollTop =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        if (
            windowScrollTop > parentElTop + parentElHeight - windowHeight &&
            isPlaying === false
        ) {
            audioBtn.classList.remove('audio-init');
            audioBtn.classList.remove('audio-pause');
            audioBtn.classList.add('audio-active');
            audioBtn.click();
            isPlaying = true;
        }
    });

    audio.addEventListener('playing', function(event) {
        let duration = event.target.duration;
        advance(duration, audio, audioBtn);
    });

    audio.addEventListener('pause', function(event) {
        clearTimeout(timer);
    });

    audio.addEventListener('ended', function() {
        audioBtn.classList.remove('audio-active');
        audioBtn.classList.add('audio-init');
    });

    const advance = function(duration, audio, element) {
        let progress = element.querySelector('.audio-progress');
        increment = 10 / duration;
        percent = Math.min(increment * audio.currentTime * 10, 100);
        progress.style.width = percent + '%';
        startTimer(duration, audio, element);
    };

    const startTimer = function(duration, audio, element) {
        if (percent < 100) {
            timer = setTimeout(function() {
                advance(duration, audio, element);
            }, 100);
        }
    };

    const getDuration = function(src, destination) {
        const audio = new Audio();

        audio.addEventListener('loadedmetadata', function() {
            const minutes = parseInt(audio.duration / 60, 10);
            const seconds = parseInt(audio.duration % 60);

            if (seconds > 9) {
                destination.textContent = `${minutes}:${seconds}`;
            } else {
                destination.textContent = `${minutes}:0${seconds}`;
            }
            // destination.textContent =
            //     seconds > 9
            //         ? `${minutes}:${seconds}`
            //         : `${minutes}:0${seconds}`;
        });
        audio.src = src;
    };
})();
