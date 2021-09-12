// Importing Required Packages
const chalk = require('chalk');
const moment = require("moment-timezone");

module.exports = {
	/**
	 * Console.logs in red color
	 * @param {String} log String to log
	 */
	red: log => {
		console.log(chalk.red(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	},

	/**
	 * Console.logs in green color
	 * @param {String} log String to log
	 */
	green: log => {
		console.log(chalk.green(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	},

	/**
	 * Console.logs in yellow color
	 * @param {String} log String to log
	 */
	yellow: log => {
		console.log(chalk.yellow(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	},

	/**
	 * Console.logs in blue color
	 * @param {String} log String to log
	 */
	blue: log => {
		console.log(chalk.blue(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	},

/**
 * Console.logs in magenta color
 * @param {String} log String to log
 */
	magenta: log => {
		console.log(chalk.magenta(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	},

	/**
	 * Console.logs in cyan color
	 * @param {String} log String to log
	 */
	cyan: log => {
		console.log(chalk.cyan(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	},

	/**
	 * Console.logs in gray color
	 * @param {String} log String to log
	 */
	gray: log => {
		console.log(chalk.gray(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	},

	/**
	 * Console.logs in black color
	 * @param {String} log String to log
	 */
	black: log => {
		console.log(chalk.black(`[${moment().tz("America/New_York").format("hh:mm:ss.SS")}] ${log}`))
	}
};