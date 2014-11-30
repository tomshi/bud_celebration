<?php
	//require 'aws-autoloader.php';

	//use Aws\Common\Aws;
	//use Aws\S3\S3Client;

	
	require_once('saestorage.class.php');

    class CropAvatar {
        private $src;
		private $srcFile;
        private $data;
        private $file;
        private $dst;
		private $dstFile;
        private $type;
        private $extension;
        private $srcDir = 'img/upload';
        private $dstDir = 'img/avatar';
        private $msg;
		private $state;

        function __construct($src, $data, $file) {
			$pos = strrpos($src, "http://");
			if ($pos !== false)
			{
				$src = $this -> srcDir . "/" . pathinfo($src, PATHINFO_BASENAME);
			}
            $this -> setSrc($src);
            $this -> setData($data);
            $this -> setFile($file);
            $this -> crop($this -> src, $this -> dst, $this -> data);
        }

        private function setSrc($src) {
            if (!empty($src)) {
                $type = exif_imagetype($src);

                if ($type) {
                    $this -> src = $src;
					//$this -> srcFile = $srcFile;
                    $this -> type = $type;
                    $this -> extension = image_type_to_extension($type);
                    $this -> setDst();
					$this -> msg = "Save file successfully";
					$this -> state = 200;
                }
            }
        }

        private function setData($data) {
            if (!empty($data)) {
                $this -> data = json_decode(stripslashes($data));
            }
        }

        private function setFile($file) {
            $errorCode = $file['error'];

            if ($errorCode === UPLOAD_ERR_OK) {
                $type = exif_imagetype($file['tmp_name']);

                if ($type) {
                    $dir = $this -> srcDir;

                    if (!file_exists($dir)) {
                        mkdir($dir, 0777);
                    }

                    $extension = image_type_to_extension($type);
					$sourceFile = date('YmdHis') . substr((string)microtime(), 2, 8) . $extension;
                    $src = $dir . '/' . $sourceFile;

                    if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_JPEG || $type == IMAGETYPE_PNG) {

                        if (file_exists($src)) {
                            unlink($src);
                        }

                        $result = move_uploaded_file($file['tmp_name'], $src);

                        if ($result) {
                            $this -> src = $src;
							$this -> srcFile = $sourceFile;
                            $this -> type = $type;
                            $this -> extension = $extension;
                            $this -> setDst();
							$this -> msg = 'Save file successfully';
							$this -> state = 200;
                        } else {
                             $this -> msg = 'Failed to save file';
							 $this -> state = 1100;
                        }
                    } else {
                        $this -> msg = 'Please upload image with the following types: JPG, PNG, GIF';
						$this -> state = 100;
                    }
                } else {
                    $this -> msg = 'Please upload image file';
					$this -> state = 1000;
                }
            } else {
                $this -> msg = $this -> codeToMessage($errorCode);
				$this -> state = $this -> codeToState($errorCode);
            }
        }

        private function setDst() {
            $dir = $this -> dstDir;

            if (!file_exists($dir)) {
                mkdir($dir, 0777);
            }

			$this -> dstFile = date('YmdHis') . substr((string)microtime(), 2, 8) . $this -> extension;

            $this -> dst = $dir . '/' . $this -> dstFile;
        }

        private function crop($src, $dst, $data) {
            if (!empty($src) && !empty($dst) && !empty($data)) {
                switch ($this -> type) {
                    case IMAGETYPE_GIF:
                        $src_img = imagecreatefromgif($src);
                        break;

                    case IMAGETYPE_JPEG:
                        $src_img = imagecreatefromjpeg($src);
                        break;

                    case IMAGETYPE_PNG:
                        $src_img = imagecreatefrompng($src);
                        break;
                }

                if (!$src_img) {
                    $this -> msg = "Failed to read the image file";
					$this -> state = 1001;
                    return;
                }

                $dst_img = imagecreatetruecolor($data -> width, $data -> height);
                $result = imagecopyresampled($dst_img, $src_img, 0, 0, $data -> x, $data -> y, $data -> width, $data -> height, $data -> width, $data -> height);

                if ($result) {
                    switch ($this -> type) {
                        case IMAGETYPE_GIF:
                            $result = imagegif($dst_img, $dst);
                            break;

                        case IMAGETYPE_JPEG:
                            $result = imagejpeg($dst_img, $dst);
                            break;

                        case IMAGETYPE_PNG:
                            $result = imagepng($dst_img, $dst);
                            break;
                    }

                    if (!$result) {
                        $this -> msg = "Failed to save the cropped image file";
						$this -> state = 1002;
                    }
                } else {
                    $this -> msg = "Failed to crop the image file";
					$this -> state = 1003;
                }

                imagedestroy($src_img);
                imagedestroy($dst_img);
				$this -> msg = 'Save file successfully';
				$this -> state = 200;
            }
        }

        private function codeToMessage($code) {
            switch ($code) {
                case UPLOAD_ERR_INI_SIZE:
                    $message = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
                    break;

                case UPLOAD_ERR_FORM_SIZE:
                    $message = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
                    break;

                case UPLOAD_ERR_PARTIAL:
                    $message = 'The uploaded file was only partially uploaded';
                    break;

                case UPLOAD_ERR_NO_FILE:
                    $message = 'No file was uploaded';
                    break;

                case UPLOAD_ERR_NO_TMP_DIR:
                    $message = 'Missing a temporary folder';
                    break;

                case UPLOAD_ERR_CANT_WRITE:
                    $message = 'Failed to write file to disk';
                    break;

                case UPLOAD_ERR_EXTENSION:
                    $message = 'File upload stopped by extension';
                    break;

                default:
                    $message = 'Unknown upload error';
            }

            return $message;
        }

		private function codeToState($code) {
            switch ($code) {
                case UPLOAD_ERR_INI_SIZE:
                    $stateCode = 300;
                    break;

                case UPLOAD_ERR_FORM_SIZE:
                    $stateCode = 300;
                    break;

                case UPLOAD_ERR_PARTIAL:
                    $stateCode = 400;
                    break;

                case UPLOAD_ERR_NO_FILE:
                    $stateCode = 500;
                    break;

                case UPLOAD_ERR_NO_TMP_DIR:
                    $stateCode = 600;
                    break;

                case UPLOAD_ERR_CANT_WRITE:
                    $stateCode = 700;
                    break;

                case UPLOAD_ERR_EXTENSION:
                    $stateCode = 800;
                    break;

                default:
                    $stateCode = 900;
            }

            return $stateCode;
        }

		public function saveToS3($fileName) {
			$aws = Aws::factory('aws-config.php');
            $client = $aws->get('S3');
			$bucket = "bud-quality";
			$pathToFile = !empty($this -> data) ? $this -> dst : $this -> src;
			$result = $client->putObject(array(
				'Bucket'     => $bucket,
				'Key'        => $fileName,
				'SourceFile' => $pathToFile,
				'ACL'        => 'public-read'
			));

			// We can poll the object until it is accessible
			$client->waitUntil('ObjectExists', array(
				'Bucket' => $bucket,
				'Key'    => $fileName
			));

			return true;
        }

		public function saveToSAE($fileName) {
			#your app accesskey
			$ak = '3l31nmmj24';
			#your app secretkey
			$sk = 'zyh3wjji3k1ykzl1k23xlkijh2i4l5zjl25lw2km';
			#your domain name
			$domain = 'bud';
			$destFileName = $fileName;
			$attr = array();
			$pathToFile = !empty($this -> data) ? $this -> dst : $this -> src;
			$storage = new SaeStorage($ak, $sk);
			//$result = $storage->write($domain,$destFileName, $content, -1, $attr, true);
			$result = $storage->upload( $domain, $destFileName, $pathToFile, $attr, false);
			//var_dump($result);

			return true;
        }

        public function getResult() {
            return !empty($this -> data) ? $this -> dstFile : $this -> srcFile;
        }

        public function getMsg() {
            return $this -> msg;
        }

		public function getState() {
            return $this -> state;
        }
    }

	

    $crop = new CropAvatar($_POST['avatar_src'], $_POST['avatar_data'], $_FILES['avatar_file']);

	if ($crop -> getState() == 200)
	{		
		$crop -> saveToSAE($crop -> getResult());
	}

    $response = array(
        'state'  => $crop -> getState(),
        'message' => $crop -> getMsg(),
        'result' => $crop -> getResult()
    );

    echo json_encode($response);
?>