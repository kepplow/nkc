/*
function initTime() {
	$('.time').datetimepicker({
		language:  'zh-CN',
		format: 'yyyy-mm-dd',
		autoclose: 1,
		todayHighlight: 1,
		startView: 4,
		minView: 2,
		forceParse: 0
	});
}*/

var data = NKC.methods.getDataById("data");
var app = new Vue({
  el: "#app",
  data: {
    t: data.t || "username",
    c: data.c || ""
  },
  methods: {
    reset: function() {
      NKC.methods.visitUrl("/e/log/secret", false);
    },
    search: function() {
      var t = this.t;
      var c = this.c;
      var url = "/e/log/secret?t=" + t + "&c=" + c;
      NKC.methods.visitUrl(url, false);
    }
  }
});