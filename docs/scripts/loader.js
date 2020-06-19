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
    const scrTimer = await $.cachedScript("scripts/timer.js").done((script, textStatus) => {
        console.log(`<Loader>[Timer:Cache] ${textStatus}`);
    });
};
loadTimerScript();

$(document).ready(function() {
    
    // Load Reusables
    $.get('includes/reusables.html', (reusables) => {
        $("br").before(reusables);
    }).promise().done(() => {
        console.log("<Loader> Reusables loaded");
        
        // Load Start Scene
        $.get('includes/start_scene.html', (start_scene) => {
            $("br").before(start_scene);
        }).promise().done(() => {
            console.log("<Loader> Start scene loaded");
            
            // Load Play Scene
            $.get('includes/play_scene.html', (play_scene) => {
                $("br").before(play_scene);
            }).promise().done(() => {
                console.log("<Loader> Play scene loaded");
                
                // Load Leaderboard Scene
                $.get('includes/leaderboard_scene.html', (leaderboard_scene) => {
                    $("br").before(leaderboard_scene);
                }).promise().done(() => {
                    console.log("<Loader> Leaderboard scene loaded");

                    // Load End Scene
                    $.get('includes/end_scene.html', (end_scene) => {
                        $("br").before(end_scene);
                    }).promise().done(() => {
                        console.log("<Loader> End scene loaded");

                        // Load Game Scripts
                        $("#baggageBeltScripts").html('<script src="scripts/engine.js"></script>').promise().done(function() {
                            $("#baggageBeltScripts script").after('<script src="scripts/game.js"></script>').promise().done(() => {
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