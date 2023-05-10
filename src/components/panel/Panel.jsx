import React from "react";
import axios from "axios";
import { Input, Form, Button, Radio } from "antd";
import "./panel.css";

export default class Panel extends React.Component {
  
  constructor(props) {
    super(props);

    this.changePlayer1 = this.changePlayer1.bind(this);
    this.changePlayer2 = this.changePlayer2.bind(this);
    this.changeBaller = this.changeBaller.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.changeOver = this.changeOver.bind(this);
    this.changeWicket = this.changeWicket.bind(this);

    this.state = {
      team1: "DNC",
      team2: "RCC",
      now_playing: "Team1",
      score: 0,
      overs: 0,
      balls: 0,
      wick: 0,
      player: "Loading...",
      player1: "Loading...",
      player2: "Loading...",
      baller: "Loading...",
      playing: "Playing",
      player1_tmp: "Temp",
      player2_tmp: "Tmp",
      player2_tmp: "Tmp",
      baller_tmp: "Tmp"
    };
  }

  async componentDidMount() {
    const session = localStorage.getItem("session");
    await axios.get(`https://livescore-dnc.vercel.app/match/get/${session}`)
      .then((res) => {
        console.log(res)
        this.setState({
          team1: res.data.team1.name,
          team2: res.data.team2.name
        })
        if (res.data.match.now_playing == "Team1") {
          this.setState({
            score: res.data.team1.score,
            wick: res.data.team1.wick,
            overs: res.data.match.overs,
            balls: res.data.match.balls,
            player1: res.data.match.player1,
            player2: res.data.match.player2,
            baller: res.data.match.balling,
            playing: res.data.team1.name
          });
        } else {
          this.setState({
            score: res.data.team2.score,
            wick: res.data.team2.wick,
            overs: res.data.match.overs,
            balls: res.data.match.balls,
            player1: res.data.match.player1,
            player2: res.data.match.player2,
            baller: res.data.match.balling,
            playing: res.data.team2.name
          })
        }
        if (res.data.match.now_player == "player1") {
          this.setState({
            player: res.data.match.player1
          })
        } else {
          this.setState({
            player: res.data.match.player2
          })
        }
      })
  };

