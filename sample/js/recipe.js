
jQuery(document).ready(function(){
	 $(function(){
   window.mySwipe =$('#mySwipe02').Swipe({
     auto: 3000,  
     continuous: true, 
     callback: function(index, element) { 
    
        $(".touch_bullet02 .active")
        .attr("src",$(".touch_bullet02 .active")
        .attr("src").replace("on.png","off.png"))
        .removeClass("active"); 
    
        $(".touch_bulle02 img").eq(index)
        .attr("src",$(".touch_bullet02 img").eq(index)
        .attr("src").replace("off.png","on.png"))
        .addClass("active");
     }
  }).data('Swipe');
    
    
  $(".touch_left_btn02 a").on("click",function(){
     mySwipe.prev(); 
     return false; 
  });
  $(".touch_right_btn02 a").on("click",function(){
     mySwipe.next(); 
     return false; 
  });
});