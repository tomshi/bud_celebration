(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
})(function ($) {

  "use strict";

  var console = window.console || {
        log: $.noop
      };

  function CropAvatar($element) {
    this.$container = $element;

    this.$avatarView = this.$container.find(".avatar-view");
    this.$avatar = this.$avatarView.find("img");
    this.$avatarModal = $("#avatar-modal");
    this.$loading = $(".loading");

    this.$avatarForm = $(".avatar-form");
    this.$avatarUpload = $(".avatar-upload");
    this.$avatarSrc = this.$avatarUpload.find(".avatar-src");
    this.$avatarData = this.$avatarUpload.find(".avatar-data");
    this.$avatarInput = this.$avatarUpload.find(".avatar-input");

    this.$avatarWrapper = this.$avatarModal.find(".avatar-wrapper");
    this.$avatarSave = this.$avatarModal.find(".avatar-save");

    this.init();
  }

  CropAvatar.prototype = {
    constructor: CropAvatar,

    support: {
      fileList: !!$("<input type=\"file\">").prop("files"),
      fileReader: !!window.FileReader,
      formData: !!window.FormData
    },

    init: function () {
      this.support.datauri = this.support.fileList && this.support.fileReader;

      if (!this.support.formData) {
        this.initIframe();
      }

      //this.initTooltip();
      //this.initModal();
      this.addListener();
    },

    addListener: function () {
      //this.$avatarView.on("click", $.proxy(this.click, this));
      this.$avatarInput.on("change", $.proxy(this.change, this));
      this.$avatarForm.on("submit", $.proxy(this.submit, this));
    },

    /*initTooltip: function () {
      this.$avatarView.tooltip({
        placement: "bottom"
      });
    },

    initModal: function () {
      this.$avatarModal.modal("hide");
      this.initPreview();
    },

    initPreview: function () {
      var url = this.$avatar.attr("src");

      this.$avatarPreview.empty().html('<img src="' + url + '">');
    },*/

    initIframe: function () {
      var iframeName = "avatar-iframe-" + Math.random().toString().replace(".", ""),
          $iframe = $('<iframe name="' + iframeName + '" style="display:none;"></iframe>'),
          firstLoad = true,
          _this = this;

      this.$iframe = $iframe;
      this.$avatarForm.attr("target", iframeName).after($iframe);

      this.$iframe.on("load", function () {
        var data,
            win,
            doc;

        try {
          win = this.contentWindow;
          doc = this.contentDocument;

          doc = doc ? doc : win.document;
          data = doc ? doc.body.innerText : null;
        } catch (e) {}

        if (data) {
          _this.submitDone(data);
        } else {
          if (firstLoad) {
            firstLoad = false;
          } else {
            _this.submitFail("Image upload failed!");
          }
        }

        _this.submitEnd();
      });
    },

    //click: function () {
      //this.$avatarModal.modal("show");
    //},

    change: function () {
      $(".avatar-crop-overlay").fadeIn();
      var files,
          file;
      if (this.support.datauri) {
        files = this.$avatarInput.prop("files");

        if (files.length > 0) {
          file = files[0];

          if (this.isImageFile(file)) {
            this.read(file);
          }
        }
      } else {
        file = this.$avatarInput.val();

        if (this.isImageFile(file)) {
          this.syncUpload();
        }
      }
    },

    submit: function () {
      if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
        return false;
      }

      if (this.support.formData) {
        this.ajaxUpload();
        return false;
      }
    },

    isImageFile: function (file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
      }
    },

    read: function (file) {
      var _this = this,
          fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        _this.url = this.result
        _this.startCropper();
      };
    },

    startCropper: function () {
      var _this = this;

      if (this.active) {
        this.$img.cropper("replace", this.url);
      } else {
        this.$img = $('<img src="' + this.url + '">');
        this.$avatarWrapper.empty().html(this.$img);
        this.$img.cropper({
          done: function (data) {
            var json = [
                  '{"x":' + data.x,
                  '"y":' + data.y,
                  '"height":' + data.height,
                  '"width":' + data.width + "}"
                ].join();

            _this.$avatarData.val(json);
          },
            aspectRatio: 500 / 260,
            autoCropArea: 0.8, // Center 60%
            multiple: false,
            dragCrop: false,
            dashed: false,
            resizable: false
        });

        this.active = true;
      }
    },

    stopCropper: function () {
      if (this.active) {
        this.$img.cropper("destroy");
        this.$img.remove();
        this.active = false;
      }
    },

    ajaxUpload: function () {
      var url = this.$avatarForm.attr("action"),
          data = new FormData(this.$avatarForm[0]),
          _this = this;
      $.ajax(url, {
        type: "post",
        data: data,
        processData: false,
        contentType: false,

        beforeSend: function () {
          _this.submitStart();
        },

        success: function (data) {
          _this.submitDone(data);
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _this.submitFail(textStatus || errorThrown);
        },

        complete: function () {
          _this.submitEnd();
        }
      });
    },

    syncUpload: function () {
      this.$avatarSave.click();
    },

    submitStart: function () {
      this.$loading.fadeIn();
    },

    submitDone: function (data) {
      try {
        data = $.parseJSON(data);
      } catch (e) {}
      if (data && data.state === 200) {
        if (data.result) {
          this.url = data.result;
          if (this.support.datauri || this.uploaded) {
            this.uploaded = false;
            this.cropDone();
          } else {
            this.uploaded = true;
            this.$avatarSrc.val(this.url);
            this.startCropper();
          }
          this.$avatarInput.val("");
          $(".avatar-crop-overlay").hide();
            $(".upload-succeed").show();
            $(".avatar-upload").hide();
        } else if (data.message) {
          this.alert(data.message);
        }
      } else {
        this.alert("Failed to response");
      }
    },

    submitFail: function () {
      $(".upload-failed").fadeIn();
    },

    submitEnd: function () {
      this.$loading.fadeOut();
    },

    cropDone: function () {
      var hostname;
      this.$avatarSrc.val("");
      this.$avatarData.val("");
      if (window.location.href.indexOf("bud1.sonicboomsh.com") > 0){
          hostname = "http://s3-ap-northeast-1.amazonaws.com/bud-quality/";
      }else {
          hostname = "/";
      }
      this.$avatar.attr("src", hostname + this.url);
      ugc_image_url =  hostname + this.url;
      this.stopCropper();
      //this.$avatarModal.modal("hide");
    },

    alert: function (msg) {
      var $alert = [
            '<div class="alert alert-danger avater-alert">',
              '<button type="button" class="close" data-dismiss="alert">&times;</button>',
              msg,
            '</div>'
          ].join("");

      this.$avatarUpload.after($alert);
    }
  };

  $(function () {
    var example = new CropAvatar($("#crop-avatar"));
  });
});
