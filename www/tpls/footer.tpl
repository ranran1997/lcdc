<div class="mid-layout">
  <p class="t-c">2017 © swimly.cn MIT license</p>
  <p class="t-c mt-20"><a class="c-999 ml-20" href="#">打赏</a><a class="c-999 ml-20" href="#">合作联系</a><a class="c-999 ml-20" href="#">git仓库</a><a class="c-999 ml-20" href="#">微信公众号</a></p>
</div>
<?if(@list.length!=0){?>
  <div class="fixed-menu">
    <?for(var i=0;i<@list.length;i++){?>
      <a id="<?=i+1?>" href="#/<?=@type?>/type/<?=i?>" type="<?=@type?>"><?=@list[i]?></a>
    <?}?>
  </div>
<?}?>
<div class="page-done">
  <?for(var i=0;i<@set.length;i++){?>
    <a href="javascript:;" onclick="<?=@set[i].effect?>">
      <span class="iconfont <?=@set[i].icon?>"></span>
      <?if(i===1){?>
        <span class="code" id="qrcode"></span>
      <?}?>
    </a>
  <?}?>
</div>