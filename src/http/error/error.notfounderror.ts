export class NotFoundExceptionError extends Error {
    constructor() {
        super('Not found');
    }
}