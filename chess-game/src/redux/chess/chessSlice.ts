import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

interface ChessState {
  fen: string;
}

const initialState: ChessState = {
  fen: "start",
};

const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    movePiece: (state, action: PayloadAction<{ from: string; to: string; promotion?: string }>) => {
      const game = new Chess(state.fen === "start" ? undefined : state.fen);
      const move = game.move(action.payload);
      if (move) {
        state.fen = game.fen();
      }
      console.log(`Moved piece from ${action.payload.from} to ${action.payload.to}`, move);
    },
    resetGame: (state) => {
      state.fen = "start";
    },
    setFen: (state, action: PayloadAction<string>) => {
      state.fen = action.payload;
    },
  },
});

export const { movePiece, setFen, resetGame } = chessSlice.actions;
export default chessSlice.reducer;
