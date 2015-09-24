﻿/// <reference path="../ThirdLib/touch.mini.js" />
/// <reference path="../CmnUI/Upload/Upload.js" />
/// <reference path="../CmnTools/WechatShare.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="SiteFunc.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../animate/AnimateFrame.js" />


$(function () {
    var _ChooseIndex;
    var _ModeUrlFilter = "";//滤镜路径
    var _ModeUrlFrame = ""//相框路径
    var _UserUploadImg;//用户上传作品
    var _LableText = "";//输入的标签内容
    var _LableDirection = 0;//标签方向 0右 1左
    var _LableLeft;//标签右坐标
    var _LableTop;//标签上标签
    var _LobaleIndex = 0;//标签下标
    var _ImgUpload;//上传的图片
    var _StrIDList;//记录ID集合
    var _CountIndex = 0;//下标
    _IsUploadImgLK = false;
    AnimateFrame.IsLockScenes = true;
    CallJsApiWXConfigItf("http://wechat.cagoe.com/JsApiWXConfig.aspx");
    /////////////////////////方法////////////////////////////
    function BindUpload(FileInput, ShowBox) {
        window._Stage = Cmn.UI.Upload($(FileInput));
        window._ImageEdit = Cmn.UI.CanvasTools.ImageEditing(ShowBox, 640, 490);
        CmnAjax.PostData("http://wechat.cagoe.com/AccessToken.aspx", "", function (dat) {
            _Stage.WXAccessToken = dat.AccessToken;
            _Stage.OnFilter.Add(function (e) {
                if (e.State) {

                    SiteFunc.SceneJump("choice", 3);
                    $(".JscDetermineBtn").show();
                    $(".JscMaterialAll").show();
                    _ImgUpload = e.Path;
                    _ImageEdit.SetImage(e.Path);
                } else {
                    alert("上传失败，" + e.Msg);
                }
            });
        });

    }
    //相框填充
    function PhotoTC(_modeUrlIndex) {
        _ImageEdit.SetModel(_modeUrlIndex);
    }
    //滤镜填充
    function ModesTC(_modeUrlIndex) {
        _ImageEdit.SetFilterEffect(_modeUrlIndex);
    }
    //贴纸填充
    function StickersTC(ImgUrl, _modeUrlIndex) {
        _CountIndex++;
        _ImageEdit.AddStickers(ImgUrl, _CountIndex);

        _StrIDList = _StrIDList + "," + _CountIndex;
        $(".JscStickersShow ").hide();
    }

    ///相框抛出
    function PhotoFrameThrown() {
        CmnAjax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=YQGetPhotoFrameDate", "", function (dat) {
            if (dat.IsSuccess == 1) {
                Cmn.FillData(".JscPhotoFrameElements,JscPhotoFramePhoto", dat.data, false);
                var _widthCount = dat.data.length;
                _widthCount = _widthCount * 140;
                $(".JscPhotoAll").css("width", _widthCount + "px");
                //相框选择
                $(".JscPhotoFrameElements").on("click", function () {
                    var _indexfr = $(this).index();
                    $(".JscPhotoFrameElements a").removeClass("select");
                    $(".JscPhotoFrameElements a").eq(_indexfr).addClass("select");
                    _ModeUrlFrame = $(this).attr("frurl");
                    PhotoTC(_ModeUrlFrame);
                })
                //相框返回
                $(".JscPhotoFrameRevocationBtn").on("click", function () {
                    if ($(".JscSelectPhotoFrame").hasClass("select")) {
                        _ImageEdit.RemoveModel();
                        $(".JscPhotoFrameElements a").removeClass("select");
                    }
                    else {
                        SiteFunc.FloatOperating(".JscOperatingPiece", ".JscPhotoFrameDiv");
                    }
                    
                })
            }
        })
    }

    ///滤镜抛出
    function FilterThrown() {
        //CmnAjax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=YQGetFilterDate", "", function (dat) {
        //    if (dat.IsSuccess == 1) {
        //        Cmn.FillData(".JscFilterElements,JscTemplatePhoto", dat.data, false);
               
        //    }
        //})
        //选取滤镜
        $(".JscFilterElements").on("click", function () {
            var _indexf = $(this).index();
            if ($(".JscFilterElements a").eq(_indexf).hasClass("select")) { return;}
            $(".JscFilterElements a").removeClass("select");
            $(".JscFilterElements a").eq(_indexf).addClass("select");
            _ModeUrlFilter = $(this).attr("furl");
            if (_ModeUrlFilter == "") {
                _ImageEdit.RemoveFilterEffect();
                return;
            }
            ModesTC(_ModeUrlFilter);
        })
        //滤镜返回
        //$(".JscTemplateRevocationBtn").on("click", function () {
            
        //    //$(".JscFilterElements a").removeClass("select");
        //    //_ModeUrlFilter = "/";
        //    //ModesTC(_ModeUrlFilter);
        //})
    }

    ///贴纸抛出
    function StickersDetails(StickerCategoryID) {
        //////////////选取贴纸//////////////
        CmnAjax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=GetSticker", { "StickerCategoryID": StickerCategoryID }, function (dat) {
            if (dat.length > 4) {
                Cmn.FillData(".JscFourPhotoElement", dat.data, false);
                SiteFunc.FloatOperating(".JscFourPhoto", ".JscSixPhoto");
            }
            else {
                Cmn.FillData(".JscSixPhotoElement", dat.data, false);
                SiteFunc.FloatOperating(".JscSixPhoto", ".JscFourPhoto");
            }
            if (dat.IsSuccess == 1) {
                $(".JscFourPhotoElement,.JscSixPhotoElement").on("click", function () {
                    var _indexf = $(this).index();
                    $(".JscPhotoElement a").removeClass("select");
                    $(".JscPhotoElement a").eq(_indexf).addClass("select");
                    _StickerCategoryIndex = $(this).index();
                    _ModeUrlFilter = $(this).find("img").attr("src");

                    StickersTC(_ModeUrlFilter, _StickerCategoryIndex);

                })
            }
        })
    }

    ///贴纸分类抛出
    function StickersThrows() {
        CmnAjax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=GetStickerCategory", "", function (dat) {
            if (dat.IsSuccess == 1) {
                var _widthCount = dat.data.length;
                _widthCount = _widthCount * 140;
                $(".JscTagsList").css("width", _widthCount + "px");
                Cmn.FillData(".JscStickersElementsSon", dat.data, false);
                //BindChangePicList(".JscTagsList", 130, 1, ".JscLeftArrow", ".JscRightArrow", 4);
                //选取贴纸分类
                var _StickerCategoryID;
                $(".JscStickersElementsSon").on("click", function () {
                    var _indexf = $(this).index();
                    $(".JscStickersElementsSon a").removeClass("select");
                    $(".JscStickersElementsSon a").eq(_indexf).addClass("select");
                    _StickerCategoryID = $(this).attr("ssid");

                    StickersDetails(_StickerCategoryID);

                })
                $(".JscStickersRevocationBtn").on("click", function () {
                    //var _sid = _StrIDList.substring(_StrIDList.lastIndexOf(",") + 1, _StrIDList.length);
                    //_StrIDList = _StrIDList.substring(0, _StrIDList.lastIndexOf(","));
                    //_ImageEdit.RemoveStickers(_sid);
                    SiteFunc.FloatOperating(".JscOperatingPiece", ".JscStickersDiv");
                })

            }

        })

    }

    ///关注抛出
    function AttentionThrown(Search) {
        var _param = {
            "Search": Search,
        }
        CmnAjax.FillData(".JscPersonalInformation", "Itf/CSharp/ItfOther.aspx?method=FollowThrownFriends", _param, function (dat) {
            //点击@选取
            $(".JscPersonalInformation").on("click", function () {
                if ($(".JscPersonalInformation").eq($(this).index()).find(".JscATAttention").hasClass("select")) {
                    $(".JscPersonalInformation").eq($(this).index()).find(".JscATAttention").removeClass("select");
                }
                else {
                    $(".JscPersonalInformation").eq($(this).index()).find(".JscATAttention").addClass("select");
                }
            })
            //点头像跳转到用户详情页面
            //$(".JscUserHeadImg").on("click", function () {
            //    var _uid = $(".JscUserHeadImg").eq($(this).index()).closest(".JscPersonalInformation").attr("uid");
            //    SiteFunc.AvatarJump(_uid);
            //})

        }, "", "", function (data) {
            if (typeof (data) == "undefined") {
                SiteFunc.JumpPage("index.aspx", location.href);
            }
            else {
                for (var _i = 0; _i < data.length; _i++) {
                    if (data[_i]["Identitys"] == "1") {
                        data[_i]["IdentitysStyle"] = "display:block;";
                    } else {
                        data[_i]["IdentitysStyle"] = "display:none;";
                    }
                }
            }

        });
    }

    ///热门标签抛出
    function PopularTagsThrown() {
        CmnAjax.FillData(".JscPopularLable", "Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=YQGetLable", "", function (dat) {
            //点击热门标签
            $(".JscPopularLable").on("click", function () {
                var _lableTextPopular;
                _lableTextPopular = $(".JscPopularLable").eq($(this).index()).find(".JscLableTextPopular").html();

                $(".JscPhotoCanvas").append("<div class='set-label JscLableShow'><div class='choose-desc JscLeftLable JscThisLable' style='display:none;'><div class='choose-desc-box'><span class='attention-desc-text JscLableShowText'>" + _lableTextPopular + "</span><b class='attention-arrow'></b></div></div><div class='choose-desc-round'><i class='round'></i></div><div class='choose-desc tags-set JscRightLable JscThisLable' style='visibility: visible;'><div class='choose-desc-box choose-desc-fr'><span class='attention-desc-text JscLableShowText'>" + _lableTextPopular + "</span><b class='attention-arrow'></b></div></div></div>");
            })
        }, "", "", function (data) {
            for (var _i = 0; _i < data.length; _i++) {
                data[_i]["ClassColor"] = "tag-des-" + (_i + 1) + ""
            }
        })
    }


    function Share() {
        if (Cmn.Func.IsWeiXin()) {
            $(".JscFloatAllHide").show();
            $(".success-float .success-tip").show();
            $(".success-float .success-arrow2").show();
            $(".success-float .success-arrow").hide();
            SetWechatShare("羽西", "羽西", _url, "images/bg/land_bg.jpg", function () {
                $(".success-float,.pop-float").hide();
                console.log("WXShareSuccess");
            });
        } else {
            $(".JscFloatAllHide").show();
            $(".success-float .success-tip").show();
            $(".success-float .success-arrow").show();
            $(".success-float .success-arrow2").hide();
        }
    }

  

    ////////////////////////页面逻辑/////////////////////////////////

    //上传元素选择
    $(".JscChooseFeatures").on("click", function () {
        _ChooseIndex = $(this).index();
    })
    //绑定事件
    BindUpload(".JscReleaseBtn", ".JscPhotoCanvas");


    ////发布选项
    //$(".JscReleaseBtn").on("click", function () {

    //    if (_ChooseIndex!= 0) {
    //        _ChooseIndex = 0;
    //    }
    //    //上传图文
    //    else {

    //    }
    //})
    //点击保存照片
    $(".JscDetermineBtn").on("click", function () {
        _ImageEdit.LockUserAction();
        SiteFunc.FloatOperating(".JscLayer,.JscLableIsShow,.JscUploadLayer", ".JscLayerHide,.JscChoice");
        //查询所有关注的用户
        var _userAttentionIDList = "";
        var _attentionCount = $(".JscPersonalInformation ").size();
        for (var _i = 0; _i < _attentionCount; _i++) {
            if ($(".JscPersonalInformation ").eq(_i).find(".JscATAttention ").hasClass("select")) {
                var _attentionuserID = $(".JscPersonalInformation ").eq(_i).attr("uid").toString();;
                _userAttentionIDList = _userAttentionIDList + ("," + _attentionuserID);
            }
        }
        //把所有标签添加成JOSN
        var _objectLable = "";
        var _josnLable = "";
        var _lableCount = $(".JscLableShow").size();
        for (var _i = 0; _i < _lableCount; _i++) {
            _LableLeft = $(".JscLableShow").eq(_i).css("left");
            _LableLeft = parseInt(_LableLeft.replace("px", ""));
            _LableTop = $(".JscLableShow").eq(_i).css("top");
            _LableTop = parseInt(_LableTop.replace("px", ""));
            _LableText = $(".JscLableShow").eq(_i).find(".JscLableShowText").eq(0).text();

            if ($(".JscLableShow").eq(_i).find(".JscRightLable").css("display") == "none") {
                _LableDirection = 1;
            }
            else {
                _LableDirection = 0;
            }

            _objectLable = _objectLable + ",{\"LableLeft\": \"" + _LableLeft + "\",\"LableTop\":\"" + _LableTop + "\",\"LableText\":\"" + _LableText + "\",\"LableDirection\":\"" + _LableDirection + "\"}";
        }
        if (_IsUploadImgLK) { return; }
        _IsUploadImgLK = true;
        CmnAjax.PostData("Itf/CSharp/Upload.aspx?method=SaveFile", {
            inputFileName: "ImageData",
            ImageData: _ImageEdit.GetCanvas().toDataURL()
        }, function (dat) {
            _UserUploadImg = dat.path;
            if (_objectLable != "" || _objectLable == "undefined") {
                _objectLable = _objectLable.substring(_objectLable.indexOf("{"), _objectLable.length);//JOSN标签
                _josnLable = "{\"IsSuccess\":0,\"ErrMsg\":\"网络异常\",\"RecCount\":" + _lableCount + ", data:[" + _objectLable + "]}";
            }
            if (_userAttentionIDList != "") {
                _userAttentionIDList = _userAttentionIDList.substring(_userAttentionIDList.indexOf(",") + 1, _userAttentionIDList.length);//字符关注ID
            }
            var _param = {
                "Work": _UserUploadImg,
                "JosnLable": _josnLable,
                "UserIDList": _userAttentionIDList
            }
            CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=UserUploadWorks", _param, function (dat) {
                if (dat.IsSuccess == 1) {
                    //上传完成
                    Share();
                    SiteFunc.FloatOperating(".JscUpdateLayer", ".JscLayerHide");
                    SiteFunc.FloatOperating(".JscHeadColumn", ".JscOperatingPiece,.JscLableFloat,.JscLableShowFloat");
                    $(".JscMaterialSelection a").removeClass("select");
                    $(".JscMaterialSelection a").eq(0).addClass("select");
                    _ImageEdit.LockUserActionStickers();

                }
                else if (dat.IsSuccess == 0) {
                    //用户未登录
                    SiteFunc.JumpPage("index.aspx");
                }
                else if (dat.IsSuccess == 2) {
                    Cmn.alert("你还未上传照片！");
                }
                else {
                    Cmn.alert("网络异常！");
                }
                _IsUploadImgLK = false;
                setTimeout(function () { $(".JscLableIsShow").hide(); }, 1500);
            })
        })
    })

    ///////////////////////////////////////元素选择块//////////////////////////////////////
    $(".JscMaterialSelection").on("click", function () {
        var _indexElements = $(this).index();
        if (_indexElements != 4) {
            SiteFunc.SceneJump("choice", 3);
        }
        SiteFunc.FloatOperating(".JscHeadColumn", ".JscOperatingPiece,.JscLableFloat,.JscLableShowFloat");
        $(".JscMaterialSelection a").removeClass("select");
        $(".JscMaterialSelection a").eq(_indexElements).addClass("select");
        //裁剪，旋转
        if (_indexElements == 0) {
            SiteFunc.FloatOperating("", ".JscOperatingHide", true);
            _ImageEdit.LockUserActionStickers();
        }
            //滤镜
        else if (_indexElements == 1) {
            SiteFunc.FloatOperating(".JscTemplateDiv", ".JscOperatingHide");
            _ImageEdit.LockUserActionImage();
        }
            //贴纸，相框
        else if (_indexElements == 2) {
            SiteFunc.FloatOperating(".JscOperatingPiece", ".JscOperatingHide");
        }
            //标签
        else if (_indexElements == 3) {
            SiteFunc.FloatOperating(".JscLableDiv", ".JscOperatingHide");
            _ImageEdit.LockUserAction();
        }
            //@人
        else if (_indexElements == 4) {
            SiteFunc.SceneJump("release-who", 3);
            SiteFunc.FloatOperating("", ".JscHeadColumn", true);
        }
    })
    /////////////////////////////////////////标签块////////////////////////////////////
    $(".JscLableAddBtn").on("click", function () {
        SiteFunc.FloatOperating(".JscLableFloat,.JscLableShowFloat", ".JscHeadColumn");
    })
    //标签数据填充
    $(".JscLableDetermineBtn").on("click", function () {
        _LableText = $(".JscLableText").val();
        if (_LableText != "") {
            $(".JscPhotoCanvas").append("<div class='set-label JscLableShow'><div class='choose-desc JscLeftLable JscThisLable' style='display:none;'><div class='choose-desc-box'><span class='attention-desc-text JscLableShowText'>" + _LableText + "</span><b class='attention-arrow'></b></div></div><div class='choose-desc-round'><i class='round'></i></div><div class='choose-desc tags-set JscRightLable JscThisLable' style='visibility: visible;'><div class='choose-desc-box choose-desc-fr'><span class='attention-desc-text JscLableShowText'>" + _LableText + "</span><b class='attention-arrow'></b></div></div></div>");
            //$(".JscPhotoCanvas").append("<div class='choose-desc JscLableShow'><div class='choose-desc-box JscLableSelectChange select'><span class='attention-desc-text JscLableTextRight'>" + _LableText + "</span><b class='attention-arrow JscLableTextLeft'>" + _LableText + "</b></div><div class='choose-desc-round'><i class='round'></i></div></div>");
            //$(".JscLableTextRight,.JscLableTextLeft").html(_LableText);
            SiteFunc.FloatOperating(".JscLableShow,.JscHeadColumn", ".JscLableShowFloat,.JscLableFloat");
            $(".JscLableText").val("");
        }
        else {
            SiteFunc.FloatOperating(".JscLableShow,.JscHeadColumn", ".JscLableShowFloat,.JscLableFloat");
        }

    })



    //标签拖拽
    Cmn.UI.Drag(".JscLableShow", {
        dragParent: $(".JscPhotoCanvas"),   //拖动元素的父亲
        containment: $(".JscPhotoCanvas"),  //拖动对象的拖动区域对象
        axis: "x,y",                //拖动方向 x y 空
        onStart: function (e) {
            _LobaleIndex = $(this).index();
            _LobaleIndex = _LobaleIndex - 2;
            $(".JscChoice").hide();
            _Self = this;
            $(_Self).attr("startx", $(_Self).position().left);
            $(_Self).attr("starty", $(_Self).position().top);

        },//开始拖动
        onMove: function () {
            $(_Self).attr("startx", "");
            $(_Self).attr("starty", "");

        }, //拖动
        onEnd: function (e) {
            var _top;//高度
            var _left;//宽度
            //点击切换标签方向
            if ($(this).attr("startx") && Math.abs($(this).attr("startx") - $(this).position().left) < 2 ||
                $(this).attr("starty") && Math.abs($(this).attr("starty") - $(this).position().top) < 2) {
                
                if ($(this).find(".JscLeftLable").css("display") == "none") {
                    $(this).find(".JscRightLable").css("display", "none");
                    $(this).find(".JscLeftLable").css("display", "block");
                    _LableDirection = 1;
                }
                else {
                    $(this).find(".JscLeftLable").css("display", "none");
                    $(this).find(".JscRightLable").css("display", "block");
                    _LableDirection = 0
                }
            }
            if ($(this).find(".JscLeftLable").css("display") != "none") {
                _top = parseInt($(this).css("top")) - 31;
                _left = parseInt($(this).css("left")) - 4;
                $(".JscChoice").css("top", _top + "px");
                $(".JscChoice").css("left", _left + "px");
                $(".JscChoice").show();
            }
            else {
                _top = parseInt($(this).css("top")) - 31;
                _left = parseInt($(this).css("left")) + 221;
                $(".JscChoice").css("top", _top + "px");
                $(".JscChoice").css("left", _left + "px");
                $(".JscChoice").show();
            }
           
        }
    });
    $(".JscChoice").on("click", function () {
        $(".JscLableShow").eq(_LobaleIndex).remove();
        $(".JscChoice").hide();
    })
    ///////////////////////////////滤镜，贴纸操作////////////////////////////////////
    //相框
    $(".JscOperatingTemplate").on("click", function () {
        _ImageEdit.LockUserActionStickers();
        SiteFunc.FloatOperating(".JscPhotoFrameDiv", ".JscOperatingPiece,.JscOperatingHide");
    })

    $(".JscOperatingStickers").on("click", function () {
        _ImageEdit.LockUserActionImage();//解锁操作贴纸
        SiteFunc.FloatOperating(".JscStickersShow ", ".JscOperatingPiece,.JscOperatingHide");
    })


    /////////////////////////////////@人操作区/////////////////////////////////////////
    //查询关注好友
    $(".JscAttentionTextBtn").on("click", function () {
        var _search = $(".JscAttentionText").val();
        AttentionThrown(_search);
    })

    /////////////////////////////////////页面数据抛出//////////////////////////////////////
    PhotoFrameThrown();//相框抛出
    FilterThrown();//滤镜抛出
    AttentionThrown();//用户关注好友抛出
    PopularTagsThrown();//热门标签抛出
    StickersThrows();//贴纸抛出
    ///////////////////////////////返回///////////////////////////////////
    $(".JscHidePhotoBtn").on("click", function () {
        if ($(".JscDetermineBtn").css("display") == "none") {
            SiteFunc.JumpPage("Home.aspx");
        }
        else {
            SiteFunc.SceneJump(".release", 3);
            $(".JscDetermineBtn").hide();
            _ImageEdit.RemoveFilterEffect();
            _ImageEdit.RemoveStickers();
            _ImageEdit.RemoveModel();
            $(".JscLableShow").remove();
            SiteFunc.FloatOperating(".JscHeadColumn", ".JscOperatingPiece,.JscLableFloat,.JscLableShowFloat");
            $(".JscMaterialSelection a").removeClass("select");
            $(".JscMaterialSelection a").eq(0).addClass("select");
            _ImageEdit.LockUserActionStickers();
        }
    })

    $(".JscRevocationBtn").on("click", function () {
        SiteFunc.FloatOperating(".JscOperatingPiece", ".JscStickersShow");
    })

    $(".JscLableFloat").on("click", function () {
        SiteFunc.FloatOperating(".JscLableShow,.JscHeadColumn", ".JscLableShowFloat,.JscLableFloat");
    })
    $(".JscLableShowFloat").on("click", function (e) {
        e.stopPropagation();
    })
    $(".JscPhotoFrameDiv").on("touchmove", function (e) {
        e.stopPropagation();
    })
    $(".JscArrowAll").on("touchmove", function (e) {
        e.stopPropagation();
    })
    $(".JscTochmoveStop").on("touchmove", function (e) {
        e.stopPropagation();
    })




    ///分享操作
    $(".JscFloatAllHide").on("click", function () {
        SiteFunc.JumpPage("Home.aspx", location.href);
        $(".JscFloatAllHide").hide();
        $(".JscFloatAllHide").hide();
    })
})


