import { Chessboard } from "react-chessboard";
import "./Board.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { movePiece } from "../../redux/chess/chessSlice";
import { Chess } from "chess.js";

const Board = () => {
  const fen = useSelector((state: RootState) => state.chess.fen);
  const dispatch = useDispatch<AppDispatch>();

  const handlePieceDrop = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
  }) => {
    if (!targetSquare) return false;
    const game = new Chess(fen === "start" ? undefined : fen);
    const attempted = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (attempted === null) return false;
    dispatch(
      movePiece({ from: sourceSquare, to: targetSquare, promotion: "q" }),
    );
    return true;
  };

  return (
    <div className="board">
      <Chessboard
        options={{
          position:
            fen === "start"
              ? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
              : fen,
          onPieceDrop: handlePieceDrop,
        }}
      />
    </div>
  );
};

export { Board };
