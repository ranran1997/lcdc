function init(editor){
  $("#publish").click(function(){
    alert(editor.getMarkdown())
  })
}