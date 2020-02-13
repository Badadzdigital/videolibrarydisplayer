var videoCountPerPage = 18;/* Number of videos to display per page */
var spreadsheet = "https://docs.google.com/spreadsheets/d/1pRR4dLWBRF2pwnhdR___EQlnvp2xdErHtKyqhJxnI3Y/edit#gid=0";
var videoCount;
var searchCount;
var pageCount;
var searchPageCount;
var currentPage = 1;
var videoId;
var videoName;
var videoImg;
var theData = {};
var authorizationList = [];
var idList = [];
var nameList = [];
var imgList = [];
var searchIdList = [];
var searchNameList = [];
var searchImgList = [];
var firstVideoIndex = 1;
var targetTimeText = "";
var lastIndex;
var touchX;
var modalOpen = 0;
var playing = 0;
var paused = 0;
var searching = 0;
var tracking = 0;
var i = 0;
var mobile = 0;
var videoPlayer;
var iframePlayer;

var nextPageButton = "<svg id='next-page' onclick='nextPage()' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='20 80 220 95' style='enable-background:new 0 0 256 256;' xml:space='preserve'><g><polygon points='109.5754,133.8047 96.2975,113.3812 92.788,113.3812 92.788,139.7201 96.2975,139.7201 96.2975,119.3509 109.5211,139.7201 113.0487,139.7201 113.0487,113.3812 109.5754,113.3812 	'/><path d='M130.9305,121.0061c-1.2-0.814-2.7105-1.2211-4.5315-1.2211c-1.4954,0-2.8974,0.404-4.2059,1.212 s-2.3607,1.9748-3.1567,3.5004c-0.796,1.5256-1.1939,3.3074-1.1939,5.3456v0.7779c0,1.821,0.3708,3.4491,1.1125,4.8843 s1.7939,2.5567,3.1567,3.3647s2.9366,1.212,4.7215,1.212c1.7849,0,3.2803-0.3528,4.4863-1.0583 c1.206-0.7055,2.1708-1.613,2.8944-2.7225l-2.0441-1.5919c-0.6512,0.8563-1.3899,1.5135-2.216,1.9718 c-0.8261,0.4583-1.806,0.6874-2.9396,0.6874c-1.1577,0-2.1678-0.2864-3.0301-0.8593c-0.8623-0.5728-1.5286-1.3537-1.9989-2.3426 c-0.4703-0.9889-0.7236-2.0924-0.7598-3.3104h13.2418v-1.5015c0-1.8813-0.2894-3.5396-0.8683-4.9747 C133.0199,122.9447,132.1304,121.8202,130.9305,121.0061z M131.0842,128.1426h-9.7504c0.2291-1.7969,0.7929-3.1868,1.6914-4.1697 c0.8985-0.9829,2.023-1.4743,3.3738-1.4743c1.5678,0,2.7165,0.5156,3.4461,1.5467c0.7296,1.0311,1.1427,2.3125,1.2392,3.8441 V128.1426z'/><polygon points='153.1901,120.1468 149.2465,120.1468 144.9411,127.2923 140.6719,120.1468 136.7645,120.1468 143.1683,129.8068 136.5655,139.7201 140.5091,139.7201 144.9953,132.3575 149.4997,139.7201 153.389,139.7201 146.8043,129.8068 	'/><path d='M164.2972,137.1604c-0.3015,0.0422-0.5789,0.0633-0.8321,0.0633c-0.6633,0-1.1879-0.1598-1.5738-0.4794 c-0.3859-0.3196-0.5789-0.9437-0.5789-1.8723v-12.1745h3.6541v-2.5507h-3.6541v-4.7576h-3.3828v4.7576h-3.5637v2.5507h3.5637 v12.1564c0,1.8452,0.4131,3.1778,1.2392,3.9978c0.8261,0.8201,1.9205,1.2301,3.2833,1.2301c0.9527,0,1.815-0.1206,2.5869-0.3618 l-0.0181-2.6954C164.8399,137.0729,164.5987,137.1181,164.2972,137.1604z'/><path d='M190.6783,96.9737H65.3698c-16.9713,0-30.7799,13.8071-30.7799,30.7784s13.8086,30.7784,30.7799,30.7784h125.3084 c16.9713,0,30.7799-13.8071,30.7799-30.7784S207.6496,96.9737,190.6783,96.9737z M190.6783,155.2743H65.3698 c-15.1774,0-27.5237-12.3463-27.5237-27.5222c0-15.1774,12.3463-27.5252,27.5237-27.5252h125.3084 c15.1774,0,27.5237,12.3478,27.5237,27.5252C218.202,142.928,205.8557,155.2743,190.6783,155.2743z'/></g></svg>";

