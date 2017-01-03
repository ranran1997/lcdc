<?
  require_once('conn.php');
  $user=dbObject::table("users");
  if(!isset($_GET["type"])) page::dely();
  $type=$_GET["type"];
  //注册
  if($type=="reg"){
    $username=$_GET["username"];
    $pwd=md5($_GET["password"]);
    $email=$_GET["email"];
    $jsonp=$_GET["callback"];
    $user->userName=$username;
    $user->password=$pwd;
    $user->email=$email;
    $id=$user->save();
    if($id){
      $result=array(
        'id'=>$id
      );
      echo $jsonp.'('.json_encode($result).')';
    }
  }
  //验证用户名是否存在
  else if($type=="checkUserName"){
    //验证用户名是否存在
    $username=$_GET["username"];
    $jsonp=$_GET["callback"];
    $db->where("userName",$username);
    $stats=$db->getOne("users");
    $result=array(
      'id'=>$stats[id]
    );
    echo $jsonp.'('.json_encode($result).')';
  }
  else if($type=="checkEmail"){
    //验证邮箱是否存在
    $email=$_GET["email"];
    $jsonp=$_GET["callback"];
    $db->where("email",$email);
    $stats=$db->getOne("users");
    $result=array(
      'id'=>$stats[id]
    );
    echo $jsonp.'('.json_encode($result).')';
  }
  else if($type="login"){
    $username=$_GET["username"];
    $password=md5($_GET["password"]);
    $jsonp=$_GET["callback"];
    $db->where("userName",$username);
    $db->where("password",$password);
    $stats=$db->getOne("users");
    $result=array(
      'id'=>$stats[id],
      'username'=>$username,
      "pwd"=>md5($password)
    );
    echo $jsonp.'('.json_encode($result).')';
  }
?>