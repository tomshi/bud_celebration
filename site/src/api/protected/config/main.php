<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Budweiser Quality',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'ext.yii-mail.YiiMailMessage'
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'atop',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
		
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
		'urlManager'=>array(
			'urlFormat'=>'path',
			'showScriptName'=>false,
			'caseSensitive'=>false,
			'rules'=>array(
				'gii/default/login' => 'gii/default/login',
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',				
				'<controller:\w+>/<action:\w+>/<id:\d+>(/<id1:\d+>)?(/<id2:\d+>)?(/<id3:\d+>)?'=>'<controller>/<action>',				
				//'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>/<code:[\w\@\-\.]+>(/<code1:[\w\@\-]+>)?'=>'<controller>/<action>',
				//'<controller:\w+>/<action:\w+>/<code:\w+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>'
			),
		),
		// uncomment the following to enable URLs in path-format
		/*
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		

		'urlManager'=>array(
			 'urlFormat'=>'path',
			 'showScriptName'=>false,
			 'rules'=>array(
			   '<action>'=>'site/<action>',
			   '<controller:\w+>/<id:\d+>' => '<controller>/view',
			   '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
			   '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
			 ),
		),

		'urlManager'=>array(
		   'urlFormat'=>'path',
		   'showScriptName'=>false
		  ),*/

		/*
		'db'=>array(
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		),
		*/
		// uncomment the following to use a MySQL database

		/*'db'=>array(
			'connectionString' => 'mysql:host=esltalents.db.11047836.hostedresource.com;dbname=esltalents',
			'emulatePrepare' => true,
			'username' => 'esltalents',
			'password' => 'Esl#2013',
			'charset' => 'utf8',
		),*/
		
		'db'=>array(
			'connectionString' => 'mysql:host=bud1.cgazwpuiaidw.ap-northeast-1.rds.amazonaws.com;dbname=bud1',
			'emulatePrepare' => true,
			'enableProfiling'=>true,
			'enableParamLogging'=>true,
			'username' => 'bud1',
			'password' => '123qweasd',
			'charset' => 'utf8',
		),

		'mail' => array(
			'class' => 'ext.yii-mail.YiiMail',
			'transportType' => 'smtp',
			'transportOptions' => array(
				'host' => 'smtp.gmail.com',
				'username' => '',
				'password' => '',
				'port' => '465',
				'encryption'=>'sslv3',
			),
			'viewPath' => 'application.views.mail',
			'logging' => true,
			'dryRun' => false
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		/*'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
					'logFile'=>'error.log',
				),
				array(
					'class'=>'CFileLogRoute',
					'categories'=>'system.db.*',
					'logFile'=>'sql.log',
				),
				array(
				'class'=>'CProfileLogRoute',
				'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				
				array(
					'class'=>'CWebLogRoute',
				),
				
			),
		),*/
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
);