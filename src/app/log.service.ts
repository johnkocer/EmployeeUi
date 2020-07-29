import { Injectable, InjectionToken } from "@angular/core";

export const LOG_SERVICE = new InjectionToken("logger");
export const LOG_LEVEL = new InjectionToken("log_level")

export enum LogLevel {
    DEBUG, INFO, ERROR
}

@Injectable()
export class LogService {
    minimumLevel: LogLevel = LogLevel.INFO;

    logInfoMessage(source:string,message: any) {
        this.logMessage(LogLevel.INFO,source, message);
    }

    logDebugMessage(source:string,message: any) {
        this.logMessage(LogLevel.DEBUG,source, message);
    }

    logErrorMessage(source:string,message: any) {
        this.logMessage(LogLevel.ERROR, source,  message);
    }

    logMessage(level: LogLevel, source:string,message: string) {
        if (level >= this.minimumLevel) {
            console.log(`Message (${LogLevel[level]}):${source} : ${message} : ${JSON.stringify( message)}`);
        }
    }
}

@Injectable()
export class SpecialLogService extends LogService {

    constructor() {
        super()
        this.minimumLevel = LogLevel.DEBUG;
    }

    logMessage(level: LogLevel, source:string,message: string) {
        if (level >= this.minimumLevel) {
            console.log(`Special Message (${LogLevel[level]}): ${source} : ${message} : ${JSON.stringify( message)}`);
        }
    }
}
