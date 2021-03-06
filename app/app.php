<?
  header('Access-Control-Allow-Origin:*');
  require_once('conn.php');
  $user=dbObject::table("users");
  $article=dbObject::table("articles");
  $project=dbObject::table("projects");
  $ablum=dbObject::table("ablums");
  $photo=dbObject::table("photos");
  if(!isset($_GET["type"])) page::dely();
  $type=$_GET["type"];
  if(isset($_GET['callback'])){
    $jsonp=$_GET["callback"];
  }else{
    $jsonp="callback";
  }
  switch($type){
    //注册
    case 'register':
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
      $user->createdAt=date("Y-m-d h:i:s");
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
        'username'=>$username
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
        'file'=>$stats[url],
        'type'=>$stats[type],
        'author'=>$stats[author],
        'time'=>$stats[createdAt],
        'url'=>curPageURL()
      );
      echo $jsonp.'('.json_encode($result).')';
    break;
    case "article_list":
      $catory=$_GET['catory'];
      $page=$_GET['page'];
      $db->pageLimit=$_GET['pagesize'];
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
    case 'addProject':
      $catory=$_GET['catory'];
      $secret=$_GET['secret'];
      $img=$_GET['img'];
      $time=$_GET['time'];
      $title=$_GET['title'];
      $preview=$_GET['preview'];
      $github=$_GET['github'];
      $files=$_GET['files'];
      $upimg=$_GET['content'];
      $project->type=$catory;
      $project->content=$upimg;
      $project->secret=$secret;
      $project->img=$img;
      $project->createdAt=$time;
      $project->title=$title;
      $project->url=$preview;
      $project->github=$github;
      $project->file=$files;
      $id=$project->save();
      if($id){
        $result=array(
          'id'=>$id
        );
        echo $jsonp.'('.json_encode($result).')';
      }
    break;
    case 'get_project':
      $id=intval($_GET['id']);
      $db->where("id",$id);
      $stats=$db->getOne("projects");
      $result=array(
        'title'=>$stats[title],
        'url'=>$stats[url],
        'content'=>$stats[content],
        'type'=>$stats[type],
        'author'=>$stats[author],
        'time'=>$stats[createdAt],
        'secret'=>$stats[secret],
        'img'=>$stats[img],
        'file'=>$stats[file],
        'github'=>$stats[github],
        'view'=>$stats[view],
        'content'=>$stats[content]
      );
      echo $jsonp.'('.json_encode($result).')';
    break;
    case "project_list":
      $catory=$_GET['catory'];
      $page=$_GET['page'];
      $db->pageLimit=$_GET['pagesize'];
      if($catory>0){
        $db->where("type",$catory);
      }
      $stats=$db->arraybuilder()->paginate("projects",$page);
      echo $jsonp.'('.json_encode($stats).')';
    break;
    case "search":
      $text=$_GET["text"];
      $catory='lc_'.$_GET['catory'];
      $start=$_GET['start'];
      $type=$_GET['fenlei'];
      $pageSize=$_GET['pageSize'];
      if($type==0){
        $result=$db->rawQuery("SELECT * FROM ".$catory." where title LIKE '%".$text."%' LIMIT $start,$pageSize");
      }else{
        $result=$db->rawQuery("SELECT * FROM ".$catory." where type=$type and title LIKE '%".$text."%' LIMIT $start,$pageSize");
      }
      echo $jsonp.'('.json_encode($result).')';
    break;
    case 'get_ablums':
      $page=$_GET['page'];
      $db->pageLimit=$_GET['pagesize'];
      // if($catory>0){
      //   $db->where("secret",$secret);
      // }
      $stats=$db->arraybuilder()->paginate("ablums",$page);
      echo $jsonp.'('.json_encode($stats).')';
    break;
    case 'crop':
      $data=$_GET['img'];
      $user=$_GET['user'];
      $img=explode(',',$data);
      $url='crop/'.md5($user).date("Ymdhis").'.jpg';
      $file=file_put_contents($url,base64_decode($img[1]));
      if($file){
        $data=array(
          'face'=>$url
        );
        $db->where('userName',$user);
        if($db->update('users',$data)){
          $result=array(
            'url'=>$url,
            'content'=>$data
          );
          echo $jsonp.'('.json_encode($result).')';
        }
      }
    break;
    case 'get_user':
      $user=$_GET['name'];
      $db->where("userName",$user);
      $stats=$db->getOne("users");
      echo $jsonp.'('.json_encode($stats).')';
    break;
  }
?>