var previousPageButton = "<svg id='prev-page' onclick='previousPage()' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='20 80 220 95' style='enable-background:new 0 0 256 256;' xml:space='preserve'><g><path d='M73.889,114.4033c-1.3929-0.6814-3.0602-1.0221-5.0018-1.0221h-9.7323v26.3388h3.5094v-10.3293h6.2229 c1.9778,0,3.6572-0.3105,5.038-0.9316c1.3809-0.6211,2.4271-1.5286,3.1386-2.7225c0.7115-1.1939,1.0673-2.6351,1.0673-4.3235 c0-1.5798-0.3588-2.9728-1.0763-4.1788C76.3371,116.0284,75.2819,115.0847,73.889,114.4033z M73.2197,125.1939 c-0.9346,0.9165-2.3788,1.3748-4.3325,1.3748h-6.2229v-10.3474h6.2229c1.2904,0,2.3668,0.2382,3.229,0.7146 s1.4954,1.1095,1.8994,1.8994c0.404,0.7899,0.606,1.6612,0.606,2.614C74.6216,123.0292,74.1543,124.2774,73.2197,125.1939z'/><path d='M90.0161,119.785c-1.0372,0-1.9417,0.2261-2.7135,0.6784c-0.7718,0.4522-1.411,1.0884-1.9175,1.9085l-0.0724-2.2251 h-3.2924v19.5732h3.3828V125.809c0.3739-0.8924,0.9316-1.5859,1.6733-2.0803s1.6673-0.7417,2.7768-0.7417 c0.5789,0,1.1276,0.0482,1.6462,0.1447v-3.0934c-0.1206-0.0603-0.3437-0.1176-0.6693-0.1719 C90.5045,119.8122,90.2332,119.785,90.0161,119.785z'/><path d='M106.8125,121.0061c-1.2-0.814-2.7105-1.2211-4.5315-1.2211c-1.4954,0-2.8974,0.404-4.2059,1.212 s-2.3607,1.9748-3.1567,3.5004c-0.796,1.5256-1.1939,3.3074-1.1939,5.3456v0.7779c0,1.821,0.3708,3.4491,1.1125,4.8843 s1.7939,2.5567,3.1567,3.3647s2.9366,1.212,4.7215,1.212s3.2803-0.3528,4.4863-1.0583c1.206-0.7055,2.1708-1.613,2.8944-2.7225 l-2.0442-1.5919c-0.6512,0.8563-1.3899,1.5135-2.216,1.9718c-0.8261,0.4583-1.806,0.6874-2.9396,0.6874 c-1.1578,0-2.1678-0.2864-3.0301-0.8593s-1.5286-1.3537-1.9989-2.3426c-0.4703-0.9889-0.7236-2.0924-0.7598-3.3104h13.2418v-1.5015 c0-1.8813-0.2894-3.5396-0.8683-4.9747C108.9019,122.9447,108.0125,121.8202,106.8125,121.0061z M106.9663,128.1426h-9.7504 c0.2291-1.7969,0.7929-3.1868,1.6914-4.1697c0.8985-0.9829,2.023-1.4743,3.3738-1.4743c1.5678,0,2.7165,0.5156,3.4461,1.5467 s1.1427,2.3125,1.2392,3.8441V128.1426z'/><polygon points='120.4794,135.1433 115.5228,120.1468 112.0676,120.1468 119.1588,139.7201 119.4483,139.7201 121.7276,139.7201 128.7465,120.1468 125.2913,120.1468 	'/><rect x='132.2559' y='120.1468' width='3.3828' height='19.5732'/><path d='M133.9744,113.0194c-0.6271,0-1.1125,0.1809-1.4562,0.5427c-0.3437,0.3618-0.5156,0.8201-0.5156,1.3748 c0,0.5427,0.1719,0.9919,0.5156,1.3477s0.8291,0.5337,1.4562,0.5337s1.1186-0.1779,1.4743-0.5337 c0.3558-0.3558,0.5337-0.805,0.5337-1.3477c0-0.5548-0.1779-1.013-0.5337-1.3748 C135.093,113.2003,134.6016,113.0194,133.9744,113.0194z'/><path d='M153.7286,121.0785c-1.3507-0.8623-2.9306-1.2934-4.7395-1.2934c-1.7849,0-3.3496,0.4311-4.6943,1.2934 s-2.3788,2.0472-3.1024,3.5547c-0.7236,1.5075-1.0854,3.2079-1.0854,5.1013v0.4161c0,1.8934,0.3648,3.5908,1.0944,5.0923 c0.7296,1.5014,1.7668,2.6833,3.1115,3.5456s2.9155,1.2934,4.7124,1.2934c1.7969,0,3.3677-0.4311,4.7124-1.2934 s2.3788-2.0442,3.1024-3.5456c0.7236-1.5015,1.0854-3.1989,1.0854-5.0923v-0.4161c0-1.8934-0.3618-3.5939-1.0854-5.1013 C156.1164,123.1256,155.0793,121.9408,153.7286,121.0785z M154.5426,130.1505c0,1.3266-0.208,2.5386-0.6241,3.6361 c-0.4161,1.0975-1.0402,1.9688-1.8723,2.614c-0.8321,0.6452-1.8391,0.9678-3.021,0.9678c-1.1939,0-2.207-0.3226-3.0391-0.9678 c-0.8321-0.6452-1.4562-1.5165-1.8723-2.614c-0.4161-1.0975-0.6241-2.3095-0.6241-3.6361v-0.4161 c0-1.3266,0.208-2.5386,0.6241-3.6361c0.4161-1.0975,1.0372-1.9718,1.8633-2.623c0.8261-0.6512,1.8301-0.9769,3.012-0.9769 c1.1939,0,2.207,0.3256,3.0391,0.9769c0.8321,0.6512,1.4592,1.5256,1.8813,2.623c0.4221,1.0975,0.6331,2.3095,0.6331,3.6361 V130.1505z'/><path d='M174.0977,134.4197c-0.8563,1.8934-2.5507,2.8401-5.0833,2.8401c-1.0492,0-1.9085-0.3347-2.5778-1.004 s-1.004-1.818-1.004-3.4461v-12.6629h-3.3828v12.6267c0,2.5085,0.5668,4.3536,1.7005,5.5355 c1.1336,1.1819,2.7074,1.7728,4.7215,1.7728c2.5205,0,4.432-0.7658,5.7345-2.2974l0.0543,1.9356h3.22v-19.5732h-3.3828V134.4197z'/><path d='M194.2875,129.7525c-1.0251-0.5065-2.3577-0.9467-3.9979-1.3206c-1.218-0.2653-2.1497-0.5367-2.7949-0.814 c-0.6452-0.2774-1.0914-0.5879-1.3387-0.9316c-0.2472-0.3437-0.3708-0.7748-0.3708-1.2934c0-0.5065,0.1357-0.9799,0.407-1.4201 c0.2713-0.4402,0.6965-0.796,1.2753-1.0673s1.3085-0.407,2.1889-0.407c0.8321,0,1.5587,0.1658,2.1798,0.4975 c0.6211,0.3316,1.0944,0.7568,1.4201,1.2753s0.4884,1.0552,0.4884,1.61h3.3828c0-1.1336-0.2985-2.1617-0.8954-3.0843 c-0.597-0.9226-1.4623-1.6552-2.5959-2.1979c-1.1336-0.5427-2.4602-0.814-3.9798-0.814c-1.4231,0-2.6863,0.2593-3.7898,0.7779 c-1.1035,0.5186-1.9567,1.212-2.5597,2.0803c-0.603,0.8683-0.9045,1.821-0.9045,2.8582c0,1.5316,0.5939,2.7316,1.7818,3.5999 c1.1879,0.8683,2.9456,1.5437,5.2732,2.0261c1.2301,0.2533,2.1708,0.5487,2.822,0.8864s1.0914,0.7055,1.3206,1.1035 c0.2291,0.398,0.3437,0.8683,0.3437,1.411s-0.1628,1.0281-0.4884,1.4562c-0.3256,0.4281-0.805,0.7658-1.4381,1.013 c-0.6331,0.2472-1.3899,0.3708-2.2703,0.3708c-0.7598,0-1.4803-0.1206-2.1617-0.3618c-0.6814-0.2412-1.2512-0.6362-1.7095-1.1849 s-0.7115-1.2572-0.7598-2.1256h-3.3828c0,1.1095,0.3136,2.1527,0.9407,3.1295s1.5467,1.7638,2.7587,2.3607 c1.212,0.597,2.6502,0.8954,4.3144,0.8954c1.5075,0,2.8341-0.2442,3.9798-0.7326c1.1457-0.4884,2.0321-1.1698,2.6592-2.0442 s0.9407-1.8783,0.9407-3.012c0-1.0492-0.2502-1.9417-0.7507-2.6773C196.0754,130.8802,195.3126,130.2591,194.2875,129.7525z'/><path d='M190.2716,96.9737H64.9631c-16.9713,0-30.7784,13.8071-30.7784,30.7784s13.8071,30.7784,30.7784,30.7784h125.3084 c16.9713,0,30.7784-13.8071,30.7784-30.7784S207.2429,96.9737,190.2716,96.9737z M190.2716,155.2743H64.9631 c-15.1774,0-27.5252-12.3463-27.5252-27.5222c0-15.1774,12.3478-27.5252,27.5252-27.5252h125.3084 c15.1774,0,27.5252,12.3478,27.5252,27.5252C217.7968,142.928,205.449,155.2743,190.2716,155.2743z'/></g></svg>";
    
var playIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><polygon points='63.9129,48.7885 63.9129,207.2115 196.0871,128 	'/></svg>";
    
var pauseIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><rect x='48.7885' y='48.7885' width='47.7416' height='158.423'/><rect x='139.4699' y='48.7885' width='47.7416' height='158.423'/></svg>";
    
var audioIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><path d='M147.5,50.4593v19.0419c27.2085,5.916,47.5909,30.1246,47.5909,59.1058c0,28.9811-20.3824,53.1898-47.5909,59.1058v19.0419 c37.6044-6.1665,66.3022-38.7983,66.3022-78.1476C213.8022,89.2575,185.1044,56.6257,147.5,50.4593z'/><path d='M147.5,88.2232v80.7674c17.0985-5.4615,29.4828-21.4736,29.4828-40.3837C176.9828,109.6968,164.5985,93.6848,147.5,88.2232z'/><polygon points='135.5906,49.3954 83.6564,100.6823 42.4453,100.6823 42.4453,156.5315 83.6563,156.5315 135.5906,207.8184 '/></svg>";
    
var muteIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><path d='M213.6785,128c0-39.3494-28.6978-71.9812-66.3022-78.1476v19.0419c27.2085,5.916,47.5909,30.1246,47.5909,59.1058 c0,12.0772-3.5492,23.3188-9.6474,32.7599l13.4677,13.4677C208.157,161.2203,213.6785,145.257,213.6785,128z'/><path d='M176.8591,128c0-18.9102-12.3843-34.9222-29.4828-40.3837v35.2002l24.7188,24.7188 C175.1375,141.6895,176.8591,135.0466,176.8591,128z'/><polygon points='135.4669,48.7885 104.2128,79.653 135.4669,110.9071 '/><path d='M207.9975,197.4377L58.5623,48.0024L48.0025,58.5622l38.5404,38.5405l-3.0103,2.9727H42.3216v55.8492h41.211 l51.9343,51.2869v-61.1848l11.9094,11.9094v10.4476c2.5525-0.8153,4.9916-1.879,7.308-3.1396l13.1841,13.1841 c-6.1365,4.0746-13.0576,7.061-20.4922,8.6776v19.0419c12.5469-2.0575,24.0867-7.0795,33.9122-14.2994l16.1493,16.1493 L207.9975,197.4377z'/></svg>";
    
