(function () {
    "use strict";
    var Media = Windows.Media;
    var playbackItem;
    var systemMediaControls = null;

    var mainAudio;
    var page = WinJS.UI.Pages.define("/html/scenario5.html", {
        ready: function (element, options) {
            document.getElementById("btn1").addEventListener("click", btn1Click, false);
            document.getElementById("btn2").addEventListener("click", btn2Click, false);
            document.getElementById("btn3").addEventListener("click", btn3Click, false);

            systemMediaControls = Windows.Media.SystemMediaTransportControls.getForCurrentView();
            systemMediaControls.addEventListener("buttonpressed", mediaButtonPressed, false);
            systemMediaControls.isPlayEnabled = true;
            systemMediaControls.isPauseEnabled = true;
            systemMediaControls.playbackStatus = Windows.Media.MediaPlaybackStatus.closed;

            mainAudio = document.getElementById("mainAudio");
            mainAudio.addEventListener("playing", audioPlaying, false);
            mainAudio.addEventListener("pause", audioPaused, false);

            var playlist = new Media.Playback.MediaPlaybackList();

            var source1 = Media.Core.MediaSource.createFromUri(new Windows.Foundation.Uri("http://demos.w3avenue.com/html5-unleashed-tips-tricks-and-techniques/demo-audio.mp3"));
            playbackItem = new Media.Playback.MediaPlaybackItem(source1);
            playlist.items.append(playbackItem);


            mainAudio.src = URL.createObjectURL(playlist, { oneTimeOnly: true });


        }
    });

    function doSomething() {
        WinJS.log && WinJS.log("Error message here", "sample", "error");
    }

    function btn1Click() {
        playbackItem.audioTracks.selectedIndex = 0;
    }
    function btn2Click() {
        playbackItem.audioTracks.selectedIndex = 1;
    }
    function btn3Click() {
        playbackItem.audioTracks.selectedIndex = 2;
    }

    function audioPlaying() {
        systemMediaControls.playbackStatus = Windows.Media.MediaPlaybackStatus.playing;
    }
    function audioPaused() {
        systemMediaControls.playbackStatus = Windows.Media.MediaPlaybackStatus.paused;
    }

    function mediaButtonPressed(e) {
        switch (e.button) {
            case Windows.Media.SystemMediaTransportControlsButton.play:
                mainAudio.play();
                break;
            case Windows.Media.SystemMediaTransportControlsButton.pause:
                mainAudio.pause();
                break;
            default:
                break;
        }
    }

    // The event handler for the play/pause button
    function playpausetoggle() {
        if (mediaControls.isPlaying === true) {
            mainAudio.pause();
        } else {
            mainAudio.play();
        }
    }

    // The event handler for the pause button
    function pausebutton() {
        mainAudio.pause();
    }

    // The event handler for the play button
    function playbutton() {
        mainAudio.play();
    }

})();
