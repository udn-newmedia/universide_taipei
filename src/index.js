import './style.css'
import $ from 'jquery'
import 'fullpage.js'
import 'lazysizes'

var progress = [null, null, null, null, null, null, null, null, null, null];
var movie_progress = 0;

function moviePlay(id){
    $('#movie-' + id).get(0).play();
    
	if(progress[id - 1] == null){
		progress[id - 1] = setInterval(function(){
            var curTime = $('#movie-' + id).get(0).currentTime;
            console.log(curTime)
			var temp = curTime / $('#movie-' + id).get(0).duration * 100;
			if(temp > 0.6){
				$('.video-play[data-target="' + id + '"]').css('opacity', 0);
			}
			// if(Math.floor(curTime/5) > movie_progress){
				// movie_progress = Math.floor(curTime/5)
				// ga("send", {
				// 	"hitType": "event",
				// 	"eventCategory": "movie play",
				// 	"eventAction": "play",
				// 	"eventLabel": "[" + platform + "] [" + title + "] [movie " + id + " play " + (movie_progress*5) + "]"
				// });
			// }
			
			$('#progress-bar-' + id).css('width', temp + '%')
		}, 600)
	}
}
	
function moviePause(id){
	$('#movie-' + id).get(0).pause();
	$('.video-play[data-target="' + id + '"]').css('opacity', 1);
	if(progress[id-1]){
		clearInterval(progress[id-1])
		progress[id-1] = null;
	}
}

function movieReplay(id){
	$('#movie-' + id).get(0).currentTime = 0;
	$('#movie-' + id).get(0).play();
	$('.progress-bar').css('width', 0);
	clearInterval(progress[id - 1])
	progress[id - 1] = setInterval(function(){
		var temp = $('#movie-' + id).get(0).currentTime / $('#movie-' + id).get(0).duration * 100
		$('#progress-bar-' + id).css('width', temp + '%')
	}, 600)
}

function movieVolume(id){
	
	if($('#movie-' + id).get(0).muted == true){
		$('#movie-' + id).get(0).muted = false;
		$('.volume[data-target="' + id + '"]').removeClass('fa-volume-off').addClass('fa-volume-up')
		$('.volume-text[data-target="' + id + '"]').text('暺墧�厰�𡏭�脤𨺗');
	}
	else{
		$('#movie-' + id).get(0).muted = true;
		$('.volume[data-target="' + id + '"]').removeClass('fa-volume-up').addClass('fa-volume-off')
		$('.volume-text[data-target="' + id + '"]').text('暺墧�厰�贝�脤𨺗');
	}
}

