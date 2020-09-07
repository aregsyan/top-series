import HttpException from './HttpException';

class NotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Episodes with following series id ${id} not found`);
    }
}

export default NotFoundException;
