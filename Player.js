import { showPlayers } from './app';

class Player {

    constructor(name){
        Player.current = 0;
        Player.gameRound = 0;
        Player.PlayerNum = Player.PlayerNum ? Player.PlayerNum + 1 : 1;
        if (!Player.list)
            Player.list = [];
        Player.sortedPlayers = [];

        this.name = name;
        this.score = [];
        this.totalScore = 0;
        this.round = 0;
        this.throw = 0;
        this.number = Player.PlayerNum;
        this.carryOver = 0;
        this.roundScore = 0;
        this.spare = 0;
        this.canHit = 10;
        this.strikeBonus = [];
        this.strikeIndex = [];
        this.numOfStrikes = 0;
        this.pos = 0;

        Player.list.push(this);

    }

    getScore(score) {
        console.log("scoring for player " + this.number + "for round:" + this.round + " Player.gameRound: " + Player.gameRound);
        this.roundScore += score;
        this.throw++;
        this.canHit = 10 - score;

        if (this.throw === 2) {
            if (this.roundScore === 10) {
                this.carryOver = 10;
                this.roundScore = 0;
                this.spare = 1;
                this.throw = 0;
                this.round++;
                this.canHit = 10;
                if (Player.list[Player.list.length - 1].round > Player.gameRound)
                    Player.gameRound++;
            }
            else {
                for (let i = 0; i < this.strikeBonus.length; i++)
                    this.strikeBonus[i] += score;
                for (let i = 0; i < this.strikeIndex.length; i++)
                    this.strikeIndex[i] += 1;
                console.log("just before - strike bonus: " + this.strikeIndex[0]);
                if (this.strikeIndex[0] === 2) {
                    console.log("strike bonus: " + this.strikeIndex[0]);
                    this.score.push(this.strikeBonus.shift());
                    this.strikeIndex.shift();
                    this.throw = 0;
                    this.round++;
                    if (Player.list[Player.list.length - 1].round > Player.gameRound)
                        Player.gameRound++;
                }
                console.log("second throw... Round score: " + this.roundScore);
                this.score.push(this.roundScore);
                this.throw = 0;
                this.roundScore = 0;
                this.round++;
                if (Player.list[Player.list.length - 1].round > Player.gameRound)
                    Player.gameRound++;
                showPlayers();
                console.log("increase here...");
                this.canHit = 10;
                return this.score;
            }
        }
        else {
            if (score !== 10) {
                for (let i = 0; i < this.strikeBonus.length; i++)
                    this.strikeBonus[i] += score;
                for (let i = 0; i < this.strikeIndex.length; i++)
                    this.strikeIndex[i] += 1;
                if (this.strikeIndex[0] === 2) {
                    this.score.push(this.strikeBonus.shift());
                    this.strikeIndex.shift();
                    this.throw = 0;
                    this.roundScore = 0;
                    this.round++;
                    if (Player.list[Player.list.length - 1].round > Player.gameRound)
                        Player.gameRound++;
                }
            }

            if (score === 10){
                this.numOfStrikes++;
                this.roundScore = 0;
                if (this.spare === 1) {
                    console.log("spare over here");
                    this.score.push(20);
                    this.throw = 0;
                    this.round++;
                    this.spare = 0;
                    if (Player.list[Player.list.length - 1].round > Player.gameRound)
                        Player.gameRound++;
                }
                for (let i = 0; i < this.strikeBonus.length; i++)
                    this.strikeBonus[i] += score;
                for (let i = 0; i < this.strikeIndex.length; i++)
                    this.strikeIndex[i] += 1;
                if (this.strikeBonus.length > 0) {
                    console.log("strike on a strike");
                    if (this.strikeIndex[0] === 2) {
                        console.log("we should shift here");
                        this.score.push(this.strikeBonus.shift());
                        this.strikeIndex.shift();
                        this.throw = 0;
                        this.round++;
                        if (Player.list[Player.list.length - 1].round > Player.gameRound)
                            Player.gameRound++;
                    }
                }
                this.strikeBonus.push(10);
                this.strikeIndex.push(0);
                this.canHit = 10;
                this.throw = 0;
                this.round++;
                if (Player.list[Player.list.length - 1].round > Player.gameRound)
                    Player.gameRound++;
            }

            else if (this.spare){
                console.log("spare back");
                this.score.push(score + 10);
                this.spare = 0;
                return this.score;
            }

        }
    }

    updateScore() {
        if (this.score.length > 0)
            this.totalScore = this.score.reduce((total, current) => total + current);
        return this.totalScore;
    }


}

module.exports = Player;