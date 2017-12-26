<?php

$nm = rand(1,98989).'.png';


base64_to_jpeg($_POST['src'],'../upload/'.$nm);

function base64_to_jpeg($base64_string, $output_file) { global $nm;

    $ifp = fopen($output_file, "wb"); 

    $data = explode(',', $base64_string);

    fwrite($ifp, base64_decode($data[1])); 

    fclose($ifp); 



	// The file

	$filename = $output_file;

	$percent = 0.2;



	// Content type

	header('Content-Type: image/jpeg');

	// Get new dimensions

	list($width, $height) = getimagesize($filename);

	$new_width = $width * $percent;

	$new_height = $height * $percent;



	// Resample

	$image_p = imagecreatetruecolor($new_width, $new_height);

	$image = imagecreatefromjpeg($filename);

	imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);



	// Output

	imagepng($image_p, '../upload/small/'.$nm);



}