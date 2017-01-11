function page(){
  nodetpl.get('tpls/addProject.tpl', null, function(d){
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
      $('#fileupload').fileupload({
        dataType: 'json',
        add:function(e,data){
          data.context = $('<p/>').text('Uploading...').appendTo(document.body);
          data.submit();
        },
        progressall:function(e,data){
          var progress = parseInt(data.loaded / data.total * 100, 10);
          $("#progress .bar").attr("percent",progress+"%")
          $("#progress .bar").css('width',progress+"%");
        },
        done: function (e, data) {
          console.log(data)
          // $.each(data.result.files, function (index, file) {
          //     $('<p/>').text(file.name).appendTo(document.body);
          // });
        }
      });
    });
  });
}