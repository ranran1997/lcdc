<?
  error_reporting (E_ALL|E_STRICT);
  require_once ("lib/MysqliDb.php");
  require_once ("lib/dbObject.php");
  $db = new Mysqlidb('localhost', 'root', 'root', 'lcdc');
  $prefix = 'lc_';
  $db->setPrefix($prefix);
  dbObject::autoload ("models");
?>