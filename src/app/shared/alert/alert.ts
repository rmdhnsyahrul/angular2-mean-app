export class Alert {
    type: AlertType;
    title: String;
    message: String
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}