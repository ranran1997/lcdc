<div class="row h w content bg-white">
  <div class="col v-t t-c">
    <ul class="project-list">
      <?for(var i=0;i<@list.length;i++){?>
      <li>
        <div class="item">
          <img class="w" src="<?=@list[i].img?>" alt="">
          <a href="#/projects/<?=@list[i].id?>" class="title"><?=@list[i].title?></a>
          <span class="row">
            <a href="<?=@list[i].github?>" class="col v-m iconfont icon-github t-l"><span class="fs-14">github</span></a>
            <a href="<?=@list[i].github?>" class="col v-m iconfont icon-yulan t-l"><span class="fs-14">预览</span></a>
          </span>
        </div>
      </li>
      <?}?>
    </ul>
  </div>
</div>