$(document).ready(function(){

    var w = $(window).width()
    var h = $(window).height()

    var timetemp
    var index_now = 1
    var bar_witdh = 0

	if(w <= 768){
		$('video').css('width', w + 'px')
        $('video').css('height', w * 600 / 720 + 'px')
        $('#movie-6').css('height', w * 400 / 720 + 'px')
	}
	else{
        if(h <= 768){
            $('video').css('width', '510px')
            $('video').css('height', '420px')
            $('#movie-6').css('width', '510px')
            $('#movie-6').css('height', '283px')
        }
        else{
            $('video').css('width', '600px')
            $('video').css('height', '500px')
            $('#movie-6').css('height', '333.33px')
        }
		
        $('#head').hover(function(){
            $(this).css('opacity', 1)
        }, function(){
            if(index_now != 1){
                $(this).css('opacity', 0)
            }
        })
	}
    

    $('#nav-icon').click(function(){
        console.log(123)
        $(this).toggleClass('open')
        $('#pannel').toggleClass('open')
        $('#head').toggleClass('open')
    })

    $('#page-down').click(function(){
        $.fn.fullpage.moveSectionDown()
    })
    
    $('#comment-pannel .fa').click(function(){
        $('#comment-pannel').toggleClass('open')
        $('#msg').toggleClass('close')
    })

    $('#msg').click(function(){
        $('#msg').toggleClass('close')
        $('#comment-pannel').toggleClass('open')
    })

    setTimeout(function(){
        $('#cover-title').css('opacity', 1)
        $('#cover-title').css('transform', 'translate(0, 0)')
        $('#cover-subtitle').css('opacity', 1)
        $('#cover-subtitle').css('transform', 'translate(0, 0)')
        $('#cover-v h1').css('opacity', 1)
        $('#cover-v h1').css('transform', 'translate(0, 0)')
        $('#cover-v hr').css('width', '100%')
    }, 300)

    $('#fullpage').fullpage({
        navigation: false,    	
		scrollOverflow : true,
    	afterLoad: function(anchorLink, index){
            index_now = index
            timetemp = setTimeout(function(){
                $('#page-down .fa').css('animation-name', 'btnmove')
            }, 3000)
            bar_witdh = (index-1) / 18 * 100
            $('#indicator-bar').css('width', bar_witdh+'%')
            if(index == 1){
                if(w > 768){
                    $('#head').css('opacity', 1)
                }
                $('#cover-title').css('opacity', 1)
                $('#cover-title').css('transform', 'translate(0, 0)')
                $('#cover-subtitle').css('opacity', 1)
                $('#cover-subtitle').css('transform', 'translate(0, 0)')
                $('#cover-v h1').css('opacity', 1)
                $('#cover-v h1').css('transform', 'translate(0, 0)')
                $('#cover-v hr').css('width', '100%')
            }
            if(index == 2){
                $('#cover-title').css('opacity', 0)
                $('#cover-title').css('transform', 'translate(0, 50px)')
                $('#cover-subtitle').css('opacity', 0)
                $('#cover-subtitle').css('transform', 'translate(0, 50px)')
                $('#cover-v h1').css('opacity', 0)
                $('#cover-v h1').css('transform', 'translate(0, 50px)')
                $('#cover-v hr').css('width', '0')
                $('#section-3 .box-container').css('transform', 'translate(0, 50px)')
                $('#page-down').css('opacity', 1)
            }
            if(index == 3){
                $('#fixed-back').css('background-color', '#000000')
                $('#section-3 .box-container').css('opacity', 1)
                $('#section-3 .box-container').css('transform', 'translate(0, 0)')
                $('#section-4 .popup').css('transform', 'translate(0, 100px)')
            }
    		if(index == 4){
                $('#section-3 .box-container').css('transform', 'translate(0, 50px)')
                moviePlay(4)
                $('#section-5 .popup').css('transform', 'translate(0, 100px)')
    		}
    		if(index == 5){
                moviePlay(5)
                $('#section-4 .popup').css('transform', 'translate(0, 100px)')
                $('#section-6 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 6){
                moviePlay(6)
                $('#section-5 .popup').css('transform', 'translate(0, 100px)')
            }
    		if(index == 7){
                $('#section-8 .box-container').css('transform', 'translate(0, 50px)')
                $('#section-6 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 8){
                $('#section-8 .box-container').css('opacity', 1)
                $('#section-8 .box-container').css('transform', 'translate(0, 0)')
                $('#section-9 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 9){
                $('#section-8 .box-container').css('transform', 'translate(0, 50px)')
                moviePlay(9)
                $('#section-10 .box-container').css('transform', 'translate(0, 50px)')
            }
            if(index == 10){
                $('#section-10 .box-container').css('opacity', 1)
                $('#section-10 .box-container').css('transform', 'translate(0, 0)')
                $('#section-9 .popup').css('transform', 'translate(0, 100px)')
                $('#section-11 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 11){
                $('#section-10 .box-container').css('transform', 'translate(0, 50px)')
                moviePlay(11)
                $('#section-12 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 12){
                moviePlay(12)
                $('#section-11 .popup').css('transform', 'translate(0, 100px)')
                $('#section-13 .box-container').css('transform', 'translate(0, 50px)')
            }
            if(index == 13){
                $('#section-13 .box-container').css('opacity', 1)
                $('#section-13 .box-container').css('transform', 'translate(0, 0)')
                $('#section-12 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 14){
                $('#section-13 .box-container').css('transform', 'translate(0, 50px)')
                moviePlay(14)
                $('#section-14 .box-container').css('transform', 'translate(0, 50px)')
            }
            if(index == 15){
                $('#section-15 .box-container').css('opacity', 1)
                $('#section-15 .box-container').css('transform', 'translate(0, 0)')
                $('#section-16 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 16){
                $('#section-15 .box-container').css('transform', 'translate(0, 50px)')
                moviePlay(16)
            }
            if(index == 17){
                $('#section-16 .popup').css('transform', 'translate(0, 100px)')
            }
            if(index == 18){
                $('#page-down').css('opacity', 1)
            }
            if(index == 19){
                $('#comment-pannel').toggleClass('open')
            }

        },
        onLeave: function(index, nextIndex, direction){
            
            console.log(index, nextIndex, direction)
            $('#page-down .fa').css('animation-name', '')
            clearTimeout(timetemp)
            if(index == 1){
                $('#head').css('opacity', 0)
            }
            if(index == 2 && direction == 'up'){
                // $('#page-down').css('opacity', 0)
            }
            if(index == 2 && direction == 'down'){
                $('#section-3 .yellow-back').css('height', '100vh')
            }
            if(index == 3 && direction == 'up'){
                $('#fixed-back').css('background-color', 'transparent')
                $('#section-3 .yellow-back').css('height', 0)
            }
            if(index == 3){
                $('#section-3 .box-container').css('opacity', 0)
                $('#section-4 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 4){
                moviePause(4)
                $('#section-5 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 5){
                moviePause(5)
                $('#section-4 .popup').css('transform', 'translate(0, 0)')
                $('#section-6 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 6){
                moviePause(6)
                $('#section-5 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 7){
                $('#section-6 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 7 && direction == 'down'){
                $('#section-8 .yellow-back').css('height', '100vh')
            }
            if(index == 8 && direction == 'up'){
                $('#section-8 .yellow-back').css('height', 0)
            }
            if(index == 8){
                $('#section-8 .box-container').css('opacity', 0)
                $('#section-9 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 9 && direction == 'down'){
                $('#section-10 .yellow-back').css('height', '100vh')
            }
            if(index == 9){
                moviePause(9)
                $('#section-9 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 10 && direction == 'up'){
                $('#section-10 .yellow-back').css('height', 0)
            }
            if(index == 10){
                $('#section-10 .box-container').css('opacity', 0)
                $('#section-9 .popup').css('transform', 'translate(0, 0)')
                $('#section-11 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 11){
                moviePause(11)
                $('#section-12 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 12 && direction == 'down'){
                $('#section-13 .yellow-back').css('height', '100vh')
            }
            if(index == 12){
                moviePause(12)
                $('#section-11 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 13 && direction == 'up'){
                $('#section-13 .yellow-back').css('height', 0)
            }
            if(index == 13){
                $('#section-13 .box-container').css('opacity', 0)
                $('#section-12 .popup').css('transform', 'translate(0, 0)')
                $('#section-14 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 14){
                moviePause(14)
                $('#section-15 .yellow-back').css('height', '100vh')
            }
            if(index == 15 && direction == 'up'){
                $('#section-15 .yellow-back').css('height', 0)
            }
            if(index == 15){
                $('#section-15 .box-container').css('opacity', 0)
                $('#section-16 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 16){
                moviePause(16)
            }
            if(index == 17){
                $('#section-16 .popup').css('transform', 'translate(0, 0)')
            }
            if(index == 18 && direction == 'down'){
                $('#page-down').css('opacity', 0)
            }
            if(index == 19){
                $('#msg').toggleClass('close')
            }
            
        }
    });

    $('.fp-section').css('transition', 'all .7s ease-in-out')

})