var progressBar = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve' preserveAspectRatio='none'><rect y='161.4064' width='256' height='33.1872'/></svg>";

/*---------------------VIDEOPLAYER-RELATED FUNCTIONS---------------------*/
/*---------------------VIDEOPLAYER-RELATED FUNCTIONS---------------------*/
/*---------------------VIDEOPLAYER-RELATED FUNCTIONS---------------------*/

function buildPlayer() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('iframePlayer', {
    height: '9',
    width: '16',
    videoId: '',
    playerVars: {
        rel: 0,
        controls: 0
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
        'onPlaybackRateChange': onPlayerPlaybackRateChange,
        'onError': onPlayerError,
        'onApiChange': onPlayerApiChange
        }
    });
}

function onPlayerReady(event) {
    //console.log('player is ready');
    timeupdater = setInterval(function() {
        if (player.getPlayerState() == 1) {
            updateTime();
        }
    }, 100);
}

function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.UNSTARTED:
            document.getElementById("player-controls").style.display = "none";
            playing = 0;
            break;
        case YT.PlayerState.ENDED:
            //console.log('ended');
            player.playVideo();
            break;
        case YT.PlayerState.PLAYING:
            //console.log('playing');
            if(!playing && !modalOpen) {
                player.seekTo(1,true);
            } else if(modalOpen) {
                document.getElementById("player-controls").style.display = "block";
            }
            playing = 1;
            paused = 0;
            document.getElementById("toggle-play").innerHTML = pauseIcon;
            break;
        case YT.PlayerState.PAUSED:
            //console.log('paused');
            paused = 1;
            document.getElementById("toggle-play").innerHTML = playIcon;
            break;
        case YT.PlayerState.BUFFERING:
            //console.log('buffering');
            break;
        case YT.PlayerState.CUED:
            //console.log('video cued');
            break;
    }
}

function onPlayerPlaybackQualityChange(playbackQuality) {
    //console.log('playback quality changed to ' + playbackQuality.data);
}

