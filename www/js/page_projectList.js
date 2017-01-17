function page(id){
  var page=1;
  var pageSize=12;
  var type=0;
  load(type,page,pageSize,function(){
    nodetpl.get('tpls/loading.tpl',null, function(d){
      document.title="加载中";
      document.querySelector("#view").innerHTML=d;
    });
  },function(data){
    $.each(data,function(index,item){
      item.img=service()+item.img;
    })
    nodetpl.get('tpls/projects.tpl', {
      'list':data
    }, function(d){
      document.title="项目";
      document.querySelector("#view").innerHTML=d;
      $(".load-more").click(function(){
        var _this=$(this);
        var page=parseInt(_this.attr("page"))
        if(_this.children("span").text()=="没有更多了"){
           return false;
        }else{
          load(type,page,pageSize,function(){
            _this.addClass("loading").children("span").text("加载中");
            _this.attr("page",parseInt(_this.attr("page"))+1)
          },function(data){
            $.each(data,function(index,item){
              item.img=service()+item.img;
            })
            nodetpl.get('tpls/projects_item.tpl', {
              'list':data
            }, function(d){
              $(d).appendTo(".project-list")
            })
            if(data.length<pageSize){
              _this.removeClass("loading").children("span").text("没有更多了")
            }else{
              _this.removeClass("loading").children("span").text("点击加载更多")
            }
          });
        }
      })
    });
  });
  function load(catory,page,pagesize,before,callback){
    var sendData={
      type:"project_list",
      catory:catory,
      page:page,
      pagesize:pagesize
    }
    $.ajax({
      type:'get',
      url:localUrl(),
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(_this){
        before();
      },
      success:function(data){
        callback(data);
      }
    })
  }
}