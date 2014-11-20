<?php

class SiteController extends Controller
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
		//$model = new HomeModel;
		//$epg = new EPGDAO;
		//$package = new Package;

		//$model -> Packages = $package -> loadAllActivePackages();
		//$model -> ChannelList = $epg -> getAllChannels(); 
		
		$this->render('index');
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
	public function actionAuth()
	{
		$codeStr = $_GET["code"];
		$stateStr = $_GET["state"];
		//echo $codeStr . "<br />";
		//echo $stateStr;
		$data = $this -> httpGetData("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx02ba6a42b4867177&secret=ae271ac517a3e7a9480c912e1b62b4d6&code=" . $codeStr . "&grant_type=authorization_code");

		$accessObject = json_decode($data);

		$openId = $accessObject -> openid;
		$accessToken = $accessObject -> access_token;
		$refreshToken = $accessObject -> refresh_token;

		$user = $this -> httpGetData("https://api.weixin.qq.com/sns/userinfo?access_token=" . $accessToken . "&openid=" . $openId);

		$userObject = json_decode($user);
		
		$nickName = $userObject -> nickname;
		$sex = $userObject -> sex;
		$city = $userObject -> city;
		$province = $userObject -> province;
		$country = $userObject -> country;
		$icon = $userObject -> headimgurl;

		$user = User::model() -> loadUser($openId);
		if ($user == null)
		{
			$user = new User;
		}

		$user -> open_id = $openId;
		$user -> nick_name = $nickName;
		$user -> access_token = $accessToken;
		$user -> refesh_token = $refreshToken;
		$user -> icon = $icon;
		$user -> sex = $sex;
		$user -> city = $city;
		$user -> province = $province;
		$user -> country = $country;
		$user -> insert_date = date('Y-m-d H:i:s');
		$user -> update_date = date('Y-m-d H:i:s');

		$user -> save();

		//$this->render('auth');
		$this->redirect("http://www.eur-selected.com/vita/index.html?mid=" . $openId . "&id=" . $stateStr);
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