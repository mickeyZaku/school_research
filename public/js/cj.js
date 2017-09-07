if (window.localStorage.getItem('isTwice') === 'true') {
    getPrizeDetail()
    $('.qaCode').css('display','none')
    $('.drawPrize').css('display','block')
}
var nametxt = $('.name');
var phonetxt = $('.phone');
var flag = true;
// var td = 10;//内定中奖,从最小奖开始，共10个名额
var num = 0;
var t;
var datePath = (new Date().getMonth()+1)+''+(new Date().getDate());
console.log(datePath);
var runing = true;
function getPrizeDetail() {
    var xinm = new Array();
    var phone = new Array();
    $.ajax({
        type: 'GET',
        url: '/user/getDate',
        success: function (res) {
            if (res) {
                datePath = res;
                console.log(datePath);
                $.ajax({
                    type: 'POST',
                    dateType: 'json',
                    url: '/user/getUserInfo?datePath='+datePath,
                    success: function (_res) {
                        if (_res) {
                            if (_res.errno) {
                                alert('暂无数据')
                                return;
                            }else if(_res){
                                $('#btntxt').off('click',start)
                                var drawData = JSON.parse(_res)
                                for (var key in drawData) {
                                    xinm.push(key);
                                    phone.push(drawData[key].replace(/(\d{3})\d{4}(\d{4})/g,function ($1,$2,$3) {
                                        return $2+'****'+$3
                                    }));
                                }
                                console.log(xinm);
                                console.log(phone);
                                var pcount = xinm.length;//参加人数
                                //开始停止
                                function start() {
                                    console.log(runing);
                                    if (runing) {
                                        runing = false;
                                        $('#btntxt').removeClass('start').addClass('stop');
                                        $('#btntxt').html('停止');
                                        startNum()
                                    } else {
                                        runing = true;
                                        $('#btntxt').removeClass('stop').addClass('start');
                                        $('#btntxt').html('开始');
                                        stop();
                                        // zd();//内定中奖
                                    }
                                }
                                //循环参加名单
                                function startNum() {
                                    flag = false
                                    num = Math.floor(Math.random() * pcount);
                                    console.log(num);
                                    console.log(xinm[num]);
                                    console.log(phone[num]);
                                    nametxt.html(xinm[num]);
                                    phonetxt.html(phone[num]);
                                    t = setTimeout(startNum, 0);
                                }
                                //停止跳动
                                function stop() {
                                    pcount = xinm.length;
                                    clearInterval(t);
                                    t = 0;
                                }
                                $('#btntxt').on('click',start)
                            }
                        }else{
                            alert('暂无数据，请请稍后重试')
                        }
                    },
                    error: function (error) {
                        alert('网络故障，请稍后提交');
                    }
                })
            }
        },
        error: function (error) {
            alert('网络故障，请稍后提交');
        }
    })
}
$('.loginQrCode .getDetailInfo li').map(function (index,item) {
    $(item).on('click',function () {
        window.localStorage.setItem('isTwice',false)
        $('.drawPrize').css('display','none')
        $('.qaCode').css('display','block')
        $('.qaCode .qaCodePics li').map(function (_index,_item) {
            if (_index === index) {
                $(_item).css('display','block')
            }else{
                $(_item).css('display','none')
            }
        })
    })
})
function concatClick() {
    window.localStorage.setItem('isTwice',true);
    window.location.reload();
}
$('.concat a').on('click',concatClick)




// //从一等奖开始指定前3名
// function zd() {
//     if(td <= 3){
//         if (td == 1) {
//             nametxt.html('周一一');
//             phonetxt.html('15112345678');
//             $('.list').prepend("<p>"+td+' '+"周一一 -- 15112345678</p>");
//         }
//         if (td == 2) {
//             nametxt.html('李二二');
//             phonetxt.html('151000000000');
//             $('.list').prepend("<p>"+td+' '+"李二二 -- 151000000000</p>");
//         }
//         if (td == 3) {
//             nametxt.html('张三三');
//             phonetxt.html('1511111111');
//             $('.list').prepend("<p>"+td+' '+"张三三 -- 1511111111</p>");
//         }
//     }else if(td > 3){
//         //打印中奖者名单
//         $('.list').prepend("<p>"+td+' '+xinm[num]+" -- "+phone[num]+"</p>");
//         if(pcount <= 0){
//             alert("投票结束");
//         }
//         //将已中奖者从数组中"删除",防止二次中奖
//         xinm.splice($.inArray(xinm[num], xinm), 1);
//         phone.splice($.inArray(phone[num], phone), 1);
//     }
//     td = td - 1;
// }
