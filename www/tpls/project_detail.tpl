<div class="row h w content p-30 bg-white r-5">
  <div class="col v-t t-c w-70 article">
    <div class="img">
      <img class="w" src="<?=@content?>" alt="">
    </div>
  </div>
  <div class="col v-t w-30 pl-10">
    <table class="project-info">
      <colgroup>
        <col width="25%">
        <col width="75%">
      </colgroup>
      <tr>
        <td colspan="2">
          <h2 class="fs-24 c-blue module-title">项目信息</h2>
        </td>
      </tr>
      <tr>
        <th>项目名称：</th>
        <td><?=@title?></td>
      </tr>
      <tr>
        <th>时间：</th>
        <td><?=@time?></td>
      </tr>
      <tr>
        <th>类型：</th>
        <td><?=projectType()[@type]?></td>
      </tr>
      <tr>
        <th>上传者：</th>
        <td><?=@author?></td>
      </tr>
      <tr>
        <th>浏览次数：</th>
        <td><?=@view?></td>
      </tr>
      <tr>
        <th class="with-circle">操作：</th>
        <td>
          <a href="<?=@github?>" title="github地址" class="iconfont icon-github circle bg-pink mr-10"></a>
          <a href="<?=@github?>" title="预览" class="iconfont icon-yulan circle bg-blue"></a>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <a href="" class="btn btn-blue btn-large w t-c">添加收藏</a>
        </td>
      </tr>
      <tr>
        <td class="with-bg" colspan="2">附件：</td>
      </tr>
      <tr>
        <td colspan="2">
          <?for(var i=0;i<@file.length;i++){?>
          <a class="row w" href="<?=@file[i].url?>"><span class="col v-m iconfont icon-<?=@file[i].type?>"></span><span class="col v-m"><?=@file[i].name?></span><span class="col v-m"><?=@file[i].size?></span></a>
          <?}?>
        </td>
      </tr>
    </table>
  </div>
</div>