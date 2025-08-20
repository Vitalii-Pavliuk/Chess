import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import "./Board.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { movePiece } from "../../redux/chess/chessSlice";
import { Chess } from "chess.js";

const Board = () => {
  const fen = useSelector((state: RootState) => state.chess.fen);
  const dispatch = useDispatch<AppDispatch>();

  const handlePieceDrop = ({ sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean => {
    if (!targetSquare) return false;

    const gameCopy = new Chess(fen === "start" ? undefined : fen);
    const attempted = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (!attempted) return false;

    dispatch(
      movePiece({ from: sourceSquare, to: targetSquare, promotion: "q" })
    );
    return true;
  };

  return (
    <div className="board">
      <Chessboard
        options={{
          position: fen === "start" ? undefined : fen,
          onPieceDrop: handlePieceDrop,
          boardOrientation: "white",
        }}
      />
    </div>
  );
};

export { Board };
