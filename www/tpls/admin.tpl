<div class="page admin">
  <div class="header">
    <div class="row w">
      <div class="col v-m t-l">
        <h1 class="logo">深圳市发展和改革委员会综合办公平台</h1>
      </div>
      <div class="col v-m t-r">
        <a href="#/"><span class="iconfont"></span>返回首页</a>
        <a href="#"><span class="iconfont"></span>陈志文，欢迎您</a>
        <a href="#"><span class="iconfont"></span>修改密码</a>
        <a href="#"><span class="iconfont"></span>安全退出</a>
      </div>
    </div>
  </div>
  <div class="aside">
    <div class="scroll" id="menu">
      <ul class="menu">
        <?for(var i=0;i<@menu.length;i++){?>
          <li>
            <a class="row w" href="#"><span class="col v-m iconfont"></span><span class="col v-m"><?=@menu[i].text?></span></a>
            <?if(@menu[i].sub.length>0){?>
              <ul class="sub-menu">
                <?for(var j=0;j<@menu[i].sub.length;j++){?>
                  <li><a href="#"><?=@menu[i].sub[j].text?></a></li>
                <?}?>
              </ul>
            <?}?>
          </li>
        <?}?>
      </ul>
    </div>
  </div>
  <div class="content">
    <div class="scroll" id="view">
    </div>
  </div>
  </div>