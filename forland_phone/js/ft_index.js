this.foton = this.foton || {};
(function(){
  var FoIndex = function(){
    this.init();
  }
  var p = FoIndex.prototype;
  p.init = function(){
    this.initSwiper();
      this.initEvent();
  }
  p.initSwiper = function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction : false,
        speed: 500
    });
  }
  p.initEvent = function(){
      $(".brand_car").click(function(){
          if($(this).find(".car_detail").css("display")=="block"){
              $(this).find(".car_detail").stop().slideUp();
              return;
          }
          $(this).find(".car_detail").stop().slideDown();
          $(this).siblings(".brand_car").find(".car_detail").stop().slideUp();
      });
  }
  foton.FoIndex = FoIndex;
})();
console.log(foton);