function onPlayerPlaybackRateChange(playbackRate) {
    //console.log('playback rate changed to ' + playbackRate.data);
}

function onPlayerError(e) {
    //console.log('An error occurred: ' + e.data);
}

function onPlayerApiChange() {
    //console.log('The player API changed');
}

function extractText(test, delim1, delim2) {
    result = test.match(delim1+"(.*)"+delim2)[1];
    //console.log(result);
    return result;
}

/*---------------------OTHER FUNCTIONS---------------------*/
/*---------------------OTHER FUNCTIONS---------------------*/
/*---------------------OTHER FUNCTIONS---------------------*/
    
function getDevice() {
    const mq = window.matchMedia("(max-device-aspect-ratio: 6/7)");
    if (mq.matches) {
        /*MOBILE*/
        mobile = 1;
    } else {
        /*DESKTOP*/
        mobile = 0;
    }
}
    
function authorizationCB(error, options, response) {
    theData.response = response.html;
    var rawList = extractText(JSON.stringify(theData), "<td>", "</td");
    authorizationList = rawList.split(",");
    var domainName = document.domain;
    if(authorizationList.indexOf(domainName) != -1 || domainName == "") {
        sheetrock({
            url: spreadsheet,
            query: "select B",
            callback: videoIdCB
        });
    } else {
        console.log("The current domain ("+domainName+") isn't authorized to use the Bad-Adz Video Library Displayer Plugin");
        document.getElementById("vldp-container").innerHTML = "";
    }
}

function videoIdCB(error, options, response) {
    theData.response = response.html;
    var rawList = JSON.stringify(theData);
    rawList = extractText(rawList, "{\"response\":\"<tr><td>", "</td></tr>\"");
    var idListRaw = rawList.split("</td></tr><tr><td>");
    videoCount = idListRaw.length-1;
    pageCount = Math.ceil(videoCount/videoCountPerPage);
    for(i=0;i<idListRaw.length;i++) {
        videoId = idListRaw[i].replace("https://www.youtube.com/watch?v=", "");
        videoImg = "http://img.youtube.com/vi/"+videoId+"/mqdefault.jpg";
        idList[idList.length] = videoId;
        imgList[imgList.length] = videoImg;
        if(i==idListRaw.length-1) {
            sheetrock({
                url: spreadsheet,
                query: "select C",
                callback: videoNameCB
            });
        }
    }
}

function videoNameCB(error, options, response) {
    theData.response = response.html;
    var rawList = JSON.stringify(theData);
    rawList = extractText(rawList, "{\"response\":\"<tr><td>", "</td></tr>\"");
    nameList = rawList.split("</td></tr><tr><td>");
    idList.shift();
    imgList.shift();
    nameList.shift();
    buildLibrary();
}

function addCardEventListeners(i) {
    var cardDiv = document.getElementById("vid"+i);
    cardDiv.addEventListener("click", openVideo.bind(null, i));
    cardDiv.addEventListener("mouseenter", startPreview.bind(null, i));
    cardDiv.addEventListener("mouseleave", endPreview.bind(null, i));
}

function buildLibrary() {
    var xhash = window.location.hash;
    if(xhash!="") {
        //xhash = xhash.replace("#vid", "");
        xhash = xhash.replace("#", "");
        if(isNaN(xhash)) {
            xhash = xhash.toLowerCase();
            xhash = xhash.replace(new RegExp("-", "g"), " ");
            var nameListLC = nameList;
            nameListLC = nameListLC.map(function(e) {return e.toLowerCase();});
            xhash = nameListLC.indexOf(xhash) + 1;
        }
        if(xhash) {
            while(xhash>videoCountPerPage*currentPage) {
                currentPage += 1;
            }
            firstVideoIndex = videoCountPerPage * (currentPage - 1) + 1;
        }
    }
    var library = document.getElementById("library-container");
    library.innerHTML="<div id='page-controls'><div id='page-text'></div>"+previousPageButton+nextPageButton+"</div>";
    setTimeout(function(){
        var textScaleRef = document.getElementById("next-page").getBoundingClientRect();
        document.querySelector("#page-text .txt").style.fontSize = (textScaleRef.width * 0.2) + "px";
    }, 10);    
    x = firstVideoIndex;
    y = firstVideoIndex+videoCountPerPage-1;
    if(x<0) {x=0;}
    if(y>videoCount) {y=videoCount;}
    for(i=x;i<=y;i++) {
        videoName = nameList[i-1];
        videoImg = imgList[i-1];
        library.innerHTML += "<div id='vid"+i+"' class='video-card' style='background-image: url(&quot;"+videoImg+"&quot;); background-size: contain; background-repeat: no-repeat;' draggable='false'><div class='name-box'><span class='txt'>"+videoName+"</span></div></div>";
        setTimeout(addCardEventListeners.bind(null, i), 500);
        if(i==y) {
            document.getElementById("page-text").innerHTML = "<span class='txt'>Page "+currentPage+"/"+pageCount+"</span>";
            if(xhash && xhash!="") {
                setTimeout(openVideo.bind(null, xhash), 500);
            }
        }
    }
    setTimeout(function(){
        var cardScaleRef = document.getElementById("library-container").getBoundingClientRect();
        var cardElements = document.querySelectorAll(".video-card");
        var cardTextElements = document.querySelectorAll(".name-box .txt");
        for(var i1 = 0; i1 < cardElements.length; i1++) {
            cardElements[i1].style.width = ((cardScaleRef.width * 0.019) * 16) + "px";
            cardElements[i1].style.height = ((cardScaleRef.width * 0.019) * 9) + "px";
            cardTextElements[i1].style.fontSize = (cardScaleRef.width * 0.015) + "px";
        }
    }, 10);
}
    
