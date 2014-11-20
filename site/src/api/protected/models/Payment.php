<?php

/**
 * This is the model class for table "payment".
 *
 * The followings are the available columns in table 'payment':
 * @property integer $id
 * @property integer $order_id
 * @property integer $user_id
 * @property string $open_id
 * @property string $pay_time
 * @property string $transaction_id
 * @property integer $flag
 * @property integer $is_mr_right
 * @property string $update_date
 *
 * The followings are the available model relations:
 * @property Order $order
 * @property User $user
 */
class Payment extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Payment the static model class
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
		return 'payment';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('order_id, user_id, open_id, pay_time, transaction_id, update_date', 'required'),
			array('order_id, user_id, flag, is_mr_right', 'numerical', 'integerOnly'=>true),
			array('open_id', 'length', 'max'=>45),
			array('transaction_id', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, order_id, user_id, open_id, pay_time, transaction_id, flag, is_mr_right, update_date', 'safe', 'on'=>'search'),
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
			'order' => array(self::BELONGS_TO, 'Order', 'order_id'),
			'user' => array(self::BELONGS_TO, 'User', 'user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'order_id' => 'Order',
			'user_id' => 'User',
			'open_id' => 'Open',
			'pay_time' => 'Pay Time',
			'transaction_id' => 'Transaction',
			'flag' => 'Flag',
			'is_mr_right' => 'Is Mr Right',
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
		$criteria->compare('order_id',$this->order_id);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('open_id',$this->open_id,true);
		$criteria->compare('pay_time',$this->pay_time,true);
		$criteria->compare('transaction_id',$this->transaction_id,true);
		$criteria->compare('flag',$this->flag);
		$criteria->compare('is_mr_right',$this->is_mr_right);
		$criteria->compare('update_date',$this->update_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	public function loadPayment($open_id, $order_id)
	{
		$conditions = array('open_id'=>$open_id, 'order_id'=>$order_id);
		$criteria = new CDbCriteria(array('order'=>'id ASC', 'limit'=>1));

		return self::model() -> findByAttributes($conditions, $criteria);
	}

	public function loadAllPaymentByUser($open_id)
	{
		$conditions = array('open_id'=>$open_id);
		$criteria = new CDbCriteria(array('order'=>'id ASC'));

		return self::model() -> findAllByAttributes($conditions, $criteria);
	}

	public function loadAllPaymentByOrder($order_id)
	{
		$conditions = array('order_id'=>$order_id);
		$criteria = new CDbCriteria(array('order'=>'id ASC'));

		return self::model() -> findAllByAttributes($conditions, $criteria);
	}
}