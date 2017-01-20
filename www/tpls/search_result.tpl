<div class="mid-layout p-r">
  <div class="row h w content bg-white p-20">
    <div class="col v-t t-l">
      <ul class="list">
        <?for(var i=0;i<@list.length;i++){?>
          <li><a href="#/<?=@catory?>/<?=@list[i].id?>"><?=@list[i].title?></a></li>
        <?}?>
      </ul>
      <div class="load-more" page="2" style="display:none;">
        <span class="v-m">点击加载更多</span>
        <div class="ball-clip-rotate-multiple ml-20">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</div>