function buildSearch() {
    var xhash = window.location.hash;
    var library = document.getElementById("library-container");
    library.innerHTML="<div id='page-controls'><div id='page-text'></div>"+previousPageButton+nextPageButton+"</div>";
    setTimeout(function(){
        var textScaleRef = document.getElementById("next-page").getBoundingClientRect();
        document.querySelector("#page-text .txt").style.fontSize = (textScaleRef.width * 0.2) + "px";
    }, 10);    
    x = firstVideoIndex;
    y = firstVideoIndex+videoCountPerPage-1;
    if(x<0) {x=0;}
    if(y>searchCount) {y=searchCount;}
    for(i=x;i<=y;i++) {
        videoName = searchNameList[i-1];
        videoImg = searchImgList[i-1];
        library.innerHTML += "<div id='vid"+i+"' class='video-card' style='background-image: url(&quot;"+videoImg+"&quot;); background-size: contain; background-repeat: no-repeat;' draggable='false'><div class='name-box'><span class='txt'>"+videoName+"</span></div></div>";
        setTimeout(addCardEventListeners.bind(null, i), 500);
        if(i==y) {
            document.getElementById("page-text").innerHTML = "<span class='txt'>Page "+currentPage+"/"+searchPageCount+"</span>";
            if(xhash && xhash!="") {
                setTimeout(openVideo.bind(null, xhash), 500);
            }
        }
    }
    setTimeout(function(){
        var cardScaleRef = document.getElementById("library-container").getBoundingClientRect();
        var cardElements = document.querySelectorAll(".video-card");
        var cardTextElements = document.querySelectorAll(".name-box .txt");
        for(var i1 = 0; i1 < cardElements.length; i1++) {
            cardElements[i1].style.width = ((cardScaleRef.width * 0.019) * 16) + "px";
            cardElements[i1].style.height = ((cardScaleRef.width * 0.019) * 9) + "px";
            cardTextElements[i1].style.fontSize = (cardScaleRef.width * 0.015) + "px";
        }
    }, 10);
}
    
function search() {
    searchQuery = document.getElementById("search-bar").value;
    if(searchQuery == "") {
        if(searching) {
            currentPage = 1;
            firstVideoIndex = 1;
            searching = 0;
        }
        buildLibrary();
    } else {
        if(!searching) {
            currentPage = 1;
            firstVideoIndex = 1;
            searching = 1;
        }
        searchIdList = [];
        searchNameList = [];
        searchImgList = [];
        //nest this loop inside another loop to iterate through list X where list X is the search query split by whitespace?
        for(var i1 = 0; i1 < videoCount; i1++) {
            if(nameList[i1].toLowerCase().includes(searchQuery.toLowerCase())) {
                searchIdList[searchIdList.length] = idList[i1];
                searchNameList[searchNameList.length] = nameList[i1];
                searchImgList[searchImgList.length] = imgList[i1];
            }
        }
        searchCount = searchIdList.length;
        searchPageCount = Math.ceil(searchCount/videoCountPerPage);
        buildSearch();
    }
}

function nextPage() {
    if(searching) {
        if(firstVideoIndex+videoCountPerPage<searchCount) {
            firstVideoIndex += videoCountPerPage;
            currentPage += 1;
            buildSearch();
            document.getElementById("page-text").innerHTML = "<span class='txt'>Page "+currentPage+"/"+searchPageCount+"</span>";
        }
    } else {
        if(firstVideoIndex+videoCountPerPage<videoCount) {
            firstVideoIndex += videoCountPerPage;
            currentPage += 1;
            buildLibrary();
            document.getElementById("page-text").innerHTML = "<span class='txt'>Page "+currentPage+"/"+pageCount+"</span>";
        }
    }
    
}

