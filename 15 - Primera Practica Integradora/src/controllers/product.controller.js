/* import { 
    getAllService, 
    getByIdService, 
    createService, 
    updateService, 
    deleteService 
} from "../services/product.services.js"; */

// Podemos reemplazar el código anterior por:
import * as service from '../services/product.services.js'

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { idNumber } = req.params;
        const prod = await service.getById(Number(idNumber));
        if(!prod) return res.status(404).json({message: `Product not found`})
        else return res.json(prod);
    } catch (error) {
        next(error.message);
    }  
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if(!newProd) res.status(400).json({message: `Validation Error!`})
    } catch (error) {
        next(error.message);
    }  
};

export const update = async (req, res, next) => {
    try {
        const { idNumber } = req.params;
        const updatedPod = await service.update(Number(idNumber), req.body);
        res.json(updatedPod);
    } catch (error) {
        next(error.message);
    }  
};

export const remove = async (req, res, next) => {
    try {
        const { idNumber } = req.params;
        const deletedProd = await service.remove(Number(idNumber));
        res.json(deletedProd)
    } catch (error) {
        next(error.message);
    }  
};