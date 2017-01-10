<div class="row h w content">
  <div class="col v-t t-l">
    <ul>
      <?for(var i=0;i<@list.length;i++){?>
      <li>
        <a href="#/articles/<?=@list[i].id?>"><?=@list[i].title?></a>
      </li>
      <?}?>
    </ul>
  </div>
</div>