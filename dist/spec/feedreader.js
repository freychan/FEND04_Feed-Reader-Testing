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
        it('have URL in each elements',function(){
            for (var i = 0; i < allFeeds.length; i++){
                var url = allFeeds[i].url;
                expect(url).toBeDefined()
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all names are defined',function(){
            for (var i = 0; i < allFeeds.length; i++){
                var name = allFeeds[i].name;
                expect(name.length).not.toBe(0)
            }
        })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu',function(){
        function judgeClass(element,className){
            var judge = element.hasClass(className);
            return judge
        }
        var body = $('body');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default',function(){
            expect(judgeClass(body,'menu-hidden')).toBe(true)
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        var menuIcon = $('.menu-icon-link'),
            name;
        beforeEach(function(){
            if (judgeClass(body,'menu-hidden')){
                name = 'menu-hidden'
            }
            else if (judgeClass(body,'')){
                name = 'display'
            }
        });
        it('the menu will display if it is hidden before clicked and disappear if it is displayed before clicked',function(){
            menuIcon.click();
            expect(judgeClass(body,name)).toBe(false);
        })
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries',function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var entries;
        beforeEach(function(done){
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            loadFeed(0,function(){
                done()
            });

        });
        it('should have at least 1 .entry element within the .feed container',function(done){
            entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
            done()
        });
        afterEach(function(){
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
        })
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection',function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeed,
            oldTitle,
            newFeed;
        beforeEach(function(done){
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

            for (var i = 0; i < allFeeds.length; i++){

                loadFeed(i);
                oldFeed = $('.feed').html();
                oldTitle = $('.header-title');
                for (var j = 0; j < allFeeds.length; j++){
                    if (oldTitle[0].innerHTML != allFeeds[j].name){
                        loadFeed(j,done)
                    }
                }

            }
        });
        it('should display a different feed when load a new feed',function(done){
            newFeed = $('.feed').html();
            expect(newFeed).not.toEqual(oldFeed);
            done()
        });
        afterEach(function(){
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
        })
    });

}());
