//(function () {
    var videoCountPerPage = 18;/* Number of videos to display per page */
    var spreadsheet = "https://docs.google.com/spreadsheets/d/1pRR4dLWBRF2pwnhdR___EQlnvp2xdErHtKyqhJxnI3Y/edit#gid=0";
    var videoCount;
    var pageCount;
    var currentPage = 1;
    var videoId;
    var videoName;
    var videoImg;
    var theData = {};
    var authorizationList = [];
    var idList = [];
    var nameList = [];
    var imgList = [];
    var firstVideoIndex = 1;
    var lastIndex;
    var modalOpen = 0;
    var playing = 0;
    var i = 0;
    var videoPlayer;
    var iframePlayer;
    
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
            controls: 1
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
    }

    function onPlayerStateChange(event) {
        switch (event.data) {
            case YT.PlayerState.UNSTARTED:
                //console.log('unstarted');
                playing = 0;
                break;
            case YT.PlayerState.ENDED:
                //console.log('ended');
                player.playVideo();
                break;
            case YT.PlayerState.PLAYING:
                //console.log('playing');
                if(!playing && !modalOpen) {player.seekTo(1,true);}
                playing = 1;
                break;
            case YT.PlayerState.PAUSED:
                //console.log('paused');
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
            xhash = xhash.replace("#vid", "");
            while(xhash>videoCountPerPage*currentPage) {
                currentPage += 1;
            }
            firstVideoIndex = videoCountPerPage * (currentPage - 1) + 1;
        }
        var library = document.getElementById("library-container");
        library.innerHTML="<div id='page-controls'><div id='page-text'></div><button id='prev-page' onclick='previousPage()'><p class='text'>Previous</p></button><button id='next-page' onclick='nextPage()'><p class='text'>Next</p></button></div>";
        x = firstVideoIndex;
        y = firstVideoIndex+videoCountPerPage-1;
        if(x<0) {x=0;}
        if(y>videoCount) {y=videoCount;}
        for(i=x;i<=y;i++) {
            videoName = nameList[i-1];
            videoImg = imgList[i-1];
            library.innerHTML += "<div id='vid"+i+"' class='video-card' style='background-image: url(&quot;"+videoImg+"&quot;); background-size: contain; background-repeat: no-repeat;' draggable='false'><p class='text'>"+videoName+"</p>";
            setTimeout(addCardEventListeners.bind(null, i), 500);
            if(i==y) {
                document.getElementById("page-text").innerHTML = "<p class='text'>Page "+currentPage+"/"+pageCount+"</p>";
                if(xhash!="") {
                    setTimeout(openVideo.bind(null, xhash), 500);
                }
            }
        }
    }
    
    function nextPage() {
        if(firstVideoIndex+videoCountPerPage<videoCount) {
            firstVideoIndex += videoCountPerPage;
            currentPage += 1;
            buildLibrary();
            document.getElementById("page-text").innerHTML = "<p class='text'>Page "+currentPage+"/"+pageCount+"</p>";
        }
    }
    
    function previousPage() {
        if(firstVideoIndex-videoCountPerPage>0) {
            firstVideoIndex -= videoCountPerPage;
            currentPage -= 1;
            buildLibrary();
            document.getElementById("page-text").innerHTML = "<p class='text'>Page "+currentPage+"/"+pageCount+"</p>";
        }
    }
    
    function openVideo(i) {
        modalOpen = 1;
        videoId = idList[i-1];
        //var tempURL = document.getElementById("iframePlayer").src.toString();
        //document.getElementById("iframePlayer").src = tempURL.replace("controls=0", "controls=1");
        videoPlayer.style = "pointer-events: auto; width: calc(16vmin * 5); height: calc(9vmin * 5); display: block; position: fixed;";
        document.getElementById("iframePlayer").style = "left: -50%;";
        document.getElementById("modal").style = "opacity: 0.7; pointer-events: auto;";
        player.unMute();
        if(!playing)player.loadVideoById(videoId);
        //window.location.hash = vid + "i";
        window.history.pushState({}, "", "#vid"+i);
    }
    
    function closeVideo() {
        modalOpen = 0;
        //var tempURL = document.getElementById("iframePlayer").src.toString();
        //document.getElementById("iframePlayer").src = tempURL.replace("controls=1", "controls=0");
        videoPlayer.style = "display: none; pointer-events: none;";
        document.getElementById("modal").style = "opacity: 0; pointer-events: none;";
        endPreview();
        //window.location.hash = "";
        window.history.pushState({}, "", " ");
    }
    
    function startPreview(i) {
        if(!modalOpen) {
            videoId = idList[i-1];
            lastIndex = i;
            var boundingBox = document.getElementById("vid"+i).getBoundingClientRect();
            var containerBoundingBox = document.getElementById("vldp-container").getBoundingClientRect();
            videoPlayer.style = "pointer-events: none; width: "+boundingBox.width+"px; height: "+boundingBox.height+"px; left: "+Math.round((window.scrollX + boundingBox.left) - (window.scrollX + containerBoundingBox.left))+"px; top: "+Math.round((window.scrollY + boundingBox.top) - (window.scrollY + containerBoundingBox.top))+"px; display: block; position: absolute;";
            document.getElementById("iframePlayer").style = "left: 0;";
            player.mute();
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
    
    function initialize() {
        //document.getElementById("vldp-container").innerHTML = "<div id='library-container'></div><div id='modal' onclick='closeVideo()'></div><div id='aspect-ratio' onclick='closeVideo()'><div id='iframePlayer'></div></div>";
        document.getElementById("vldp-container").innerHTML = "<div id='library-container'></div><div id='modal'></div><div id='aspect-ratio'><div id='iframePlayer'></div></div>";
        setTimeout(function(){
            document.getElementById("modal").addEventListener("click", closeVideo);
            document.getElementById("aspect-ratio").addEventListener("click", closeVideo);
        }, 500);
        videoPlayer = document.getElementById("aspect-ratio");
        buildPlayer();
        sheetrock({
            url: spreadsheet,
            query: "select B where A=0",
            callback: authorizationCB
        });
    }
        
    setTimeout(initialize, 1000);
//})();
