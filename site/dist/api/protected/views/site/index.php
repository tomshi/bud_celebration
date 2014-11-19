<!DOCTYPE html>
<html>
<head lang="en">
  <meta http-equiv="X-UA-Compatible" content="IE=edge, requiresActiveX=true, chrome=1">
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">
  <title>LO STILE DI VITA 生活哲学</title>
    <script src="<?php echo Yii::app()->request->baseUrl; ?>script/jquery.js"></script>
  <script src="<?php echo Yii::app()->request->baseUrl; ?>script/URI.min.js"></script>
  <script src="<?php echo Yii::app()->request->baseUrl; ?>script/store.min.js"></script>

</head>
<body>
<script>
	$(function getWechatName() {
		var params = URI().search(true);
		var openId = params.id || "";
		var myOpenId = store.get("vita_open_id1");

		if (myOpenId)
		{
			window.location.href = 'http://www.eur-selected.com/vita/index.html?mid=' + myOpenId + '&id=' + openId;
		}
		else
		{
			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx02ba6a42b4867177&redirect_uri=http://www.eur-selected.com/site/auth&response_type=code&scope=snsapi_userinfo&state=" + openId + "#wechat_redirect";
		}

	});
</script>

</body>
</html>
