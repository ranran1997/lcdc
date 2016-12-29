<?
  error_reporting (E_ALL|E_STRICT);
  require_once ("lib/MysqliDb.php");
  require_once ("lib/dbObject.php");
  $db = new Mysqlidb('localhost', 'root', 'root', 'lcdc');
  $prefix = 'lc_';
  $db->setPrefix($prefix);
  dbObject::autoload ("models");
  $tables = Array (
      'users' => Array (
          'active' => 'bool default 0',
          'customerId' => 'int(10) not null',
          'name' => 'char(10) not null',
          'password' => 'text not null',
          'createdAt' => 'datetime',
          'updatedAt' => 'datetime',
          'expires' => 'datetime',
          'loginCount' => 'int(10) default 0'
      )
  );
  function createTable ($name, $data) {
      global $db;
      //$q = "CREATE TABLE $name (id INT(9) UNSIGNED PRIMARY KEY NOT NULL";
      $q = "CREATE TABLE $name (id INT(9) UNSIGNED PRIMARY KEY AUTO_INCREMENT";
      foreach ($data as $k => $v) {
          $q .= ", $k $v";
      }
      $q .= ")";
      $db->rawQuery($q);
  }
  foreach ($tables as $name => $fields) {
      $db->rawQuery("DROP TABLE " . $prefix . $name);
      createTable ($prefix . $name, $fields);
  }
?>