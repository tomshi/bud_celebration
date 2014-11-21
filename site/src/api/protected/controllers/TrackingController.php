<?php

class TrackingController extends Controller
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
	
	public function actionSave()
	{
		header('Content-type: application/json');

		$source = $_POST["source"];
		$channel = $_POST["channel"];
		$user_id = "";
		$is_start = 1;

		$ip = $this -> get_client_ip();
		
		if (isset($_POST['user_id']))
		{
			$user_id = $_POST["user_id"];
		}

		if (isset($_POST['is_start']))
		{
			$is_start = $_POST['is_start'];
		}

		$trackingLog = new TrackingLog;
		$trackingLog -> user_id = $user_id;
		$trackingLog -> source = $source;
		$trackingLog -> channel = $channel;
		$trackingLog -> ip = $ip;
		$trackingLog -> is_start = $is_start;
		$trackingLog -> insert_date = date('Y-m-d H:i:s');

		$trackingLog -> save();

		$returnMessage = new ReturnMessage;
		$returnMessage -> code = "00";
		$returnMessage -> is_success = true;
		$returnMessage -> message = "";
		$returnMessage -> data = "";

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