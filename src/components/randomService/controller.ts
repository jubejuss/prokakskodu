import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import randRandomService from './service';

const randomServicesController = {
    getAllServices: (req: Request, res: Response) => {
        const services = randRandomService.getAllServices();
        return res.status(responseCodes.ok).json({
            services,
        })
    }
}

export default randomServicesController;