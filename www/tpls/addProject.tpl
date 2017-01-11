<link rel="stylesheet" href="css/croppic.css">
<div class="row h w content bg-white r-5 p-30">
  <div class="col v-t t-c pt-10 pb-10">
    <table class="form">
      <colgroup>
        <col width="10%"/>
        <col width="30%"/>
        <col width="10%"/>
        <col width="15%"/>
        <col width="5%"/>
        <col width="30%"/>
      </colgroup>
      <tr>
        <th>项目分类：</th>
        <td align="left">
          <div class="select w">
            <select name="type" id="">
              <option value="">web app</option>
              <option value="">native app</option>
              <option value="">门户网站</option>
              <option value="">系统</option>
            </select>
          </div>
        </td>
        <th>是否允许下载：</th>
        <td align="left" class="with-radio">
          <div class="form-wrap mr-10">
            <input type="radio" name="public" id="p1">
            <span class="iconfont icon-radio"></span>
            <label class="fs-14 pl-10" for="p1">是</label>
          </div>
          <div class="form-wrap">
            <input type="radio" name="public" id="p2">
            <span class="iconfont icon-radio"></span>
            <label class="fs-14 pl-10" for="p2">否</label>
          </div>
        </td>
        <th>封面：</th>
        <td rowspan="4" class="hidden">
          <div class="crop" id="yourId"></div>
          <p class="ib v-m fs-14 c-999 t-l lh-15 p-10">提示：项目封面图片为jpg、png、gif，限制尺寸为320*180，也可以上传之后进行裁剪！</p>
        </td>
      </tr>
      <tr>
        <th>创建时间：</th>
        <td colspan="3">
          <div class="input"><input type="number" name="catory" id="catory" placeholder="文章分类"/></div>
        </td>
      </tr>
      <tr>
        <th>项目名称：</th>
        <td colspan="3">
          <div class="input"><input type="number" name="catory" id="catory" placeholder="文章分类"/></div>
        </td>
      </tr>
      <tr>
        <th>预览地址：</th>
        <td colspan="3">
          <div class="input"><input type="number" name="catory" id="catory" placeholder="文章分类"/></div>
        </td>
      </tr>
      <tr>
        <th>github库：</th>
        <td colspan="3">
          <div class="input"><input type="number" name="catory" id="catory" placeholder="文章分类"/></div>
        </td>
      </tr>
      <tr>
        <th class="with-btn">上传附件：</th>
        <td colspan="3" class="t-l">
          <span class="btn btn-gray v-m">
            <input id="fileupload" type="file" name="files[]" data-url="<?=@url?>" multiple>
            <i class="iconfont icon-upload ib v-m"></i>
            <i class="ib v-m">上传</i>
          </span>
          <p class="ib v-m fs-14 c-999 ml-20">提示：为避免发生错误，附件名称请用英文！</p>
          <div class="uploaded">
            <div class="loading" id="progress"></div>
            <div class="row w notice">
              <div class="col v-m t-c">
                <span class="iconfont icon-fujian"></span>
                <p class="fs-14 c-999">您还没有上传任何文件！</p>
              </div>
            </div>
            <div id="uploaded"></div>
          </div>
        </td>
      </tr>
    </table>
    <a class="btn btn-pink btn-large" id="publish">添加</a>
  </div>
</div>