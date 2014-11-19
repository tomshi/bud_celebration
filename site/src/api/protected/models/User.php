<?php

/**
 * This is the model class for table "user".
 *
 * The followings are the available columns in table 'user':
 * @property integer $id
 * @property string $name
 * @property string $purpose
 * @property string $date
 * @property string $picture
 * @property string $ip
 * @property integer $is_enabled
 * @property string $insert_date
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
			array('name, purpose, date, insert_date', 'required'),
			array('is_enabled', 'numerical', 'integerOnly'=>true),
			array('name, picture', 'length', 'max'=>45),
			array('purpose', 'length', 'max'=>16),
			array('date', 'length', 'max'=>5),
			array('ip', 'length', 'max'=>15),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, purpose, date, picture, ip, is_enabled, insert_date', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => 'Name',
			'purpose' => 'Purpose',
			'date' => 'Date',
			'picture' => 'Picture',
			'ip' => 'Ip',
			'is_enabled' => 'Is Enabled',
			'insert_date' => 'Insert Date',
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
		$criteria->compare('name',$this->name,true);
		$criteria->compare('purpose',$this->purpose,true);
		$criteria->compare('date',$this->date,true);
		$criteria->compare('picture',$this->picture,true);
		$criteria->compare('ip',$this->ip,true);
		$criteria->compare('is_enabled',$this->is_enabled);
		$criteria->compare('insert_date',$this->insert_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	public function loadUserById($id)
	{
		return self::model() -> findByPk($id);
	}
}