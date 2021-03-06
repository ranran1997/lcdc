<?php
/**
 * To make IDEs autocomplete happy
 *
 * @property int id
 * @property string login
 * @property bool active
 * @property string customerId
 * @property string firstName
 * @property string lastName
 * @property string password
 * @property string createdAt
 * @property string updatedAt
 * @property string expires
 * @property int loginCount
 */
class albums extends dbObject {
    protected $dbTable = "albums";
    protected $dbFields = Array (
        'title' => Array ('text', 'required'),
        'type'=>Array('int'),
        'content'=>Array('text'),
        'author' => Array('text'),
        'view'=>Array('int'),
        'img'=>Array('text'),
        'createdAt' => Array ('datetime'),
        'updatedAt' => Array ('datetime'),
        'secret' => Array ('int')
    );
    protected $timestamps = Array ('createdAt', 'updatedAt');
    protected $relations = Array (
        'products' => Array ("hasMany", "product", 'userid')
    );
}
?>