/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function check_valid_url(url) {
            expect(url).toBeDefined();
            expect(url.length).not.toBe(0);
            expect(url).toMatch(/^http|s/);
        }
        it('url are defined and not empty', function() {
            for (let i of allFeeds) {
                check_valid_url(i.url);
            }
        })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name are valid', function() {
            for (let i of allFeeds) {
                expect(i.name).toBeDefined();
                expect(i.name.length).not.toBe(0);
            }
        })
    });


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        describe('Hamburger Menu', function() {
            it('Menu is hidden On page load', function() {
                expect($("body").hasClass('menu-hidden')).toBe(true);
            });
           
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

         it('Toggle Menu on Clicks', function() {
            expect($(".menu-icon-link").length).toEqual(1);
            expect($(".menu-icon-link").trigger('click'));
            expect($("body").hasClass('menu-hidden')).toBe(false);
            expect($(".menu-icon-link").trigger('click'));
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        describe('Initial Entries', function() {
            beforeEach(function(done){
                loadFeed(0, function(){
                    done();
                });
            });
            it('Feed Loading', function(done) {
                expect($(".feed").children(".entry-link").length).toBeGreaterThan(1);
                done();
            });
        });


    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        describe('New Feed Selection', function() {
            var zeroFeed, firstFeed;
            beforeEach(function(done){
                $(".feed").html("");
                loadFeed(0, function(){
                    zeroFeed = $(".feed").html();
                    done();
                });
            });
            it('New Feed Selection', function(done) {
                loadFeed(1, function(){
                    firstFeed = $(".feed").html();
                    expect(zeroFeed).not.toEqual(firstFeed);
                    done();
                });
            });
        });
}());
