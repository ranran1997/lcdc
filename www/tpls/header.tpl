<div class="mid-layout h">
  <h1 class="logo"><?=@title?></h1>
  <ul class="block">
    <?for(var i=0; i<@menu.length; i++){?>
      <li class="ib"><a href="#<?=@menu[i].url?>"><?=@menu[i].text?></a></li>
    <?}?>
  </ul>
  <div class="block user">
    <a class="ib" href="#/register">注册</a>
    <a class="ib" href="#/login">登录</a>
  </div>
</div>