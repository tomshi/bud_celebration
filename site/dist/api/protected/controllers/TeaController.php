<?php

class TeaController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		$wechatId = "";
		if (isset($_GET["userId"]))
		{
			$wechatId = $_GET['userId'];
		}

		$isOwner = "";
		if (isset($_GET["isOwner"]))
		{
			$isOwner = $_GET['isOwner'];
		}
		
		$this->render('index', array('wechatId' => $wechatId, 'isOwner' => $isOwner));
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionStep2()
	{
		$this->render('step2');
	}

	/**
	 * Displays the contact page
	 */
	public function actionStep3()
	{
		$productId = $_GET['key'];
		$productName = $_GET['name'];
		$questions = json_decode($this -> GetQuestion($productId), true);
		
		$this->render('step3', array('questions'=>$questions['questions'], 'deviceKey' => $productId, 'deviceName' => $productName));
	}

	public function actionStep4()
	{
		$productId = $_GET['key'];
		$answer = $_GET['answer'];
		$device = $_GET['name'];
		$price = json_decode($this -> GetPrice($productId, $answer), true);
		
		$this->render('step4', array('price'=>$price['price'], 'device' => $device));
	}

	public function actionSuccess()
	{		
		$teaDate = date('Y-m-d');
		
			$successUsers = User::model() -> loadAllSuccessUsers($teaDate);
			$allUsers = User::model() -> loadAllUsers($teaDate);
			$allTables = TeaTable::model() -> loadAllTables($teaDate);

			$this->render('success', array('successUsers' => $successUsers, 'allUsers' => $allUsers, 'allTables' => $allTables, 'teaDate' => $teaDate));
		
	}

	public function actionClear()
	{
		User::model() -> deleteFailedUsers();
		TeaTable::model() -> deleteFailedTables();

		echo "Remove all failed users successfully!";
	}

	private function GetQuestion($productId)
	{
		$url = "http://42.121.116.46:12345/question/id_product/" . $productId;

		return $this -> httpGetData($url);
	}

	private function GetPrice($productId, $questionAnswer)
	{
		$data = 'id_product=' . $productId . '&answer=' . $questionAnswer;


		$url = "http://42.121.116.46:12345/inquiry";

		return $this -> httpPostData($url, $data);
	}

	private function httpGetData($url)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($ch);

		if (curl_errno($ch)) 
		{
			   return 'Errno'.curl_error($ch);
		}

		curl_close($ch);

		return $result;
	}

	private function httpPostData($url, $data)
	{
		$curl = curl_init();
			curl_setopt($curl, CURLOPT_URL, $url); 
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			$result = curl_exec($curl);
			if (curl_errno($curl)) {
			   return 'Errno'.curl_error($curl);
			}
			curl_close($curl);

			return $result;
	}
}