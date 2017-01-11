function page(){
  var files=[];
  var url=localUrl()+"?type=upload";
  var set={
    url:url
  }
  nodetpl.get('tpls/addProject.tpl', set, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="新增项目";
    $.getScript('libs/jquery.ui.widget.js');
    $.getScript('libs/jquery.iframe-transport.js');
    $.getScript('libs/croppic.min.js',function(){
      var cropperHeader = new Croppic('yourId',{
        uploadUrl:localUrl()+"?type=croppic",
        cropUrl:localUrl()+"?type=cropurl",
        baseUrl:service(),
        enableMousescroll:true,
				loaderHtml:'<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
				onBeforeImgUpload: function(){ console.log('onBeforeImgUpload') },
				onAfterImgUpload: function(){ console.log('onAfterImgUpload') },
				onImgDrag: function(){ console.log('onImgDrag') },
				onImgZoom: function(){ console.log('onImgZoom') },
				onBeforeImgCrop: function(){ console.log('onBeforeImgCrop') },
				onAfterImgCrop:function(){ console.log('onAfterImgCrop') },
				onReset:function(){ console.log('onReset') },
				onError:function(errormessage){ console.log('onError:'+errormessage) }
      });
    });
    $.getScript('libs/jquery.fileupload.js',function(){
      var count=0;
      $('#fileupload').fileupload({
        dataType: 'json',
        add:function(e,data){
          $(".uploaded").addClass("data")
          var type=data.files[0].name.split(".");
          type=type[type.length-1];
          $('<a href="'+data.files[0].url+'" class="file-list"><span class="iconfont icon-'+type+'"></span><span class="ib v-m">'+data.files[0].name+'</span><span class="t-r c-999">'+bytesToSize(data.files[0].size)+'</span></a>').appendTo($("#uploaded"))
          data.submit().success(function(result,textstatus,jqXHR){
            $("#uploaded").children("a").eq(count).addClass("finish");
            files.push(result.files[0].url);
            count++;
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
          console.log(files)
          // $.each(data.result.files,function(index,file){
          //   var type=file.name.split(".");
          //   type=type[type.length-1];
          //   $('<a href="'+file.url+'" class="file-list"><span class="iconfont icon-'+type+'"></span><span class="ib v-m">'+file.name+'</span><span class="t-r c-999">'+bytesToSize(file.size)+'</span></a>').appendTo($("#uploaded"))
          // })
        }
      });
    });
  });
}