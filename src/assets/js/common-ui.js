// gnb menu
jQuery(function(){
    jQuery('.gnb_list > li > a').on('click', function(e){
        jQuery(this).parent().addClass('on').siblings().removeClass('on');
        var tabIdx = jQuery(this).parent().index();
        e.preventDefault();
    });
    var tabLen = jQuery('.gnb_list > li').length;
});

// 사업자 소개
jQuery(function(){
    jQuery('.btn_page').on('click', function(eventObject) {

        var toggle = jQuery('.page_list').data('toggle');

        if(toggle == null || toggle == undefined) {
            toggle = 'open';
        }

        switch(toggle) {
            case 'open':
                jQuery('.btn_page').addClass('on rot180');
                jQuery('.page_list').addClass('on');
                jQuery('.page_list').data('toggle', 'close');
                break;

            case 'close':
                jQuery('.btn_page').removeClass('on rot180');
                jQuery('.page_list').removeClass('on');
                jQuery('.page_list').data('toggle', 'open');
                break;
        }
    });
});


// popuup
jQuery(document).ready(function() {
    jQuery("#layerPopup1").click(function() {
        goPopUp1();
    });
    jQuery("#layerPopup1_no").click(function() {
        goPopUp1_no(); // 바탕클릭시 안닫힘
    });
    jQuery("#layerPopup2").click(function() {
        goPopUp2();
    });
    jQuery("#layerPopup2_no").click(function() {
        goPopUp2_no(); // 바탕클릭시 안닫힘
    });
    jQuery("#layerPopup3").click(function() {
        goPopUp3();
    });
})

var goPopUp1 = function() {
    jQuery('#popup1').bPopup();
}
var goPopUp2 = function() {
    jQuery('#popup2').bPopup();
}
var goPopUp3 = function() {
    jQuery('#popup3').bPopup();
}

// 파일찾기
jQuery(function(){
    jQuery('.upload input[type="file"]').on('change', function () {
        jQuery('.upload_path').val(this.value.replace('C:\\fakepath\\', ''));
    });
});

// 카메라찍기
jQuery(function(){
    jQuery('#camera1').on('change', function () {
        jQuery('.upload_path1').val(this.value.replace('C:\\fakepath\\', ''));
    });
});

// 갤러리
jQuery(function(){
    jQuery('#camera2').on('change', function () {
        jQuery('.upload_path2').val(this.value.replace('C:\\fakepath\\', ''));
    });
});

// jQuery(function(){
//   'use strict';
//   // Selectmenu
//   jQuery('select').selectmenu();
// });

jQuery(function(){
    jQuery(".faq_list > dd:not(:first)").css("display","none");
    jQuery(".faq_list:first").addClass("on"); // on 삭제
    jQuery(".faq_list > dt").click(function(){
        if(jQuery("+dd",this).css("display")=="none"){
            jQuery("dd").slideUp("fast");
            // jQuery("+dd",this).slideDown("fast");
            jQuery("dt").removeClass("on");
            jQuery(this).addClass("on");
            //jQuery(".main_car_box").hide();
        }
    }).mouseover(function(){
        jQuery(this).addClass("over");
    }).mouseout(function(){
        jQuery(this).removeClass("over");
    });

    jQuery(".faq_list > dd:not(:first)").css("display","none");
    jQuery(".faq_list:first").addClass("on"); // on 삭제
    jQuery(".faq_list > dt").click(function(){
        if(jQuery("+dd",this).css("display")=="none"){
            jQuery("dd").slideUp("fast");
            jQuery("+dd",this).slideDown("fast");
            jQuery("dt").removeClass("on");
            jQuery(this).addClass("on");
            //jQuery(".main_car_box").hide();
        }
    }).mouseover(function(){
        jQuery(this).addClass("over");
    }).mouseout(function(){
        jQuery(this).removeClass("over");
    });
});

jQuery(function(){
    jQuery(".terms_list > dd:not(:first)").css("display","none");
    jQuery(".terms_list:first").addClass("on"); // on 삭제
    jQuery(".terms_list > dt").click(function(){
        if(jQuery("+dd",this).css("display")=="none"){
            jQuery("dd").slideUp("fast");
            jQuery("+dd",this).slideDown("fast");
            jQuery("dt").removeClass("on");
            jQuery(this).addClass("on");
            //jQuery(".main_car_box").hide();
        }
    }).mouseover(function(){
        jQuery(this).addClass("over");
    }).mouseout(function(){
        jQuery(this).removeClass("over");
    });

    jQuery(".terms_list > dd:not(:first)").css("display","none");
    jQuery(".terms_list:first").addClass("on"); // on 삭제
    jQuery(".terms_list > dt").click(function(){
        if(jQuery("+dd",this).css("display")=="none"){
            jQuery("dd").slideUp("fast");
            jQuery("+dd",this).slideDown("fast");
            jQuery("dt").removeClass("on");
            jQuery(this).addClass("on");
            //jQuery(".main_car_box").hide();
        }
    }).mouseover(function(){
        jQuery(this).addClass("over");
    }).mouseout(function(){
        jQuery(this).removeClass("over");
    });
});

jQuery(function(){
    jQuery('#camera').change(function(e){
        jQuery('#pic').attr('src', URL.createObjectURL(e.target.files[0]));
    });
});
