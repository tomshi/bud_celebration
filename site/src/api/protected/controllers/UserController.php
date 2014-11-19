<?php

class UserController extends Controller
{

	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	public function actionLoad($id)
	{
		$user = User::model() -> loadUserById($id);

		$userInfo = new UserInfo;
		$userInfo -> user_id = $user -> id;
		$userInfo -> name = $user -> name;
		$userInfo -> purpose = $user -> purpose;
		$userInfo -> date = $user -> date;
		$userInfo -> image_url = $user -> picture;

		$returnMessage = new ReturnMessage;
		$returnMessage -> code = "00";
		$returnMessage -> is_success = true;
		$returnMessage -> message = "";
		$returnMessage -> data = $userInfo;

		echo json_encode($returnMessage);

	}

	
	public function actionSave()
	{
		$name = $_POST["name"];
		$purpose = $_POST["purpose"];
		$date = $_POST["date"];
		$image = $_POST["image"];

		$ip = $this -> get_client_ip();

		$user = new User;
		$user -> name = $name;
		$user -> purpose = $purpose;
		$user -> date = $date;
		$user -> picture = $image;
		$user -> ip = $ip;
		$user -> is_enabled = 1;
		$user -> insert_date = date('Y-m-d H:i:s');

		$user -> save();

		$userInfo = new UserInfo;
		$userInfo -> user_id = $user -> id;
		$userInfo -> name = $user -> name;
		$userInfo -> purpose = $user -> purpose;
		$userInfo -> date = $user -> date;
		$userInfo -> image_url = $user -> picture;

		$returnMessage = new ReturnMessage;
		$returnMessage -> code = "00";
		$returnMessage -> is_success = true;
		$returnMessage -> message = "";
		$returnMessage -> data = $userInfo;

		echo json_encode($returnMessage);
	}



	private function get_client_ip() {
		$ipaddress = '';
		if (getenv('HTTP_CLIENT_IP'))
			$ipaddress = getenv('HTTP_CLIENT_IP');
		else if(getenv('HTTP_X_FORWARDED_FOR'))
			$ipaddress = getenv('HTTP_X_FORWARDED_FOR');
		else if(getenv('HTTP_X_FORWARDED'))
			$ipaddress = getenv('HTTP_X_FORWARDED');
		else if(getenv('HTTP_FORWARDED_FOR'))
			$ipaddress = getenv('HTTP_FORWARDED_FOR');
		else if(getenv('HTTP_FORWARDED'))
		   $ipaddress = getenv('HTTP_FORWARDED');
		else if(getenv('REMOTE_ADDR'))
			$ipaddress = getenv('REMOTE_ADDR');
		else
			$ipaddress = 'UNKNOWN';
		return $ipaddress;
	}

}