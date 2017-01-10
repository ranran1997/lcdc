function page(id){
  var sendData={
    type:"article_list",
    catory:0
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
      nodetpl.get('tpls/articles.tpl', {
        'list':data
      }, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="文章";
        $.getScript('libs/epiceditor/js/epiceditor.min.js',function(){
          for(var i=0;i<data.length;i++){
            var options={
              container:"editormd"+(i+1),
              basePath:"./libs/epiceditor",
              parser: marked,
              file: {
                name: 'epiceditor',
                defaultContent: '## nihao',
                autoSave: 100
              },
              theme: {
                base: '/themes/base/epiceditor.css',
                preview: '/themes/preview/github.css',
                editor: '/themes/editor/epic-light.css'
              },
              button: {
                preview: true,
                fullscreen: true,
                bar: "hidden"
              },
              focusOnLoad: false,
              shortcut: {
                modifier: 18,
                fullscreen: 70,
                preview: 80
              },
              string: {
                togglePreview: 'Toggle Preview Mode',
                toggleEdit: 'Toggle Edit Mode',
                toggleFullscreen: 'Enter Fullscreen'
              },
              autogrow: true
            }
            var editor=new EpicEditor(options);
            editor.load();
            editor.preview();
          }
        })
      });
    }
  });
}