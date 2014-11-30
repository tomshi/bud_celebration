<?php

/**
 * This is the model class for table "order".
 *
 * The followings are the available columns in table 'order':
 * @property integer $id
 * @property integer $order_user
 * @property string $order_user_open_id
 * @property string $pay_user_nick_name
 * @property string $name
 * @property string $tel
 * @property string $address
 * @property string $create_time
 * @property integer $is_enabled
 *
 * The followings are the available model relations:
 * @property User $orderUser
 * @property Payment[] $payments
 */
class Order extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Order the static model class
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
		return 'order';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('order_user, order_user_open_id, pay_user_nick_name, name, tel, address, create_time', 'required'),
			array('order_user, is_enabled', 'numerical', 'integerOnly'=>true),
			array('order_user_open_id, name, tel', 'length', 'max'=>45),
			array('pay_user_nick_name, address', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, order_user, order_user_open_id, pay_user_nick_name, name, tel, address, create_time, is_enabled', 'safe', 'on'=>'search'),
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
			'orderUser' => array(self::BELONGS_TO, 'User', 'order_user'),
			'payments' => array(self::HAS_MANY, 'Payment', 'order_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'order_user' => 'Order User',
			'order_user_open_id' => 'Order User Open',
			'pay_user_nick_name' => 'Pay User Nick Name',
			'name' => 'Name',
			'tel' => 'Tel',
			'address' => 'Address',
			'create_time' => 'Create Time',
			'is_enabled' => 'Is Enabled',
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
		$criteria->compare('order_user',$this->order_user);
		$criteria->compare('order_user_open_id',$this->order_user_open_id,true);
		$criteria->compare('pay_user_nick_name',$this->pay_user_nick_name,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('tel',$this->tel,true);
		$criteria->compare('address',$this->address,true);
		$criteria->compare('create_time',$this->create_time,true);
		$criteria->compare('is_enabled',$this->is_enabled);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	public function loadOrder($open_id)
	{
		$conditions = array('order_user_open_id'=>$open_id, 'is_enabled'=>1);
		$criteria = new CDbCriteria(array('order'=>'id ASC', 'limit'=>1));

		return self::model() -> findByAttributes($conditions, $criteria);
	}

}