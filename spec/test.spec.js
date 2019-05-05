const utils = require("../app");
const Player = require("../Player");

describe('Player class: ', function () {

    describe('Create player', function () {

        it('should be able to create a player', () => {
            // console.log("I was able to create a player.");
            var player = new Player("TestPlayer");
            expect(player.name).toBe("TestPlayer");
            expect(player.score).toEqual([]);
            expect(player.round).toBe(0);
        });

    });

    describe('updateScore', function () {

        var player;

        beforeEach(function () {
            player = new Player("TestPlayer");
            player.getScore(0);
        });

        it('should be able to score zeroes', function () {
            spyOn(window, 'open');
            spyOn(window, 'showPlayers').and.callThrough();

            expect(player.getScore(0)).toEqual([0]);

        });

        it('should update the score of the player', function () {
            player.getScore(4);
            expect(player.updateScore()).toBe(4);
        });

        it('should be able to add up total score', function () {
            player.getScore(4);
            player.updateScore();
            expect(player.totalScore).toBe(4);
        });

        describe('bonuses', function () {

            it('should be able to score spare', function () {
                player.getScore(10);
                expect(player.spare).toBe(1);
                expect(player.strike).toBe(0);
            });

            it('should be able to score strike', function () {
                player.getScore(0);
                player.getScore(10);
                expect(player.spare).toBe(0);
                expect(player.strike).toBe(1);
            });

        });

    });

});

// describe("Greet", function () {
//     it("should return a greeting", function () {
//         expect(utils.greet()).toBe("Hello");
//     })
// })