import './style.css'
import $ from 'jquery'
import 'lazysizes'
import 'fullpage.js'
import bodymovin from 'bodymovin'

var progress = [null, null, null, null, null, null, null, null, null];
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
		$('.volume-text[data-target="' + id + '"]').text('點按關聲音');
	}
	else{
		$('#movie-' + id).get(0).muted = true;
		$('.volume[data-target="' + id + '"]').removeClass('fa-volume-up').addClass('fa-volume-off')
		$('.volume-text[data-target="' + id + '"]').text('點按開聲音');
	}
}

$(document).ready(function(){

    var animation = bodymovin.loadAnimation({
        container: document.getElementById('bm'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../assets/data.json'
    })

    var animation2 = bodymovin.loadAnimation({
        container: document.getElementById('bm-2'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../assets/data2.json'
    })

    var videoTrack = null
    var index_now

    var bar_witdh = 0

    var canvas2 = document.getElementById('video-state');
    var video_state = canvas2.getContext('2d');

    const w = $(window).width()
    const h = $(window).height()
    var timetemp

    function drawVideoState(id){

        var progress = $('#movie-' + id).get(0).currentTime / $('#movie-' + id).get(0).duration
        console.log(progress)
        video_state.clearRect(0, 0, 50, 50)

        video_state.beginPath();
        video_state.arc(25, 25, 21.5, 0, 2 * Math.PI);
        video_state.strokeStyle = '#A5A3A3';
        video_state.stroke();

        video_state.beginPath();
        video_state.arc(25,25,21.5,-0.5 * Math.PI, (2 * progress - 0.5) * Math.PI);
        video_state.strokeStyle = "#FFFFFF";
        video_state.stroke();
        
    }

    $('video').on('ended', function(){
        console.log(this)
        console.log(index_now)
        
        video_state.clearRect(0, 0, 50, 50)

        video_state.beginPath();
        video_state.arc(25,25,21.5,-0.5 * Math.PI, (2 * 1 - 0.5) * Math.PI);
        video_state.stroke();
        if(videoTrack){
            clearInterval(videoTrack)
        }
        if(index_now == 4){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
            $('#section-4 .box-container-c').css('opacity', 1)
            $('#section-4 .box-container-c').css('transform', 'translate(0, 0)')
        }
        if(index_now == 5){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
        if(index_now == 6){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
        if(index_now == 7){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
        if(index_now == 8){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
        if(index_now == 9){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
        if(index_now == 11){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
            $('#section-11 .box-container-c').css('opacity', 1)
            $('#section-11 .box-container-c').css('transform', 'translate(0, 0)')
        }
        if(index_now == 14){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
        if(index_now == 15){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
        if(index_now == 16){
            $('#video-state-contain .fa-repeat').css('opacity', 1)
        }
    })

    $('#video-state-contain .fa-repeat').click(function(){
        $('#video-state-contain .fa-repeat').css('opacity', 0)
        $('#movie-' + index_now).get(0).play()
        videoTrack = setInterval(function(){
            drawVideoState(index_now)
        }, 100)
        if(index_now == 4){
            $('#section-4 .box-container-c').css('opacity', 0)
            $('#section-4 .box-container-c').css('transform', 'translate(0, 50px)')
        }
        if(index_now == 11){
            $('#section-11 .box-container-c').css('opacity', 0)
            $('#section-11 .box-container-c').css('transform', 'translate(0, 50px)')
        }
    })

    $('#video-state').prop('width' , 50)
    $('#video-state').prop('height', 50)

    video_state.lineWidth = 5

    $('video').css('width', w + 'px')

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
            bar_witdh = (index-1) / 17 * 100
            $('#indicator-bar').css('width', bar_witdh+'%')
            if(index == 1){
                console.log(index)
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
            }
            if(index == 3){
                $('#section-3 .box-container').css('opacity', 1)
                $('#section-3 .box-container').css('transform', 'translate(0, 0)')
            }
            if(index == 4){
                $('#section-3 .box-container').css('transform', 'translate(0, 50px)')
                $('#movie-4').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(4)
                }, 100)
            }
            if(index == 5){
                $('#movie-5').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(5)
                }, 100)
            }
            if(index == 6){
                $('#movie-6').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(6)
                }, 100)
            }
            if(index == 7){
                $('#movie-7').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(7)
                }, 100)
            }
            if(index == 8){
                $('#movie-8').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(8)
                }, 100)
            }
            if(index == 9){
                $('#movie-9').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(9)
                }, 100)
                $('#section-10 .box-container').css('transform', 'translate(0, 50px)')
            }
            if(index == 10){
                $('#section-10 .box-container').css('opacity', 1)
                $('#section-10 .box-container').css('transform', 'translate(0, 0)')
            }
            if(index == 11){
                $('#section-10 .box-container').css('transform', 'translate(0, 50px)')
                $('#movie-11').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(11)
                }, 100)
            }
            if(index == 12){

            }
            if(index == 13){
                
            }
            if(index == 14){
                $('#movie-14').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(14)
                }, 100)
            }
            if(index == 15){
                $('#movie-15').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(15)
                }, 100)
            }
            if(index == 16){
                $('#movie-16').get(0).play()
                $('#video-state').css('opacity', 1)
                videoTrack = setInterval(function(){
                    drawVideoState(16)
                }, 100)
            }
            if(index == 18){
                $('#page-down').css('opacity', 1)
            }
            if(index == 19){
                $('#comment-pannel').toggleClass('open')
            }
        },
        onLeave: function(index, nextIndex, direction){
            $('#page-down .fa').css('animation-name', '')
            clearTimeout(timetemp)
            if(index == 2 && direction == 'down'){
                ctx.clearRect(0, 0, 375, 667)
                $('#section-3 .orange-back').css('height', '100vh')
            }
            if(index == 3 && direction == 'up'){
                ctx.drawImage(img, 0, 0, 375, 667, 0, 0, 375, 667);
            }
            if(index == 3){
                $('#section-3 .box-container').css('opacity', 0)
            }
            if(index == 4){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                $('#section-4 .box-container-c').css('opacity', 0)
                $('#section-4 .box-container-c').css('transform', 'translate(0, 50px)')
                clearInterval(videoTrack)
            }
            if(index == 5){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
            }
            if(index == 6){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
            }
            if(index == 7){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
            }
            if(index == 8){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
            }
            if(index == 9){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
                $('#section-10 .orange-back').css('height', '100vh')
            }
            if(index == 10){
                 $('#section-10 .box-container').css('opacity', 0)
            }
            if(index == 11){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                $('#section-11 .box-container-c').css('opacity', 0)
                $('#section-11 .box-container-c').css('transform', 'translate(0, 50px)')
                clearInterval(videoTrack)
            }
            if(index == 12){
            
            }
            if(index == 13){
            
            }
            if(index == 14){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
            }
            if(index == 15){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
            }
            if(index == 16){
                $('#video-state').css('opacity', 0)
                $('#video-state-contain .fa-repeat').css('opacity', 0)
                clearInterval(videoTrack)
            }
            if(index == 18 && direction == 'down'){
                $('#page-down').css('opacity', 0)
            }
            if(index == 19){
                $('#msg').toggleClass('close')
            }

        }

    })

    $('.fp-section').css('transition', 'all .7s ease-in-out')

})