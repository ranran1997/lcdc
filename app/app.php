<?
  require_once('conn.php');
  $user=dbObject::table("users");
  $article=dbObject::table("articles");
  if(!isset($_GET["type"])) page::dely();
  $type=$_GET["type"];
  if(isset($_GET['callback'])){
    $jsonp=$_GET["callback"];
  }else{
    $jsonp="callback";
  }
  switch($type){
    //注册
    case 'reg':
      $username=$_GET["username"];
      $pwd=md5($_GET["password"]);
      $email=$_GET["email"];
      $random=$_GET['random'];
      require_once('./lib/class.phpmailer.php');
      $smtpserver = "smtp.longrise.com.cn"; //SMTP服务器，如：smtp.163.com 
      $smtpserverport = 25; //SMTP服务器端口，一般为25 
      $smtpusermail = "视觉资源库"; //SMTP服务器的用户邮箱，如xxx@163.com 
      $smtpuser = "liuyong@longrise.com.cn"; //SMTP服务器的用户帐号xxx@163.com 
      $smtppass = "20131016"; //SMTP服务器的用户密码 
      $smtp = new Smtp($smtpserver, $smtpserverport, true, $smtpuser, $smtppass); //实例化邮件类 
      $emailtype = "HTML"; //信件类型，文本:text；网页：HTML 
      $smtpemailto = $email; //接收邮件方，本例为注册用户的Email 
      $smtpemailfrom = $smtpusermail; //发送邮件方，如xxx@163.com 
      $emailsubject = "欢迎注册视觉资源库";//邮件标题 
      //邮件主体内容 
      $emailbody ='<div style="font-size:16px;color:#666;"><h2 style="font-size:20px;color:#E64C65;">恭喜您，成功注册本站会员！</h2><p>您的验证码是：<span style="color:#E64C65;margin:0 1em;">（'.$random.'）</span>请如实填写</p></div>'; 
      //发送邮件 
      $rs = $smtp->sendmail($smtpemailto, $smtpemailfrom, $emailsubject, $emailbody, $emailtype);
      $user->userName=$username;
      $user->password=$pwd;
      $user->email=$email;
      $user->customerId=$random;
      $id=$user->save();
      if($id){
        $result=array(
          'id'=>$id,
          'username'=>$username
        );
        echo $jsonp.'('.json_encode($result).')';
      }
    break;
    case 'checkUserName':
      //验证用户名是否已经被注册
      $username=$_GET["username"];
      $db->where("userName",$username);
      $stats=$db->getOne("users");
      $result=array(
        'id'=>$stats[id]
      );
      echo $jsonp.'('.json_encode($result).')';
    break;
    case 'checkEmail':
      //验证邮箱是否被注册
      $email=$_GET["email"];
      $db->where("email",$email);
      $stats=$db->getOne("users");
      $result=array(
        'id'=>$stats[id]
      );
      echo $jsonp.'('.json_encode($result).')';
    break;
    case 'login':
      //登录
      $username=$_GET["username"];
      $password=md5($_GET["password"]);
      $db->where("userName",$username);
      $db->where("password",$password);
      $stats=$db->getOne("users");
      $result=array(
        'id'=>$stats[id],
        'type'=>"login",
        'username'=>$username,
        "pwd"=>md5($password)
      );
      echo $jsonp.'('.json_encode($result).')';
    break;
    case 'activation':
      $username=$_GET['username'];
      $key=intval($_GET['key']);
      $db->where("userName",$username);
      $db->where('customerId',$key);
      $stats=$db->getOne("users");
      if($stats[id]>0){
        $data=Array(
          'active'=>1
        );
        if($db->update("users",$data)){
          $result=array(
            'check'=>'success',
            'username'=>$username,
            'key'=>$key
          );
        }
      }else{
        $result=array(
          'check'=>'error',
          'username'=>$username,
          'key'=>$key
        );
      }
      echo $jsonp.'('.json_encode($result).')';
    break;
    case 'publish_article':
      require_once('lib/markdown.class.php');
      $obj=new Markdown();
      $title=$_GET['title'];
      $content=$_GET['content'];
      $author=$_GET['author'];
      $catory=$_GET['catory'];
      $file='md/'.iconv('utf-8','gbk',$title).'-'.iconv('utf-8','gbk',$author).'.md';
      $fopen=fopen($file,'wb');
      fputs($fopen,$content);
      fclose($fopen);
      $article->title=$title;
      $article->url=$title.'-'.$author.'.md';
      $article->author=$author;
      $article->type=$catory;
      $article->content=$content;
      $id=$article->save();
      if($id){
        $result=array(
          'id'=>$id,
          'title'=>$title,
        );
        echo $jsonp.'('.json_encode($result).')';
      }
    break;
    case "get_article":
      $id=intval($_GET['id']);
      $db->where("id",$id);
      $stats=$db->getOne("articles");
      $result=array(
        'title'=>$stats[title],
        'url'=>$stats[url],
        'content'=>$stats[content],
        'author'=>$stats[author],
        'time'=>$stats[createdAt],
        'url'=>curPageURL()
      );
      echo $jsonp.'('.json_encode($result).')';
    break;
    case "article_list":
      $catory=$_GET['catory'];
      $page=1;
      $db->pageLimit=10;
      if($catory>0){
        $db->where("type",$catory);
      }
      $stats=$db->arraybuilder()->paginate("articles",$page);
      echo $jsonp.'('.json_encode($stats).')';
    break;
    case "upload":
      require('lib/UploadHandler.php');
      $upload_handler = new UploadHandler();
    break;
    case "deletefile":
      $file=$_GET['url'];
      if(unlink($file)){
        $result=array(
          'text'=>'right',
          'file'=>$file
        );
        echo $jsonp.'('.json_encode($result).')';
      }
    break;
  }
?>