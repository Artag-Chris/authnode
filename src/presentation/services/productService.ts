import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDTO, UserEntity } from "../../domain";


export class ProductService {

constructor() {}

async createProduct(createProductDto: CreateProductDto) {

const productExist = await ProductModel.findOne({ name: createProductDto.name });
if (productExist) throw CustomError.badRequest('product already exist');

try {


    const product = new ProductModel({ ...createProductDto });
    await product.save();
    return product
    
} catch (error) {
    throw CustomError.internalServer(`${error}`);
}

}

async getProducts(paginationDto:PaginationDTO) {

    const {page,limit}=paginationDto;

    try {
    
        const[total,products] = await Promise.all([
            ProductModel.countDocuments(),
            ProductModel.find()
            .skip((page-1)*limit)
            .limit(limit)
        ])

   /* const total = await CategoryModel.countDocuments();    
    const categories = await CategoryModel.find()
    .skip((page-1)*limit)
    .limit(limit);*/

    return {
        page,
        limit,
        total,
        next:`/api/produtcs?page=${page+1}&limit=${limit}`,
        prev:(page -1>0)? `/api/produtcs?page=${page-1}&limit=${limit}`:null,
        products:products.map((product) => ({
            id: product.id,
            name: product.name,
            available: product.available
        }))
    }

    } catch (error) {
        throw CustomError.internalServer(`${error}`);
    }
}

}