<?
  require_once('conn.php');
  $user=dbObject::table("users");
  $user->userName="liuyong";
  $user->password=md5("122514");
  $id=$user->save();
  if($id){
    echo "user created with id = " . $id;
  }
?>