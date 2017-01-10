<div class="mid-layout h">
  <h1 class="logo"><?=@title?></h1>
  <ul class="block">
    <?for(var i=0; i<@menu.length; i++){?>
      <li class="ib"><a href="#<?=@menu[i].url?>"><?=@menu[i].text?></a></li>
    <?}?>
  </ul>
  <?if(@user.length==0){?>
  <div class="block user">
    <a class="ib" href="#/register">注册</a>
    <a class="ib" href="#/login">登录</a>
  </div>
  <?}else{?>
  <div class="user-info">
    <a href="#/home"><?=@user?></a>
    <div class="sub-menu">
      <?for(var i=0; i<@submenu.length; i++){?>
        <a href="<?=@submenu[i].url?>"><span class="iconfont v-m mr-5 <?=@submenu[i].icon?>"></span><span class="v-m"><?=@submenu[i].text?></span></a>
      <?}?>
    </div>
  </div>
  <?}?>
</div>