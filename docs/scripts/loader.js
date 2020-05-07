// JavaScript Document

$(document).ready(function() {
    
    // Load Reusables
    $.get('includes/reusables.html', (reusables) => {
        $("br").before(reusables);
    }).promise().done(() => {
        console.log("Reusables loaded");
        
        // Load Start Scene
        $.get('includes/start_scene.html', (start_scene) => {
            $("br").before(start_scene);
        }).promise().done(() => {
            console.log("Start scene loaded");
            
            // Load Play Scene
            $.get('includes/play_scene.html', (play_scene) => {
                $("br").before(play_scene);
            }).promise().done(() => {
                console.log("Play scene loaded");
                
                // Load Leaderboard Scene
                $.get('includes/leaderboard_scene.html', (leaderboard_scene) => {
                    $("br").before(leaderboard_scene);
                }).promise().done(() => {
                    console.log("Leaderboard scene loaded");

                    // Load End Scene
                    $.get('includes/end_scene.html', (end_scene) => {
                        $("br").before(end_scene);
                    }).promise().done(() => {
                        console.log("End scene loaded");

                        // Load Game Scripts
                        $("#baggageBeltScripts").html('<script src="scripts/engine.js"></script>').promise().done(function() {
                            $("#baggageBeltScripts script").after('<script src="scripts/game.js"></script>').promise().done(() => {
                                $.when("#baggageBeltScripts").done(() => {
                                    window.game.drawOnce();
                                    console.log("Attempting scripts...");

                                    $("br").remove();
                                });
                            });
                        });

                        $("#fadeOutOverlay").fadeOut(2000);
                        $("#fadeOutLoader").fadeOut(3000);
                    });
                });
            });
        });
    });
});