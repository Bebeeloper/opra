const faker = require('faker');

class ProductsServices {

  constructor(){
    this.products = [];
    this.generateProducts();
  }

  generateProducts(){
    this.products = [{
      refId: faker.datatype.uuid(),
      ref: '1251',
      name: 'Gorra',
      cost: 25000,
      price: 35000,
      Image: faker.image.imageUrl()
    },
    {
      refId: faker.datatype.uuid(),
      ref: 'TF1351',
      name: 'Camiseta tela fría',
      cost: 35000,
      price: 60000,
      Image: faker.image.imageUrl()
    },
    {
      refId: faker.datatype.uuid(),
      ref: '1781',
      name: 'Jean dama Eva',
      cost: 78000,
      price: 110000,
      Image: faker.image.imageUrl()
    },
    {
      refId: faker.datatype.uuid(),
      ref: '1551',
      name: 'Jean dama Apocalipto',
      cost: 55000,
      price: 95000,
      Image: faker.image.imageUrl()
    }]
  }

  getAllProducts(){
    return this.products;
  }

  getProductById(productId){
    const product = this.products.find(product => product.refId === productId);
    if (product) {
      return {
        message: 'Product founded',
        data: product
      }
    }else{
      return {message: 'Producto no encontrado... productId: ' + productId};
    }
  }

  getProductByName(productName){
    const product = this.products.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
    if (product.length != 0) {
      return {
        message: 'Product founded',
        data: product
      }
    }else{
      return {message: 'Producto name does not exist ' + productName};
    }
  }

  postOneProduct(body){
    let product = {
      refId: faker.datatype.uuid(),
      ref: body.ref,
      name: body.name,
      cost: body.cost,
      price: body.price,
      Image: body.Image
    }
    if (Object.keys(body).length != 0) {
      this.products.push(product);
      return {
        message: 'Product created successfully',
        data: product
      }
    }else{
      return {ErrorMessage: 'Debes poner un body en formato JSON'};
    }
  }

  patchOneProduct(productId, body){
    let index = this.products.findIndex(product => product.refId === productId);
    if (index != -1) {
      const product = this.products[index];
      this.products[index] = {
        ...product, //merge data in JSON
        ...body //merge data in JSON
      };
      return {
        Message: 'Product updated successfully',
        data: {
          ...product,
          ...body
        }
      };
    }else{
      return { ErrorMessage: 'Product: ' + productId + ' not found' };
    }
  }

  deleteProduct(productId){
    let product = this.products.find(product => product.refId === productId);
    const productIndex = this.products.indexOf(product);
    if (product) {
      this.products.splice(productIndex, 1);
      return {
        message: 'Product deleted successfully',
        product
      }
    }else{
      return { ErrorMessage: 'Product: ' + productId + ' not found' };
    }
  }

}

module.exports = ProductsServices;
