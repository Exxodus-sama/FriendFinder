//Loading Data
var friendsArray = require("../data/friends.js");

//Routes
module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friendsArray);
    });


    app.post('/api/friends', function(req, res){

        //Get the user input and the scores.
        var userInput = req.body;
        var userResponses = userInput.scores;

        //These variables are for computing the most relevant friend. the totalDiff variable-
        //-is large for comparison purposes.
        var nameMatch = "";
        var imageMatch = "";
        var totalDiff = 1000; 

        //Looks at all the friends from the friends.js file
        for (var i = 0; i < friendsArray.length; i++) {
            
            //Finds the difference from all the questions
            var diff = 0;
            for (var f = 0; f < userResponses.length; f++){
                diff += Math.abs(friendsArray[i].scores[f] - userResponses[f]);
            };

            //Records the optimal friend match if it is the lowest value.
            if(diff < totalDiff) {
                totalDiff = diff;
                nameMatch = friendsArray[i].name;
                imageMatch = friendsArray[i].photo;
            };
        };
        friendsArray.push(userInput);
        res.json({status: 'OK', nameMatch: nameMatch, imageMatch: imageMatch});
    });
};