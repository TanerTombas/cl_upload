# BWRS UPLOAD
>This jQuery plugin was developed to save time in image uploads, cut and optimized high-dimensional images.

## Getting Started

### Contributing

```bash
git clone git@github.com:taner-in-code/imageupload.git && cd imageupload
npm install
npm run dev
```

## Authors

* **Taner Tombas** - [Taner Tombas](https://github.com/taner-in-code) - [@tanertombass](https://twitter.com/tanertmbs)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

---------------------

### Usage

First Step : install jquery library
```
<script type='text/javascript' src="./dist/js/jquery.min.js"></script>
```
Second step : install BWRS UPLOAD plugin
```
<script type='text/javascript' src="./dist/js/jquery.brws-upload.min.js"></script>
```
Third step : install BWRS UPLOAD style documents
```
<link rel="stylesheet" type="text/css" href="./dist/css/jquery.brws-upload.min.css">
```
Add Your Image Content
```
<form action="" method="post" enctype="multipart/form-data">
    <div id="form_clupload" class="brwsupload"></div>
    <button type="submit" class="btn btn-primary pull-right" style="margin-top: 10px;">Complate</button>
</form>
```
select your image upload container :
```
<script type='text/javascript'>
var myUp = $('#form_clupload').brwsupload({
    name: $('#imgName'),
    imageUpload : {
        url: 'your-upload-url-here',
        exData: {id:1,module:'cv'}
    },
    success: function(form) {
        // To be done when the transaction is successfully completed
    },
    error: function(data) {
        // The operation failed
    }
});
</script>
```
Only image upload example :
```
<script type='text/javascript'>
var myUp = $('#form_brwsupload').brwsupload({
    name: $('#imgName'),
    imageUpload : {
        url: 'your-upload-url-here',
        exData: {id:1,module:'cv'}
    },
    success: function(form) {
        alert("The file has been successfully uploaded.");
    },
    error: function(data) {
         alert("There was an error uploading the file.");
         console.log(data); // Write error console.
    }
});
</script>
```
Form upload example :
```
<script type='text/javascript'>
var myUp = $('#form_brwsupload').brwsupload({
    name: $('#imgName'),
    imageUpload : {
        url: 'your-upload-url-here',
        exData: {id:1,module:'cv'}
    },
    success: function(form) {
        var formData = new FormData($(form)[0]);
        $.ajax({
            url: your_save_page_url, // form.attr('action')
            type: 'POST',
            data: formData,
            dataType: 'html',
            cache: false,
            processData: false,
            contentType: false
        })
          .done(function(data) {
              alert("The form has been successfully registered.");
              console.log(data);
          })
          .fail(function() {
              alert("There was an error registering the form");
              console.log("error");
          })
          .always(function() {
              console.log("complete");
          });
    },
    error: function(data) {
         alert("There was an error uploading the file.");
         console.log(data); // Write error console.
    }
});
</script>
```
## Look at examples folder
