<?
  require_once('conn.php');
  $tables = Array (
      'users' => Array (
          'login' => 'char(10) not null',
          'active' => 'bool default 0',
          'customerId' => 'int(10) not null',
          'userName' => 'char(10) not null',
          'password' => 'text not null',
          'createdAt' => 'datetime',
          'updatedAt' => 'datetime',
          'expires' => 'datetime',
          'loginCount' => 'int(10) default 0'
      ),
      'products' => Array (
          'customerId' => 'int(10) not null',
          'userId' => 'int(10) not null',
          'productName' => 'char(50)'
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
  // rawQuery test
  foreach ($tables as $name => $fields) {
      $db->rawQuery("DROP TABLE " . $prefix . $name);
      createTable ($prefix . $name, $fields);
  }
?>