$(function(){

	/* ���κ��־��� */
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
    
	/* ���־� ����, ���� ��ư */
	$('.touch_left_btn').on('click',function(){
		mySwipe.prev();
		return false;
	});
	$('.touch_right_btn').on('click',function(){
		mySwipe.next();
		return false;
	});
  
	/* �Ѹ� ��ư ��� */
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
		/* �����÷��� */
	var btnNum = 0;
	function autoPlay(){
		btnNum++;
		if(btnNum>=7) btnNum =0;
		$('#roll_banner_wrap dt a').eq(btnNum).trigger('click');
		auto1 = setTimeout(autoPlay,4000);
	}
	
	var auto1 = setTimeout(autoPlay,4000);
	
		/* �ڵ����� ��ư, ���� ��ư */
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
		
		
	 /* �Ǹ޴� */ 
	var onTab = $('#tabmenu dt a:first');
	
	$('#tabmenu dt a').on('mouseover focus click',function(){
		$('#tabmenu dd:visible').hide();
		$('img', onTab).attr('src', $('img', onTab).attr('src').replace('over.jpg','out.jpg'));
		$(this).parent().next().show();
		$('img', this).attr('src',$('img',this).attr('src').replace('out.jpg','over.jpg'));
		onTab = $(this);
		return false; 
	});

	
	/* ����Ʈ�� �����̴� */
	var mySlider = $('#best_bg ul').bxSlider({
		mode: "horizontal", 
		speed: 300,  /* �̵��ӵ� */
		pager: false,  /* ����¡ ǥ�ø� ���� (����,����) */ 
		moveSlides: 1, /* �̵� �����̵� ���� */
		slideWidth: 170, /* �Ѱ��� �����̵� �� */
		minSlides: 5, /* �ּ� ���� �����̵� */
		maxSlides: 5, /* �ִ� ���� �����̵� */
		slideMargin: 50, /* �����̵� ���� ���� */
		auto: true, /* �ڵ� �����̵� ���� */
		autoHover: true, /* ���콺 ������ �ڵ� ���� */
		controls: false /* ���� ���� ��ư�� ����, �Ʒ� ���� �ڵ�! */
	});
	
	$('.prev_btn').on('click',function(){
		mySlider.goToPrevSlide();
		return false; 
	});
	$('.next_btn').on('click',function(){
		mySlider.goToNextSlide();
		return false; 
	});
	
	/* �˾����� */
	//pop ��Ű�� ���� no�� ����Ǿ� ���� ������ ������ �ִ� �˾��� ����
	if($.cookie('pop') !='no') $('#pop_wrap').show();
		//id=pop_wrap�� ��ҿ� �巡�� ����� ����
	$('#pop_wrap').css('cursor','move').draggable();
		//â �ݱ� ��ư�� ������ �̺�Ʈ �ڵ鷯 ����    
	$('#pop_wrap area:eq(0)').on('click',function(){
		$('#pop_wrap').fadeOut('fast'); 
		return false;
	});
    //�Ϸ絿�� �� â ���� �ʱ� ��ư�� ������ �̺�Ʈ �ڵ鷯�� ���๮�� ���� (ũ�ұ��� ���� �ȵ�)
	$('#pop_wrap area:eq(1)').on('click',function(){
		$.cookie('pop','no',{expires:1}); //�Ϸ絿�� pop�� ��Ű���� 'no'�� �����
		$('#pop_wrap').fadeOut('fast');
		return false;
	});
	
	/* �̺�Ʈ�����̵��� */
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
    } /* �ڵ��ѱ� */
	
	function move(i){
		var currentEl = visual.eq(current);
		var nextEl = visual.eq(i);
		currentEl.css({left:0}).stop().animate({left:'-100%'});
		nextEl.css({left:'100%'}).stop().animate({left:0});
		current = i;
	}
	
	/* ������ �����̵� */
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









