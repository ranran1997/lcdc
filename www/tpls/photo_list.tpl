<div class="mid-layout">
  <div class="content row mid-layout success">
    <div class="col v-t t-l">
      <ul class="ablums">
        <?for(var i=0;i<@list.length;i++){?>
        <li>
          <a href=""><img src="<?=@list[i].img?>" alt=""><b><?=@list[i].title?></b></a>
        </li>
        <?}?>
      </ul>
    </div>
  </div>
</div>