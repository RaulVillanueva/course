type State = { pins: number[] }
const INITIAL_STATE : State = { pins: [] }

export class BowlingGame {
  private state: State;

  constructor(state : State = INITIAL_STATE) {
    this.state = state;
   }

  public roll(pins: number){
    return new BowlingGame({pins: [...this.state.pins, pins]});
  }

  public score(){
    const FRAMES = 10
    let score = 0
    let firstRoll = 0
  
    for (let i = 0; i < FRAMES; i++) {
      if (this.isStrike(this.state, firstRoll)){
        score += this.scoreForStrike(this.state, firstRoll);
        firstRoll += 1
      } else if(this.isSpare(this.state, firstRoll)){
        score += this.scoreForSpare(this.state, firstRoll);
        firstRoll += 2
      }else{
        score += this.scoreForFrame(this.state, firstRoll);
        firstRoll += 2
      }
    }
  
    return score
  }

  private scoreForStrike(state:State, firstRoll:number){
    return 10 + state.pins[firstRoll+1] + state.pins[firstRoll+2];
  }

  private scoreForSpare(state:State, firstRoll:number){
    return 10 + state.pins[firstRoll+2];
  }

  private scoreForFrame(state:State, firstRoll:number){
    return state.pins[firstRoll] + state.pins[firstRoll + 1];
  }

  private isStrike(state:State, firstRoll:number){
    return state.pins[firstRoll] === 10;
  }

  private isSpare(state:State, firstRoll:number){
    return (state.pins[firstRoll] + state.pins[firstRoll + 1])===10;
  }
}