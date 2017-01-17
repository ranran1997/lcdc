<link rel="stylesheet" href="css/editormd.preview.min.css">
<div class="mid-layout">
  <div class="row h w content">
    <div class="col v-t t-l">
      <ul class="list">
        <?for(var i=0;i<@list.length;i++){?>
        <li class="item">
          <a class="title" href="#/articles/<?=@list[i].id?>"><?=@list[i].title?></a>
          <p class="info"><span class="mr-10">作者：<?=@list[i].author?></span><span class="mr-10">时间：<?=@list[i].createdAt?></span><span class="mr-10">时间：<?=articleType()[@list[i].type]?></span></p>
          <div id="editormd<?=@list[i].id?>" class="preview">
              <textarea style="display:none;"><?=@list[i].content.substr(0,240)?></textarea>
          </div>
        </li>
        <?}?>
      </ul>
      <div class="load-more" page="2">
        <span class="v-m">点击加载更多</span>
        <div class="ball-clip-rotate-multiple ml-20">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</div>