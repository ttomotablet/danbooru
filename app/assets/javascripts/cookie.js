(function() {
  Danbooru.Cookie = {};

  Danbooru.Cookie.put = function(name, value, days) {
    var expires = "";
    if (days !== "session") {
      if (!days) {
        days = 365;
      }

      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "expires=" + date.toGMTString() + "; ";
    }

    var new_val = name + "=" + encodeURIComponent(value) + "; " + expires + "path=/";
    if (document.cookie.length < (4090 - new_val.length)) {
      document.cookie = new_val;
      return true;
    } else {
      Danbooru.error("You have too many cookies on this site. Consider deleting them all.")
      return false;
    }
  }

  Danbooru.Cookie.raw_get = function(name) {
    var nameEq = name + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; ++i) {
      var c = ca[i];

      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEq) == 0) {
        return c.substring(nameEq.length, c.length);
      }
    }

    return "";
  }

  Danbooru.Cookie.get = function(name) {
    return this.unescape(this.raw_get(name));
  }

  Danbooru.Cookie.remove = function(name) {
    this.put(name, "", -1);
  }

  Danbooru.Cookie.unescape = function(val) {
    return decodeURIComponent(val.replace(/\+/g, " "));
  }

  Danbooru.Cookie.initialize = function() {
    var loc = location.href;

    if (loc.match(/^http/)) {
      loc = loc.replace(/^https?:\/\/[^\/]+/, "");
    }

		if (this.get("hide-upgrade-account") != "1") {
 	    $("#upgrade-account").show();
		}
  }
})();

$(function() {
  Danbooru.Cookie.initialize();
});

