<?
  require_once('conn.php');
  $user=dbObject::table("users");
  $username=$_GET["username"];
  //验证用户名是否存在
  $jsonp=$_GET["callback"];
  $db->where("userName",$username);
  $stats=$db->getOne("users");
  $result=array(
    'id'=>$stats[id]
  );
  echo $jsonp.'('.json_encode($result).')';
?>