<?
  require_once('conn.php');
  $tables = Array (
      'users' => Array (
          'login' => 'char(10) not null',
          'active' => 'bool default 0',
          'customerId' => 'int(10) not null',
          'userName' => 'char(10) not null',
          'email' => 'text not null',
          'password' => 'text not null',
          'createdAt' => 'datetime',
          'updatedAt' => 'datetime',
          'expires' => 'datetime',
          'loginCount' => 'int(10) default 0'
      ),
      'articles' => Array (
          'title' => 'char(30) not null',
          'url' => 'char(50)',
          'type'=>'int(2)',
          'content'=>'text(3000)',
          'author'=>'char(10)',
          'status'=>'int(2)',
          'createdAt' => 'datetime',
          'updatedAt' => 'datetime',
          'secret'=>'int(2)'
      ),
      'projects' => Array (
          'title' => 'char(30) not null',
          'url' => 'char(50)',
          'type'=>'int(2)',
          'content'=>'text(300)',
          'author'=>'char(10)',
          'view'=>'int(5)',
          'github'=>'char(40)',
          'file'=>'text(500)',
          'img'=>'char(50)',
          'createdAt' => 'datetime',
          'updatedAt' => 'datetime',
          'secret'=>'int(2)'
      ),
      'ablums' => Array (
          'title' => 'char(30) not null',
          'type'=>'int(2)',
          'content'=>'text(300)',
          'author'=>'char(10)',
          'view'=>'int(5)',
          'img'=>'char(50)',
          'createdAt' => 'datetime',
          'updatedAt' => 'datetime',
          'secret'=>'int(2)'
      ),
      'photos' => Array (
          'title' => 'char(30) not null',
          'url' => 'char(50)',
          'type'=>'int(2)',
          'content'=>'text(300)',
          'author'=>'char(10)',
          'createdAt' => 'datetime',
          'secret'=>'int(2)'
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