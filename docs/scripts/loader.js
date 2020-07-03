// JavaScript Document

$.cachedScript = function (url, options) {
    options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });
    return $.ajax(options);
}

async function loadTimerScript() {
    // Load scripts synchronously
    const scrTimer = await $.cachedScript("scripts/timer.js?v=0.0.1").done((script, textStatus) => {
        console.log(`<Loader>[Timer:Cache] ${textStatus}`);
    });
};
loadTimerScript();

// Wait for dependent scripts to finish loading
function awaitScripts() {
    // Determine if the dependencies finished loading
    try {
        var myTimer = new Timer();
        buildPages();
    } catch (e) {
        setTimeout(()=>{return awaitScripts();}, 500);
    }
}

// Construct the page elements
function buildPages() {
    // Load Reusables
    $.get('includes/reusables.html?v=0.0.1', (reusables) => {
        $("br").before(reusables);
    }).promise().done(() => {
        console.log("<Loader> Reusables loaded");
        
        // Load Start Scene
        $.get('includes/start_scene.html?v=0.0.1', (start_scene) => {
            $("br").before(start_scene);
        }).promise().done(() => {
            console.log("<Loader> Start scene loaded");
            
            // Load Play Scene
            $.get('includes/play_scene.html?v=0.0.1', (play_scene) => {
                $("br").before(play_scene);
            }).promise().done(() => {
                console.log("<Loader> Play scene loaded");
                
                // Load Leaderboard Scene
                $.get('includes/leaderboard_scene.html?v=0.0.1', (leaderboard_scene) => {
                    $("br").before(leaderboard_scene);
                }).promise().done(() => {
                    console.log("<Loader> Leaderboard scene loaded");

                    // Load End Scene
                    $.get('includes/end_scene.html?v=0.0.1', (end_scene) => {
                        $("br").before(end_scene);
                    }).promise().done(() => {
                        console.log("<Loader> End scene loaded");

                        // Load Game Scripts
                        $("#baggageBeltScripts").html('<script src="scripts/engine.js?v=0.0.1"></script>').promise().done(function() {
                            $("#baggageBeltScripts script").after('<script src="scripts/game.js?v=0.0.1"></script>').promise().done(() => {
                                $("#baggageBeltScripts script").after('<script src="scripts/gameplay.js?v=0.0.1"></script>').promise().done(() => {
                                    $.when("#baggageBeltScripts").done(() => {
                                        console.log("<Loader> Executing scripts...");
                                        // Remove the <br> tag placeholder
                                        $("br").remove();
                                        game.google.load();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

$(document).ready(function() {
    // Once the page loads, start building the content
    awaitScripts();
});