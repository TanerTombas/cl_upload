# CL UPLOAD
This jQuery plugin was developed to save time in image uploads, cut and optimized high-dimensional images.

## Getting Started

### Contributing

```bash
git clone git@github.com:TanerTombas/clupload.git && cd clupload
npm install
npm run dev
```

## Author

* **Taner Tombas** - [Taner Tombas](https://github.com/TanerTombas) - [@tanertombass](https://twitter.com/tanertombass)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

---------------------
### Installation

```bash
npm install clupload
```
### Usage

First Step : install jquery library
```
<script type='text/javascript' src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
```
Second step : install clupload plugin
```
<script type='text/javascript' src="path/js/jquery.clupload.min.js"></script>
```
Third step : install clupload style documents
```
<link rel="stylesheet" type="text/css" href="path/css/clupload.css">
```

select your image upload container :
```
<script type='text/javascript'>
var myUp = $('#form_clupload').clupload({
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
var myUp = $('#form_clupload').clupload({
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
var myUp = $('#form_clupload').clupload({
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
