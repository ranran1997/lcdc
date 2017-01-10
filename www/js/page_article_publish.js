function init(editor){
  $.getScript('libs/jquery.cookie.js');
  $("#publish").click(function(){
    var title=$('input[name=title]').val();
    var catory=$('input[name=catory]').val();
    var content=editor.getMarkdown();
    var sendData={
      type:"publish_article",
      catory:catory,
      title:title,
      content:content,
      author:$.cookie("logined")
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
        window.location.href="#/articles/"+data.id
      },
    });
  })
}