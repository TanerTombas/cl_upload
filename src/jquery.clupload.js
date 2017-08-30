clupload_lang_en = {
    upload_info : 'Uploaded Images (Drag Or Click Here)',
    image_proccesing : 'Image Proccesing...',
    image_proccesing_loop : 'Image Processing [%RANKED% / %TOTAL%]',
    upload_proccesing_loop : 'Uploading Images [%RANKED% / %TOTAL%] [%PERCENT%%]',
    upload_error : '404 Error\nCancelled',
    serializing : 'Serializing Please Wait...',
    dragging_info : 'You can change the position of the image by dragging',
    max_file_limit : 'Max Image Limit: %OPTMAXFILE%',
    only_support_types : 'Only support: %TYPES% files'
};

clupload_lang_tr = {
    upload_info : 'Fotoğraf Yüklemek İçin Buraya Tıklayın veya Fotoğraf Buraya Bırakın',
    image_proccesing : 'Görüntü İşleniyor...',
    image_proccesing_loop : 'Görüntü İşleniyor... [%RANKED% / %TOTAL%]',
    upload_proccesing_loop : 'Resimler Yükleniyor [%RANKED% / %TOTAL%] [%PERCENT%%]',
    upload_error : '404 Hatası\nİşlem İptal Edildi',
    serializing : 'Veriler İşleniyor Lütfen Bekleyiniz...',
    dragging_info : 'Yüklenmiş Resimlerinizi Hareket Ettirerek Nereden Kırpılacağını Belirleyebilirsiniz',
    max_file_limit : 'En Fazla %OPTMAXFILE% Resim Yükleyebilirsiniz',
    only_support_types : 'Sadece %TYPES% uzantılı dosyaları yükleyebilirsiniz'
};


