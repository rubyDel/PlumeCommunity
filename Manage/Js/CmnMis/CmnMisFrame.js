﻿CmnMis_Frame_Version = "2.1", "undefined" == typeof CmnMis && (CmnMis = {}), CmnMis.Frame = new function () { var _Self, _MenuTree, LoadGlobalTemplate, BindShowUserFormClick, GetModuleByID, ModuleUserFormToMenu, ModuleSonToMenu, InitMenu, ShowSubMenu; this.EventFrameInitComplete = null, this.EventBeforeEveryGetRecList = null, this.EventBeforeEveryFillRecList = null, this.EventAfterEveryRecListLoad = null, this.EventAfterEverySave = null, this.EventAfterEveryAddSave = null, this.EventAfterEveryUpdateSave = null, this.EventEveryInitComplete = null, this.EventEveryUpdateInitComplete = null, this.EventEveryAddInitComplete = null, this.EventBeforeEveryDelete = null, this.EventBeforeEveryAddSave = null, this.EventBeforeEveryUpdateSave = null, this.EventBeforeEverySave = null, this.EventOnEveryCancel = null, this.OnFrameInitComplete = new Cmn.Event(this), this.BeforeEveryGetRecList = new Cmn.Event(this), this.BeforeEveryFillRecList = new Cmn.Event(this), this.AfterEveryRecListLoad = new Cmn.Event(this), this.AfterEverySave = new Cmn.Event(this), this.AfterEveryAddSave = new Cmn.Event(this), this.AfterEveryUpdateSave = new Cmn.Event(this), this.OnEveryInitComplete = new Cmn.Event(this), this.OnEveryUpdateClick = new Cmn.Event(this), this.OnEveryUpdateInitComplete = new Cmn.Event(this), this.OnEveryAddClick = new Cmn.Event(this), this.OnEveryAddInitComplete = new Cmn.Event(this), this.BeforeEveryDelete = new Cmn.Event(this), this.BeforeEveryAddSave = new Cmn.Event(this), this.BeforeEveryUpdateSave = new Cmn.Event(this), this.BeforeEverySave = new Cmn.Event(this), this.OnEveryCancel = new Cmn.Event(this), this.Itfurl = "", this.UserFormList = new Array, this.Cfg = { Selector: { MenuList: ".cmn-MenuList", ModuleList: ".cmn-ModuleList", SubMenuContainer: ".cmn-SubMenuContainer", MenuNavi: ".cmn-MenuNavi", LoginUserName: ".cmn-LoginUserName", LoginPassWord: ".cmn-LoginPassWord", LoginSecurityCode: ".cmn-LoginSecurityCode", LoginbtnLogin: ".cmn-LoginbtnLogin", btnExitLogin: ".cmn-btnExitLogin", CurLoginUserName: ".cmn-CurLoginUsername", UserFormDesc: ".cmn-UserFormDesc", UserFormTemplate: ".cmn-UserFormTemplate", UserFormMoudleDesc: ".cmn-UserFormMoudleDesc", SysName: ".cmn-SysName", CopyRight: ".cmn-CopyRight", LogoUrl: ".cmn-LogoUrl" }, TemplatePath: "" }, this.UserFormHtmlCache = { DefaultUserFormTemplate: "", DefaultAddEditTemplate: "", RecContainerHtml: "" }, _Self = this, _MenuTree = null, this.TabItemHtml = "", this.Init = function (a) { CmnMis.Frame.Itfurl = a, CmnMis.Func.SetTitle(), $(CmnMis.Frame.Cfg.Selector.SysName).html(CmnMis.Func.GetSysCfg("SysName")), $(CmnMis.Frame.Cfg.Selector.CopyRight).html(CmnMis.Func.GetSysCfg("CopyRight")); var b = CmnMis.Func.GetSysCfg("LogoUrl"); "" != b && $(CmnMis.Frame.Cfg.Selector.LogoUrl).attr("src", Cmn.Func.AddSiteRoot(CmnMis.Func.GetSysCfg("LogoUrl"))), _Self.UserFormHtmlCache.DefaultUserFormTemplate = $(CmnMis.Frame.Cfg.Selector.UserFormTemplate).html(), _Self.UserFormHtmlCache.DefaultAddEditTemplate = $(CmnMis.Frame.Cfg.Selector.UserFormTemplate + " " + (new CmnMis.UserForm).Selector.AddEditView).html(), $(CmnMis.Frame.Cfg.Selector.MenuList).append('<input type="hidden" class="cmn-menu-UserFormID" value="{userformid}" />'), $(CmnMis.Frame.Cfg.Selector.ModuleList).hide(), LoadGlobalTemplate(function () { CmnAjax.PostData(Cmn.Func.AddParamToUrl(a, "method=GetMenu"), { ModuleID: Cmn.Func.GetParamFromUrl("ModuleID") }, function (b) { CmnMis.Func.IsLoginFromAjax(b), CmnMis.Frame.UserFormList.length = 0; var c = function (b, d, e) { var f, g, h, i, j; for (f = 0; f < b.length; f++) if (b[f]["ParentModule"] = e, b[f]["Sons"] && c(b[f]["Sons"], d ? d : b[f], b[f]), g = null, h = d, b[f]["UserForms"] && (g = b[f]["UserForms"], h || (h = b[f])), null != g) for (i = 0; i < g.length; i++) g[i]["ParentModule"] = b[f], j = new CmnMis.UserForm, j.UserFormID = g[i]["UserFormID"], j.UserFormDesc = g[i]["FormDesc"], j.UserFormIcon = Cmn.Func.AddSiteRoot(g[i]["UserFormIcon"]), j.ModuleDesc = b[f]["ModuleDesc"], j.ModuleID = b[f]["ModuleID"], j.ModuleIcon = void 0 == b[f]["ModuleIcon"] ? "" : Cmn.Func.AddSiteRoot(b[f]["ModuleIcon"]), j.RootModuleDesc = h["ModuleDesc"], j.RootModuleID = h["ModuleID"], j.RootModuleIcon = void 0 == h["ModuleIcon"] ? "" : Cmn.Func.AddSiteRoot(h["ModuleIcon"]), j.TableName = g[i]["TableName"], j.ListTemplateFileName = g[i]["ListTpl"], j.EditTemplateFileName = g[i]["EditTpl"], j.JsTemplateFileName = g[i]["JsTpl"], j.RecPageSize = null == g[i]["PageSize"] ? 15 : g[i]["PageSize"], j.ItfUrl = a, j.UserFormUrl = g[i]["FormUrl"], j.IsShowInMenu = void 0 == g[i]["IsShow"] || "0" != g[i]["IsShow"] && "false" != g[i]["IsShow"].toLowerCase() ? !0 : !1, j.ParentModule = g[i]["ParentModule"], CmnMis.Frame.UserFormList[CmnMis.Frame.UserFormList.length] = j }; _MenuTree = b.data, c(b.data, null, null), InitMenu(), CmnAjax.PostData(Cmn.Func.AddParamToUrl(a, "method=GetLoginUserName"), "{}", function (a) { $(CmnMis.Frame.Cfg.Selector.CurLoginUserName).html("用户：" + a.UserName) }), $(CmnMis.Frame.Cfg.Selector.btnExitLogin).unbind("click").bind("click", function () { CmnAjax.PostData(Cmn.Func.AddParamToUrl(a, "method=ExitLogin"), "{}", function (a) { "1" == a.IsSuccess ? window.location.href = "Login.html?SysName=" + Cmn.Func.GetParamFromUrl("SysName", window.location.href) : Cmn.alert("退出登录错误！错误信息：" + a.ErrMsg) }) }), CmnMis.Func.IsSysAdmin() && ($(".cmn-OpenNewByModuleID").show(), $(".cmn-OpenNewByModuleID a").each(function () { $(this).attr("href", $(this).attr("href") + "&SysName=" + Cmn.Func.GetParamFromUrl("SysName")) })), null != CmnMis.Frame.EventFrameInitComplete && CmnMis.Frame.EventFrameInitComplete(), CmnMis.Frame.OnFrameInitComplete.Trigger() }) }), $(window).scroll(function () { $(".MenuExpansionWrap").hide() }) }, LoadGlobalTemplate = function (onComplete) { CmnMis.TableOpt.GetData("cmn_template", { Condition: "[template_type_id]=5 or [template_type_id]=6" }, !1, function (data) { var _i, _jsTpContent, _htmlTpContent, _tmpDom; for (_i = 0; _i < data.data.length; _i++) "5" == data.data[_i]["template_type_id"] ? (_jsTpContent = CmnAjax.GetFile(Cmn.Func.AddParamToUrl(data.data[_i]["file_name"], "r_=" + Math.random())), eval(_jsTpContent + " \r\n//@ sourceURL=" + data.data[_i]["file_name"])) : "6" == data.data[_i]["template_type_id"] && (_htmlTpContent = CmnAjax.GetFile(Cmn.Func.AddParamToUrl(data.data[_i]["file_name"], "r_=" + Math.random())), _tmpDom = $("<div>" + _htmlTpContent + "</div>"), _tmpDom.hide(), _tmpDom.insertAfter($("body").children().last()), setTimeout(function () { _tmpDom.show() }, 500)); onComplete && onComplete() }) }, BindShowUserFormClick = function () { var _menuActiveClass = $(CmnMis.Frame.Cfg.Selector.SubMenuContainer).attr("CmnMenuActiveClass"); $(".dat-formdesc").unbind("click").bind("click", function () { var _i, _userFormInfo, _userFormID = "", _tmpDom = $(this); for (_i = 0; 4 > _i; _i++) { if (_tmpDom.children(".cmn-menu-UserFormID").length > 0) { _userFormID = _tmpDom.children(".cmn-menu-UserFormID").val(); break } _tmpDom = _tmpDom.parent() } return "" == _userFormID ? (Cmn.Log("点击菜单的时候找不到对应的用户表单代码！"), void 0) : (_userFormInfo = CmnMis.Func.GetUserFormByID(_userFormID), null != _userFormInfo && "" != _userFormInfo.UserFormUrl && null != _userFormInfo.UserFormUrl ? _userFormInfo.UserFormUrl.indexOf("http:") >= 0 ? window.open(_userFormInfo.UserFormUrl) : eval(_userFormInfo.UserFormUrl) : _Self.ShowUserForm(_userFormID), $(".MenuExpansionWrap").hide(), "" != _menuActiveClass && $(CmnMis.Frame.Cfg.Selector.SubMenuContainer).find("." + _menuActiveClass).removeClass(_menuActiveClass), $(this).parent(".MenuExpansionDd").length > 0 || "" != _menuActiveClass && ($(CmnMis.Frame.Cfg.Selector.SubMenuContainer).find("." + _menuActiveClass).removeClass(_menuActiveClass), $(this).parent().addClass(_menuActiveClass)), void 0) }) }, GetModuleByID = function (a, b) { var c, d; for (c = 0; c < b.length; c++) { if (b[c]["ModuleID"] == a) return b[c]; if (b[c]["Sons"] && (d = GetModuleByID(a, b[c]["Sons"]), null != d)) return d } return null }, ModuleUserFormToMenu = function (a) { var c, b = new Array; if (a["UserForms"]) for (c = 0; c < a["UserForms"].length; c++) (void 0 == a["UserForms"][c]["IsShow"] || "0" != a["UserForms"][c]["IsShow"] && "false" != a["UserForms"][c]["IsShow"].toLowerCase()) && (b[b.length] = { userformid: a["UserForms"][c].UserFormID, formdesc: a["UserForms"][c].FormDesc, userformicon: Cmn.Func.AddSiteRoot(a["UserForms"][c].UserFormIcon) }); return b }, ModuleSonToMenu = function (a, b) { var d, c = b; if (void 0 == c && (c = new Array), a["Sons"]) for (d = 0; d < a["Sons"].length; d++) c[c.length] = { userformmoduleid: a["Sons"][d].ModuleID, userformmoduledesc: a["Sons"][d].ModuleDesc, userformmoduleicon: Cmn.Func.AddSiteRoot(a["Sons"][d].ModuleIcon) }; return c }, InitMenu = function () { var a, c; for ($(CmnMis.Frame.Cfg.Selector.ModuleList).append('<input type="hidden" class="cmn-menu-UserFormModuleID" value="{userformmoduleid}" />'), $(".cmn-SubModuleList").append('<input type="hidden" value=""  class="cmn-menu-UserFormModuleID dat-userformmoduleid-value"  />'), a = new Array, c = 0; c < _MenuTree.length; c++) a[a.length] = { userformmoduledesc: _MenuTree[c].ModuleDesc, userformmoduleid: _MenuTree[c].ModuleID, userformmoduleicon: Cmn.Func.AddSiteRoot(_MenuTree[c].ModuleIcon) }; Cmn.FillData(CmnMis.Frame.Cfg.Selector.ModuleList, a), $(CmnMis.Frame.Cfg.Selector.ModuleList).find(CmnMis.Frame.Cfg.Selector.MenuList).length > 0 ? ($(CmnMis.Frame.Cfg.Selector.ModuleList).each(function () { var d, e, a = $(this).find(".cmn-menu-UserFormModuleID").val(), b = GetModuleByID(a, _MenuTree), c = ModuleUserFormToMenu(b); Cmn.FillData($(this).find(CmnMis.Frame.Cfg.Selector.MenuList)[0], c), d = $(this).find(".cmn-SubModuleList"), d.length > 0 && (e = ModuleSonToMenu(b), Cmn.FillData($(this).find(".cmn-SubModuleList")[0], e), $(this).find(".cmn-SubModuleList a").each(function () { $(this).html($(this).html() + "...") })) }), BindShowUserFormClick(), $(".dat-userformmoduledesc").unbind("click").bind("click", function () { var c, d, e, a = "", b = $(this).parent(); if (b.hasClass("cmn-SubModuleList")) { for (a = "", b = $(this).parent(), $(".MenuExpansionWrap").show(), c = 0; 4 > c; c++) { if (b.children(".cmn-menu-UserFormModuleID").length > 0) { a = b.children(".cmn-menu-UserFormModuleID").val(); break } b = b.parent() } "" != a && (d = GetModuleByID(a, _MenuTree), e = new Array, d["UserForms"] && (e[e.length] = { userformmoduleid: d.ModuleID, userformmoduledesc: d.ModuleDesc, userformmoduleicon: Cmn.Func.AddSiteRoot(d.ModuleIcon) }), ModuleSonToMenu(d, e), $(".MenuExpansionWrap .MenuExpansionDl").append('<input type="hidden" class="cmn-menu-UserFormModuleID dat-userformmoduleid-value" value="" />'), Cmn.FillData(".MenuExpansionWrap .MenuExpansionDl", e), $(".MenuExpansionWrap .MenuExpansionDl").each(function () { var c, f; for (b = $(this), c = 0; 4 > c; c++) { if (b.children(".cmn-menu-UserFormModuleID").length > 0) { a = b.children(".cmn-menu-UserFormModuleID").val(); break } b = b.parent() } a == d.ModuleID ? (e = ModuleUserFormToMenu(d), b.find(".MenuExpansionDd a").append('<input type="hidden" class="cmn-menu-UserFormID" value="{userformid}" />'), Cmn.FillData(b.find(".MenuExpansionDd a")[0], e)) : (f = GetModuleByID(a, _MenuTree), e = ModuleUserFormToMenu(f), b.find(".MenuExpansionDd a").append('<input type="hidden" class="cmn-menu-UserFormID" value="{userformid}" />'), Cmn.FillData(b.find(".MenuExpansionDd a")[0], e)), BindShowUserFormClick() })), $(".MenuExpansionReturn").unbind("click").bind("click", function () { $(".MenuExpansionWrap").hide() }) } else { for (c = 0; 4 > c; c++) { if (b.find(".cmn-menu-UserFormModuleID").length > 0) { a = b.find(".cmn-menu-UserFormModuleID").val(); break } b = b.parent() } if ("" == a) return Cmn.Log("点击菜单的时候找不到对应的用户表单模块代码！"), void 0; $(CmnMis.Frame.Cfg.Selector.SubMenuContainer).hide(), b.find(CmnMis.Frame.Cfg.Selector.SubMenuContainer).slideDown(500, function () { var c, d; b.find(CmnMis.Frame.Cfg.Selector.SubMenuContainer).find(".dat-formdesc:visible").length > 0 ? b.find(CmnMis.Frame.Cfg.Selector.SubMenuContainer).find(".dat-formdesc:visible").eq(0).click() : (c = GetModuleByID(a, _MenuTree), d = function (a) { return a["UserForms"] ? a["UserForms"][0] : a["Sons"] ? d(a["Sons"][0]) : void 0 }, _Self.ShowUserForm(d(c)["UserFormID"])) }) } }), $(CmnMis.Frame.Cfg.Selector.ModuleList).find(".dat-userformmoduledesc").eq(0).click()) : (CmnMis.Frame.UserFormList.length > 0 && $(CmnMis.Frame.Cfg.Selector.ModuleList).length > 0 && ShowSubMenu(CmnMis.Frame.UserFormList[0].RootModuleID), $(".dat-userformmoduledesc").unbind("click").bind("click", function () { var c, a = "", b = $(this).parent(); for (c = 0; 4 > c; c++) { if (b.find(".cmn-menu-UserFormModuleID").length > 0) { a = b.find(".cmn-menu-UserFormModuleID").val(); break } b = b.parent() } return "" == a ? (Cmn.Log("点击菜单的时候找不到对应的用户表单模块代码！"), void 0) : (ShowSubMenu(a), void 0) })), $(CmnMis.Frame.Cfg.Selector.ModuleList).slideDown(500) }, ShowSubMenu = function (moduleID) { var _menuData, _firstUserFormID, _userFormMoudleDesc, _i; for ($(CmnMis.Frame.Cfg.Selector.MenuList).hide(), _menuData = "", _firstUserFormID = "", _userFormMoudleDesc = "", _i = 0; _i < CmnMis.Frame.UserFormList.length; _i++) CmnMis.Frame.UserFormList[_i].ModuleID != moduleID && "" != moduleID || 1 != CmnMis.Frame.UserFormList[_i].IsShowInMenu || ("" == _userFormMoudleDesc && (_userFormMoudleDesc = CmnMis.Frame.UserFormList[_i].ModuleDesc), "" != _menuData && (_menuData += ","), _menuData += "{userformid:'" + CmnMis.Frame.UserFormList[_i].UserFormID + "',formdesc:'" + CmnMis.Frame.UserFormList[_i].UserFormDesc + "'}", "" == _firstUserFormID && (_firstUserFormID = CmnMis.Frame.UserFormList[_i].UserFormID)); Cmn.FillData(CmnMis.Frame.Cfg.Selector.MenuList, eval("[" + _menuData + "]")), $(CmnMis.Frame.Cfg.Selector.UserFormMoudleDesc).html(_userFormMoudleDesc), "" != _firstUserFormID && _Self.ShowUserForm(_firstUserFormID), BindShowUserFormClick(), $(CmnMis.Frame.Cfg.Selector.MenuList).show(600) }, this.InitLogin = function (a, b, c) { CmnMis.Frame.Itfurl = a, CmnMis.Func.SetTitle(), $(CmnMis.Frame.Cfg.Selector.CopyRight).html(CmnMis.Func.GetSysCfg("CopyRight")), arguments.length < 3 && (c = b, b = void 0), $(CmnMis.Frame.Cfg.Selector.LoginbtnLogin).unbind("click").bind("click", function () { var d = $(CmnMis.Frame.Cfg.Selector.LoginUserName).val(), e = $(CmnMis.Frame.Cfg.Selector.LoginPassWord).val(); if (Cmn.IsType(b, "function")) b({ UserName: d, PassWord: e }); else { if ("" == d) return Cmn.alert("用户名不能为空！"), void 0; if ("" == e) return Cmn.alert("密码不能为空！"), void 0 } CmnAjax.PostData(Cmn.Func.AddParamToUrl(a, "method=Login"), "{UserName:'" + d + "',PassWord:'" + e + "'}", function (a) { "0" == a.IsSuccess && a.ErrMsg.indexOf("软件序列号非法") >= 0 && (Cmn.alert("软件序列号非法！"), window.location.href = "Tools/SetSN.htm?SysName=" + Cmn.Func.GetParamFromUrl("SysName")), Cmn.IsType(c, "function") && c(a) }) }), window.onload = function () { $(CmnMis.Frame.Cfg.Selector.LoginUserName).focus() } }, this.ActiveUserForm = function (a, b, c) { var d, e, f; (null == b || void 0 == b) && (b = !0), (void 0 == c || null == c) && (c = !0), "" == CmnMis.Frame.TabItemHtml && (CmnMis.Frame.TabItemHtml = Cmn.Func.GetOuterHtml($(".cmn-tab-item"))), b && CmnMis.Frame.HideUserForm(), $(CmnMis.Frame.Cfg.Selector.UserFormTemplate + ":gt(0)").remove(), d = $(a.GetUserFormSelector()), d.length > 0 ? 1 == c ? d.slideDown(500) : d.show() : ($(".cmn-UserFormTemplate[name='cmn-UserForm']").length > 0 ? ($(".cmn-UserFormTemplate[name='cmn-UserForm']").attr("name", "cmn-UserForm" + a.UserFormID), $(a.GetUserFormSelector()).show()) : $(CmnMis.Frame.Cfg.Selector.UserFormTemplate + ":first").parent().append('<div><div class="cmn-UserFormTemplate" name="cmn-UserForm' + a.UserFormID + '">' + _Self.UserFormHtmlCache.DefaultUserFormTemplate + "</div></div>"), $(".cmn-tab-item-id").length <= 0 && $(".cmn-tab-item:first").parent().append(CmnMis.Frame.TabItemHtml), e = $(".cmn-tab-item-id"), e.removeClass("cmn-tab-item-id"), e.addClass("cmn-tab-item" + a.UserFormID), e.attr("UserFormID", a.UserFormID), f = null, e.children("a").unbind("click").bind("click", function () { clearTimeout(f), f = setTimeout(function () { _Self.ShowUserForm(a.UserFormID, null, !1) }, 300) }), e.children("a").unbind("dblclick").bind("dblclick", function () { clearTimeout(f), CmnMis.Frame.CloseUserForm(a) }), e.mouseenter(function () { e.children("a").html(e.children("a").html() + "<span class='cmn-CloseUserForm' UserFormID='" + a.UserFormID + "' style='font-size:16px;font-weight:bold;'> × </span>"), $(".cmn-CloseUserForm").unbind("click").bind("click", function (b) { return b.preventDefault(), CmnMis.Frame.CloseUserForm(a), !1 }) }), e.mouseleave(function () { var a = e.children("a").html(); a = a.substring(0, a.toLowerCase().indexOf("<span")), e.children("a").html(a) }), $(".cmn-tab-item" + a.UserFormID + " " + CmnMis.Frame.Cfg.Selector.UserFormDesc).html(a.UserFormDesc)), $(".cmn-tab-item a").removeClass("Selected"), $(".cmn-tab-item a").addClass("NoSelected"), $(".cmn-tab-item" + a.UserFormID + " a").removeClass("NoSelected"), $(".cmn-tab-item" + a.UserFormID + " a").addClass("Selected") }, this.CloseUserForm = function (a) { $(".cmn-UserFormTemplate").length <= 1 ? Cmn.alert("不能关闭！至少要留一个用户表单。") : ($(a.GetUserFormSelector()).remove(), $(".cmn-tab-item" + a.UserFormID).remove(), a == CmnMis.CurUserFormInfo && _Self.ShowUserForm($(".cmn-tab-item").first().attr("UserFormID"), null, !1)) }, this.HideUserForm = function (a) { null == a || void 0 == a ? $(CmnMis.Frame.Cfg.Selector.UserFormTemplate + "[display!='none']").hide() : $(a.GetUserFormSelector()).hide() }, this.IsExistUserForm = function (a) { return $(a.GetUserFormSelector()).length > 0 ? !0 : !1 }, this.ShowUserForm = function (a, b, c) { var e, f, g, d = CmnMis.Func.GetUserFormByID(a); if (null == d) return !1; if (null != CmnMis.CurUserForm && CmnMis.CurUserForm != d && CmnMis.CurUserForm.EventOnLeave && CmnMis.CurUserForm.EventOnLeave(), CmnMis.CurUserForm = d, (null == c || void 0 == c) && (c = !0), 0 == c && _Self.IsExistUserForm(d)) return _Self.ActiveUserForm(d), void 0; for (d.Show(b, c), e = "", e = " <span class='MenuExpansionTitleList'>" + d.UserFormDesc + "</span>", f = d, g = 0; 10 > g && null != f.ParentModule; g++) e = " <span class='MenuExpansionTitleList'>" + f.ParentModule["ModuleDesc"] + "</span>>" + e, f = f.ParentModule; $(".MenuExpansionTitleWrap").html(" <span class='MenuExpansionReturn'>返回</span>" + e), $(_Self.Cfg.Selector.MenuNavi).html(e) } };