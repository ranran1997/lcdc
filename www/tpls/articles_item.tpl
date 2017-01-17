<?for(var i=0;i<@list.length;i++){?>
<li class="item">
  <a class="title" href="#/articles/<?=@list[i].id?>"><?=@list[i].title?></a>
  <p class="info"><span class="mr-10">作者：<?=@list[i].author?></span><span class="mr-10">时间：<?=@list[i].createdAt?></span></p>
  <div id="editormd<?=@list[i].id?>" class="preview">
      <textarea style="display:none;"><?=@list[i].content.substr(0,240)?></textarea>
  </div>
  <p class="t-c mt-10">
    <a class="btn block" href="#/articles/<?=@list[i].id?>">查看更多</a>
  </p>
</li>
<?}?>
