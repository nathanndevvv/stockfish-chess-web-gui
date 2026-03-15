import {
	ChessConsole,
	CONSOLE_MESSAGE_TOPICS,
} from "chess-console/src/ChessConsole.js";
import { Board } from "chess-console/src/components/Board.js";
import { CapturedPieces } from "chess-console/src/components/CapturedPieces.js";

import { History } from "chess-console/src/components/History.js";
import { HistoryControl } from "chess-console/src/components/HistoryControl.js";
import { Persistence } from "chess-console/src/components/Persistence.js";

import { LocalPlayer } from "chess-console/src/players/LocalPlayer.js";
import { COLOR } from "cm-chessboard/src/Chessboard.js";
import { I18n } from "cm-web-modules/src/i18n/I18n.js";
import { ENGINE_CONFIG, GAME_CONFIG, STYLING_CONFIG } from "./Config.js";
import { RightClickAnnotator } from "./extensions/RightClickAnnotator.js";
import { StockfishAnalysis } from "./StockfishAnalysis.js";
import { StockfishGameControl } from "./StockfishGameControl.js";
import { StockfishPlayer } from "./StockfishPlayer.js";
import { StockfishStateView } from "./StockfishStateView.js";

const i18n = new I18n({ locale: "en" });

// Mobile Detection
const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	);
if (isMobile) {
	console.log("Mobile device detected, enforcing single-threading for engine.");
}
i18n.load({
	en: {
		playerName: "Player",
		analysis: "Analysis",
	},
});
const chessConsole = new ChessConsole(
	document.getElementById("console-container"),
	{ name: i18n.t("playerName"), type: LocalPlayer },
	{
		name: "Stockfish 17.1",
		type: StockfishPlayer,
		props: {
			worker: ENGINE_CONFIG.WORKER_PATH,
			book: ENGINE_CONFIG.BOOK_PATH,
			skillLevel: ENGINE_CONFIG.DEFAULT_SKILL_LEVEL,
			depth: ENGINE_CONFIG.DEFAULT_DEPTH,
			debug: ENGINE_CONFIG.DEFAULT_DEBUG,
			gameMode: "pve", // Default
			threads: isMobile ? 1 : ENGINE_CONFIG.DEFAULT_THREADS || 4,
		},
	},
);
new Board(chessConsole, {
	assetsUrl: "./assets/cm-chessboard/",
	assetsCache: false,
}).initialized.then((board) => {
	const persistence = new Persistence(chessConsole, {
		savePrefix: GAME_CONFIG.SAVE_PREFIX,
	});
	persistence.load();

	const applyBoardStyle = (theme, pieces) => {
		const props = board.chessboard.props;
		props.style.cssClass = theme || STYLING_CONFIG.DEFAULT_THEME;
		props.style.pieces.file = `pieces/${pieces || STYLING_CONFIG.DEFAULT_PIECES}.svg`;

		// Update the SVG class for theme
		const svg = board.chessboard.view.svg;
		svg.setAttribute(
			"class",
			`cm-chessboard border-type-${props.style.borderType} ${props.style.cssClass}`,
		);

		// Redraw pieces for new piece set
		board.chessboard.view.redrawPieces();
	};

	// Initial styling
	applyBoardStyle(
		persistence.loadValue("boardTheme"),
		persistence.loadValue("pieceSet"),
	);

	board.chessboard.addExtension(RightClickAnnotator);

	const clearAnnotations = () => {
		board.chessboard.removeArrows();
		board.chessboard.removeMarkers();
	};

	// Event Delegation for Buttons (including those created async like Setup/Clear)
	document.body.addEventListener("click", (e) => {
		const target = e.target.closest("button");
		if (!target) return;

		if (target.id === "btn-clear-annotations") {
			clearAnnotations();
		} else if (target.id === "btn-setup") {
			document.getElementById("fen-text").value =
				chessConsole.state.chess.fen();
			document.getElementById("pgn-text").value =
				chessConsole.state.chess.renderPgn();
			setupModal.show();
		} else if (target.id === "btn-load-fen") {
			const fen = document.getElementById("fen-text").value.trim();
			if (fen) {
				// ChessConsole initGame/newGame only supports pgn for custom positions
				// The parser requires the PGN to be valid, and '*' can sometimes cause issues depending on version
				const pgn = `[FEN "${fen}"]\n[SetUp "1"]\n\n `;
				chessConsole.newGame({ pgn: pgn });
				setupModal.hide();
				showNotification("FEN Loaded Successfully");
			}
		} else if (target.id === "btn-load-pgn") {
			const pgn = document.getElementById("pgn-text").value;
			chessConsole.newGame({ pgn: pgn });
			setupModal.hide();
			showNotification("PGN Loaded Successfully");
		} else if (target.id === "btn-copy-fen") {
			navigator.clipboard.writeText(document.getElementById("fen-text").value);
			showNotification("FEN Copied to Clipboard!");
		} else if (target.id === "btn-copy-pgn") {
			navigator.clipboard.writeText(document.getElementById("pgn-text").value);
			showNotification("PGN Copied to Clipboard!");
		} else if (target.id === "btn-hint") {
			analysis.hint();
		} else if (target.id === "btn-swap-sides") {
			if (chessConsole.opponent.state.gameMode === "pve") {
				// 1. Disable current move input to prevent stale state
				board.chessboard.disableMoveInput();

				// 2. Swap player color
				const currentColor = chessConsole.props.playerColor;
				chessConsole.props.playerColor =
					currentColor === COLOR.white ? COLOR.black : COLOR.white;

				// 3. Flip board
				board.chessboard.setOrientation(chessConsole.props.playerColor);

				// 4. Re-calculate who should move and request it
				chessConsole.nextMove();

				showNotification("Sides Swapped!");
			} else {
				showNotification("Swap only available in vs. Engine mode.");
			}
		}
	});

	// Analysis Engine Setup (Requires board)
	const analysis = new StockfishAnalysis(
		document.getElementById("analysis-output"),
		{
			board: board.chessboard,
			i18n: chessConsole.i18n,
		},
	);

	const savedAnalysisDepth =
		chessConsole.persistence.loadValue("analysisDepth");
	if (savedAnalysisDepth) analysis.setDepth(savedAnalysisDepth);

	const updateAnalysis = () => {
		const fen = chessConsole.state.chess.fen();
		analysis.analyze(fen);
	};

	chessConsole.messageBroker.subscribe(
		CONSOLE_MESSAGE_TOPICS.legalMove,
		updateAnalysis,
	);
	chessConsole.messageBroker.subscribe(
		CONSOLE_MESSAGE_TOPICS.moveUndone,
		updateAnalysis,
	);
	chessConsole.messageBroker.subscribe(
		CONSOLE_MESSAGE_TOPICS.load,
		updateAnalysis,
	);
	chessConsole.messageBroker.subscribe(
		CONSOLE_MESSAGE_TOPICS.newGame,
		updateAnalysis,
	);
	chessConsole.messageBroker.subscribe(
		CONSOLE_MESSAGE_TOPICS.initGame,
		(data) => {
			if (data.props.analysisDepth) {
				analysis.setDepth(data.props.analysisDepth);
			}
			if (data.props.boardTheme || data.props.pieceSet) {
				applyBoardStyle(data.props.boardTheme, data.props.pieceSet);
			}
			// Auto toggle arrows based on mode
			if (data.props.gameMode === "analysis") {
				analysis.setShowArrows(true);
			} else if (data.props.gameMode === "pvp") {
				analysis.setShowArrows(false);
			}
			updateAnalysis();
		},
	);

	chessConsole.messageBroker.subscribe(
		CONSOLE_MESSAGE_TOPICS.newGame,
		(data) => {
			if (data.props.boardTheme || data.props.pieceSet) {
				applyBoardStyle(data.props.boardTheme, data.props.pieceSet);
			}
			// Auto toggle arrows based on mode
			if (data.props.gameMode === "analysis") {
				analysis.setShowArrows(true);
			} else if (data.props.gameMode === "pvp") {
				analysis.setShowArrows(false);
			}
		},
	);

	new History(chessConsole);
	new HistoryControl(chessConsole);
	new CapturedPieces(chessConsole);
	const gameControl = new StockfishGameControl(chessConsole, {
		player: chessConsole.opponent,
	});
	gameControl.setAnalysis(analysis);
	new StockfishStateView(chessConsole, chessConsole.opponent);
	// Global UI Logic
	const setupModal = new bootstrap.Modal(document.getElementById("setupModal"));

	const focusBoard = () => {
		if (board?.chessboard) {
			board.chessboard.view.svg.focus();
		}
	};

	// Modal focus management for accessibility
	document
		.getElementById("setupModal")
		.addEventListener("hidden.bs.modal", focusBoard);

	const newGameModalEl = document.getElementById("new-game-modal");
	if (newGameModalEl) {
		newGameModalEl.addEventListener("hidden.bs.modal", focusBoard);
	}
});

// Utility UI Logic
const showNotification = (message) => {
	const toastEl = document.getElementById("notificationToast");
	const toastBody = document.getElementById("toastMessage");
	toastBody.innerText = message;
	const toast = new bootstrap.Toast(toastEl);
	toast.show();
};
