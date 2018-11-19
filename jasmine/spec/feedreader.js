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
        it('url is defined and url is not empty',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(typeof(feed.url)).toBe("string");
            })
        })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined and name is not empty',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof(feed.name)).toBe("string");
            })
        })
        
    });
        
    
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu',function(){

            var menu,
                menuIcon;

            // a function to be runned before each test 
            beforeEach(function(){
                try{
                    // initializing the menu and menuIcon objects
                    menu = document.getElementsByTagName('body')[0],
                    menuIcon =  document.getElementsByClassName('menu-icon-link')[0];
                    // throw error if the menu and menuIcon objects are not initialized
                    if(menu == null || menuIcon==null) throw 0;
                } catch(x){
                    console.log('menu or menu item object is not initialized!');
                }
            })

            /*ensures the menu element is
            * hidden by default. 
            */
            it('is hidden by default',function(){
               expect(menu.className).toBe('menu-hidden');
            })
            
            /* ensures the menu changes
            * visibility when the menu icon is clicked.
            */
            
            it('changes visibility when menu icon is clicked',function(){
                menuIcon.click();
                expect(menu).not.toBe("menu-hidden");
                menuIcon.click();
                expect(document.body.className).toBe("menu-hidden");
            })


        })
        
        
        /* new test suite named "Initial Entries" */
        describe('Initial Entries',function(){
            /*a test that ensures when the loadFeed
            * function is called and completes its work, there is at least
            * a single .entry element within the .feed container.
            * Remember, loadFeed() is asynchronous so this test will require
            * the use of Jasmine's beforeEach and asynchronous done() function.
            */
            var feed , feedEntry;
            beforeEach(function(done){
                // loading the first page 
                loadFeed(0,function(){
                    try{
                        // initializing the feed and feedEntry variables
                        feed =  document.getElementsByClassName('feed')[0];
                        feedEntry =  feed.getElementsByClassName('entry');
                        // throw error if the feed and feedEntry objects are not initialized
                        if(feed == null || feedEntry== null) throw 0;
                    }catch(x){
                        console.log('feed or feedEntry objects are not defined!');
                    }
                    done();
                })
            })

            it('There exists atleast an entry element within the feed when loadFeed function is called',function(){
                expect(feedEntry.length).not.toBe(0);
            })             
        })
      
      /* TODO: Write a new test suite named "New Feed Selection" */
       describe('New Feed Selection',function(){

            var initialFeeds, newFeeds;
            beforeEach(function(done){
                // load the first page
                loadFeed(0,function(){
                    try{
                        initialFeeds =  document.getElementsByClassName('feed')[0].innerHTML;
                        //load the second page
                        loadFeed(1,function(){
                            newFeeds = document.getElementsByClassName('feed')[0].innerHTML;
                            // check if the initialFeeds and newFeeds variables are initialized properly
                            if(initialFeeds == null || newFeeds == null) throw 0;
                            done();      
                        })
                        
                    } catch(x){
                        console.log('initialFeeds or newFeeds are not defined!');
                    }
                })
            });

            
            /* TODO: Write a test that ensures when a new feed is loaded
            * by the loadFeed function that the content actually changes.
            * Remember, loadFeed() is asynchronous.
            */
            it('When a new feed is loaded by loadfeed function, the content actually changes',function(){
                expect(initialFeeds).not.toBe(newFeeds);
            })
       })
    }());
    