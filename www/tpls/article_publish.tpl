<link rel="stylesheet" href="css/editormd.min.css">
<div class="mid-layout">
  <div class="row h w content bg-white r-5 p-30">
    <div class="col v-t t-c pt-10 pb-10">
      <div class="select w">
        <select name="type" id="type">
          <?for(var i=0;i<@catory.length;i++){?>
          <option value="<?=i+1?>"><?=@catory[i]?></option>
          <?}?>
        </select>
      </div>
      <div class="input mb-10"><input type="text" name="title" id="title" placeholder="文章标题"/></div>
      <div id="editormd">
      </div>
      <a class="btn btn-pink btn-large" id="save">保存</a>
      <a class="btn btn-pink btn-large" id="publish">发布</a>
    </div>
  </div>
</div>