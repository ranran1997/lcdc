function footer(fn){
  nodetpl.get('tpls/footer.tpl', {
    'set':setting()
  }, function(d){
    document.querySelector("#footer").innerHTML=d;
    showbar();
    fn();
  });
}