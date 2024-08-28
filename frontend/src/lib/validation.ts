
export async function validateCategory(category: string): Promise<boolean> {

    const validCategories = ['clothes', 'shoes', 'ball', 'accessories'];
    return validCategories.includes(category);
}

export async function validateSubcategory(category: string, subcategory: string): Promise<boolean> {
   
    const validSubcategories: { [key: string]: string[] } = {
        'clothes': ['men', 'women', 'kid'],
        'shoes': ['men', 'women', 'kid'],
        'ball': [],
        'accessories': ['band', 'water-bottle', 'backpack', 'tool']
    };
    return validSubcategories[category]?.includes(subcategory) ?? false;
}

export async function validateProduct(productId: string): Promise<boolean> {
   
    return true; 
}