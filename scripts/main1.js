/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */
var str = ''
$(function () {
    $.ajax({
        // url: 'http://localhost:8080/AgedEvaluation/evaluate/getQiNiuToken.do',
        url: 'https://api.datalove.cn/assessment190/config/getQiniuToken',
        type: 'post',
        dataType: "JSON",
        crossDomain: true,
        data: JSON.stringify({}),
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            var token = data.token;
            if($("#container1").length>0){
                var uploader = Qiniu.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles1',
                    container: 'container1',
                    drop_element: 'container1',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                             plupload.each(files, function(file) {
                                // 文件添加进队列后，处理相关的事情
                                console.log(file)
                                
                            });
                        },
                        'BeforeUpload': function (up, file) {

                            var progress = new FileProgress(file, 'fsUploadProgress1');
                            var chunk_size = plupload.parseSize(this.getOption(
                                'chunk_size'));
                            if (up.runtime === 'html5' && chunk_size) {
                                progress.setChunkProgess(chunk_size);
                            }
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData1(resKey) {
                                var picStr = '';
                                picStr +="<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='alreadyApplyPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file1").before(picStr);
                            }

                            uploadData1(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }


            //test-start
            var Q2 = new QiniuJsSDK();
            if($("#container0").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles0',
                    container: 'container0',
                    drop_element: 'container0',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='col-md-3'>" +
                                    "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='agencyPic' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-delete'></i></div>" +
                                    "</div></div>";
                                $(".pick-file0").before(picStr);
                                //上传一张后删除上传按钮
                                $("#container0").hide();
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }


            //test-start    idCardPics 身份证正反面container2
            var Q3 = new QiniuJsSDK();
            if($("#container2").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles2',
                    container: 'container2',
                    drop_element: 'container2',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='idCardPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file2").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }

            //test-start    maritalPics 婚姻状况container4
            var Q3 = new QiniuJsSDK();
            if($("#container4").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles4',
                    container: 'container4',
                    drop_element: 'container4',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='maritalPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file4").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }

            //疾病  diseaselPics
            var Q3 = new QiniuJsSDK();
            if($("#container5").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles5',
                    container: 'container5',
                    drop_element: 'container5',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='diseaselPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file5").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }
            //残疾证 disabilityPics
            var Q3 = new QiniuJsSDK();
            if($("#container6").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles6',
                    container: 'container6',
                    drop_element: 'container6',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='disabilityPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file6").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }
            //在校证明 schoolPics
            var Q3 = new QiniuJsSDK();
            if($("#container7").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles7',
                    container: 'container7',
                    drop_element: 'container7',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='schoolPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file7").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }
            //收入证明 incomePics
            var Q3 = new QiniuJsSDK();
            if($("#container8").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles8',
                    container: 'container8',
                    drop_element: 'container8',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='incomePics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file8").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }
            //其他相关材料 otherPics
             var Q3 = new QiniuJsSDK();
            if($("#container9").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles9',
                    container: 'container9',
                    drop_element: 'container9',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='otherPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file9").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }
            //家庭有特殊情况 specialPics
            var Q3 = new QiniuJsSDK();
            if($("#container10").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles10',
                    container: 'container10',
                    drop_element: 'container10',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='specialPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file10").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }
            //惠民一卡通 cardPics
            var Q3 = new QiniuJsSDK();
            if($("#container11").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles11',
                    container: 'container11',
                    drop_element: 'container11',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='cardPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file11").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }
             //户口本 accountBookPics
            var Q3 = new QiniuJsSDK();
            if($("#container12").length>0){
                var uploader2 = Q2.uploader({
                    disable_statistics_report: false,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'pickfiles12',
                    container: 'container12',
                    drop_element: 'container12',
                    max_file_size: '100000mb',
                    filters: {mime_types: [{title: "Video files", extensions: "jpg,png,jpeg,gif"}]},
                    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
                    uptoken: token,
                    domain: 'http://image.datalove.cn/',
                    get_new_uptoken: false,
                    //downtoken_url: '/downtoken',
                    unique_names: false,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'BeforeChunkUpload': function (up, file) {
                            console.log("before chunk upload:", file.name);
                        },
                        'FilesAdded': function (up, files) {
                        },
                        'BeforeUpload': function (up, file) {
                        },
                        'UploadProgress': function (up, file) {
                        },
                        'UploadComplete': function () {
                            $('#success').show();
                        },
                        'FileUploaded': function (up, file, info) {
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info.response);
                            var resKey = domain + "/" + res.key;

                            function uploadData2(resKey) {
                                var picStr = '';
                                picStr += "<div class='upload-img' reskey='" + res.key + "'><img src='" + resKey + "' alt='' />" +
                                    "<input type='hidden' name='accountBookPics' value='" + resKey + "'>" +
                                    "<div class='upload-del'><i class='iconfont icon-del'></i></div>" +
                                    "</div>";
                                $(".pick-file12").before(picStr);
                            }

                            uploadData2(resKey);
                        },
                        'Error': function (up, err, errTip) {
                            $('#fileTable1-ws').show();
                            var progress = new FileProgress(err.file, 'fsUploadProgress1-ws');
                            progress.setError();
                            progress.setStatus(errTip);
                        },
                        /**
                         * @return {string}
                         */
                        'Key': function (up, file) {
                            var index1 = file.name.lastIndexOf(".");
                            var index2 = file.name.length;
                            var suffix = file.name.substring(index1 + 1, index2);//后缀名
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            var key = guid() + "." + suffix;
                            // do something with key here
                            return key;
                        }
                        // ,
                        // 'Key': function(up, file) {
                        //     var key = "";
                        //     // do something with key
                        //     return key
                        // }
                    }
                });
            }


















            //uploader.init();
            uploader.bind('BeforeUpload', function () {
                // console.log("hello man, i am going to upload a file");
            });
            uploader.bind('FileUploaded', function (up, file, info) {
                var domain = up.getOption('domain');
            });
            $('#container1').on(
                'dragenter',
                function (e) {
                    e.preventDefault();
                    $('#container1').addClass('draging');
                    e.stopPropagation();
                }
            ).on('drop', function (e) {
                    e.preventDefault();
                    $('#container1').removeClass('draging');
                    e.stopPropagation();
                }).on('dragleave', function (e) {
                    e.preventDefault();
                    $('#container1').removeClass('draging');
                    e.stopPropagation();
                }).on('dragover', function (e) {
                    e.preventDefault();
                    $('#container1').addClass('draging');
                    e.stopPropagation();
                });


            $('#show_code').on('click', function () {
                $('#myModal-code').modal();
                $('pre code').each(function (i, e) {
                    hljs.highlightBlock(e);
                });
            });


            $('body').on('click', 'table button.btn', function () {
                $(this).parents('tr').next().toggle();
            });


            var getRotate = function (url) {
                if (!url) {
                    return 0;
                }
                var arr = url.split('/');
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i] === 'rotate') {
                        return parseInt(arr[i + 1], 10);
                    }
                }
                return 0;
            };

            $('#myModal-img .modal-body-footer').find('a').on('click', function () {
                var img = $('#myModal-img').find('.modal-body img');
                var key = img.data('key');
                var oldUrl = img.attr('src');
                var originHeight = parseInt(img.data('h'), 10);
                var fopArr = [];
                var rotate = getRotate(oldUrl);
                if (!$(this).hasClass('no-disable-click')) {
                    $(this).addClass('disabled').siblings().removeClass('disabled');
                    if ($(this).data('imagemogr') !== 'no-rotate') {
                        fopArr.push({
                            'fop': 'imageMogr2',
                            'auto-orient': true,
                            'strip': true,
                            'rotate': rotate,
                            'format': 'png'
                        });
                    }
                } else {
                    $(this).siblings().removeClass('disabled');
                    var imageMogr = $(this).data('imagemogr');
                    if (imageMogr === 'left') {
                        rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
                    } else if (imageMogr === 'right') {
                        rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
                    }
                    fopArr.push({
                        'fop': 'imageMogr2',
                        'auto-orient': true,
                        'strip': true,
                        'rotate': rotate,
                        'format': 'png'
                    });
                }

                $('#myModal-img .modal-body-footer').find('a.disabled').each(
                    function () {

                        var watermark = $(this).data('watermark');
                        var imageView = $(this).data('imageview');
                        var imageMogr = $(this).data('imagemogr');

                        if (watermark) {
                            fopArr.push({
                                fop: 'watermark',
                                mode: 1,
                                image: 'http://www.b1.qiniudn.com/images/logo-2.png',
                                dissolve: 100,
                                gravity: watermark,
                                dx: 100,
                                dy: 100
                            });
                        }

                        if (imageView) {
                            var height;
                            switch (imageView) {
                                case 'large':
                                    height = originHeight;
                                    break;
                                case 'middle':
                                    height = originHeight * 0.5;
                                    break;
                                case 'small':
                                    height = originHeight * 0.1;
                                    break;
                                default:
                                    height = originHeight;
                                    break;
                            }
                            fopArr.push({
                                fop: 'imageView2',
                                mode: 3,
                                h: parseInt(height, 10),
                                q: 100,
                                format: 'png'
                            });
                        }

                        if (imageMogr === 'no-rotate') {
                            fopArr.push({
                                'fop': 'imageMogr2',
                                'auto-orient': true,
                                'strip': true,
                                'rotate': 0,
                                'format': 'png'
                            });
                        }
                    });

                var newUrl = Qiniu.pipeline(fopArr, key);

                var newImg = new Image();
                img.attr('src', 'images/loading.gif');
                newImg.onload = function () {
                    img.attr('src', newUrl);
                    img.parent('a').attr('href', newUrl);
                };
                newImg.src = newUrl;
                return false;
            });
        }
    })
});
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
