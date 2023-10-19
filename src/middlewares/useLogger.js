const dayjs = require("dayjs");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const logsDir = path.join(process.cwd(), "logs");

const LOG_TYPE_INFO = "INFO";
const LOG_TYPE_WARN = "WARN";
const LOG_TYPE_ERROR = "ERROR";

const logEvents = async (message, logName, type, eventId) => {
  const dateTime = dayjs().toISOString();
  const logItem = `[${type}]\t${dateTime}\t${eventId}\t${message}\n`;

  try {
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    await fsPromises.appendFile(path.join(logsDir, logName), logItem, "utf8");
  } catch (err) {
    console.error(err);
  }
};

const useLogger = () => {
  const reqId = uuid();

  return (req, res, next) => {
    req.logger = {
      log: async (message, logFile = "app.log") => {
        await logEvents(message, logFile, LOG_TYPE_INFO, reqId);
      },
      warn: async (message, logFile = "error.log") => {
        await logEvents(message, logFile, LOG_TYPE_WARN, reqId);
      },
      error: async (message, logFile = "error.log") => {
        await logEvents(message, logFile, LOG_TYPE_ERROR, reqId);
      }
    };
    next();
  };
};
module.exports = { useLogger };
