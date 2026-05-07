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
var videoCategory;
var theData = {};
var authorizationList = [];
var idList = [];
var nameList = [];
var imgList = [];
var categoryList = [];
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
var videoShort = 0;
var categoryFilter = "";
var listedCategories = [];
var dropdownShown = 0;

var nextPageButton = "<div id='next-page' onclick='nextPage()'>Next</div>";

var previousPageButton = "<div id='previous-page' onclick='previousPage()'>Previous</div>";
    
var playIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><polygon points='63.9129,48.7885 63.9129,207.2115 196.0871,128 	'/></svg>";
    
var pauseIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><rect x='48.7885' y='48.7885' width='47.7416' height='158.423'/><rect x='139.4699' y='48.7885' width='47.7416' height='158.423'/></svg>";
    
var audioIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><path d='M147.5,50.4593v19.0419c27.2085,5.916,47.5909,30.1246,47.5909,59.1058c0,28.9811-20.3824,53.1898-47.5909,59.1058v19.0419 c37.6044-6.1665,66.3022-38.7983,66.3022-78.1476C213.8022,89.2575,185.1044,56.6257,147.5,50.4593z'/><path d='M147.5,88.2232v80.7674c17.0985-5.4615,29.4828-21.4736,29.4828-40.3837C176.9828,109.6968,164.5985,93.6848,147.5,88.2232z'/><polygon points='135.5906,49.3954 83.6564,100.6823 42.4453,100.6823 42.4453,156.5315 83.6563,156.5315 135.5906,207.8184 '/></svg>";
    
var muteIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><path d='M213.6785,128c0-39.3494-28.6978-71.9812-66.3022-78.1476v19.0419c27.2085,5.916,47.5909,30.1246,47.5909,59.1058 c0,12.0772-3.5492,23.3188-9.6474,32.7599l13.4677,13.4677C208.157,161.2203,213.6785,145.257,213.6785,128z'/><path d='M176.8591,128c0-18.9102-12.3843-34.9222-29.4828-40.3837v35.2002l24.7188,24.7188 C175.1375,141.6895,176.8591,135.0466,176.8591,128z'/><polygon points='135.4669,48.7885 104.2128,79.653 135.4669,110.9071 '/><path d='M207.9975,197.4377L58.5623,48.0024L48.0025,58.5622l38.5404,38.5405l-3.0103,2.9727H42.3216v55.8492h41.211 l51.9343,51.2869v-61.1848l11.9094,11.9094v10.4476c2.5525-0.8153,4.9916-1.879,7.308-3.1396l13.1841,13.1841 c-6.1365,4.0746-13.0576,7.061-20.4922,8.6776v19.0419c12.5469-2.0575,24.0867-7.0795,33.9122-14.2994l16.1493,16.1493 L207.9975,197.4377z'/></svg>";
    
var fullscreenIcon = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve'><style type='text/css'> .st0{fill:#FFFFFF;}</style><polygon class='st0' points='70.738,114.39 47.3338,114.39 47.3338,47.3338 114.39,47.3338 114.39,70.738 70.738,70.738 '/><polygon class='st0' points='208.6667,208.6667 141.6096,208.6667 141.6096,185.2625 185.2625,185.2625 185.2625,141.6096 208.6667,141.6096 '/><polygon class='st0' points='208.6667,114.39 185.2625,114.39 185.2625,70.738 141.6096,70.738 141.6096,47.3338 208.6667,47.3338 '/><polygon class='st0' points='114.39,208.6667 47.3338,208.6667 47.3338,141.6096 70.738,141.6096 70.738,185.2625 114.39,185.2625 '/></svg>";
    
var progressBar = "<svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' style='enable-background:new 0 0 256 256;' xml:space='preserve' preserveAspectRatio='none'><rect y='161.4064' width='256' height='33.1872'/></svg>";
    
var dropdownIcon = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 827.42 628.57'><defs><style>.cls-1{fill: #fff;}</style></defs><path class='cls-1' d='m384.91,613.3L6.05,54.32C-9.61,31.21,6.94,0,34.85,0h757.71c27.91,0,44.46,31.21,28.8,54.32l-378.86,558.98c-13.8,20.37-43.8,20.37-57.61,0Z'/></svg>";
    
