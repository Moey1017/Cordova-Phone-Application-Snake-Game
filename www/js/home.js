                        var storage = window.localStorage;
                        var scoreBoard = [];
                        var scoreTable;
                        if (localStorage.getItem("localHistory") === null)
                        {
                            scoreTable = '<table  style="width:100%"><tr><th>No.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Scores</th></tr><table>';
                        } else
                        {
                            scoreBoard = JSON.parse(localStorage.getItem("localHistory"));
                            scoreTable = '<table  style="width:100%"><tr><th>No.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Scores</th></tr>';
                            for (let i = 0; i < scoreBoard.length; i++)
                            {
                                if (scoreBoard[i] === undefined)
                                {
                                    scoreTable += '<tr><td>' + (i + 1) + '. </td><td class="scores">' + 0 + '<td></tr>';
                                } else
                                {
                                    scoreTable += '<tr><td>' + (i + 1) + '. </td><td class="scores">' + scoreBoard[i] + '<td></tr>';
                                }

                            }
                            scoreTable += '</table>';
                        }
                        document.getElementById("scoreBoard").innerHTML = scoreTable;