/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0); //check length of allFeeds array
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have urls', function () {
            for (x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].url).toBeDefined(); //check each feed url value
                expect(allFeeds[x].url.length).not.toBe(0); //check each feed url length to be sure it is not an empty value
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all have names', function () {
            for (x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].name).toBeDefined(); //check each feed name value
                expect(allFeeds[x].name.length).not.toBe(0);//check each feed name length to be sure it is not an empty value
            }
        });

    });


    /* TODO: Write a new test suite named "The menu" */

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    describe('The Menu', function () {
        var body = $('body');
        var menu = $('.menu-icon-link');

        it('is hidden by default', function () {
            //body has class menu-hidden by default, showing menu removes class from body
            expect(body.hasClass('menu-hidden')).toBeTruthy(); //check that body has a class called .menu-hidden
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('shows when clicked', function () {
            menu.trigger('click'); //trigger a click on the menu button to show the menu
            expect(body.hasClass('menu-hidden')).toBeFalsy(); //check that the .menu-hidden class was removed
        });

        it('hides when clicked again', function () {
            menu.trigger('click'); //trigger a click on the menu button to hide the menu
            expect(body.hasClass('menu-hidden')).toBeTruthy(); //check that the .menu-hidden class was added again
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done); //run the loadFeed function to load feeds
        });

        it('have been retrieved', function () {
            var articles = $('article.entry'); //article elements with .entry class represent each story
            expect(articles.length).toBeGreaterThan(0); // check that there is at least 1 or more stories
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function (done) {
            $(".feed").empty(); // clear the feed child elements
            loadFeed(1, function () { //run the loadFeed function with a feed source
                title = $('.feed').find('h2').text(); //store the title of the first story
                loadFeed(2, done); //run the loadFeed function with a different feed source
            });
        })

        it('will load successfully when another feed is selected', function () {
            expect($('.feed').find('h2').text()).not.toBe(title); //compare current story title with previous stored title to make sure they are not the same
        });

        afterAll(function (done) {
            loadFeed(0, done); //restore the default state by running the loadFeed function again with the default feed
        });

    });

}());