var searchIcon = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 761.24 761.24'><defs><style>.cls-1 {fill: #fff;}</style></defs><path class='cls-1' d='m743.67,658.81l-160.35-160.35c34.75-51.1,55.07-112.81,55.07-179.27C638.39,142.91,495.48,0,319.19,0S0,142.91,0,319.19s142.91,319.19,319.19,319.19c66.46,0,128.17-20.32,179.27-55.07l160.35,160.35c11.72,11.72,27.07,17.57,42.43,17.57s30.71-5.86,42.43-17.57c23.43-23.43,23.43-61.42,0-84.85Zm-424.47-105.69c-129.19,0-233.93-104.73-233.93-233.93s104.73-233.93,233.93-233.93,233.93,104.73,233.93,233.93-104.73,233.93-233.93,233.93Z'/></svg>";
    
var cancelIcon = "<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 893.38 893.38'><defs><style>.cls-1{fill: #fff;}</style></defs><path class='cls-1' d='m858.27,272.81c-22.5-53.2-54.7-100.96-95.71-141.97-41.01-41.01-88.78-73.21-141.97-95.71C565.48,11.82,506.98,0,446.69,0s-118.79,11.82-173.88,35.12c-53.2,22.5-100.96,54.7-141.97,95.71-41.01,41.01-73.21,88.78-95.71,141.97C11.82,327.9,0,386.41,0,446.69s11.82,118.79,35.12,173.88c22.5,53.2,54.7,100.96,95.71,141.97,41.01,41.01,88.78,73.21,141.97,95.71,55.1,23.3,113.6,35.12,173.88,35.12s118.79-11.82,173.88-35.12c53.2-22.5,100.96-54.7,141.97-95.71s73.21-88.78,95.71-141.97c23.3-55.1,35.12-113.6,35.12-173.88s-11.82-118.79-35.12-173.88Zm-411.57,540.58c-202.19,0-366.69-164.5-366.69-366.69S244.5,80,446.69,80s366.69,164.5,366.69,366.69-164.5,366.69-366.69,366.69Z'/><path class='cls-1' d='m685.65,207.74c-29.29-29.29-76.78-29.29-106.07,0l-132.89,132.89-132.89-132.89c-29.29-29.29-76.78-29.29-106.07,0-29.29,29.29-29.29,76.78,0,106.07l132.89,132.89-132.89,132.89c-29.29,29.29-29.29,76.78,0,106.07,14.65,14.64,33.84,21.97,53.03,21.97s38.39-7.32,53.03-21.97l132.89-132.89,132.89,132.89c14.64,14.64,33.84,21.97,53.03,21.97s38.39-7.32,53.03-21.97c29.29-29.29,29.29-76.78,0-106.07l-132.89-132.89,132.89-132.89c29.29-29.29,29.29-76.78,0-106.07Z'/></svg>";

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
        if(videoId==idListRaw[i]) {
            videoId = idListRaw[i].replace("https://www.youtube.com/shorts/", "");
            videoShort = 1;
        }
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
    sheetrock({
        url: spreadsheet,
        query: "select D",
        callback: videoCategoryCB
    });
}
    
