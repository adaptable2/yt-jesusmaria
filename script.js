$(document).ready(function () {

    setTimeout(function(){
        //swiper
        var mySwiper = new Swiper('.swiper-container', {
          slidesPerView: 4,
          slidesPerColumn: 2,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        }   
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
          var paneTarget = $(e.target).attr('href');
          var $thePane = $('.tab-pane' + paneTarget);
          var paneIndex = $thePane.index();
          if ($thePane.find('.swiper-container').length > 0 && 0 === $thePane.find('.swiper-slide-active').length) {
            mySwiper[paneIndex].update();
    }
    });
    }, 2000);
    //video pop up
//api youtube
    var key = 'AIzaSyCy2VWvmzx6a9kj4XMlZZMjSZ0p2rDRl0A';
    var playconpaz = 'PLZkUV01oONwqgFauDnhlYSl_O3p19VWu9';
    var playnoti = 'PLZkUV01oONwor1T3uBWizUar-zQEANBsm';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var optionpaz = {
        part: 'snippet',
        key: key,
        maxResults: 50,
        playlistId: playconpaz
    }
    var optionnoti = {
        part: 'snippet',
        key: key,
        maxResults: 50,
        playlistId: playnoti
    }

    loadVidsnoti();
    loadVidspaz();

    function loadVidspaz() {
        $.getJSON(URL, optionpaz, function (data) {
            resultsLooppaz(data);
        });
    }
    function loadVidsnoti() {
        $.getJSON(URL, optionnoti, function (data) {
            resultsLoopnoti(data);
        });
    }
    function resultsLooppaz(data) {
        $.each(data.items, function (i, item) {
            let thumb = item.snippet.thumbnails.medium.url;
            let title = item.snippet.title;
            let desc = item.snippet.description.substring(0, 100);
            let fechaVideo= item.snippet.publishedAt;
            let date = fechaVideo.split("T");
            let vid = item.snippet.resourceId.videoId;
            let getVideos = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+ vid +"&key="+ key;
            $.getJSON(getVideos, function(data2){
                let viewCount = data2.items[0].statistics.viewCount;
                let likeCount = data2.items[0].statistics.likeCount;
                let commentCount = data2.items[0].statistics.commentCount;
                console.log(date);

                $('#teleconpaz .swiper-wrapper').append(`
                    <div class="swiper-slide">
                    <div class="d-flex flex-column align-items-start w-100 item-yt">
                    <img src="${thumb}" alt="" class="w-100">
                    <h4>
                    <a href="https://www.youtube.com/embed/${vid}" class="modal-yt" data-toggle="modal" data-target="#exampleModal">${title}</a>
                    </h4>
                    <p>${date[0]}</p>
                    <p>
                        <span>${viewCount} views</span>
                        <span> ${likeCount} likes</span>
                        <span> ${commentCount} comments</span>
                    </p>
                    </div>
                    </div>
                `);
            });
        });
    }
    function resultsLoopnoti(data) {
        $.each(data.items, function (i, item) {

            let thumb = item.snippet.thumbnails.medium.url;
            let title = item.snippet.title;
            let desc = item.snippet.description.substring(0, 100);
            let fechaVideo= item.snippet.publishedAt;
            let date = fechaVideo.split("T");
            let vid = item.snippet.resourceId.videoId;
            let getVideos = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+ vid +"&key="+ key;
            $.getJSON(getVideos, function(data2){
                let viewCount = data2.items[0].statistics.viewCount;
                let likeCount = data2.items[0].statistics.likeCount;
                let commentCount = data2.items[0].statistics.commentCount;

                $('#notimagazine .swiper-wrapper').append(`
                    <div class="swiper-slide">
                    <div class="d-flex flex-column align-items-start w-100 item-yt">
                    <img src="${thumb}" alt="" class="w-100">
                    <h4>
                    <a href="https://www.youtube.com/embed/${vid}" class="modal-yt" data-toggle="modal" data-target="#exampleModal">${title}</a>
                    </h4>
                    <p>${date[0]}</p>
                    <p>
                        <span>${viewCount} views</span>
                        <span> ${likeCount} likes</span>
                        <span> ${commentCount} comments</span>
                    </p>
                    </div>
                    </div>
                `);
            });
        });
    }
    //video pop up
});
$( document ).ajaxComplete(function() {
    $('button.close,.modal').on('click',function(){
        $('.modal-body iframe').attr('src','');
    });
    $('.modal-yt').on('click',function(){
        let urlyt = $(this).attr('href');
        console.log();
        $('.modal-body iframe').attr('src',`${urlyt}?autoplay=1&loop=1&rel=0&wmode=transparent`);
    });
});


