function page(){
  $("body").Bar({
    bar:setting()
  })
  $("body").Code()
  var files=[];
  var url=localUrl()+"?type=upload";
  var croppedImg=null;
  var upimg=null;
  var set={
    url:url,
    catory:projectType()
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
  function submit(){
    var sendData={
      type:"addProject",
      catory:$("#type option:selected").val(),
      secret:$("input[name=secret]:checked").val(),
      time:$("#time").val(),
      title:$("#title").val(),
      preview:$("#preview").val(),
      github:$("#github").val(),
      files:JSON.stringify(files),
      content:service()+upimg,
      img:croppedImg
    }
    $.ajax({
      type:'get',
      url:localUrl(),
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(_this){
        console.log(sendData,upimg)
      },
      success:function(data){
        if(data.id>0){
          window.location.href="#/projects/"+data.id;
        }
      },
      error:function(a,b,c){
        console.log(a,b,c)
      }
    })
  }
  nodetpl.get('tpls/addProject.tpl', set, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="新增项目";
    $("#publish").click(function(){
      submit();
    })
    $("#repository").blur(function(){
      $("#github").val("https://github.com/longrise/"+$(this).val())
      $("#preview").val("https://www.web.swimly.cn/"+$(this).val())
    })
    /*添加日期控件 */
    $.getScript("libs/flatpickr.min.js",function(){
      $("#time").flatpickr();
    })
    /*封面裁剪 */
    $.getScript('libs/jquery.ui.widget.js');
    $.getScript('libs/jquery.iframe-transport.js');
    $.getScript('libs/croppic.min.js',function(){
      var cropperHeader = new Croppic('yourId',{
        uploadUrl:service()+"img_save_to_file.php",
        cropUrl:service()+"img_crop_to_file.php",
        baseUrl:service(),
        imgEyecandy:true,
        imgEyecandyOpacity:0.2,
        enableMousescroll:false,
				loaderHtml:'<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
        onReset:function(){
          //deleteyt();
        },
        onAfterImgUpload:function(data){
          upimg=data;
        },
        onAfterImgCrop:function(data){
          croppedImg=data.url;
          //deleteyt();
        },
        onAfterRemoveCroppedImg:function(){
          deleteCrop();
        }
      });
    });

    /*文件上传 */
    $.getScript('libs/jquery.ui.widget.js');
    $.getScript('libs/load-image.all.min.js');
    $.getScript('libs/canvas-to-blob.min.js');
    $.getScript('libs/jquery.iframe-transport.js');
    $.getScript('libs/jquery.fileupload.js',function(){
      $.getScript('libs/jquery.fileupload-process.js');
      $.getScript('libs/jquery.fileupload-image.js');
      $.getScript('libs/jquery.fileupload-audio.js');
      $.getScript('libs/jquery.fileupload-video.js');
      $.getScript('libs/jquery.fileupload-validate.js');
      var file=$("#fileupload").fileupload({
        dataType:'json',
        autoUpload:true
      })
      file.on('fileuploadadd',function(e,data){
        $(".uploaded").addClass("data")
        $.each(data.files,function(index,file){
          var type=file.name.split(".");
          type=type[type.length-1];
          $('<a href="javascript:;" class="file-list" id="'+file.size+'"><span class="iconfont icon-'+type+'"></span><span class="ib v-m">'+file.name+'</span><span class="t-r c-999">'+bytesToSize(file.size)+'</span><span class="iconfont icon-wrong t-r"></span></a>').appendTo($("#uploaded"))
        })
        var up=data.submit();
        up.always(function(e,data){
          console.log(e)
          $.each(e.files,function(index,file){
            $("#"+file.size).addClass("finish").attr("url",file.name);
            files.push({'name':file.name,'size':bytesToSize(file.size)});
          })
        })
      })
      file.on('fileuploadalways',function(e,data){
        
      })
      file.on('fileuploadprocessalways',function(e,data){
        var index=data.index;
        var file=data.files[index];
        console.log(index,file)
      })
      file.on('fileuploadprogressall',function(e,data){
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $("#progress").css('width',progress+"%");
        $("#progress").attr('loading',progress+"%");
      })
      file.on('fileuploaddone',function(e,data){
        
      })
      file.on('fileuploadfail',function(e,data){
        //console.log(data)
      })
    });
    /*删除文件 */
    $(".uploaded").delegate(".icon-wrong","click",function(){
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
          console.log(sendData)
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
        },
        error:function(status){
          console.log(status)
        }
      })
      return false;
    })
  })
}