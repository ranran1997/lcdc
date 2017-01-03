<?
  error_reporting(0);
  require_once ("lib/MysqliDb.php");
  require_once ("lib/dbObject.php");
  $db = new Mysqlidb(Array(
    "host"=>"localhost",
    "username"=>"root",
    "password"=>"root",
    "db"=>"lcdc"
  ));
  $prefix = 'lc_';
  $db->setPrefix($prefix);
  dbObject::autoload ("models");
  // class page{
  //   public static function css(){
  //     echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"theme.css\" />";
  //   }
  //   public static function dely(){
  //     self::css();
  //     echo('<div class="row w h"><div class="col v-m t-c"><h1>非法进入</h1></div></div>');
  //   }
  // }
?>