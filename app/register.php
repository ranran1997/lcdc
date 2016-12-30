<?
  require_once('conn.php');
  $user=dbObject::table("users");
  if(!isset($_POST["type"])) page::dely();
  $type=$_POST["type"];
  //注册
  if($type=="reg"){
    $user->userName=$_POST["username"];
    $user->password=md5($_POST["password"]);
    $id=$user->save();
    if($id){
      echo $id;
    }
  }
  //验证用户名是否存在
  else if($type=="check"){
    $callback=$_GET["callback"]
    $user=$_POST["username"];
    $db->where("userName",$user);
    $stats=$db->getOne("users");
    echo(handler($stats['id']));
  }
?>