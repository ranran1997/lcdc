function page(){
  var files=[];
  var url=localUrl()+"?type=upload";
  var croppedImg=null;
  var upimg=null;
  var set={
    url:url
  }
  function deleteyt(){
    var sendData={
      type:"deletefile",
      url:upimg
    }
    $.ajax({
      type:'get',
        url:localUrl(),
        data:sendData,
        dataType:"jsonp",
        jsonp:"callback",
        beforeSend:function(_this){
          
        },
        success:function(data){
          console.log(data)
        }
    });
  }
  function deleteCrop(){
    var sendData={
      type:"deletefile",
      url:croppedImg
    }
    $.ajax({
      type:'get',
        url:localUrl(),
        data:sendData,
        dataType:"jsonp",
        jsonp:"callback",
        beforeSend:function(_this){
          
        },
        success:function(data){
          console.log(data)
        }
    });
  }
  nodetpl.get('tpls/addProject.tpl', set, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="新增项目";
    /*封面裁剪 */
    $.getScript('libs/jquery.ui.widget.js');
    $.getScript('libs/jquery.iframe-transport.js');
    $.getScript('libs/croppic.min.js',function(){
      var cropperHeader = new Croppic('yourId',{
        uploadUrl:"http://192.168.4.151/LCDC/app/img_save_to_file.php",
        cropUrl:"http://192.168.4.151/LCDC/app/img_crop_to_file.php",
        baseUrl:"http://192.168.4.151/LCDC/app/",
        imgEyecandy:true,
        imgEyecandyOpacity:0.2,
        enableMousescroll:false,
				loaderHtml:'<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
        onReset:function(){
          deleteyt();
        },
        onAfterImgUpload:function(data){
          upimg=data;
        },
        onAfterImgCrop:function(data){
          croppedImg=data.url;
          deleteyt();
        },
        onAfterRemoveCroppedImg:function(){
          deleteCrop();
        }
      });
    });
    /*附件上传 */
    $.getScript('libs/jquery.fileupload.js',function(){
      $('#fileupload').fileupload({
        dataType: 'json',
        add:function(e,data){
          $(".uploaded").addClass("data")
          var type=data.files[0].name.split(".");
          type=type[type.length-1];
          $('<a href="'+data.files[0].url+'" class="file-list" id="'+data.files[0].size+'"><span class="iconfont icon-'+type+'"></span><span class="ib v-m">'+data.files[0].name+'</span><span class="t-r c-999">'+bytesToSize(data.files[0].size)+'</span><span class="iconfont icon-wrong t-r"></span></a>').appendTo($("#uploaded"))
          data.submit().success(function(result,textstatus,jqXHR){
            alert(0)
            console.log($('#'+result.files[0].size))
            $('#'+result.files[0].size).addClass("finish").attr("url",result.files[0].name)

            files.push(result.files[0].name);
          });
        },
        progressall:function(e,data){
          var progress = parseInt(data.loaded / data.total * 100, 10);
          if(progress==100){
            //$("#progress").parents(".btn").attr("percent","已完成")
          }else{
            $("#progress").attr("percent",progress+"%")
          }
          $("#progress").css('width',progress+"%");
        },
        done: function (e, data) {
          //console.log(files)
          //删除
          $(".file-list").children(".icon-wrong").click(function(){
            var _this=$(this);
            var sendData={
              type:"deletefile",
              url:"files/"+$(this).parents("a").attr("url")
            }
            $.ajax({
              type:'get',
              url:localUrl(),
              data:sendData,
              dataType:"jsonp",
              jsonp:"callback",
              beforeSend:function(_this){
                
              },
              success:function(data){
                if(data.text=="right"){
                  _this.parents("a").remove();
                  removeByValue(files,_this.parents("a").attr("url"))
                }
                console.log(files)
                if($("#uploaded").children().length==0){
                  $(".uploaded").removeClass("data");
                  $("#progress").attr("percent","0%").css("width",0);
                }
              }
            })
            return false;
          })
        }
      });
    });
  });
}