function videoCategoryCB(error, options, response) {
    theData.response = response.html;
    var rawList = JSON.stringify(theData);
    rawList = extractText(rawList, "{\"response\":\"<tr><td>", "</td></tr>\"");
    categoryList = rawList.split("</td></tr><tr><td>");
    idList.shift();
    imgList.shift();
    nameList.shift();
    categoryList.shift();
    buildCategories();
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
    library.innerHTML="<div id='page-controls'><div id='page-controls-background'></div><div id='page-text'></div>"+previousPageButton+nextPageButton+"</div>";
    setTimeout(function(){
        resizeElements();
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
    library.innerHTML="<div id='page-controls'><div id='page-controls-background'></div><div id='page-text'></div>"+previousPageButton+nextPageButton+"</div>";
    setTimeout(function(){
        resizeElements();
    }, 10);    
    x = firstVideoIndex;
    y = firstVideoIndex+videoCountPerPage-1;
    if(x<0) {x=0;}
    if(y>searchCount) {y=searchCount;}
    for(i=x;i<=y;i++) {
        videoName = searchNameList[i-1];
        videoImg = searchImgList[i-1];
        videoCategory = categoryList[i-1];
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
    if(searchQuery+categoryFilter == "") {
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
            var searchMatch = nameList[i1].toLowerCase().includes(searchQuery.toLowerCase());
            var filterMatch = (categoryList[i1] == categoryFilter);
            if((categoryFilter == "") && searchMatch) {
                searchIdList[searchIdList.length] = idList[i1];
                searchNameList[searchNameList.length] = nameList[i1];
                searchImgList[searchImgList.length] = imgList[i1];
            } else if((searchQuery == "") && filterMatch) {
                searchIdList[searchIdList.length] = idList[i1];
                searchNameList[searchNameList.length] = nameList[i1];
                searchImgList[searchImgList.length] = imgList[i1];
            } else if((categoryFilter != "") && (searchQuery != "") && searchMatch && filterMatch) {
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
    
function cancelSearch() {
    document.getElementById("search-bar").value = "";
    search();
}
    
function buildCategories() {
    var i;
    for(i = 0; i < nameList.length; i++) {
        if(!listedCategories.includes(categoryList[i]) && (categoryList[i] != "")) {
            listedCategories.push(categoryList[i]);
        }
    }
    listedCategories.sort();
    document.getElementById("category-dropdown-options").innerHTML = "<li onclick='selectCategory(``)'>All</li>";
    for(i = 0; i < listedCategories.length; i++) {
        document.getElementById("category-dropdown-options").innerHTML += "<li onclick='selectCategory(`"+listedCategories[i]+"`)'>"+listedCategories[i]+"</li>";
    }
}
    
function selectCategory(selectedCategory) {
    categoryFilter = selectedCategory;
    if(categoryFilter == "") {
        document.getElementById("category-dropdown-button").innerHTML = "Categories";
    } else {
        document.getElementById("category-dropdown-button").innerHTML = categoryFilter;
    }
    toggleCategoryDropdown();
    search();
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
    /*if(mobile) {
        player.mute();
        player.muted = true;
        player.loadVideoById(videoId);
        var theplayer = document.getElementById("iframePlayer");
        var requestFullScreen = theplayer.requestFullScreen || theplayer.mozRequestFullScreen || theplayer.webkitRequestFullScreen;
        if (requestFullScreen) {
            requestFullScreen.bind(theplayer)();
        }
        return;
    }
    else {
        player.unMute();
        player.muted = false;
    }*/
    
    player.unMute();
    player.muted = false;
    
    modalOpen = 1;
    videoPlayer.style = "pointer-events: auto; width: calc(16vmin * 5); height: calc(9vmin * 5); display: block; position: fixed;";
    document.getElementById("title-box").style.display = "block";
    document.getElementById("iframePlayer").style = "left: -50%; filter: drop-shadow(0 0 10vmin rgba(0,0,0,1)); border-radius: 0px;";
    document.getElementById("modal").style = "opacity: 0.7; pointer-events: auto;";
    document.getElementById("library-container").style = "filter: blur(1vmin);";
    document.getElementById("search-bar").style = "filter: blur(1vmin);";
    document.getElementById("category-dropdown-button").style = "filter: blur(1vmin);";
    document.getElementById("category-dropdown-icon").style = "filter: blur(1vmin);";
    document.getElementById("search-icon").style = "filter: blur(1vmin);";
    document.getElementById("toggle-audio").innerHTML = audioIcon;
    document.getElementById("title-box").innerHTML = "<span class='txt'>"+videoName+"</span>";
    document.getElementById("player-controls").style.display = "block";
    if(!playing) {
        player.loadVideoById(videoId);
    }
    //window.location.hash = i;
    if(searching) {
        window.history.pushState({}, "", "#"+searchNameList[i-1].replace(new RegExp(" ", "g"), "-"));
    } else {
        window.history.pushState({}, "", "#"+nameList[i-1].replace(new RegExp(" ", "g"), "-"));
    }
    if(dropdownShown) {toggleCategoryDropdown();}
}

function closeVideo() {
    modalOpen = 0;
    tracking = 0;
    videoPlayer.style = "display: none; pointer-events: none;";
    document.getElementById("iframePlayer").style = "filter: none; border-top-left-radius: clamp(2px, 0.5vw, 4px) border-top-right-radius: clamp(2px, 0.5vw, 4px);";
    document.getElementById("library-container").style = "filter: blur(0px);";
    document.getElementById("search-bar").style = "filter: blur(0px);";
    document.getElementById("category-dropdown-button").style = "filter: blur(0px);";
    document.getElementById("category-dropdown-icon").style = "filter: blur(0px);";
    document.getElementById("search-icon").style = "filter: blur(0px);";
    document.getElementById("modal").style = "opacity: 0; pointer-events: none;";
    document.getElementById("scrubber-preview").style.width = "0%";
    document.getElementById("scrubber").style.width = "0%";
    document.querySelector("#timeline .txt").innerHTML = "0:00 / 0:00";
    endPreview();
    //window.location.hash = "";
    window.history.pushState({}, "", " ");
    resizeElements();
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
    
function toggleFullscreen(event) {
    event.stopPropagation();
    var theplayer = document.getElementById("iframePlayer");
    var requestFullScreen = theplayer.requestFullScreen || theplayer.mozRequestFullScreen || theplayer.webkitRequestFullScreen;
    if (requestFullScreen) {
        requestFullScreen.bind(theplayer)();
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
    
function toggleCategoryDropdown() {
    if(dropdownShown) {
        dropdownShown = 0;
        document.getElementById("category-dropdown-options").style.display = "none";
        document.getElementById("category-dropdown-icon").style = "transform: rotate(0deg);";
    } else {
        dropdownShown = 1;
        document.getElementById("category-dropdown-options").style.display = "block";
        document.getElementById("category-dropdown-icon").style = "transform: rotate(90deg);";
    }
}

function initialize() {
    getDevice();
    document.getElementById("vldp-container").innerHTML = "<div id='library-container'></div><div id='filter-bar'><input id='search-bar' type='text' placeholder='Search for a video' tabindex='-1'><div id='search-icon'>"+searchIcon+"</div><div id='cancel-icon' onclick='cancelSearch()'>"+cancelIcon+"</div><div id='category-dropdown'><div id='category-dropdown-button' onclick='toggleCategoryDropdown()'>Categories</div><ul id='category-dropdown-options'></ul><div id='category-dropdown-icon'>"+dropdownIcon+"</div></div></div><div id='modal'></div><div id='aspect-ratio'><div id='iframePlayer'></div><div id='title-box'></div><div id='player-controls'><div id='toggle-play'>"+pauseIcon+"</div><div id='toggle-audio'>"+audioIcon+"</div><div id='toggle-fullscreen'>"+fullscreenIcon+"</div><div id='timeline'>"+progressBar+"<div id='scrubber'>"+progressBar+"</div><div id='scrubber-preview'>"+progressBar+"</div><span class='txt'>0:00 / 0:00</span></div></div></div>";
    setTimeout(function(){
        document.getElementById("modal").addEventListener("mousedown", closeVideo);
        document.getElementById("aspect-ratio").addEventListener("mousedown", closeVideo);
        document.getElementById("search-bar").addEventListener("keyup", search);
        document.getElementById("toggle-play").addEventListener("mousedown", togglePlay, false);
        document.getElementById("toggle-audio").addEventListener("mousedown", toggleAudio, false);
        document.getElementById("toggle-fullscreen").addEventListener("mousedown", toggleFullscreen, false);
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
    resizeElements();
}
    
window.onresize = function(e) {  
    resizeElements();
    var cardScaleRef = document.getElementById("library-container").getBoundingClientRect();
    var cardElements = document.querySelectorAll(".video-card");
    var cardTextElements = document.querySelectorAll(".name-box .txt");
    for(var i1 = 0; i1 < cardElements.length; i1++) {
        cardElements[i1].style.width = ((cardScaleRef.width * 0.019) * 16) + "px";
        cardElements[i1].style.height = ((cardScaleRef.width * 0.019) * 9) + "px";
        cardTextElements[i1].style.fontSize = (cardScaleRef.width * 0.015) + "px";
    }
}

function resizeElements() {
    var textScaleRef = document.getElementById("library-container").getBoundingClientRect();
    var calculatedFontSize = (textScaleRef.width * 0.03) + "px";
    document.querySelector("#search-bar").style.fontSize = calculatedFontSize;
    document.querySelector("#category-dropdown").style.fontSize = calculatedFontSize;
    document.querySelector("#page-text .txt").style.fontSize = calculatedFontSize;
    document.querySelector("#next-page").style.fontSize = calculatedFontSize;
    document.querySelector("#previous-page").style.fontSize = calculatedFontSize;
}

setTimeout(initialize, 1000);
