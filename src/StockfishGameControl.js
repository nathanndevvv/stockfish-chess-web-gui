/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/chess-console-stockfish
 * License: MIT, see file 'LICENSE'
 */

import { GameControl } from "chess-console/src/components/GameControl/GameControl.js";
import { StockfishNewGameDialog } from "./StockfishNewGameDialog.js";

export class StockfishGameControl extends GameControl {
	constructor(chessConsole, props) {
		super(chessConsole, props);

		// Wait for i18n load (which base class also does) to ensure we append AFTER base buttons
		this.chessConsole.i18n
			.load({
				en: {
					hint: "Hint",
					swap_sides: "Swap Sides",
					setup_import: "Setup / Import",
					clear_annotations: "Clear Annotations",
				},
			})
			.then(() => {
				this.$btnSetup = $(
					`<button type="button" id="btn-setup" class="btn btn-icon btn-primary" title="${this.chessConsole.i18n.t("setup_import")}"><i class="fas fa-paste"></i></button>`,
				);
				this.$btnClearAnnotations = $(
					`<button type="button" id="btn-clear-annotations" class="btn btn-icon btn-danger" title="${this.chessConsole.i18n.t("clear_annotations")}"><i class="fas fa-eraser"></i></button>`,
				);
				this.$btnHint = $(
					`<button type="button" id="btn-hint" class="btn btn-icon btn-warning" title="${this.chessConsole.i18n.t("hint")}"><i class="fas fa-lightbulb"></i></button>`,
				);
				this.$btnSwapSides = $(
					`<button type="button" id="btn-swap-sides" class="btn btn-icon btn-secondary" title="${this.chessConsole.i18n.t("swap_sides")}"><i class="fas fa-retweet"></i></button>`,
				);

				this.context.appendChild(this.$btnSetup[0]);
				this.context.appendChild(this.$btnClearAnnotations[0]);
				this.context.appendChild(this.$btnHint[0]);
				this.context.appendChild(this.$btnSwapSides[0]);

				// Replace the "+" icon with a cog (settings) icon
				const icon = this.btnStartNewGame.querySelector("i");
				if (icon) {
					icon.classList.remove("fa-plus");
					icon.classList.add("fa-cog");
				}
			});
	}

	showNewGameDialog() {
		new StockfishNewGameDialog(this.chessConsole, {
			title: this.chessConsole.i18n.t("start_game"),
			player: this.props.player,
		});
	}

	setAnalysis(analysis) {
		this.analysis = analysis;
	}
}