$.fn.clupload = function(func) {
    var content = this;
    content.options = $.extend({
        success: function() {},
        error: function() {},
        language: 'tr',
        file : {
            max : 9999,
            maxSize : 9999999999, // kb
        },
        background: '#fff',
        form: content.parents('form:first')
    }, arguments[0] || {});

    this.initialize = function() {
        content.text = window['clupload_lang_'+content.options.language];
        $(this).addClass('clupload').append('<input type="file" name="file[]" id="clfile" class="hidden" class="clfile" multiple/><a href="javascript:;" id="cl-info">'+content.text.upload_info+'<span class="cl-stats"></span></a><div class="cl-info-inside hidden"></div><canvas style="display:none; background:#fff" id="dcanvas"></canvas><figure style="display:none" id="gl_0"><div class="cl-top-wrapper"><div class="cl-top" style="width:'+Math.round(content.options.width/content.options.thumbRatio)+'px; height: '+Math.round(content.options.height/content.options.thumbRatio)+'px;"><img src=""></div></div><div class="cl-bottom"><div class="cl-file-name"></div><div class="cl-file-size"></div><div class="cl-remove"></div><div class="cl-fit"></div></div></figure>');
        content.options.target = content.find('#clfile');
        content.options.clinfo = content.find('#cl-info');
        content.canvas = document.getElementById('dcanvas');

        $(content.options.clinfo).click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(content.options.target).click();
        });

        /* DRAG AND DROP HTML5 */
        content[0].ondragover = function () {
            $(this).addClass('hover');
            return false;
        }

        content[0].ondragleave = function () {
            $(this).removeClass('hover');
            return false;
        }

        content[0].ondrop = function (event) {
            $(this).removeClass('hover');
            event.preventDefault();
            if (event.dataTransfer.files.length > 0) {
                addPhotoLoop(event.dataTransfer.files);
            }
        }

        /* DRAG AND DROP HTML5 */

        $(content.options.target).change(function(event) {
            if ($(this).get(0).files.length > 0) {
                addPhotoLoop($(this).get(0).files);
            }
        });

        $(content.options.form).submit(function(event) {
            event.preventDefault();
            event.stopPropagation();
            var imgLength = content.find('figure').length-1;
            $(content.options.target).val('');
            if (imgLength < 1) {
                content.options.success.call(this,$(content.options.form)); info();
            } else {
                window.clTry = 0;
                clSendAjax(1);
            }
        });

        content.on('click', '.cl-remove', function() {
            $(this).parent().parent().remove();
            dragUpdate();
        });

        content.on('click', '.cl-fit', function() {
            info(content.text.image_proccesing);
            var cf = $(this).parent().parent();
            setTimeout(function(){content.fit(cf);}, 50);
        });

        content.on('dblclick', 'figure .cl-top', function() {
            info(content.text.image_proccesing);
            var cf = $(this);
            setTimeout(function(){content.fit(cf);}, 50);
        });

        $(window).resize(function(event) {
            dragUpdate();
        });

        return this;
    };


    this.fit = function(obj) {
        var img = obj.find('img');
        var original = img.data('original');
        var fit = img.data('fit');

        if (original) {
            img.attr('src',original.src);
            $.each(original.css, function(index, val) {
                img.css(index,val);
            });
            img.data('original',''); info(); dragUpdate();
            return false;
        }

        var FakeImg = new Image(); // for get naturalWidth
        FakeImg.src = img.attr('src');

        var twidth = FakeImg.naturalWidth;
        var theight = FakeImg.naturalHeight;

        var tratio = twidth/theight;
        var ratio = content.options.width/content.options.height;

        if (tratio >= ratio) { // fit width
            var oran = content.options.width/twidth;
            var diff = content.options.height-theight*oran;
            draw({
                    data : FakeImg.src,
                    quality : 100,
                    x1 : 0,
                    y1 : 0,
                    x2 : twidth,
                    y2 : theight,
                    cx : 0,
                    cy : diff/2,
                    width : content.options.width,
                    height : theight*oran,
                    canvasWidth : content.options.width,
                    canvasHeight : content.options.height,
                },
                function(data) {
                    info();
                    img.data('original',{'src':FakeImg.src,'css':{'width':img.css('width'),'height':'100%','left':img.css('left'),'top':img.css('top'),'cursor':img.css('cursor')}});
                    img.attr('src',data).css({
                        left: '0px',
                        top: '0px',
                        width: '100%',
                        height: '100%',
                        cursor: 'default',
                    });
                    dragUpdate();
                });
        } else { // fit height
            var oran = content.options.height/theight;
            var diff = content.options.width-twidth*oran;
            draw({
                    data : FakeImg.src,
                    quality : 100,
                    x1 : 0,
                    y1 : 0,
                    x2 : twidth,
                    y2 : theight,
                    cx : diff/2,
                    cy : 0,
                    width : twidth*oran,
                    height : content.options.height,
                    canvasWidth : content.options.width,
                    canvasHeight : content.options.height,
                },
                function(data) {
                    info();
                    img.data('original',{'src':FakeImg.src,'css':{'height':img.css('height'),'width':'100%','left':img.css('left'),'top':img.css('top'),'cursor':img.css('cursor')}});
                    img.attr('src',data).css({
                        left: '0px',
                        top: '0px',
                        width: '100%',
                        height: '100%',
                        cursor: 'default',
                    });
                    dragUpdate();
                });
        }


    };

    function draw (arg,callback) {
        img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous');
        img.src = arg.data;

        img.onload = function () {
            var canvas = document.getElementById('dcanvas');

            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            canvas.width = arg.canvasWidth;
            canvas.height = arg.canvasHeight;

            context.fillStyle = content.options.background;
            context.fillRect(0,0,canvas.width,canvas.height);
            context.drawImage(img,arg.x1,arg.y1,arg.x2,arg.y2,arg.cx,arg.cy,arg.width,arg.height);

            var data = canvas.toDataURL('image/jpeg',content.options.quality/100);
            callback(data);
        }
    }

    content.serialize = function(callback) {
        content.serializeArray = [];
        info(content.text.serializing);
        serialize(1,callback);
    };

    content.stop = function(callback) {
        content.stopped = true;
    };

    content.reset = function() {
        info();
        content.html('');
        content.initialize();
    };

    return content.initialize();


    function addPhotoLoop (arr) {
        var err = false;
        var fid = 0;

        $.each(arr, function(index, val) {

            var only_support_types = content.text.only_support_types.replace("%TYPES%",'jpeg,png,gif,bmp');

            if (val.type == 'image/jpeg' || val.type == 'image/png' || val.type == 'image/bmp' || val.type == 'image/gif') {
                totalSize = content.totalSize+val.size;
            } else {
                err = only_support_types;
            }
        });

        if (err) {
            content.options.error.call(this,err);
            return false
        }

        var total = arr.length;
        var figLength = content.find('figure').length-1;
        if (figLength+total > content.options.file.max) {
            var max_file_limit = content.text.max_file_limit.replace("%OPTMAXFILE%",content.options.file.max);
            content.options.error.call(this,max_file_limit);
            return;
        }

        $(content.options.clinfo).text(content.text.dragging_info);
        addPhoto(0,function(data) {
            info();
            dragUpdate();
        },arr);
    }

    function getOrientation(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
            var length = view.byteLength, offset = 2;
            while (offset < length) {
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) callback(-1);
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++)
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                }
                else if ((marker & 0xFF00) != 0xFF00) break;
                else offset += view.getUint16(offset, false);
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    }

    function addPhoto2(fid,callback,arr,orientation) {
        var total = arr.length;
        var image_proccesing_loop = content.text.image_proccesing_loop.replace("%RANKED%",Number(fid+1));
        var image_proccesing_loop = image_proccesing_loop.replace("%TOTAL%",total);
        info(image_proccesing_loop);
        var file = arr[fid];

        getOrientation(file, function(orientation) {
            var reader = new FileReader();
            image_filename = file.name;
            image_filesize = file.size;
            reader.onload = function (e) {
                original_data = reader.result;
                current_image = new Image();
                current_image.src = reader.result;
                current_image.onload = function () {
                    var canvas = content.canvas;
                    var context = canvas.getContext('2d');

                    var twidth = current_image.naturalWidth;
                    var theight = current_image.naturalHeight;

                    canvas.width = theight;
                    canvas.height = twidth;

                    switch(orientation){
                        case 5:
                            // vertical flip + 90 rotate right
                            context.rotate(90*Math.PI/180);
                            context.scale(1, -1);
                            break;
                        case 6:
                            // 90° rotate right
                            context.rotate(90*Math.PI/180);
                            context.translate(0, -theight);
                            break;
                        case 7:
                            // horizontal flip + 90 rotate right
                            context.rotate(0.5 * Math.PI);
                            context.translate(twidth, -theight);
                            context.scale(-1, 1);
                            break;
                        case 8:
                            // 90° rotate left
                            context.rotate(-0.5 * Math.PI);
                            context.translate(-twidth, 0);
                            break;
                    }

                    context.drawImage(current_image,0,0,twidth,theight);
                    var data = canvas.toDataURL('image/jpeg',content.options.quality/100);
                    current_image = new Image();
                    current_image.src = data;
                    current_image.onload = function () {
                        var canvas = content.canvas;
                        var context = canvas.getContext('2d');
                        context.clearRect(0, 0, canvas.width, canvas.height);

                        var twidth = current_image.naturalWidth;
                        var theight = current_image.naturalHeight;

                        var twidthOrj = twidth;
                        var theightOrj = theight;

                        canvas.width = content.options.width;
                        canvas.height = content.options.height;

                        context.fillStyle = content.options.background;
                        context.fillRect(0,0,newWidth,newHeight);

                        var ratio = content.options.width/content.options.height;
                        var tratio = twidth/theight;

                        var exDiff = content.options.thumbRatio*2;

                        if (tratio >= ratio) { // crop width
                            var type = 'wide';
                            var oran = content.options.height/theight;
                            var newWidth = twidth*oran;
                            var newHeight = theight*oran;

                            var startX = 0;
                            var endX = twidth;
                            var startY = 0;
                            var endY = theight;

                            var sImgWidth = 'auto';
                            var sImgHeight = '100%';
                            var sImgLeft = -1*(newWidth-content.options.width)/exDiff+'px';
                            var sImgTop = '0px';
                            if (newWidth-content.options.width) {var sImgCursor = 'e-resize';}
                            var axis = 'x';
                        } else { // crop height
                            var type = 'tall';
                            var oran = content.options.width/twidth;
                            var newWidth = twidth*oran;
                            var newHeight = theight*oran;

                            var startX = 0;
                            var endX = twidth;
                            var startY = 0;
                            var endY = theight;

                            var sImgWidth = '100%';
                            var sImgHeight = 'auto';
                            var sImgLeft = '0px';
                            var sImgTop = -1*(newHeight-content.options.height)/exDiff+'px';
                            if (newHeight-content.options.height) {var sImgCursor = 's-resize';}
                            var axis = 'y';
                        }

                        canvas.width = newWidth;
                        canvas.height = newHeight;

                        context.fillStyle = content.options.background;
                        context.fillRect(0,0,newWidth,newHeight);

                        context.drawImage(current_image,startX,startY,endX,endY,0,0,newWidth,newHeight);

                        var dataUrl = canvas.toDataURL('image/jpeg', content.options.quality/100);

                        finimg = new Image();
                        finimg.src = dataUrl;
                        finimg.onload = function () {
                            var tImg = content.find('#gl_0').clone().appendTo(content).removeClass('hidden').show().addClass('cl-added').find('img');

                            var ox = tImg.parent().offset().left;
                            var oy = tImg.parent().offset().top;

                            tImg.attr('src',dataUrl).css({
                                width: sImgWidth,
                                height: sImgHeight,
                                left: sImgLeft,
                                top: sImgTop,
                                cursor: sImgCursor,

                            });

                            tImg.parent().attr('data-axis',axis);
                            tImg.parent().attr('data-name',image_filename);
                            tImg.parent().parent().parent().find('.cl-file-name').text(image_filename);
                            tImg.parent().parent().parent().find('.cl-file-size').text(filesize(image_filesize));

                            if (fid < arr.length-1) {
                                addPhoto(fid+1,callback,arr);
                                dragUpdate();
                            } else {
                                info();
                                callback('OK');
                                dragUpdate();
                            }

                        }

                    }
                }
            }
            reader.readAsDataURL(file);
        });
    }

    function addPhoto(fid,callback,arr) {
        var total = arr.length;
        var image_proccesing_loop = content.text.image_proccesing_loop.replace("%RANKED%",Number(fid+1));
        var image_proccesing_loop = image_proccesing_loop.replace("%TOTAL%",total);
        info(image_proccesing_loop);
        var file = arr[fid];

        getOrientation(file, function(orientation) {
            if (orientation > 4) {addPhoto2(fid,callback,arr,orientation);return;}
            var reader = new FileReader();
            image_filename = file.name;
            image_filesize = file.size;
            reader.onload = function (e) {
                original_data = reader.result;
                current_image = new Image();
                current_image.src = reader.result;
                current_image.onload = function () {
                    var canvas = content.canvas;
                    var context = canvas.getContext('2d');
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    var twidth = current_image.naturalWidth;
                    var theight = current_image.naturalHeight;

                    var twidthOrj = twidth;
                    var theightOrj = theight;

                    canvas.width = content.options.width;
                    canvas.height = content.options.height;

                    context.fillStyle = content.options.background;
                    context.fillRect(0,0,newWidth,newHeight);

                    var ratio = content.options.width/content.options.height;
                    var tratio = twidth/theight;

                    var exDiff = content.options.thumbRatio*2;

                    if (tratio >= ratio) { // crop width
                        var type = 'wide';
                        var oran = content.options.height/theight;
                        var newWidth = twidth*oran;
                        var newHeight = theight*oran;

                        var startX = 0;
                        var endX = twidth;
                        var startY = 0;
                        var endY = theight;

                        var sImgWidth = 'auto';
                        var sImgHeight = '100%';
                        var sImgLeft = -1*(newWidth-content.options.width)/exDiff+'px';
                        var sImgTop = '0px';
                        if (newWidth-content.options.width) {var sImgCursor = 'e-resize';}
                        var axis = 'x';
                    } else { // crop height
                        var type = 'tall';
                        var oran = content.options.width/twidth;
                        var newWidth = twidth*oran;
                        var newHeight = theight*oran;

                        var startX = 0;
                        var endX = twidth;
                        var startY = 0;
                        var endY = theight;

                        var sImgWidth = '100%';
                        var sImgHeight = 'auto';
                        var sImgLeft = '0px';
                        var sImgTop = -1*(newHeight-content.options.height)/exDiff+'px';
                        if (newHeight-content.options.height) {var sImgCursor = 's-resize';}
                        var axis = 'y';
                    }

                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    context.fillStyle = content.options.background;
                    context.fillRect(0,0,newWidth,newHeight);

                    switch(orientation){
                        case 2:
                            // horizontal flip
                            context.translate(canvas.width, 0);
                            context.scale(-1, 1);
                            break;
                        case 3:
                            // 180° rotate left
                            context.translate(canvas.width, canvas.height);
                            context.rotate(Math.PI);
                            break;
                        case 4:
                            // vertical flip
                            context.translate(0, canvas.height);
                            context.scale(1, -1);
                            break;
                    }

                    context.drawImage(current_image,startX,startY,endX,endY,0,0,newWidth,newHeight);

                    var dataUrl = canvas.toDataURL('image/jpeg', content.options.quality/100);

                    finimg = new Image();
                    finimg.src = dataUrl;
                    finimg.onload = function () {
                        var tImg = content.find('#gl_0').clone().appendTo(content).removeClass('hidden').show().addClass('cl-added').find('img');

                        var ox = tImg.parent().offset().left;
                        var oy = tImg.parent().offset().top;

                        tImg.attr('src',dataUrl).css({
                            width: sImgWidth,
                            height: sImgHeight,
                            left: sImgLeft,
                            top: sImgTop,
                            cursor: sImgCursor,

                        });

                        tImg.parent().attr('data-axis',axis);
                        tImg.parent().attr('data-name',image_filename);
                        tImg.parent().parent().parent().find('.cl-file-name').text(image_filename);
                        tImg.parent().parent().parent().find('.cl-file-size').text(filesize(image_filesize));

                        if (fid < arr.length-1) {
                            addPhoto(fid+1,callback,arr);
                            dragUpdate();
                        } else {
                            info();
                            callback('OK');
                            dragUpdate();
                        }

                    }

                }
            }
            reader.readAsDataURL(file);
        });
    }

    function dragUpdate() {

        content.find('.cl-added').each(function(){

            var axis = $(this).find('.cl-top').attr('data-axis');

            var iwd = $(this).find('img').width();
            var ihg = $(this).find('img').height();

            var cwd = $(this).find('.cl-top').width();
            var chg = $(this).find('.cl-top').height();

            var ox = $(this).find('.cl-top').offset().left;
            var oy = $(this).find('.cl-top').offset().top;

            var diffX = Math.abs(iwd-cwd);
            var diffY = Math.abs(ihg-chg);

            if (!(cwd == iwd) || !(chg == ihg)) {
                $(this).find('img').draggable({
                    axis : axis,
                    containment: [ox-diffX,oy-diffY,ox,oy],
                });
                $(this).data('dragged',true);
                $(this).find('img').draggable('enable');
            } else {
                if ($(this).data('dragged')) {
                    $(this).find('img').css('cursor', 'default');
                    $(this).find('img').draggable('disable');
                } else {
                    $(this).find('img').css('cursor', 'default');
                    $(this).find('.cl-fit').remove();
                }
            }

        });
    }

    function info (arg) {
        var clins = content.find('.cl-info-inside');
        if (arg) {
            $('html, body').scrollTop(clins.offset().top-20);
            clins.removeClass('hidden');
            clins.text(arg);
        } else {
            clins.text('').addClass('hidden');
        }
    }

    function clStat (arg) {
        content.find('.cl-stats').text(arg);
    }

    function serialize (id,callback) {
        var figLength = content.find('figure').length-1;
        var thisFig = content.find('figure:eq('+id+')');
        var thisImg = thisFig.find('img');

        var name = thisFig.find('.cl-top').attr('data-name');

        if (figLength < 1) { // No Image
            callback(false); info();
            return false;
        }

        uImg = new Image();
        uImg.src = thisImg.attr('src');

        var uRadius = uImg.naturalWidth / thisImg.width();

        var uImgLeft = thisImg.css('left').split("px")[0];
        var uImgLeft = Math.abs(uImgLeft*uRadius);

        var uImgTop = thisImg.css('top').split("px")[0];
        var uImgTop = Math.abs(uImgTop*uRadius);

        uImg.onload = function () {
            var uCanvas = document.getElementById('dcanvas');
            var uContext = uCanvas.getContext('2d');
            uContext.clearRect(0, 0, uCanvas.width, uCanvas.height);
            uCanvas.width = content.options.width;
            uCanvas.height = content.options.height;

            uContext.drawImage(uImg,uImgLeft,uImgTop,content.options.width,content.options.height,0,0,content.options.width,content.options.height);
            var SdataUrl = uCanvas.toDataURL('image/jpeg', content.options.quality/100);
            thisFig.find('.cl-top').attr('data-newsize',getSizeBase64(SdataUrl));

            content.serializeArray.push({data:SdataUrl,name:name});

            if (id+1 <= figLength) {
                serialize(id+1,callback);
            } else {
                info();
                callback(content.serializeArray);
                return false;
            }
        }
    }

    function clSendAjax (id) {

        var figLength = content.find('figure').length-1;
        var thisFig = content.find('figure:eq('+id+')');
        var thisImg = thisFig.find('img');
        var name = thisFig.find('.cl-top').attr('data-name');
        var src = thisImg.attr('src');
        uImg = new Image();
        uImg.src = src;
        var uRadius = uImg.naturalWidth / thisImg.width();

        var uImgLeft = thisImg.css('left').split("px")[0];
        var uImgLeft = Math.abs(uImgLeft*uRadius);

        var uImgTop = thisImg.css('top').split("px")[0];
        var uImgTop = Math.abs(uImgTop*uRadius);

        uImg.onload = function () {
            var uCanvas = document.getElementById('dcanvas');
            var uContext = uCanvas.getContext('2d');
            uContext.clearRect(0, 0, uCanvas.width, uCanvas.height);
            uCanvas.width = content.options.width;
            uCanvas.height = content.options.height;

            uContext.drawImage(uImg,uImgLeft,uImgTop,content.options.width,content.options.height,0,0,content.options.width,content.options.height);
            var UdataUrl = uCanvas.toDataURL('image/jpeg', content.options.quality/100);

            $.ajax({
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt){
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            var upload_proccesing_loop = content.text.upload_proccesing_loop.replace("%RANKED%",id);
                            var upload_proccesing_loop = upload_proccesing_loop.replace("%TOTAL%",figLength);
                            var upload_proccesing_loop = upload_proccesing_loop.replace("%PERCENT%",Math.round(percentComplete*100));
                            info(upload_proccesing_loop);
                        }
                    }, false);
                    return xhr;
                },
                url: content.options.imageUpload.url,
                type: 'POST',
                dataType: 'html',
                data: {src:UdataUrl,name:name,exdata: content.options.imageUpload.exData},
                success: function(data){
                    console.log(data);
                    if (id+1 <= figLength) {
                        clSendAjax(id+1);
                    } else {
                        content.options.success.call(this,$(content.options.form)); info();
                    }
                },
                error: function(){
                    if (window.clTry > 5) {
                        content.find('.cl-added').remove(); info();
                        content.options.error.call(this,content.text.upload_error);
                    } else {
                        clSendAjax(id);
                        window.clTry = window.clTry+1;
                    }
                }
            });
        }
    }

    function getSizeBase64(arg) {
        var head = 'data:image/jpeg;base64,';
        return Math.round((arg.length - head.length)*3/4);
    }

    function filesize(arg) {
        var b = /^(b|B)$/;
        var symbol = {
            bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
            bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        };
        var descriptor = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var result = [],
            val = 0,
            e = undefined,
            base = undefined,
            bits = undefined,
            ceil = undefined,
            neg = undefined,
            num = undefined,
            output = undefined,
            round = undefined,
            unix = undefined,
            spacer = undefined,
            symbols = undefined;

        if (isNaN(arg)) {
            throw new Error("Invalid arguments");
        }

        bits = descriptor.bits === true;
        unix = descriptor.unix === true;
        base = descriptor.base || 2;
        round = descriptor.round !== undefined ? descriptor.round : unix ? 1 : 2;
        spacer = descriptor.spacer !== undefined ? descriptor.spacer : unix ? "" : " ";
        symbols = descriptor.symbols || descriptor.suffixes || {};
        output = descriptor.output || "string";
        e = descriptor.exponent !== undefined ? descriptor.exponent : -1;
        num = Number(arg);
        neg = num < 0;
        ceil = base > 2 ? 1000 : 1024;

        // Flipping a negative number to determine the size
        if (neg) {
            num = -num;
        }

        // Zero is now a special case because bytes divide by 1
        if (num === 0) {
            result[0] = 0;
            result[1] = unix ? "" : !bits ? "B" : "b";
        } else {
            // Determining the exponent
            if (e === -1 || isNaN(e)) {
                e = Math.floor(Math.log(num) / Math.log(ceil));

                if (e < 0) {
                    e = 0;
                }
            }

            // Exceeding supported length, time to reduce & multiply
            if (e > 8) {
                e = 8;
            }

            val = base === 2 ? num / Math.pow(2, e * 10) : num / Math.pow(1000, e);

            if (bits) {
                val = val * 8;

                if (val > ceil && e < 8) {
                    val = val / ceil;
                    e++;
                }
            }

            result[0] = Number(val.toFixed(e > 0 ? round : 0));
            result[1] = base === 10 && e === 1 ? bits ? "kb" : "kB" : symbol[bits ? "bits" : "bytes"][e];

            if (unix) {
                result[1] = result[1].charAt(0);

                if (b.test(result[1])) {
                    result[0] = Math.floor(result[0]);
                    result[1] = "";
                }
            }
        }

        // Decorating a 'diff'
        if (neg) {
            result[0] = -result[0];
        }

        // Applying custom suffix
        result[1] = symbols[result[1]] || result[1];

        // Returning Array, Object, or String (default)
        if (output === "array") {
            return result;
        }

        if (output === "exponent") {
            return e;
        }

        if (output === "object") {
            return { value: result[0], suffix: result[1], symbol: result[1] };
        }

        return result.join(spacer);
    }
};
