function getAndroidVersion(a){var a=a||navigator.userAgent,b=a.match(/Android\s([0-9\.]*)/);return b?b[1]:!1}function orient(){(180==window.orientation||0==window.orientation)&&$(".landscape-overlay").fadeIn(),(90==window.orientation||-90==window.orientation)&&$(".landscape-overlay").fadeOut()}function screenSize(){var a,b,c=16/9,d=$(window).width(),e=$(window).height();d/e>c?(a=Math.floor(e*c),b=Math.floor(e)):(a=Math.floor(d),b=Math.floor(a/c)),$("#wrapper").css({width:a,height:b,marginTop:-b/2})}function wxsharing(){_WXShare("http://toast-365days.com/img/share.jpg",100,100,"百威","百威啤酒","","微信APPID(一般不用填)")}function activeSubmitButton(){""!==$("#username").val()&&""!==$("#occasion").val()&&""!==$("#time-d").val()&&""!==$("#time-m").val()?$("#submit").addClass("active"):$("#submit").removeClass("active")}function SaveTrackingLog(a,b,c,d){$.ajax({type:"POST",url:"api/tracking/save",dataType:"json",data:{source:a,channel:b,user_id:c,is_start:d}}).done(function(){console.log("save tracking log")}).fail(function(){$.ajax({url:"api/json/tracking_save.json",cache:!1}).done(function(a){console.log("tracking save JSON: "+a)})})}function addGATracking(){$(document).on("click","[ga_category][ga_action]",function(){var a=$(this).attr("ga_category"),b=$(this).attr("ga_action"),c=$(this).attr("ga_label"),d=$(this).attr("ga_value");requestGATracking(a,b,c,d)})}function requestGATracking(a,b,c,d){void 0!==a&&""!==a&&void 0!==b&&""!==b&&ga("send","event",a,b,c,d)}function addNielsenTracking(){$(document).on("click","[nl_key]",function(){var a=$(this).attr("nl_key");requestNielsenTracking(a)})}function flood(a){if(a){var b=new Image;b.src=a}}function requestNielsenTracking(a){var b=nielsenCodes[a];if(b){var c="http://s.cr-nielsen.com/hat?_t=r&_htsinfo="+b;flood(c)}}function addBaiduTracking(){$(document).on("click","[baidu_category][baidu_action]",function(){var a=$(this).attr("baidu_category"),b=$(this).attr("baidu_action");requestBaiduTracking(a,b)})}function requestBaiduTracking(a,b){void 0!==a&&""!==a&&void 0!==b&&""!==b&&_hmt.push(["_trackEvent",a,b])}function requestAdmasterTracking(){}function shareSNS(a,b,c,d){d=encodeURIComponent(d),""==c&&(c="http://toast-365days.com/img/share.jpg");var e=encodeURIComponent(c);b=encodeURIComponent(""==b?window.location.href:b);var f,g,h;switch(a){case"sina":var i="http://v.t.sina.com.cn/share/share.php?title="+d+"&url="+b+"&content=utf-8&sourceUrl="+b+"&pic="+e;window.open(i,"newwindow","height=400,width=400,top=100,left=100");break;case"renren":var i="http://widget.renren.com/dialog/share?resourceUrl="+b+"&srcUrl="+b+"&title"+d+"&images="+e+"&charset=UTF-8&description=";window.open(i,"newwindow","height=400,width=400,top=100,left=100");break;case"douban":var i="http://shuo.douban.com/!service/share?image="+e+"&href="+b+"&name="+d;window.open(i,"newwindow","height=400,width=400,top=100,left=100");break;case"qq":f={url:b,title:d,desc:d,pics:e,flash:"",site:b,style:"201",width:32,height:32},g=[];for(h in f)g.push(h+"="+f[h]||"");window.open("http://connect.qq.com/widget/shareqq/index.html?"+g.join("&"),"_blank","scrollbars=no,width=730,height=600,left=75,top=20,status=no,resizable=yes");break;case"qzone":f={url:b,title:d,summary:d,site:b,pics:e,style:"203",width:98,height:22},g=[];for(h in f)g.push(h+"="+f[h]||"");var j="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";isMobile.any()&&(j="http://openmobile.qq.com/oauth2.0/m_jump?page=qzshare.html&loginpage=loginindex.html&logintype=qzone&"),window.open(j+g.join("&"),"_blank","scrollbars=no,width=610,height=550,left=75,top=20,status=no,resizable=yes")}}function _WXShare(a,b,c,d,e,f,g){function h(){WeixinJSBridge.invoke("sendAppMessage",{appid:g,img_url:a,img_width:b,img_height:c,link:f,desc:e,title:d},function(a){_report("send_msg",a.err_msg)})}function i(){WeixinJSBridge.invoke("shareTimeline",{img_url:a,img_width:b,img_height:c,link:f,desc:e,title:d},function(a){_report("timeline",a.err_msg)})}function j(){WeixinJSBridge.invoke("shareWeibo",{content:e,url:f},function(a){_report("weibo",a.err_msg)})}a=a||"http://www.00ok.cc/ico-share.png",b=b||100,c=c||100,d=d||document.title,e=e||document.title,f=f||document.location.href,g="",document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.on("menu:share:appmessage",function(){h()}),WeixinJSBridge.on("menu:share:timeline",function(){i()}),WeixinJSBridge.on("menu:share:weibo",function(){j()})},!1)}function controlFlow(){var a=getUrlParameterByName("vid");a&&$.ajax({url:"api/user/load/"+a}).done(function(a){processUserLoadData(a)}).fail(function(){$.ajax({url:"api/json/user_load.json",cache:!1}).done(function(a){console.log("user load JSON: "+a),processUserLoadData(a)})})}function getUrlParameterByName(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))}function processUserLoadData(a){a?a.is_success?(ugc_name=a.data.name,ugc_purpose=a.data.purpose,ugc_date=a.data.date,ugc_image_url=a.data.image_url):console.log(a.message):console.log("No UGC with id:"+videoId)}$(function(){for(var a=["img/bottle.png","img/bottle-desk.jpg","img/bottle-desk-bg.jpg","img/engrave.png","img/hand.png","img/hand1.png","img/hand2.png","img/hand3.png","img/hand4.png","img/hands-bg.jpg","img/dust-toast.png","img/bright.png","img/model1.png","img/model2.png","img/frame1-bg.jpg"],b=$("#form"),c=a.length,d=0,e=[],f=0;c>f;f++)e[f]=new Image,e[f].src=a[f],e[f].onload=function(){Math.ceil(100*(++d/c));d>=c&&setTimeout(function(){b.show().trigger("start")},300)}});var isMobile={Android:function(){return/Android/i.test(navigator.userAgent)},BlackBerry:function(){return/BlackBerry/i.test(navigator.userAgent)},iOS:function(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)},Windows:function(){return/IEMobile/i.test(navigator.userAgent)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Windows()}};window.addEventListener("onorientationchange"in window?"orientationchange":"resize",orient,!1),window.addEventListener("resize",function(){screenSize()}),$(function(){$(".input input").bind("focus",function(){var a=$(this),b=a.attr("name");"occasion"==b&&$("#type-list").slideDown(),a.parent().addClass("focus")}).bind("blur",function(){$(this).parent().removeClass("focus"),$("#type-list").slideUp()}).bind("change",function(){activeSubmitButton()}).bind("keyup",function(){activeSubmitButton()}),$("#type-list li").bind("click",function(){var a=$(this).text();$("#occasion").val(a),$("#type-list").slideUp()}),$(".close-overlay").bind("click",function(){$(".overlay").fadeOut()}),$(".avatar-save").bind("click",function(){$(".avatar-form").submit()}),$("#submit").bind("click",function(){$("#submit").hasClass("active")&&$.ajax({type:"POST",url:"api/user/save",dataType:"json",data:{name:$("#username").val(),purpose:$("#occasion").val(),date:$("#time-d").val()+"/"+$("#time-m").val(),image:$("#avatarInput").val()}}).done(function(){alert("success")}).fail(function(){$.ajax({url:"api/json/user_save.json",cache:!1}).done(function(a){console.log("JSON: "+a)})})})}),$(function(){function a(){screenSize(),wxsharing(),orient()}a()}),$(function(){var a=$("#bottle"),b=$(".bottle",a),c=$(".shadow",a),d=$(".bottle-shade",a),e=$(".printer",a),f=$(".ugc-name",a),g=$(".label span",a),h=$(".darkness",a),i=$(".bg",a),j=$(".foreground",a),k=$(".light",a),l=a.width(),m=a.height(),n=function(){g.lettering(),b.velocity({translateY:"-120.0%"},0),i.velocity({translateZ:"50px"},0),j.velocity({translateZ:"56px"},0),h.velocity({opacity:0}),k.velocity({rotateZ:"-12deg",scale:1.5,translateY:"-9%",translateX:"-3%",opacity:0},0),setTimeout(t,300)},o=function(){j.velocity({translateZ:"1px"},1e3,function(){k.show().velocity({opacity:.8},1e3).velocity({rotateZ:"-2deg"},1e3)}),i.velocity({translateZ:"1px"},1e3)},p=function(){h.velocity({opacity:.92},2e3)},q=function(){e.velocity({top:m,left:l},800,function(){e.hide(),o()})},r=function(){var a,b=f.width(),c=2*f.height(),h=d.width(),i=g.text().length,j=140;a=i>=2?($(".char2",f).offset().left-$(".char1",f).offset().left)/2:b/i/2,d.width((h-b)/2+b);var k,l=function(){e.velocity({top:"-="+c+"px",left:"+="+a+"px"},j/2,"linear",function(){k||m()})},m=function(){e.velocity({top:"+="+c+"px",left:"+="+a+"px"},j/2,"linear",function(){k||l()})};d.velocity({width:(h-b)/2},i*j,"linear",function(){d.hide(),k=!0,q(),p()}),l()},s=function(){var b=f.offset(),c=a.offset();e.velocity({top:b.top-c.top,left:b.left-c.left},700,"linear",r)},t=function(){b.velocity({translateY:0},600,function(){$(".label",a).show(),s()}),c.velocity({scale:"70%"},900,"linear")};a.on("start",n)}),$(function(){var a=$("#toast"),b=$("#frame1"),c=$(".bg",a),d=$(".dust",a),e=$("#hand"),f=$(".hand1",a),g=$(".hand2",a),h=$(".hand3",a),i=$(".hand4",a),j=function(){a.hide(),b.trigger("start")},k=2e3,l=1800,m=function(){n()},n=function(){d.velocity({translateY:"100%"},4e3,"linear"),f.velocity({translateX:"93%",translateY:"-124%"},{duration:k,easing:[.37,1.08,.43,1.11]}).velocity({translateX:"0%",translateY:"0%"},l,[.6,.06,.66,.2]),g.velocity({translateX:"100%",translateY:"-90%"},{duration:k+200,easing:[.34,1.14,.39,1.18]}).velocity("reverse",l,[.6,.06,.66,.2]),h.velocity({translateX:"-110%",translateY:"-90%"},{duration:k+200,easing:[.34,1.14,.39,1.19]}).velocity("reverse",l,[.6,.06,.66,.2]),i.velocity({translateX:"-90%",translateY:"-30%"},{duration:k+200,easing:[.34,1.14,.39,1.19]}).velocity("reverse",l,[.6,.06,.66,.2]),e.velocity({translateY:"-78%"},{duration:k+200,easing:[.34,1.14,.39,1.19]}).velocity({translateY:"-22%"},{duration:l,easing:[.6,.06,.66,.2],complete:j,begin:function(){c.velocity({opacity:0},l),b.show().velocity({opacity:1},2e3)}})};a.on("start",m)}),$(function(){var a=$("#frame1"),b=$(".box3d",a),c=$(".bg1",a),d=$(".model1",a),e=$(".model2",a),f=$("#hand"),g=function(a){f.velocity({translateX:"10%",translateY:"-64%"},1e3,a)},h=function(a){setTimeout(function(){f.velocity({translateY:"-22%"},1e3,a)},300)},i=function(){c.add(d).add(e).velocity({translateZ:"18px"},1500,function(){g(function(){isMobile.Android()||b.css({"perspective-origin":"26% 50%"},0),h(),d.velocity({translateX:"70%",translateZ:"70px"},1700),e.velocity({translateZ:"39px"},1500),c.velocity({translateZ:"10px"},1600,function(){g(function(){h(),isMobile.Android()||b.css({"perspective-origin":"50% 50%"},0),$(".model1",a).velocity({translateZ:"90px"},500,"linear"),$(".model2",a).velocity({translateZ:"90px"},1e3,"linear"),c.velocity({translateZ:"76px"},1500,"linear",function(){$("#frame2").trigger("start")})})})})})};a.on("start",i)}),$(function(){addGATracking(),addNielsenTracking(),addBaiduTracking()});var nielsenCodes={"index,create":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzI5Jock","index,img_upload":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMwJtj3","index,tnc":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMxJiTz","index,rules":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMyJmD8","index,tap_into_beers":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMzJpz4","video,purchase":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM0Juji","video,share,weibo":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM1JhTm","video,share,tencet":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM2JlDp","video,share,qzone":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM3Jqzt","video,share,douban":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM4Jrjd","video,share,renren":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM5JkTZ","video,share,wechat":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzQwJhMC","video,replay":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzQxJu8G","video,recreate":"http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzQyJqsJ"};$(".share").on("click",function(){var a=$(this),b=a.attr("share-platform"),c=a.attr("share-link"),d=a.attr("share-img"),e=a.attr("share-text");shareSNS(b,c,d,e)}),function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(b){this.$container=b,this.$avatarView=this.$container.find(".avatar-view"),this.$avatar=this.$avatarView.find("img"),this.$avatarModal=a("#avatar-modal"),this.$loading=a(".loading"),this.$avatarForm=this.$avatarModal.find(".avatar-form"),this.$avatarUpload=a(".avatar-upload"),this.$avatarSrc=this.$avatarUpload.find(".avatar-src"),this.$avatarData=this.$avatarUpload.find(".avatar-data"),this.$avatarInput=this.$avatarUpload.find(".avatar-input"),this.$avatarSave=this.$avatarForm.find(".avatar-save"),this.$avatarWrapper=this.$avatarModal.find(".avatar-wrapper"),this.init(),c.log(this)}var c=window.console||{log:a.noop};b.prototype={constructor:b,support:{fileList:!!a('<input type="file">').prop("files"),fileReader:!!window.FileReader,formData:!!window.FormData},init:function(){this.support.datauri=this.support.fileList&&this.support.fileReader,this.support.formData||this.initIframe(),this.addListener()},addListener:function(){this.$avatarInput.on("change",a.proxy(this.change,this)),this.$avatarForm.on("submit",a.proxy(this.submit,this))},initIframe:function(){var b="avatar-iframe-"+Math.random().toString().replace(".",""),c=a('<iframe name="'+b+'" style="display:none;"></iframe>'),d=!0,e=this;this.$iframe=c,this.$avatarForm.attr("target",b).after(c),this.$iframe.on("load",function(){var a,b,c;try{b=this.contentWindow,c=this.contentDocument,c=c?c:b.document,a=c?c.body.innerText:null}catch(f){}a?e.submitDone(a):d?d=!1:e.submitFail("Image upload failed!"),e.submitEnd()})},click:function(){this.$avatarModal.modal("show")},change:function(){a(".avatar-crop-overlay").fadeIn();var b,c;this.support.datauri?(b=this.$avatarInput.prop("files"),b.length>0&&(c=b[0],this.isImageFile(c)&&this.read(c))):(c=this.$avatarInput.val(),this.isImageFile(c)&&this.syncUpload())},submit:function(){return this.$avatarSrc.val()||this.$avatarInput.val()?this.support.formData?(this.ajaxUpload(),!1):void 0:!1},isImageFile:function(a){return a.type?/^image\/\w+$/.test(a.type):/\.(jpg|jpeg|png|gif)$/.test(a)},read:function(a){var b=this,c=new FileReader;c.readAsDataURL(a),c.onload=function(){b.url=this.result,b.startCropper()}},startCropper:function(){var b=this;this.active?this.$img.cropper("replace",this.url):(this.$img=a('<img src="'+this.url+'">'),this.$avatarWrapper.empty().html(this.$img),this.$img.cropper({done:function(a){var c=['{"x":'+a.x,'"y":'+a.y,'"height":'+a.height,'"width":'+a.width+"}"].join();b.$avatarData.val(c)},aspectRatio:500/260,autoCropArea:.8,multiple:!1,dragCrop:!1,dashed:!1,resizable:!1}),this.active=!0)},stopCropper:function(){this.active&&(this.$img.cropper("destroy"),this.$img.remove(),this.active=!1)},ajaxUpload:function(){var b=this.$avatarForm.attr("action"),c=new FormData(this.$avatarForm[0]),d=this;a.ajax(b,{type:"post",data:c,processData:!1,contentType:!1,beforeSend:function(){d.submitStart()},success:function(a){d.submitDone(a)},error:function(a,b,c){d.submitFail(b||c)},complete:function(){d.submitEnd()}})},syncUpload:function(){this.$avatarSave.click()},submitStart:function(){this.$loading.fadeIn()},submitDone:function(b){c.log(b);try{b=a.parseJSON(b)}catch(d){}b&&200===b.state?b.result?(this.url=b.result,this.support.datauri||this.uploaded?(this.uploaded=!1,this.cropDone()):(this.uploaded=!0,this.$avatarSrc.val(this.url),this.startCropper()),this.$avatarInput.val("")):b.message&&this.alert(b.message):this.alert("Failed to response")},submitFail:function(){a(".upload-failed").fadeIn()},submitEnd:function(){this.$loading.fadeOut()},cropDone:function(){this.$avatarSrc.val(""),this.$avatarData.val(""),this.$avatar.attr("src",this.url),this.stopCropper(),this.$avatarModal.modal("hide")},alert:function(a){var b=['<div class="alert alert-danger avater-alert">','<button type="button" class="close" data-dismiss="alert">&times;</button>',a,"</div>"].join("");this.$avatarUpload.after(b)}},a(function(){new b(a("#crop-avatar"))})}),$(function(){controlFlow()});var ugc_name,ugc_purpose,ugc_date,ugc_image_url;