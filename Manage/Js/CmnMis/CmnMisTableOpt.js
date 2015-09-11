﻿CmnMis_CmnMisTableOpt_Version = "2.2", "undefined" == typeof CmnMis && (CmnMis = {}), CmnMis.TableCache = function () { var d, a = this, b = new Array, c = new Array; this.ForeignKeyFieldName = "", this.UserFormInfo = null, this.MaxNewRecID = 1, this.BeforeAdd = new Cmn.Event(this), this.BeforeUpdate = new Cmn.Event(this), this.BeforeDelete = new Cmn.Event(this), this.Init = function (d, e, f, g) { a.UserFormInfo = d, a.ForeignKeyFieldName = e, a.MaxNewRecID = 1, b.length = 0, c.length = 0, CmnAjax.PostData(CmnMis.Func.GetItfUrl(a.UserFormInfo, d.Cfg.MethodName.GetRecList), { Condition: "[" + e + "]='" + f + "'" }, function (a) { b = a.data, g && g() }) }, d = function (b) { var c, d, e; for (c = 0; c < a.UserFormInfo.ColInfoRecList.length; c++) { d = !1; for (e in b) if (a.UserFormInfo.ColInfoRecList[c].ColName == e) { d = !0; break } d || (b[a.UserFormInfo.ColInfoRecList[c].ColName] = "") } return b }, this.Add = function (e, f) { var h, g = e ? $(e) : $(a.UserFormInfo.GetSelector(a.UserFormInfo.Selector.EditControlPanel)); return CmnMis.UI.Control.VerifyControlInput(g, "", function (a) { f ? !f(a) == !1 && Cmn.alert(a.Msg) : Cmn.alert(a.Msg) }) === !1 ? !1 : (h = CmnMis.UI.Control.GetValueList(g, !0), h = d(h), a.BeforeAdd.Trigger([h, b, c]) === !1 ? !1 : (h[a.UserFormInfo.KeyColName] = "ID_" + a.MaxNewRecID++, b[b.length] = h, c[c.length] = h, c[c.length - 1].CmnOpt = "Add", !0)) }, this.Update = function (d, e, f) { var h, i, j, k, l, g = e ? $(e) : $(a.UserFormInfo.GetSelector(a.UserFormInfo.Selector.EditControlPanel)); if (CmnMis.UI.Control.VerifyControlInput(g, "", function (a) { f ? !f(a) == !1 && Cmn.alert(a.Msg) : Cmn.alert(a.Msg) }) === !1) return !1; if (h = CmnMis.UI.Control.GetValueList(g), a.BeforeUpdate.Trigger([h, b, c]) === !1) return !1; for (i = 0; i < b.length; i++) if (b[i][a.UserFormInfo.KeyColName] == d) { for (j in b[i]) void 0 == h[j] && (h[j] = b[i][j]); for (b[i] = h, h.CmnOpt = "Update", k = !1, l = 0; l < c.length; l++) if (c[l][a.UserFormInfo.KeyColName] == d) { "Add" == c[l].CmnOpt && (h.CmnOpt = "Add"), c[l] = h, k = !0; break } k || (c[c.length] = h); break } return !0 }, this.Delete = function (d) { var e, f; if (a.BeforeDelete.Trigger([d, b, c]) !== !1) for (e = 0; e < b.length; e++) if (b[e][a.UserFormInfo.KeyColName] == d) { for (f = 0; f < c.length; f++) c[f][a.UserFormInfo.KeyColName] == d && c.splice(f--, 1); d.indexOf("ID_") < 0 && (c[c.length] = b[e], c[c.length - 1].CmnOpt = "Delete"), b.splice(e, 1); break } }, this.GetData = function (c) { var d, e, f; if (void 0 == c || null == c || "" == c) return b; if (d = c["RecID"], e = new Array, void 0 != d && "" != d) for (f = 0; f < b.length; f++) if (b[f][a.UserFormInfo.KeyColName] == d) { e[e.length] = b[f]; break } return e }, this.DataPaging = function (a, c, d, e, f, g, h) { function j(c) { var d, g; for (null != i.EventBeforePaging && i.EventBeforePaging(), d = new Array, g = (c - 1) * e; g < b.length && (d[d.length] = $.extend({}, b[g]), !(d.length >= e)) ; g++); return h && h(d), Cmn.FillData(a, d), f && f({ IsSuccess: 1, RecCount: b.length, data: d }), !0 } this.EventBeforePaging = null, Cmn.FillData(a, []), g || (g = 1); var i = this; this.Paging = new Cmn.Paging(d, 0, e, j), this.Refresh = function () { var j, d = new Array; for (j = (g - 1) * e; j < b.length && (d[d.length] = $.extend({}, b[j]), !(d.length >= e)) ; j++); return i.Paging.RecCount = b.length, i.Paging.ToPage(g, !1), h && h(d), Cmn.FillData(a, d), f && f({ IsSuccess: 1, RecCount: b.length, data: d }), !0 }, setTimeout(function () { i.Refresh(i.Paging) }, 30) }, this.GetChangeRecList = function () { return c } }, function (a, b) { var c = a.$; CmnMis.TableOpt = { GetUserForm: function (a) { var b, d; return 0 == Cmn.Func.IsString(a) ? a : (b = c(document).data(a), "object" == typeof b ? b : (d = CmnAjax.GetData(InterfaceUrl + "?method=GetUserFormInfo", "{TableName:'" + a + "'}"), CmnMis.Func.IsLoginFromAjax(d), b = new CmnMis.UserForm, b.ColInfo = d.data, b = CmnMis.Func.CheckColInfo(b), b.KeyColName = d.KeyColName, b.ItfUrl = InterfaceUrl, b.UserFormUrl = d.formurl, b.UserFormID = d.userformid, b.UserFormDesc = d.formdesc, b.ModuleDesc = d.userformmoduledesc, b.ModuleID = d.userformmoduleid, b.TableName = d.tablename, b.ListTemplateFileName = d.ListTemplateFileName, b.EditTemplateFileName = d.EditTemplateFileName, b.JsTemplateFileName = d.JsTemplateFileName, b.RecPageSize = null == d.pagesize ? 15 : d.pagesize, c(document).data(a, b), b)) }, GetUserFromInfo: function (a) { return CmnMis.TableOpt.GetUserForm(a) }, InitAddPanel: function (a, b) { var d = CmnMis.TableOpt.GetUserForm(a); c(b).parents(CmnMis.Frame.Cfg.Selector.UserFormTemplate).length <= 0 && (c(b).addClass(CmnMis.Frame.Cfg.Selector.UserFormTemplate.replace(/[\s\S]*([\.]|[\#])/g, "")), c(b).attr("name", "cmn-UserForm" + d.UserFormID)), c.each(d.ColInfo, function (a, c) { var e, d = CmnMis.UI.Control.GetControlDomByName(b, c.ColName); d.attr("name") == c.ColName && (e = CmnMis.UI.Control.NewControl(d.attr("data-control-type"), c.ColName, c.ControlCfg), e.ControlDom = d.parents(CmnMis.UI.Control.Selector.Container).length > 0 ? d.parents(CmnMis.UI.Control.Selector.Container) : d, e.AppendTo(b), e.InitControl()) }) }, InitEidtPanel: function (a, b, d, e) { var f = CmnMis.TableOpt.GetUserForm(a); c(b).parents(CmnMis.Frame.Cfg.Selector.UserFormTemplate).length <= 0 && (c(b).addClass(CmnMis.Frame.Cfg.Selector.UserFormTemplate.replace(/[\s\S]*([\.]|[\#])/g, "")), c(b).attr("name", "cmn-UserForm" + f.UserFormID)), c.each(f.ColInfo, function (a, c) { var e, d = CmnMis.UI.Control.GetControlDomByName(b, c.ColName); d.attr("name") == c.ColName && (e = CmnMis.UI.Control.NewControl(d.attr("data-control-type"), c.ColName, c.ControlCfg), e.ControlDom = d.parents(CmnMis.UI.Control.Selector.Container).length > 0 ? d.parents(CmnMis.UI.Control.Selector.Container) : d, e.AppendTo(b), e.InitControl()) }), f.FillEditPanelData(d, e) }, GetData: function (a, b, c, d, e) { var g, f = CmnMis.TableOpt.GetUserForm(a); return null == f ? (Cmn.Log("在TableOpt.GetData函数中没有取到用户表单信息！"), void 0) : null != f.TableCache ? (g = f.TableCache.GetData(b), g = { IsSuccess: 1, data: g }, d && d(g), g) : c === !0 ? CmnAjax.GetData(CmnMis.Func.GetItfUrl(f, f.Cfg.MethodName.GetRecList), b, "", d, e) : (CmnAjax.PostData(CmnMis.Func.GetItfUrl(f, f.Cfg.MethodName.GetRecList), b, d, e), void 0) }, GetRec: function (a, c, d, e, f, g) { var i, h = CmnMis.TableOpt.GetUserForm(a); h.SetCondition(c), d != b && null != d && "" != d && (i = d.split(" "), 2 == i.length && (h.SortByColName = i[0], h.SortByDirection = i[0])), null != h && h.GetRecList(e, f, g) }, FillData: function (a, b, c, d, e, f) { var g = CmnMis.TableOpt.GetUserForm(b); return null == g ? (Cmn.Log("在TableOpt.GetData函数中没有取到用户表单信息！"), void 0) : (CmnAjax.FillData(a, CmnMis.Func.GetItfUrl(g, g.Cfg.MethodName.GetRecList), c, d, e, f), void 0) }, DataPaging: function (a, b, c, d, e, f, g, h, i, j) { var k = CmnMis.TableOpt.GetUserForm(b); return null == k ? (Cmn.Log("在TableOpt.GetData函数中没有取到用户表单信息！"), void 0) : null != k.TableCache ? new k.TableCache.DataPaging(a, c, d, e, f, i, j) : new CmnAjax.DataPaging(a, CmnMis.Func.GetItfUrl(k, k.Cfg.MethodName.GetRecList), c, d, e, f, g, h, i, j) }, Update: function (a, c, d, e, f) { var h, g = CmnMis.TableOpt.GetUserForm(a); return null == g ? (Cmn.Log("在TableOpt.Update函数中没有取到用户表单信息！"), void 0) : (null != g.TableCache ? g.TableCache.Update(c, null, e) && d && d({ IsSuccess: 1 }) : (h = f, h == b && (h = {}), h["RecID"] = c, CmnMis.Func.SubmitData(g.GetSelector(g.Selector.EditControlPanel), g.GetItfUrl(g.Cfg.MethodName.UpdateRec), h, "", "", "", function (a) { "1" == a.IsSuccess ? null != d && d != b && d(a) : null != e && e != b && e(a) }, e)), void 0) }, UpdateRec: function (a, b, c, d, e) { var f = CmnMis.TableOpt.GetUserForm(a); return null == f ? (Cmn.Log("在TableOpt.Update函数中没有取到用户表单信息！"), void 0) : (c["RecID"] = b, CmnAjax.PostData(f.GetItfUrl(f.Cfg.MethodName.UpdateRec), c, function (a) { "1" == a.IsSuccess ? d && d(a) : e && e(a) }, e), void 0) }, Delete: function (a, b, c, d) { var e = CmnMis.TableOpt.GetUserForm(a); if (null != e) return e.CurRecID = b, null == e.TableCache ? CmnAjax.PostData(CmnMis.Func.GetItfUrl(e, e.Cfg.MethodName.DeleteRec), "{RecID:'" + e.CurRecID + "'}", c, d) : (e.TableCache.Delete(b), c && c({ IsSuccess: 1 }), void 0) }, Add: function (a, c, d, e) { var f = CmnMis.TableOpt.GetUserForm(a); null != f && (null != f.TableCache ? f.TableCache.Add(null, e) && d && d({ IsSuccess: 1 }) : CmnMis.Func.SubmitData(f.GetSelector(f.Selector.EditControlPanel), CmnMis.Func.GetItfUrl(f, f.Cfg.MethodName.AddRec), c, "", "", "", function (a) { "1" == a.IsSuccess ? null != d && d != b && d(a) : null != e && e != b && e(a) }, e)) }, BatchUpdate: function (a, b, c, d) { var e = CmnMis.TableOpt.GetUserForm(a); return null == e ? (Cmn.Log("在TableOpt.Update函数中没有取到用户表单信息！"), void 0) : (CmnAjax.PostData(e.GetItfUrl(e.Cfg.MethodName.UpdateRec), { IsBatchOpt: "1", RecList: Cmn.Func.JsonToStr({ data: b }) }, c, d), void 0) } } }(window);