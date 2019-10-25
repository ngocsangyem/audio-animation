(function() {
    let time;
    let percent = 0;
    const audioContainer = document.getElementsByClassName('audio-container');
    const galleryAudioContainer = document.getElementsByClassName(
        'gallery-with-audio-container'
    );

    if (audioContainer && audioContainer.length > 0) {
        Array.prototype.forEach.call(audioContainer, function(element) {
            // const audio = element.querySelector('.audio');
            const doc = document.documentElement;
            const audioSrc = element.getAttribute('data-audio');
            const audio = new Audio(audioSrc);
            const parentEl = element.closest('.hasAudio');
            // const viewportOffset = parentEl.getBoundingClientRect();

            let isPlaying = false;

            // audio.muted = true;
            const audioDurationDestination = element.querySelector(
                '.audio-duration'
            );
            // const audio = element.querySelector('.audio');
            element.addEventListener('click', function(event) {
                if (!audio.paused) {
                    element.classList.add('audio-pause');
                    element.classList.remove('audio-active');
                    audio.pause();
                } else {
                    element.classList.remove('audio-init');
                    element.classList.remove('audio-pause');
                    element.classList.add('audio-active');
                    audio.play();
                }
            });

            window.onload = function() {
                audio.controls;
                audio.preload = 'auto';
                // audio.muted = true;

                getDuration(audio.src, audioDurationDestination);
            };

            // window.addEventListener('scroll', function() {
            //     const parentElTop = viewportOffset.top;
            //     const parentElHeight = parentEl.offsetHeight;
            //     const windowHeight = window.innerHeight;
            //     const windowScrollTop =
            //         (window.pageYOffset || doc.scrollTop) -
            //         (doc.clientTop || 0);

            //     if (
            //         windowScrollTop >
            //             parentElTop + parentElHeight - windowHeight &&
            //         isPlaying === false
            //     ) {
            //         element.classList.remove('audio-init');
            //         element.classList.remove('audio-pause');
            //         element.classList.add('audio-active');
            //         audio.autoplay = true;
            //         isPlaying = true;
            //     }
            // });

            audio.addEventListener('playing', function(event) {
                let duration = event.target.duration;
                advance(duration, audio, element);
            });

            audio.addEventListener('pause', function(event) {
                clearTimeout(timer);
            });

            audio.addEventListener('ended', function() {
                element.classList.remove('audio-active');
                element.classList.add('audio-init');
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
        });
    }
    if (galleryAudioContainer && galleryAudioContainer.length > 0) {
        Array.prototype.forEach.call(galleryAudioContainer, function(element) {
            // const audio = element.querySelector('.audio');
            const audioSrc = element.getAttribute('data-audio');
            const audio = new Audio(audioSrc);
            const audioBtn = element.querySelector('.gallery-audio-button');
            audioBtn.addEventListener('click', function(event) {
                if (!audio.paused) {
                    audioBtn.classList.add('is-muted');
                    audio.pause();
                } else {
                    audioBtn.classList.remove('is-muted');
                    audio.play();
                }
            });
        });
    }
})();
