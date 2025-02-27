import * as yup from 'yup';


//get all
const getAllSchema = yup
  .object({
    query: yup.object({
        page: yup.number().integer().positive().optional(),
        limit: yup.number().integer().positive().optional(),
        }),
        sort_type: yup.string().oneOf(['asc', 'desc']).optional(),
        sort_by: yup.string().oneOf(['createdAt', 'category_name']).optional(),
        keyword: yup.string().min(3).max(50).optional(), // search category_name
    })
  .required();

  //get by id
  const getByIdSchema = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-ObjectID'}).required(),
    }),
  })
  .required();// khi truyền vào object phải tồn tại

  //create
const createSchema = yup
  .object({
    body: yup.object({
      category_name: yup.string().min(3).max(50).required(), // required: bắt buộc
      description: yup.string().max(255).optional(), // optional: không bắt buộc
    }),
  })
  .required();// khi truyền vào object phải tồn tại




//update by id
const updateByIdSchema = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-ObjectID'}).required(),
    }),
    body: yup.object({
        category_name: yup.string().min(3).max(50).optional(),
        description: yup.string().max(255).optional(),
    })
  })
  .required();

  //delete by id
const deleteByIdSchema = yup
.object({
  params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-ObjectID'}).required(),
  }),
  body: yup.object({
      category_name: yup.string().min(3).max(50).optional(),
      description: yup.string().max(255).optional(),
  })
})
.required();


export default {
    getAllSchema,
    getByIdSchema,
    createSchema,
    updateByIdSchema
};