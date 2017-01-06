<?
  error_reporting(0);
  header("Access-Control-Allow-Origin: *");
  require_once ("lib/MysqliDb.php");
  require_once ("lib/dbObject.php");
  $db = new Mysqlidb(Array(
    "host"=>"localhost",
    "username"=>"root",
    "password"=>"root",
    "db"=>"lcdc",
    "charset"=>"utf8"
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
  function curPageURL() 
{
    $pageURL = 'http';

    if ($_SERVER["HTTPS"] == "on") 
    {
        $pageURL .= "s";
    }
    $pageURL .= "://";

    if ($_SERVER["SERVER_PORT"] != "80") 
    {
        $pageURL .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
    } 
    else 
    {
        $pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
    }
    return $pageURL;
}
?>