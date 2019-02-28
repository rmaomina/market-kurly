$(function(){

	/* 메인비주얼배너 */
    window.mySwipe = $('#mySwipe').Swipe({
		auto:3000,
		continous:true,
		callback:function(index,element){
			$('.touch_bullet .active')
				// img/visual_bullet_off.png	
				.attr('src',$('.touch_bullet .active').attr('src').replace('on.png','off.png'))
				.removeClass('active');
			
			$('.touch_bullet img').eq(index)
				// img/visual_bullet_on.png	
				.attr('src',$('.touch_bullet img').eq(index).attr('src').replace('off.png','on.png'))
				.addClass('active');
		}
	
	}).data('Swipe');
    
	/* 비주얼 이전, 다음 버튼 */
	$('.touch_left_btn').on('click',function(){
		mySwipe.prev();
		return false;
	});
	$('.touch_right_btn').on('click',function(){
		mySwipe.next();
		return false;
	});
  
	/* 롤링 버튼 배너 */
	$('#roll_banner_wrap dd').not(':first').hide();
	var onBtn = $('#roll_banner_wrap dt a:first');
	
	$('#roll_banner_wrap dt a').on('click',function(){
		$('#roll_banner_wrap dd:visible').hide();
		$('img', onBtn).attr('src', $('img', onBtn).attr('src').replace('over.png','out.png'));
		var num = $('#roll_banner_wrap dt a').index(this);
		$('#roll_banner_wrap dd').eq(num).show();
		$('img', this).attr('src', $('img',this).attr('src').replace('out.png','over.png'));
		onBtn = $(this);
		return false;
	});
		/* 오토플레이 */
	var btnNum = 0;
	function autoPlay(){
		btnNum++;
		if(btnNum>=7) btnNum =0;
		$('#roll_banner_wrap dt a').eq(btnNum).trigger('click');
		auto1 = setTimeout(autoPlay,4000);
	}
	
	var auto1 = setTimeout(autoPlay,4000);
	
		/* 자동실행 버튼, 중지 버튼 */
		$('.stopBtn').on('click',function(){
			clearTimeout(auto1);
			
			$('img', this).attr('src',$('img',this).attr('src').replace('on.gif','off.gif'));
			
			$('.playBtn img').attr('src',$('.playBtn img').attr('src').replace('off.gif','on.gif'));
			return false;
		});
		
		$('.playBtn').on('click',function(){
			clearTimeout(auto1);
			auto1 = setTimeout(autoPlay,4000);
			
			$('img', this).attr('src',$('img',this).attr('src').replace('on.gif','off.gif'));
			
			$('.stopBtn img').attr('src',$('.stopBtn img').attr('src').replace('off.gif','on.gif'));
			return false;
		});
		
		
	 /* 탭메뉴 */ 
	var onTab = $('#tabmenu dt a:first');
	
	$('#tabmenu dt a').on('mouseover focus click',function(){
		$('#tabmenu dd:visible').hide();
		$('img', onTab).attr('src', $('img', onTab).attr('src').replace('over.jpg','out.jpg'));
		$(this).parent().next().show();
		$('img', this).attr('src',$('img',this).attr('src').replace('out.jpg','over.jpg'));
		onTab = $(this);
		return false; 
	});

	
	/* 베스트북 슬라이더 */
	var mySlider = $('#best_bg ul').bxSlider({
		mode: "horizontal", 
		speed: 300,  /* 이동속도 */
		pager: false,  /* 페이징 표시를 제어 (숨김,노출) */ 
		moveSlides: 1, /* 이동 슬라이드 개수 */
		slideWidth: 170, /* 한개의 슬라이드 폭 */
		minSlides: 5, /* 최소 노출 슬라이드 */
		maxSlides: 5, /* 최대 노출 슬라이드 */
		slideMargin: 50, /* 슬라이드 간의 간격 */
		auto: true, /* 자동 슬라이드 여부 */
		autoHover: true, /* 마우스 오버시 자동 정지 */
		controls: false /* 이전 다음 버튼을 숨김, 아래 따로 코딩! */
	});
	
	$('.prev_btn').on('click',function(){
		mySlider.goToPrevSlide();
		return false; 
	});
	$('.next_btn').on('click',function(){
		mySlider.goToNextSlide();
		return false; 
	});
	
	/* 팝업연동 */
	//pop 쿠키의 값이 no가 저장되어 있지 않으면 숨겨져 있던 팝업을 노출
	if($.cookie('pop') !='no') $('#pop_wrap').show();
		//id=pop_wrap인 요소에 드래그 기능을 적용
	$('#pop_wrap').css('cursor','move').draggable();
		//창 닫기 버튼을 누르면 이벤트 핸들러 실행    
	$('#pop_wrap area:eq(0)').on('click',function(){
		$('#pop_wrap').fadeOut('fast'); 
		return false;
	});
    //하루동안 이 창 열지 않기 버튼을 누르면 이벤트 핸들러에 실행문이 실행 (크롬구글 실행 안됨)
	$('#pop_wrap area:eq(1)').on('click',function(){
		$.cookie('pop','no',{expires:1}); //하루동안 pop로 쿠키값이 'no'로 저장됨
		$('#pop_wrap').fadeOut('fast');
		return false;
	});
	
	/* 이벤트슬라이드배너 */
	var visual = $('#brandVisual > ul > li');
	var button = $('#buttonList > li');
	var current = 0;
	var setIntervalId;
	
    button.on({click:function(){
            var tg = $(this);
            var i = tg.index();
            if(current === tg.index()){return;}
            // alert(i);
            button.removeClass('on');
            tg.addClass('on');
            move(i);
            return false;
        }
    });	
	
	$('#event_wrap').on({
		mouseover:function(){
			clearInterval(setIntervalId);
		},mouseout:function(){
			timer();
		}
	});
	
	timer();
	
	function timer(){
        setIntervalId = setInterval(function(){
            var n = current + 1;
            if(n == visual.size()){n = 0;}
            button.eq(n).trigger('click');
        },1500);
    } /* 자동넘김 */
	
	function move(i){
		var currentEl = visual.eq(current);
		var nextEl = visual.eq(i);
		currentEl.css({left:0}).stop().animate({left:'-100%'});
		nextEl.css({left:'100%'}).stop().animate({left:0});
		current = i;
	}
	
	/* 레시피 슬라이드 */
	function moveSlider(index){
		var willMoveLeft = -(index * 785);
		$('.slider_panel').animate({left:willMoveLeft},'slow');
		
		$('.control_button[data-index='+index+']').addClass('active');
		$('.control_button[data-index!='+index+']').removeClass('active');
		$('.slider_text[data-index='+index+']').show().animate({left:0},'slow');
		$('.slider_text[data-index!='+index+']').hide('slow',function(){
			$(this).css('left',-100)
		});
	} /* moveSlider(index) */
	
	$('.slider_text').css('left',-100).each(function(index){
		$(this).attr('data-index',index);
	});
	$('.control_button').each(function(index){
		$(this).attr('data-index',index);
	}).click(function(){
		var index = $(this).attr('data-index');
		moveSlider(index);
	});
	
	var randomNumber = Math.round(Math.random()*4);
	moveSlider(randomNumber);
	
	
});









