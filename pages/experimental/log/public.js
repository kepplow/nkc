function delLogs(){
  var sTime = $("#startTime").val().trim();
  var eTime = $("#endTime").val().trim();
  var uid = $("#userId").val().trim();
  var ip = $("#ipAdress").val().trim();
  if(sTime === "" ||eTime === ""){
    screenTopWarning("请输入完整的时间区间")
    return
  }
  var st = new Date(sTime)
  var et = new Date(eTime)
  if(st.getTime() > et.getTime()){
    screenTopWarning("结束时间不能早于开始时间")
    return
  }
  var del = confirm("确定删除该条件下的日志？");
  if(del === false){
    return
  }
  var url = '/e/log/public?' + "sTime="+sTime+"&" + "eTime="+eTime+"&" + "uid="+uid+"&" + "ip="+ip;
  var method = "DELETE";
  var alertInfo = "已删除相关条件下的日志";
  nkcAPI(url, method, {})
    .then(function(){
      screenTopAlert(alertInfo);
      setTimeout(function(){
        window.location.reload();
      }, 1000);
    })
    .catch(function(data){
      screenTopWarning(data.error)
    })
}


function searchLogs(){
  var sTime = $("#startTime").val().trim();
  var eTime = $("#endTime").val().trim();
  var uid = $("#userId").val().trim();
  var ip = $("#ipAdress").val().trim();
  var operationId = $("#operationId").val().trim();
  var st = (new Date(sTime)).getTime();
  var et = (new Date(eTime)).getTime();
  var t = $("#dataT").attr("data-t");
  t = t || "";
  if(st && et && st > et){
    return sweetError("结束时间不能早于开始时间");
  }
  var c = {
    sTime: sTime,
    eTime: eTime,
    uid: uid,
    operationId: operationId,
    ip: ip
  };
  var url = '/e/log/public?c=' + NKC.methods.strToBase64(JSON.stringify(c));
  if(t) {
    url += '&t='+ t;
  }
  NKC.methods.visitUrl(url);
}