  async changeTeam(e) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      }
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/playing/${session}`, config)
    .then((res) => {
      console.log(res.data.playing)
      if (res.data.playing == "Team2") {
        console.log(res)
        this.setState({
          playing: this.state.team1
        });
      } else {
        this.setState({
          playing: this.state.team2
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  async changePlayer1() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      },
      player: this.state.player1_tmp
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/player1/${session}`, config)
    .then((res) => {
      this.setState({
        player1: this.state.player1_tmp
      });
    })
    .catch((err) => {
      console.log(err);
    })
  };

  async changePlayer2() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      },
      player: this.state.player2_tmp
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/player2/${session}`, config)
    .then((res) => {
      this.setState({
        player2: this.state.player2_tmp
      });
    })
    .catch((err) => {
      console.log(err);
    })
  };

  async changeBaller() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      },
      baller: this.state.baller_tmp
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/baller/${session}`, config)
    .then((res) => {
      this.setState({
        baller: this.state.baller_tmp
      });
    })
    .catch((err) => {
      console.log(err);
    })
  };

  async changePlayer(e) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      }
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/player/${session}`, config)
    .then((res) => {
      if (res.data.player == "player1") {
        this.setState({
          player: this.state.player1
        });
      } else {
        this.setState({
          player: this.state.player2
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  async changeScore(score) {
    console.log(score);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      },
      add_score: score
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/score/${session}`, config)
    .then((res) => {
      console.log(res.data.balls)
      this.setState({
        score: res.data.score,
        balls: res.data.balls
      })
    })
    .catch((err) => {
      console.log(err);
    });
  };

  async changeOver(score) {
    console.log(score);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      }
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/overs/${session}`, config)
    .then((res) => {
      this.setState({
        overs: res.data.overs
      })
    })
    .catch((err) => {
      console.log(err);
    });
  };

  async changeWicket() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': token
      }
    };
    const session = localStorage.getItem("session");
    await axios.patch(`https://livescore-dnc.vercel.app/match/wick/${session}`, config)
    .then((res) => {
      this.setState({
        wick: res.data.wick
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <div className="data-row1">
          <h2 className="txt1" style={{padding: "5px"}}>~ Score: {this.state.score} ~ Overs: {this.state.overs} ~ Balls: {this.state.balls} ~</h2>
        </div>
        <div className="data-row1">
          <h2 className="txt2">Wickets : {this.state.wick}</h2>
        </div>
        <Form
        labelCol={{span: 10}}
        wrapperCol={{span: 5}}>
          <div className="form">
            <div className="form-in">
              <div className="n2">
                <h4>Now Playing</h4>
                <Radio.Group value={this.state.playing} onChange={(e) => this.changeTeam(e)}>
                  <Radio.Button value={this.state.team1}>{this.state.team1}</Radio.Button>
                  <Radio.Button value={this.state.team2}>{this.state.team2}</Radio.Button>
                </Radio.Group>
              </div>
              <Form.Item
              label="Player1"
              style={{margin: "7px"}}
              >
                <div style={{display: "flex"}}>
                  <Input placeholder={this.state.player1}
                  style={{minWidth: "200px"}}
                  onChange={(e) => this.setState({ player1_tmp: e.target.value })} />
                  <Button type="primary"
                  style={{marginLeft: "10px"}} onClick={this.changePlayer1}>Change</Button>
                </div>
              </Form.Item>
              <Form.Item
              label="Player2"
              style={{margin: "7px"}}
              >
                <div style={{display: "flex"}}>
                  <Input placeholder={this.state.player2}
                  onChange={(e) => this.setState({ player2_tmp: e.target.value })}
                  style={{minWidth: "200px"}} />
                  <Button type="primary"
                    style={{marginLeft: "10px"}} onClick={this.changePlayer2}>Change</Button>
                  </div>
              </Form.Item>
              <Form.Item
              label="Baller"
              style={{margin: "7px"}}
              >
                <div style={{display: "flex"}}>
                  <Input placeholder={this.state.baller}
                  onChange={(e) => this.setState({ baller_tmp: e.target.value })}
                  style={{minWidth: "200px"}} />
                  <Button type="primary"
                    style={{marginLeft: "10px"}} onClick={this.changeBaller}>Change</Button>
                  </div>
              </Form.Item>
              <div style={{paddingTop: "7px"}}>
                <Radio.Group value={this.state.player} onChange={(e) => this.changePlayer(e)}>
                  <Radio.Button value={this.state.player1}>{this.state.player1}</Radio.Button>
                  <Radio.Button value={this.state.player2}>{this.state.player2}</Radio.Button>
                </Radio.Group>
              </div>
            <div className="data-row1">
              <Form.Item
              style={{margin: "7px", paddingTop: "5px", paddingBottom: "10px"}}
              >
                <h3 style={{minWidth: "100px", marginLeft: "5px"}}>Update Score</h3>
                <div style={{display: "flex"}}>
                  <Button style={{marginLeft: "5px"}} type="primary" danger onClick={(e) => this.changeScore(0)}>0</Button>
                  <Button style={{marginLeft: "5px"}} type="dashed" danger onClick={(e) => this.changeScore(1)}>1</Button>
                  <Button style={{marginLeft: "5px"}} onClick={(e) => this.changeScore(2)}>2</Button>
                  <Button style={{marginLeft: "5px"}} type="primary" onClick={(e) => this.changeScore(3)}>3</Button>
                  <Button style={{marginLeft: "5px", backgroundColor: "gray", color: "white"}} onClick={(e) => this.changeScore(4)}>4</Button>
                  <Button style={{marginLeft: "5px", backgroundColor: "darkblue", color: "white"}} onClick={(e) => this.changeScore(5)}>5</Button>
                  <Button style={{marginLeft: "5px", backgroundColor: "green", color: "white"}} onClick={(e) => this.changeScore(6)}>6</Button>
                </div>
              </Form.Item>
              <Form.Item
              style={{margin: "7px"}}
              >
                <div>
                  <Button type="primary"
                    style={{marginLeft: "10px", backgroundColor: "gray"}} onClick={this.changeOver}>Add Over</Button>
                  </div>
              </Form.Item>
              <Form.Item
              style={{margin: "7px"}}
              >
                <div>
                  <Button type="primary"
                    style={{marginLeft: "10px", backgroundColor: "#860000"}} onClick={this.changeWicket}>Add Wicket</Button>
                  </div>
              </Form.Item>
            </div>
              <h6 style={{padding: "10px"}}>All right reserved @DNCMU</h6>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
