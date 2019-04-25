let YTLoaded = false;
let YTlisteners = [];
/**
 * Loads the youtube API once an
 * @param {Function} onReady function called when API loaded
 */
export function loadYouTubeAPI(onReady) {
    // Already loaded, escape
    if (YTLoaded) { return onReady(); }

    // Listen, all will be called when loaded
    YTlisteners.push(onReady);

    // Do one time setup
    if (!window.hasOwnProperty('onYouTubeIframeAPIReady')) {
        window.onYouTubeIframeAPIReady = function YTLoadFlip() {
            YTlisteners.forEach(fn => fn());
            YTLoaded = true;
            YTlisteners = null;
        };

        // This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
};

/**
 * Extracts the video parameters and ID from *common* YouTube links
 * @param {String} video user provided video url string
 * @return { v:VideoId, ...parameters }
 */
export function getVideoParameters(video) {

    // Copy url last slash
    const urlEnd = video.substring(video.lastIndexOf('/') + 1);

    // Clean out front variables to get ending id (tested using: https://regexr.com/4a37s)
    // captures the variables after video loaded
    const urlVars = '?v=' + urlEnd.replace(/(watch\?(.)*v=)/g, '');

    // Capture other variables {https://regexr.com/4a38e}
    var parameters = urlVars.split(/\?|\&/g).reduce((vals, cur) => {
        const keyVal = cur.split('=');
        return { ...vals, [keyVal[0]]: keyVal[1] };
    }, {});

    return parameters;
};

/**
 * Get a video's thumbnail image via it's ID.
 * @param {String} videoID video id from url
 * @param {Number} thumb Optional - used to depict sub-thumbnail
 */
export function getThumbnailURL( videoID, thumb = 0 ){
    // (found here: https://stackoverflow.com/a/18681824/2945133)
    return `http://img.youtube.com/vi/${videoID}/${thumb}.jpg`;
};