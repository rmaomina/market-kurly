jQuery(document).ready(function(){
    //모달 닫기
    $('.btn-popup-close').click(function(e){
        e.preventDefault();
        $('.modal').removeClass('active');
    });
    // 로그인 상자
    $('.btn-login-open').click(toggleLogin);
    $('.btn-login-close').click(toggleLogin);
    function toggleLogin(){
        var checkClass = $('.login-box').hasClass('active');
        if (checkClass == true) {
            $('.login-box').removeClass('active');
        } else {
            $('.login-box').addClass('active');
        }
    }
    // 상단띠배너 감추기
    $('.msg-close').click(function(e){
        e.preventDefault();
        $('.top-banner').hide();
    });
    // gnb 서브메뉴
    $('.gnb-menu>li').hover(
        function(){
            $(this).children('.gnb-sub').show();
        },function() {
            $(this).children('.gnb-sub').hide();
        }
    );
    // 카테고리 메뉴 보이기
    $('.btn-cg').hover(
        function(){
            $('.category-items').show();
        },function() {
            $('.category-items').hide();
        }
    );
    //네비게이션 스티키
    $(window).scroll(function () {
        var height = $(document).scrollTop();
        var display = 
        console.log(height);
        if (height >= 300) {
            $('.navbar').css('position','fixed')
        } else {
            $('.navbar').css('position','relative')
        }
        //리모컨 메뉴
        if (height >= 590) {
            $('.remote-area').css('position','fixed');
            $('.remote-area').css('top','80px');
        } else {
            if($('.top-banner').css('display') != 'block') {
                $('.remote-area').css('position','absolute');
                $('.remote-area').css('top','670px');
            } else {
                $('.remote-area').css('position','absolute');
                $('.remote-area').css('top','710px');
            }
        }
    });
    //상품 아이템 호버시
    $('.product-item').hover(
        function(){
            $(this).children('.product-dim').css('opacity','1');
        },function(){
            $(this).children('.product-dim').css('opacity','0');
        }
    );
    //탭 
    $('.tabs li').click(function(e){
        e.preventDefault();
        $('.tabs li').removeClass('on');
        $(this).addClass('on');

        var currentPanel = $(this).children('a').attr('href');
        var tg = $('.panels').children(currentPanel);
        $('.panels').children('.panel').removeClass('active');
        $(tg).addClass('active');

    });
    //슬라이드 쇼
    var timer = 2000; 

	$('.slide-new').each(function(){
		var slideBox = $(this);
        var slideNav = $('.slide-new-nav');
        var tgs = slideBox.find('li');
        var n = 0;
        var limitN = tgs.size();
        
		function switchImg(){
			var tgs = slideBox.find('li');
			var first = tgs.eq(0);
			var second = tgs.eq(1);
			first.removeClass('active').appendTo(slideBox);
            second.addClass('active');
            
            var navdot = slideNav.find('.nav-dot');
            navdot.eq(n).removeClass('active');
            n++;
            if (n == limitN) {
                n = 0;
            }
            navdot.eq(n).addClass('active');
		}
		setInterval(switchImg,timer);
    });
});