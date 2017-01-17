<?for(var i=0;i<@list.length;i++){?>
<li>
  <div class="item">
    <span class="img">
      <img class="w" src="<?=@list[i].img?>" alt="">
    </span>
    <a href="#/projects/<?=@list[i].id?>" class="title"><?=@list[i].title?></a>
    <table class="info">
      <colgroup>
        <col width="10%">
        <col width="60%">
        <col width="10%">
        <col width="20%">
      </colgroup>
      <tr>
        <th><span class="iconfont icon-fenlei"></span></th>
        <td colspan="2">：<?=projectType()[@list[i].type]?></td>
        <td>
          <a href="<?=@list[i].url?>">预览</a>
        </td>
      </tr>
      <tr>
        <th><span class="iconfont icon-github"></span></th>
        <td colspan="3">：<a href="<?=@list[i].github?>"><?=@list[i].github?></a></td>
      </tr>
      <tr>
      <tr>
        <th><span class="iconfont icon-riqi"></span></th>
        <td colspan="3">：<?=@list[i].createdAt?></td>
      </tr>
      <tr>
        <th><span class="iconfont icon-username"></span></th>
        <td>：<?=@list[i].author?></td>
        <th><span class="iconfont icon-yulan1"></span></th>
        <td>：<?=@list[i].view?></td>
      </tr>
    </table>
  </div>
</li>
<?}?>
