
(function () {

  var menuItems = [
    {"link": "/introduction", "title": "Introduction"},
    {"link": "/guide", "title": "Guide"},
    //{"link": "/api", "title": "API Reference"},
  ];

  var sideMenu = Vue.component("sidemenu", {
    template: "#sidemenu",
    data: function () {
      return {
        isOpen: false,
        menuItems: menuItems
      }
    },
    methods: {
      toggle: function () {
        this.isOpen = !this.isOpen;
      },
      hide: function () {
        this.isOpen = false;
      },
      show: function () {
        this.isOpen = true;
      }
    }
  });

  var documentView = {
    template: "#document-view",
    data: function () {
      return {
        showError: false,
        content: ""
      }
    },
    methods: {
      fetch: (function () {
        // resource storage cache
        var cache = {};

        return function (url, callback) {
          // if the requested content is cached, then fetch it from the cache
          if ((cache[url] !== undefined) && ("function" == typeof callback)) {
            callback(true, cache[url]);
          }
          // else, make an AJAX request for the content and cache it for later use
          else {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
              if(req.readyState == 4) {
                var success = (req.status == 200);
                if (success) cache[url] = req.responseText;
                if ("function" == typeof callback) callback((req.status == 200), success ? req.responseText : null);
              }
            };
            req.open("GET", url, true);
            req.send();
          }
        };

      })(),
      loadPage: function (page) {
        var resourceURL = ["./", encodeURI(page), ".html"].join("");
        this.fetch(resourceURL, function (success, text) {
          if (success) {
            this.showError = false;
            /*
              the markup renderer that I used doesn't want to add 'language-' classes to code blocks,
              meaning that i have to manually add them in order for Prism to highlight them:
            */
            this.content = text.replace(/code class\=\"(\S+)\"/g, function($1, $2){ return ['code class="language-', $2, '"'].join("")});
            // on the next DOM update, highlight all the code blocks with Prism
            this.$parent.$nextTick(function () {
              Prism.highlightAll();
            });
          }
          else {
            this.showError = true;
            this.content = "";
          }
        }.bind(this));
      }
    },
    watch: {
      "$route": function (toRoute, fromRoute) {
        // close the sidemenu before navigating to a new page
        if (this.$parent && this.$parent.$refs.sidemenu) {
          this.$parent.$refs.sidemenu.hide();
        }
        if (toRoute.path != fromRoute.path){
          this.loadPage(toRoute.params.page);
        }
        if (toRoute.hash){
          // this is a VERY lazy way of doing scroll-to-element but it works for my needs so hey \o/
          var target = document.querySelector(toRoute.hash);
          if (target) target.scrollIntoView();
        } else {
          // else scroll to the top of the page
          window.scrollTo(0, 0);
        }
      }
    },
    beforeRouteEnter: function (toRoute, fromRoute, next) {
      next(function (vm) {
        // load inital page
        vm.loadPage(toRoute.params.page);
      });
    }
  }

  var router = new VueRouter({
    routes: [
      {
        path: '/:page',
        component: documentView
      },
      // default to /introduction if no page is given
      {
        path: '',
        redirect: '/introduction'
      }
    ]
  });

  window.app = new Vue({
    router: router
  }).$mount('#app');

})();
