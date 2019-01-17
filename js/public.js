function getUrl() {
    // var url='https://api.datalove.cn/poor';//正式库
    //var url='https://api.datalove.cn/poor';//测试库
     // var url='http://211.155.81.165/poor';//测试库
     // var url='http://192.168.1.122:9000/poor';
    //   var url='http://192.168.1.200:8080/poor';
    var url = 'http://192.168.1.82:8080/poor';
    return url;
}
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = '';
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


//反序列化（目的是为了将一次性的拿到form表单中的内容转化成对象）
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function isBlank(str) {
    if (typeof(str) == "undefined" || str == null || str == "") {
        return true;
    }
    else {
        return false;
    }
}
function formTest(verifytype, isNecessary, value) {
    if (isBlank(value)) {
        if (isNecessary == '1') {
            return "必填项"
        } else return '';
    }
    if (isBlank(verifytype))return '';
    if (verifytype == "name") {
        if (value == "") {
            return "不能为空"
        } else {
            if (!/^[A-z\u4E00-\u9FA5]{0,12}$/.test(value)) {
                return "格式必须是小于12位的英文或汉字"
            } else {
                return ""
            }
        }
    }x
    if (verifytype == "idcard") {
        // if (value == "") {
        //     return "不能为空"
        // } else {
        //     if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        //         return "格式不正确！"
        //     } else {
        //         return ""
        //     }
        // }
    }
    if (verifytype == "integer") {
        if (value != "") {
            if (!/^[1-9]\d*$/.test(value)) {
                return "格式不正确！"
            } else {
                return ""
            }
        } else {
            return ""
        }

    }
    if (verifytype == "mobilePhone") {
        if (value != "") {
            if (!/^1(3|5|7|8|9)[0-9]{9}$/.test(value)) {
                return "格式不正确！"
            } else {
                return ""
            }
        } else {
            return ""
        }
    }
    if (verifytype == "doublePure") {
        if (value != "") {
            if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)) {
                return "格式不正确！"
            } else {
                return ""
            }
        } else {
            return ""
        }
    }
    if (verifytype == "double") {
        if (value == "") {
            return "不能为空"
        } else {
            if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value)) {
                return "格式不正确！"
            } else {
                return ""
            }
        }
    }
    if (verifytype == "tel") {
        if (value != "") {//7 8 11位  11位必须1开头
            if (!/^1\d{10}$|^\d{8}$|^\d{7}$/.test(value)) {
                return "格式不正确！"
            } else {
                return ""
            }
        } else {
            return ""
        }
    }
    if (verifytype == 'isNotEmpty') {
        if (value == "") {
            return "不能为空"
        } else {
            return ""
        }
    }
}
//判断是否为空
function isEmpty(str) {
    if (str != undefined && str != 'undefined' && str != '' && str != null) {
        return true
    } else {
        return false
    }
}

//时间戳转化成日期
function formatDate(time) {
    var date = new Date(time);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D;
}

function getScrollWidth() {
    var noScroll, scroll, oDiv = document.createElement("DIV");
    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = "scroll";
    scroll = oDiv.clientWidth;
    document.body.removeChild(oDiv);
    //alert(noScroll - scroll)
    var test = noScroll - scroll;
    $(".sti-tbl-header").css("padding-right",test);
    $(".sti-tbl-header").css("background-color","#00C3D9");
    //return noScroll-scroll;
}
function douhao(str){
    str=(str.substring(str.length-1)==',')?str.substring(0,str.length-1):str;
    str=(str.substr(0,1)==',')?str.substr(1):str;
    return str;
}


//验证身份证
var idCardError = '';
var idCardInfo = {
    gender: "",   //性别
    birthday: "", // 出生日期(yyyy-mm-dd)
    userAge: ""
};

function isidCard(idcard) {
    var Errors = new Array("验证通过！", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!","身份证号不能为空");
    var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "xinjiang",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    var idcard, Y, JYM, sBirthday, sex;
    var S, M, ereg;
    var idcard_array = [];
    idcard_array = idcard.split("");
    if(!isEmpty(idcard)){
        return idCardError = Errors[5];
    }
    if (area[parseInt(idcard.substr(0, 2))] == null) {
        return idCardError = Errors[4];
    }
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
                var aday = '19' + idcard.substring(6, 12);
                idCardInfo.birthday = formateDateCN(aday);
                if (parseInt(idcard.charAt(14)) % 2 == 0) {
                    idCardInfo.gender = '女';
                } else {
                    idCardInfo.gender = '男';
                }
                var date = new Date();
                var year = date.getFullYear();
                var birthday_year = parseInt(aday.substr(0, 4));
                idCardInfo.userAge = year - birthday_year;
                window.sessionStorage.setItem("idCardInfo", JSON.stringify(idCardInfo));
                return idCardError = Errors[0];
            } else {
                return idCardError = Errors[2];
            }
            break;
        case 18:
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) {
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1);
                if (M == idcard_array[17]) {
                    var aday = idcard.substring(6, 14);
                    idCardInfo.birthday = formateDateCN(aday);
                    if (parseInt(idcard.charAt(16)) % 2 == 0) {
                        idCardInfo.gender = '女';
                    } else {
                        idCardInfo.gender = '男';
                    }
                    var date = new Date();
                    var year = date.getFullYear();
                    var birthday_year = parseInt(idcard.substr(6, 4));
                    var age = year - birthday_year;
                    idCardInfo.userAge = age;
                    window.sessionStorage.setItem("idCardInfo", JSON.stringify(idCardInfo));
                    return idCardError = Errors[0];
                } else {
                    return idCardError = Errors[3];
                }
            } else
                return idCardError = Errors[2];
            break;
        default:
            return idCardError = Errors[1];
            break;
    }
}
function formateDateCN(day) {
    var yyyy = day.substring(0, 4);
    var mm = day.substring(4, 6);
    var dd = day.substring(6);
    return yyyy + '-' + mm + '-' + dd;
}