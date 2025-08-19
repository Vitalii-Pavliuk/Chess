import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

interface ChessState {
  game: Chess;
  fen: string;
}

const initialState: ChessState = {
  game: new Chess(),
  fen: "start",
};

const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    movePiece: (
      state,
      action: PayloadAction<{ from: string; to: string; promotion?: string }>,
    ) => {
      const result = state.game.move(action.payload);
      if (result) {
        state.fen = state.game.fen();
      }
    },
    setFen: (state, action: PayloadAction<string>) => {
      state.fen = action.payload;
      state.game.load(action.payload);
    },
    resetGame: (state) => {
      state.game = new Chess();
      state.fen = "start";
    },
  },
});

export const { movePiece, setFen, resetGame } = chessSlice.actions;
export default chessSlice.reducer;
