<link rel="stylesheet" href="css/editormd.preview.min.css">
<div class="mid-layout">
  <div class="row h w content p-30 bg-white r-5">
    <div class="col v-t t-c w-60 article">
      <h1 class="title"><?=@title?></h1>
      <p class="t-r info"><span>作者：<?=@author?></span><span>发布时间：<?=@time?></span></p>
      <div id="editormd">
          <textarea style="display:none;"><?=@content?></textarea>
      </div>
    </div>
  </div>
</div>