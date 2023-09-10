const Product = require('../model/products')


const getAllProductsstatic = async (req, res) => {
  const se = 'jor'
  const products = await Product.find({price: {$gt: 100}}) //.select('name price').limit(2)
  res.status(200).json({ msg: products, hits: products.length});
};

const getAllProducts = async (req, res) => {
  const {featured, name, company, sort, fields, numericFilters} = req.query;
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
  //numeric filters
  if(numericFilters){
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte'
    }
    const regEx = /\b(<|>|=|<=|>=)\b/g
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item)=>{
      const [field, operator, value] = item.split('-')
      if(options.includes(field)){
        queryObj[field] = {[operator]:Number(value)}
      }
    })
    console.log(queryObj)
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
  //fields
  if(fields){
    let fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const products = await result
  res.status(200).json({ msg: products });
};

module.exports = {
  getAllProducts,
  getAllProductsstatic,
};
