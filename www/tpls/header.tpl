<div class="mid-layout h">
  <h1 class="logo"><?=@title?></h1>
  <ul class="block nav">
    <?for(var i=0; i<@menu.length; i++){?>
      <li class="ib"><a href="#<?=@menu[i].url?>"><?=@menu[i].text?></a></li>
    <?}?>
  </ul>
  <div class="search">
    <a href="javascript:;" class="btn iconfont icon-search"></a>
    <input type="search" placeholder="回车搜索">
    <div class="ball-clip-rotate-multiple ml-20">
      <div class="bg-white"></div>
      <div></div>
    </div>
  </div>
  <?if(typeof @user=="undefined"){?>
  <div class="block user">
    <a class="ib" href="#/register">注册</a>
    <a class="ib" href="#/login">登录</a>
  </div>
  <?}else{?>
  <div class="user-info">
    <a href="#/home"><span class="iconfont icon-nan v-m face"></span><?=@user?><span class="iconfont icon-down v-m"></span></a>
    <div class="sub-menu">
      <?for(var i=0; i<@submenu.length; i++){?>
        <a href="<?=@submenu[i].url?>"><span class="iconfont v-m mr-5 <?=@submenu[i].icon?>"></span><span class="v-m"><?=@submenu[i].text?></span></a>
      <?}?>
    </div>
  </div>
  <?}?>
</div>