function previousPage() {
    if(searching) {
        if(firstVideoIndex-videoCountPerPage>0) {
            firstVideoIndex -= videoCountPerPage;
            currentPage -= 1;
            buildSearch();
            document.getElementById("page-text").innerHTML = "<span class='txt'>Page "+currentPage+"/"+searchPageCount+"</span>";
        }
    } else {
        if(firstVideoIndex-videoCountPerPage>0) {
            firstVideoIndex -= videoCountPerPage;
            currentPage -= 1;
            buildLibrary();
            document.getElementById("page-text").innerHTML = "<span class='txt'>Page "+currentPage+"/"+pageCount+"</span>";
        }
    }
    
}

function openVideo(i) {
    if(searching) {
        videoId = searchIdList[i-1];
        videoName = searchNameList[i-1];
    } else {
        videoId = idList[i-1];
        videoName = nameList[i-1];
    }
    if(mobile) {
        player.loadVideoById(videoId);
        setTimeout(function(){document.getElementById("vid"+i).click();}, 500);
        return;
    }
    modalOpen = 1;
    videoPlayer.style = "pointer-events: auto; width: calc(16vmin * 5); height: calc(9vmin * 5); display: block; position: fixed;";
    document.getElementById("title-box").style.display = "block";
    document.getElementById("iframePlayer").style = "left: -50%; filter: drop-shadow(0 0 10vmin rgba(0,0,0,1));";
    document.getElementById("modal").style = "opacity: 0.7; pointer-events: auto;";
    document.getElementById("library-container").style = "filter: blur(1vmin);";
    document.getElementById("search-bar").style = "filter: blur(1vmin);";
    document.getElementById("toggle-audio").innerHTML = audioIcon;
    document.getElementById("title-box").innerHTML = "<span class='txt'>"+videoName+"</span>";
    document.getElementById("player-controls").style.display = "block";
    player.unMute();
    player.muted = false;
    if(!playing) {
        player.loadVideoById(videoId);
    }
    //window.location.hash = i;
    if(searching) {
        window.history.pushState({}, "", "#"+searchNameList[i-1].replace(new RegExp(" ", "g"), "-"));
    } else {
        window.history.pushState({}, "", "#"+nameList[i-1].replace(new RegExp(" ", "g"), "-"));
    }
}

function closeVideo() {
    modalOpen = 0;
    tracking = 0;
    videoPlayer.style = "display: none; pointer-events: none;";
    document.getElementById("iframePlayer").style = "filter: none;";
    document.getElementById("library-container").style = "filter: blur(0px);";
    document.getElementById("search-bar").style = "filter: blur(0px);";
    document.getElementById("modal").style = "opacity: 0; pointer-events: none;";
    document.getElementById("scrubber-preview").style.width = "0%";
    document.getElementById("scrubber").style.width = "0%";
    document.querySelector("#timeline .txt").innerHTML = "0:00 / 0:00";
    endPreview();
    //window.location.hash = "";
    window.history.pushState({}, "", " ");
}

function startPreview(i) {
    if(!modalOpen) {
        if(searching) {
            videoId = searchIdList[i-1];
        } else {
            videoId = idList[i-1];
        }
        lastIndex = i;
        var boundingBox = document.getElementById("vid"+i).getBoundingClientRect();
        var containerBoundingBox = document.getElementById("vldp-container").getBoundingClientRect();
        videoPlayer.style = "pointer-events: none; width: "+boundingBox.width+"px; height: "+boundingBox.height+"px; left: "+Math.round((window.scrollX + boundingBox.left) - (window.scrollX + containerBoundingBox.left))+"px; top: "+Math.round((window.scrollY + boundingBox.top) - (window.scrollY + containerBoundingBox.top))+"px; display: block; position: absolute;";
        document.getElementById("player-controls").style.display = "none";
        document.getElementById("title-box").style.display = "none";
        document.getElementById("iframePlayer").style = "left: 0;";
        player.mute();
        player.muted = true;
        player.loadVideoById(videoId);
    }
}

function endPreview(i) {
    if(!modalOpen) {
        videoId = "";
        videoPlayer.style = "display: none; pointer-events: none;";
        player.loadVideoById(videoId);
    }  
}
    
function togglePlay(event) {
    event.stopPropagation();
    if(paused) {
        player.playVideo();
        document.getElementById("toggle-play").innerHTML = pauseIcon;
    } else {
        player.pauseVideo();
        document.getElementById("toggle-play").innerHTML = playIcon;
    }
}
    
