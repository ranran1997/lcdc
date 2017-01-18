function page(id){
  $("body").Bar({
    link:'projects',
    type:id,
    nav:projectType(),
    bar:setting()
  })
  $("body").Code();
  var page=1;
  var pageSize=8;
  var type=id;
  load(type,page,pageSize,function(){
    nodetpl.get('tpls/loading.tpl',null, function(d){
      document.title="加载中";
      document.querySelector("#view").innerHTML=d;
    });
  },function(data){
    $.each(data,function(index,item){
      item.img=service()+item.img;
    })
    if(data.length==0){
      nodetpl.get('tpls/null.tpl',null,function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="没有数据";
      })
      return false;
    }
    nodetpl.get('tpls/projects.tpl', {
      'list':data
    }, function(d){
      document.title="项目";
      document.querySelector("#view").innerHTML=d;
      var _this=$(".load-more")
      if(data.length<pageSize){
        _this.removeClass("loading").children("span").text("没有更多了")
      }else{
        _this.removeClass("loading").children("span").text("点击加载更多")
      }
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
  /*生成导航 */
  nodetpl.get('tpls/footer.tpl', {
    'type':'projects',
    'list':projectType(),
    'set':setting()
  }, function(d){
    document.querySelector("#footer").innerHTML=d;
    $(".fixed-menu").children("a").eq(type).addClass("active")
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
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown)
      }
    })
  }
}