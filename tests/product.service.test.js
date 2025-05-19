const mongoose = require('mongoose');
const Product = require('../src/models/product.model');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../src/services/product.service');

describe('Product Service', () => {

  let productId;

  it('should create a product', async () => {
    const product = await createProduct({
      oldCode: 'P001',
      name: 'Rodillera ortopédica',
      description: 'Con soporte reforzado',
      salePrice: 120.50,
      productionArea: 'costura',
      prescription: true,
      brand: 'OrtoPlus',
      provider: 'Distribuciones Médicas SRL',
      unitValue: 80.00,
      barcode: '1234567890123',
      colors: ['negro', 'azul'],
      categories: ['rodilleras', 'ortesis'],
      indications: 'Para lesiones de ligamentos',
      materials: ['neopreno', 'velcro'],
      technicalData: 'Compresión ajustable con cierre doble',
      multimedia: {
        type: 'imagen',
        path: 'https://example.com/rodillera.jpg'
      },
      weight: '300g',
      others: 'No lavar en máquina'
    });

    productId = product._id;
    expect(product.name).toBe('Rodillera ortopédica');
    expect(product.salePrice).toBeGreaterThan(0);
  });

  it('should get all products', async () => {
    const products = await getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should get product by ID', async () => {
    const product = await getProductById(productId);
    expect(product).toBeTruthy();
    expect(product._id.toString()).toBe(productId.toString());
  });

  it('should update a product', async () => {
    const updated = await updateProduct(productId, { name: 'Rodillera Pro' });
    expect(updated.name).toBe('Rodillera Pro');
  });

  it('should delete a product', async () => {
    const deleted = await deleteProduct(productId);
    expect(deleted).toBeTruthy();

    const result = await getProductById(productId);
    expect(result).toBeNull();
  });
});