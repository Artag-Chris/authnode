import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDTO, UserEntity } from "../../domain";


export class CategoryService {

constructor() {}

async createCategory(createCategoryDto: CreateCategoryDto, user:UserEntity) {

const categoryExist = await CategoryModel.findOne({ name: createCategoryDto.name });
if (categoryExist) throw CustomError.badRequest('Category already exist');

try {


    const category = new CategoryModel({ ...createCategoryDto, user: user.id });
    await category.save();
    return {
        id: category.id,
        name: category.name,
        available: category.available
    }
    
} catch (error) {
    throw CustomError.internalServer(`${error}`);
}

}

async getCategories(paginationDto:PaginationDTO) {

    const {page,limit}=paginationDto;

    try {
        
    const categories = await CategoryModel.find()
    .skip((page-1)*limit)
    .limit(limit);
    
    return categories.map((category) => ({
        id: category.id,
        name: category.name,
        available: category.available
    }))

    } catch (error) {
        throw CustomError.internalServer(`${error}`);
    }
}

}