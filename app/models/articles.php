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
class articles extends dbObject {
    protected $dbTable = "articles";
    protected $dbFields = Array (
        'title' => Array ('text', 'required'),
        'url' => Array ('text'),
        'type'=>Array('int'),
        'content'=>Array('text'),
        'author' => Array('text'),
        'status'=>Array('int'),
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