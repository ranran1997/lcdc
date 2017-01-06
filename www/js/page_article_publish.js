function init(editor){
  $("#publish").click(function(){
    var title=$('input[name=title]').val();
    var content=editor.getMarkdown();
    var sendData={
      type:"publish_article",
      title:title,
      content:content,
      author:'admin'
    }
    console.log(sendData)
    $.ajax({
      type:'get',
      url:localUrl(),
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(_this){
        $("#submit").addClass("loading")
      },
      success:function(data){
        console.log(data)
      },
    });
  })
}