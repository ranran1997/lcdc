<?
  require_once('conn.php');
  $user=dbObject::table("users");
  $article=dbObject::table("articles");
  if(!isset($_GET["type"])) page::dely();
  $type=$_GET["type"];
  $jsonp=$_GET["callback"];
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
    case "croppic":
      $imagePath = "temp/";
      $allowedExts = array("gif", "jpeg", "jpg", "png", "GIF", "JPEG", "JPG", "PNG");
      $temp = explode(".", $_FILES["img"]["name"]);
      $extension = end($temp);
      if(!is_writable($imagePath)){
        $response = Array(
          "status" => 'error',
          "message" => 'Can`t upload File; no write Access'
        );
        print json_encode($response);
        return;
      }
      if ( in_array($extension, $allowedExts)){
        if ($_FILES["img"]["error"] > 0)
        {
          $response = array(
            "status" => 'error',
            "message" => 'ERROR Return Code: '. $_FILES["img"]["error"],
          );			
        }else{
          $filename = $_FILES["img"]["tmp_name"];
          list($width, $height) = getimagesize( $filename );
          move_uploaded_file($filename,  $imagePath . $_FILES["img"]["name"]);
          $response = array(
          "status" => 'success',
          "url" => $imagePath.$_FILES["img"]["name"],
          "width" => $width,
          "height" => $height
          );
        }
      }else{
        $response = array(
          "status" => 'error',
          "message" => 'something went wrong, most likely file is to large for upload. check upload_max_filesize, post_max_size and memory_limit in you php.ini',
        );
      }
      echo json_encode($response);
    break;
    case "cropurl":
      $imgUrl = $_POST['imgUrl'];
      // original sizes
      $imgInitW = $_POST['imgInitW'];
      $imgInitH = $_POST['imgInitH'];
      // resized sizes
      $imgW = $_POST['imgW'];
      $imgH = $_POST['imgH'];
      // offsets
      $imgY1 = $_POST['imgY1'];
      $imgX1 = $_POST['imgX1'];
      // crop box
      $cropW = $_POST['cropW'];
      $cropH = $_POST['cropH'];
      // rotation angle
      $angle = $_POST['rotation'];

      $jpeg_quality = 100;

      $output_filename = "temp/croppedImg_".rand();

      // uncomment line below to save the cropped image in the same location as the original image.
      //$output_filename = dirname($imgUrl). "/croppedImg_".rand();

      $what = getimagesize($imgUrl);

      switch(strtolower($what['mime'])){
        case 'image/png':
          $img_r = imagecreatefrompng($imgUrl);
          $source_image = imagecreatefrompng($imgUrl);
          $type = '.png';
            break;
        case 'image/jpeg':
          $img_r = imagecreatefromjpeg($imgUrl);
          $source_image = imagecreatefromjpeg($imgUrl);
          error_log("jpg");
          $type = '.jpeg';
            break;
        case 'image/gif':
          $img_r = imagecreatefromgif($imgUrl);
          $source_image = imagecreatefromgif($imgUrl);
          $type = '.gif';
            break;
        default: die('image type not supported');
      }
      //Check write Access to Directory
      if(!is_writable(dirname($output_filename))){
        $response = Array(
          "status" => 'error',
          "message" => 'Can`t write cropped File'
        );	
      }else{
        // resize the original image to size of editor
        $resizedImage = imagecreatetruecolor($imgW, $imgH);
        imagecopyresampled($resizedImage, $source_image, 0, 0, 0, 0, $imgW, $imgH, $imgInitW, $imgInitH);
        // rotate the rezized image
        $rotated_image = imagerotate($resizedImage, -$angle, 0);
        // find new width & height of rotated image
        $rotated_width = imagesx($rotated_image);
        $rotated_height = imagesy($rotated_image);
        // diff between rotated & original sizes
        $dx = $rotated_width - $imgW;
        $dy = $rotated_height - $imgH;
        // crop rotated image to fit into original rezized rectangle
        $cropped_rotated_image = imagecreatetruecolor($imgW, $imgH);
        imagecolortransparent($cropped_rotated_image, imagecolorallocate($cropped_rotated_image, 0, 0, 0));
        imagecopyresampled($cropped_rotated_image, $rotated_image, 0, 0, $dx / 2, $dy / 2, $imgW, $imgH, $imgW, $imgH);
        // crop image into selected area
        $final_image = imagecreatetruecolor($cropW, $cropH);
        imagecolortransparent($final_image, imagecolorallocate($final_image, 0, 0, 0));
        imagecopyresampled($final_image, $cropped_rotated_image, 0, 0, $imgX1, $imgY1, $cropW, $cropH, $cropW, $cropH);
        // finally output png image
        //imagepng($final_image, $output_filename.$type, $png_quality);
        imagejpeg($final_image, $output_filename.$type, $jpeg_quality);
        $response = Array(
          "status" => 'success',
          "url" => $output_filename.$type
        );
      }
        print json_encode($response);
    break;
  }
?>