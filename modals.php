<?php
$dir = 'modals';
$files = array_diff(scandir($dir), array('.', '..'));
$htmlFiles = array_filter($files, function($file) {
    return pathinfo($file, PATHINFO_EXTENSION) === 'html';
});
echo json_encode(array_values($htmlFiles));
?>
