<?php

/**
 * This is the model class for table "user".
 *
 * The followings are the available columns in table 'user':
 * @property integer $id
 * @property string $open_id
 * @property string $nick_name
 * @property string $access_token
 * @property string $refesh_token
 * @property string $icon
 * @property string $sex
 * @property string $city
 * @property string $province
 * @property string $country
 * @property string $insert_date
 * @property string $update_date
 *
 * The followings are the available model relations:
 * @property Order[] $orders
 * @property Payment[] $payments
 */
class User extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return User the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'user';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('open_id, insert_date', 'required'),
			array('open_id, sex, city, province, country', 'length', 'max'=>45),
			array('nick_name', 'length', 'max'=>100),
			array('access_token, refesh_token, icon', 'length', 'max'=>250),
			array('update_date', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, open_id, nick_name, access_token, refesh_token, icon, sex, city, province, country, insert_date, update_date', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'orders' => array(self::HAS_MANY, 'Order', 'order_user'),
			'payments' => array(self::HAS_MANY, 'Payment', 'user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'open_id' => 'Open',
			'nick_name' => 'Nick Name',
			'access_token' => 'Access Token',
			'refesh_token' => 'Refesh Token',
			'icon' => 'Icon',
			'sex' => 'Sex',
			'city' => 'City',
			'province' => 'Province',
			'country' => 'Country',
			'insert_date' => 'Insert Date',
			'update_date' => 'Update Date',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('open_id',$this->open_id,true);
		$criteria->compare('nick_name',$this->nick_name,true);
		$criteria->compare('access_token',$this->access_token,true);
		$criteria->compare('refesh_token',$this->refesh_token,true);
		$criteria->compare('icon',$this->icon,true);
		$criteria->compare('sex',$this->sex,true);
		$criteria->compare('city',$this->city,true);
		$criteria->compare('province',$this->province,true);
		$criteria->compare('country',$this->country,true);
		$criteria->compare('insert_date',$this->insert_date,true);
		$criteria->compare('update_date',$this->update_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	public function loadUser($open_id)
	{
		$conditions = array('open_id'=>$open_id);
		$criteria = new CDbCriteria(array('order'=>'id ASC', 'limit'=>1));

		return self::model() -> findByAttributes($conditions, $criteria);
	}

}