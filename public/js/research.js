~(function (desW) {
    var winW = document.documentElement.clientWidth;
    var ratio = winW/desW;
    document.documentElement.style.fontSize = ratio*100+"px";
})(640);
var season = /season=(\d+)/.exec(window.location.search)[1]
console.log(season);
$('#userInfoSubmit').on('click', function (e) { //个人信息
    if ($('#userName').val()==='') {
        $('.nameVal').css('display','inline');
        return;
    } else {
        $('.nameVal').css('display','none');
    }
    if ($('#school').val()==='') {
        $('.schoolVal').css('display','inline');
        return;
    } else {
        $('.schoolVal').css('display','none');
    }
    if ($('#major').val()==='') {
        $('.majorVal').css('display','inline');
        return;
    } else {
        $('.majorVal').css('display','none');
    }
    if ($('#tel').val()!=='' && /^1[3|4|5|7|8][0-9]{9}$/.test($('#tel').val())){
        $('.telVal').css('display','none');
    } else {
        $('.telVal').css('display','inline');
        return;
    }
    var userData = {
        'name':$('#userName').val(),
        'school':$('#school').val(),
        'major':$('#major').val(),
        'phone':$('#tel').val()
    }//个人信息
    console.log(userData);
    $.ajax({
        type: 'POST',
        dateType: 'json',
        url: '/user/submitUserInfo?season='+season,
        data: userData,
        success: function (res) {
            if (res === 'sameName') {
                alert('您已经提交过信息')
            }else if(res === 'success'){
                window.location.href = 'http://dsp.xz.yiche.com/search?name='+$('#userName').val()+'&season='+season
            }
        },
        error: function (error) {
            alert('网络故障，请稍后提交');
        }
    })
});
$('#searchInfoSubmit').on('click', function (e) {//调研信息
    var name = /name=([^?&=]+)/.exec(window.location.search)[1]
    console.log(name);
    let knowAuto;
    let chanelKnow;
    let atTech;
    let atTechOther = '';
    let focus;
    let want;
    if ($('.knowAuto input[name="knowBitauto"]:checked').val()) {
        knowAuto = $('.knowAuto input[name="knowBitauto"]:checked').val()
        $('.knowChoose').css('display','none')
    } else {
        $('.knowChoose').css('display','block')
        return
    }
    if ($('.chanelKnow input[name="chanelToKnow"]:checked').val()) {
        chanelKnow = $('.chanelKnow input[name="chanelToKnow"]:checked').val()
        $('.chanelChoose').css('display','none')
        if ($('.chanelKnow input[name="chanelToKnow"]:checked').val()==='其他') {
            if (!$('#chanel_other').val()) {
                $('.chanelOtherChoose').css('display','block')
                return
            }else{
                chanelKnow = $('#chanel_other').val()
                $('.chanelOtherChoose').css('display','none')
            }
        }
    } else {
        $('.chanelChoose').css('display','block')
        return
    }
    if ($('.atTech input[name="attachTech"]:checked').length>0) {
        $('.techChoose').css('display','none');
        if ($('.atTech input[name="attachTech"]:checked').length > 2) {
            $('.focusOtherLess').css('display','block')
            $('.techOtherChoose').css('display','none')
            return;
        }else {
            atTech = $('.atTech input[name="attachTech"]:checked').serialize();
            if ($('.atTech #tech8')[0].checked) {
                if (!$('#tech_other').val()) {
                    $('.techOtherChoose').css('display','block')
                    return
                }else{
                    atTechOther = $('#tech_other').val()
                    $('.techOtherChoose').css('display','none')
                }
            }else{
                $('.techOtherChoose').css('display','none')
            }
        }
    } else {
        $('.techOtherChoose').css('display','none')
        $('.techChoose').css('display','block')
        return
    }
    if ($('.focus input[name="focusLink"]:checked').val()) {
        focus = $('.focus input[name="focusLink"]:checked').val()
        $('.focusChoose').css('display','none')
        if ($('.focus input[name="focusLink"]:checked').val()==='其他') {
            if (!$('#link_other').val()) {
                $('.focusOtherChoose').css('display','block')
                return
            }else{
                focus = $('#link_other').val()
                $('.focusOtherChoose').css('display','none')
            }
        }
    } else {
        $('.focusChoose').css('display','block')
        return
    }
    if ($('#want').val()) {
        want = $('#want').val()
        $('.feelOther').css('display','none')
    } else {
        $('.feelOther').css('display','block')
        return
    }


    var researchData = {
        'knowAuto':knowAuto,
        'chanelKnow':chanelKnow,
        'atTech':decodeURI(atTech),
        'atTechOther':atTechOther,
        'focus':focus,
        'want':want
    }//个人信息
    console.log(researchData);
    $.ajax({
        type: 'POST',
        dateType: 'json',
        url: '/user/submitResearchInfo?name='+name+'&season='+season,
        data: researchData,
        success: function (res) {
            if (res === 'success') {
                window.location.href = 'http://dsp.xz.yiche.com/success';
            }else{
                alert('提交失败，请稍后重试')
            }
        },
        error: function (error) {
            alert('网络故障，请稍后提交');
        }
    })
});