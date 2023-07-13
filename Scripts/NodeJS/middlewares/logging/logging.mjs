import winston from 'winston'
const { format, transports, createLogger } = winston;
import path from 'path';
const consoleloggerLevel = process.env.WINSTON_LOGGER_LEVEL || "info";


const consoleFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf((info) => {
        return `${info.timestamp} - ${info.level}:  [${info.label}]: ${
            info.message
        } ${JSON.stringify(info.metadata)}`;
    })
);

const fileFormat = format.combine(
    format.timestamp(),
    format.label({ label: path.basename('schema/validation') }),
    // format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
    format.combine(format.json(), format.prettyPrint())
);

export const logger = createLogger({
    level: "info",
    defaultMeta: { service: "some-random-service" },
    format: fileFormat,
    transports: [
        new transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new transports.File({
            filename: "logs/activity.log",
            maxsize: 5242880, //5MB
            maxFiles: 5 // just in case
        }),
    ],
});
