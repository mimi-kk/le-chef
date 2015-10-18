<?
//Path to autoload.php from current location
require_once './vendor/autoload.php';

$config = new \Flow\Config();
$config->setTempDir('./chunks_temp_folder');
$request = new \Flow\Request();
if (\Flow\Basic::save('./' . $request->getRelativePath(), $config, $request)) {
  // file saved successfully and can be accessed at './final_file_destination'
} else {
  // This is not a final chunk or request is invalid, continue to upload.
}
?>