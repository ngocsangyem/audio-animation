let time;
let percent = 0;
const audioContainer = document.getElementsByClassName('audio-container');

if (audioContainer && audioContainer.length > 0) {
    Array.prototype.forEach.call(audioContainer, function(element) {
        element.addEventListener('click', function(event) {
            const audio = element.querySelector('.audio');

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

            audio.addEventListener('playing', function(event) {
                let duration = event.target.duration;
                advance(duration, audio, element);
            });

            audio.addEventListener('pause', function(event) {
                clearTimeout(timer);
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
        });
    });
}
