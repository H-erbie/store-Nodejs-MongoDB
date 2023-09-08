const Product = require('../model/products')


const getAllProductsstatic = async (req, res) => {
  const se = 'jor'
  const products = await Product.find({}).select('name price').limit(2)
  res.status(200).json({ msg: products, hits: products.length});
};

const getAllProducts = async (req, res) => {
  const {featured, name, company, sort, fields} = req.query;
  const queryObj = {}
  if(featured){
    queryObj.featured = featured === 'true' ? true : false
  }
  if(company){
    queryObj.company = company
  }
  if(name){
    queryObj.name = {$regex: name, $options: 'i'}
    console.log(queryObj.name)

  }
  let result = Product.find(queryObj)

  //sort
  if(sort){
    let sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
    console.log(sort.split(',').join(' '))
  }
  else{
    result = result.sort()
  }
  if(fields){
    let fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 3
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const products = await result
  res.status(200).json({ msg: products });
};

module.exports = {
  getAllProducts,
  getAllProductsstatic,
};