function toggleAudio(event) {
    event.stopPropagation();
    if(player.muted) {
        player.unMute();
        player.muted = false;
        document.getElementById("toggle-audio").innerHTML = audioIcon;
    } else {
        player.mute(); 
        player.muted = true;
        document.getElementById("toggle-audio").innerHTML = muteIcon;
    }
}
    
function startTrack(event) {
    event.stopPropagation();
    tracking = 1;
}
    
function track(event) {
    event.stopPropagation();
    var tl = document.getElementById("timeline").getBoundingClientRect();
    touchX = event.clientX;
    var targetPerc = (touchX - tl.left) / (tl.right - tl.left) * 100;
    var targetTime = targetPerc * player.getDuration() / 100;
    if(tracking) {
        player.seekTo(targetTime);
        document.getElementById("scrubber").style.width = targetPerc + "%";
    }
    document.getElementById("scrubber-preview").style.width = targetPerc + "%";
    targetTimeText = "&nbsp;&nbsp;->&nbsp;&nbsp;" + formatTime(targetTime);
    document.querySelector("#timeline .txt").innerHTML = formatTime(player.getCurrentTime()) + " / " + formatTime(player.getDuration()) + targetTimeText;
}
    
function stopTrack(event) {
    event.stopPropagation();
    if(!tracking) {
        targetTimeText = "";
    }
}
    
function setTime(event) {
    event.stopPropagation();
    if(tracking) {
        var tl = document.getElementById("timeline").getBoundingClientRect();
        var targetPerc = (touchX - tl.left) / (tl.right - tl.left) * 100;
        var targetTime = targetPerc * player.getDuration() / 100;
        player.seekTo(targetTime);
        setTimeout(updateTime, 300);
        tracking = 0;
        targetTimeText = "";
    }
}
    
function updateTime() {
    var tl = document.getElementById("timeline").getBoundingClientRect();
    var scrubPerc = player.getCurrentTime() / player.getDuration() * 100;
    document.getElementById("scrubber").style.width = scrubPerc + "%";
    document.querySelector("#timeline .txt").innerHTML = formatTime(player.getCurrentTime()) + " / " + formatTime(player.getDuration()) + targetTimeText;
}
    
function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}

function initialize() {
    getDevice();
    document.getElementById("vldp-container").innerHTML = "<div id='library-container'></div><input id='search-bar' type='text' placeholder='search for a video' tabindex='-1'><div id='modal'></div><div id='aspect-ratio'><div id='iframePlayer'></div><div id='title-box'></div><div id='player-controls'><div id='toggle-play'>"+pauseIcon+"</div><div id='toggle-audio'>"+audioIcon+"</div><div id='timeline'>"+progressBar+"<div id='scrubber'>"+progressBar+"</div><div id='scrubber-preview'>"+progressBar+"</div><span class='txt'>0:00 / 0:00</span></div></div></div>";
    setTimeout(function(){
        document.getElementById("modal").addEventListener("mousedown", closeVideo);
        document.getElementById("aspect-ratio").addEventListener("mousedown", closeVideo);
        document.getElementById("search-bar").addEventListener("keyup", search);
        document.getElementById("toggle-play").addEventListener("mousedown", togglePlay, false);
        document.getElementById("toggle-audio").addEventListener("mousedown", toggleAudio, false);
        document.getElementById("timeline").addEventListener("mousedown", startTrack, false);
        document.getElementById("timeline").addEventListener("mousemove", track, false);
        document.getElementById("timeline").addEventListener("mouseleave", stopTrack, false);
        window.addEventListener("mouseup", setTime, false);
    }, 500);
    videoPlayer = document.getElementById("aspect-ratio");
    buildPlayer();
    sheetrock({
        url: spreadsheet,
        query: "select B where A=0",
        callback: authorizationCB
    });
}
    
window.onresize = function(e) {  
    var textScaleRef = document.getElementById("next-page").getBoundingClientRect();
    document.querySelector("#page-text .txt").style.fontSize = (textScaleRef.width * 0.2) + "px";
    var cardScaleRef = document.getElementById("library-container").getBoundingClientRect();
    var cardElements = document.querySelectorAll(".video-card");
    var cardTextElements = document.querySelectorAll(".name-box .txt");
    for(var i1 = 0; i1 < cardElements.length; i1++) {
        cardElements[i1].style.width = ((cardScaleRef.width * 0.019) * 16) + "px";
        cardElements[i1].style.height = ((cardScaleRef.width * 0.019) * 9) + "px";
        cardTextElements[i1].style.fontSize = (cardScaleRef.width * 0.015) + "px";
    }
}

setTimeout(initialize, 1000);
