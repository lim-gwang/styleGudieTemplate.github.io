$(function() {
    var $window= $(window);
    var $html= $('html');
    var $body= $('body');
    var $wrap= $('#wrap');
    var $header= $('#header');
    var $depth1= $('.depth1');
    var $depthMenu= $('.depthMenu');
    var $siteMapBtn= $(".siteMap-btn");
    var $menusWrap= $('.menusWrap');
    var $relateSite = $('.relateSite');
    var $relateSite_title= $('.relateSite_title');
    var $depth1_title = $('.depth1_title');
    var $searchBtn = $('.searchBtn');
    var $totalSearch_wrapper = $('.totalSearch_wrapper');
    var $SideMenu_depth1 = $('.SideMenu_depth1 > a');
    var active= 'active';
    var overflow= 'overflow';
    var siteMap= 'siteMap';
    
    $html.on('click', function(e) {
        var target= $(e.target);

        if((target.attr('id') === 'wrap') && (target.hasClass(active))) {
            // site-map
            siteMapRemove();
            mobileDepthToggle();
        };
        // site map remove 
        if(target.hasClass('relateSite')) {
            familySiteRemove();
        }
        // total search popup
        if(target.hasClass('totalSearch_wrapper') || target.hasClass('totalSearch_close')) { 
            totalSearchClose();
        }
    });

    //header evnet
        //  desktop header
        function deskDepthOpen() {
            var winWid = $window.width();
            var targetHasClass = $menusWrap.hasClass(siteMap);
            if (winWid < 1024) return;
            if(targetHasClass) return;
            // if (winWid < 1024) $body.addClass(overflow);

            $header.addClass(active);
            $depthMenu.addClass(active);
        }; 
        function deskDepthClose() {
            var winWid = $window.width();
            var targetHasClass = $menusWrap.hasClass(siteMap);

            if (winWid < 1024) return;
            if(targetHasClass) return;

            $body.removeClass(overflow);
            $header.removeClass(active);
            $depthMenu.removeClass(active);
        }; 
        $depth1.on({
            // menu open
            mouseenter: deskDepthOpen,
            // focusin: deskDepthOpen,
            // menu close
            mouseleave: deskDepthClose,
            // focusout: deskDepthClose,
        });
        // mobile header
        function mobileDepthToggle() {
            var winWid = $window.width();
            if (winWid > 1024) return;

            $(this)
            .parent('.depth1')
            .toggleClass(active)
            .siblings()
            .removeClass(active);

            return false;
        }

        $depth1_title.bind('click', mobileDepthToggle);

        //site-map
        function siteMapToggle() {
            if($body.hasClass(overflow)) {
                $body.removeClass(overflow);
            } else {
                $body.addClass(overflow);
            }
            $menusWrap.toggleClass(siteMap);
            $siteMapBtn.toggleClass(active);
            $wrap.toggleClass(active);
        };

        function siteMapRemove() {
            $body.removeClass(overflow);
            $wrap.removeClass(active);
            $menusWrap.removeClass(siteMap);
            $siteMapBtn.removeClass(active);
        };

        $siteMapBtn.on('click', siteMapToggle);

    //total search popup
    function totalSearchOpen() {
        $body.addClass(overflow);
        $totalSearch_wrapper.addClass(active);    
    }
    function totalSearchClose() {
        $totalSearch_wrapper.removeClass(active);

        if(!$menusWrap.hasClass(siteMap)) {
            $body.removeClass(overflow);
        }

        return;
    }

    $searchBtn.on('click', totalSearchOpen);


    //sub layout
        // side menu 
        $SideMenu_depth1.on('click', function() {
            var winWid = $window.width();
            var $this= $(this);
            var depth2Has = $(this).siblings().hasClass('SideMenu_depth2');
            var $thisParent = $this.parent('.SideMenu_depth1');
            
            if(!depth2Has) return

            // desk top
            // preventDefault
            if (winWid > 1024) {
                $thisParent
                .addClass(active)
                .siblings()
                .removeClass(active);
                return false;
            } 

            // pad, mobile
            $('#subSideMenu').toggleClass('overView');
            // preventDefault
            if($thisParent.hasClass(active)) return false;
        });


    //footer family site
    
        function familySiteToggle() {
            $relateSite.toggleClass(active);
            $relateSite_title.toggleClass(active);

            $relateSite_title
            .siblings('.relateSite_list')
            .stop(true, true)
            .slideToggle();
        };

        function familySiteRemove() {
            $relateSite.removeClass(active);
            $relateSite_title.removeClass(active);

            $relateSite_title
            .siblings('.relateSite_list')
            .stop(true, true)
            .slideUp();
        };
        
        $relateSite.on('click', familySiteToggle);

});