<?
  require_once('conn.php');
  $user=dbObject::table("users");
  //注册
  if(isset($_POST["username"]) && isset($_POST["password"])){
    $user->userName=$_POST["username"];
    $user->password=md5($_POST["password"]);
    $id=$user->save();
    if($id){
      echo $id;
    }
  }else{
    page::dely();
  }
?>