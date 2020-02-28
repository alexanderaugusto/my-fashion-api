const express = require("express")
const multer = require("multer")
const multerConfig = require("./config/multer")
const authMiddleware = require("./middlewares/authMiddleware")
const companyAuthMiddleware = require("./middlewares/companyAuthMiddleware")

const UserController = require("./controllers/UserController")
const CardController = require("./controllers/CardController")
const AddressController = require("./controllers/AddressController")
const CartController = require("./controllers/CartController")
const ProductController = require("./controllers/ProductController")
const ImageController = require("./controllers/ImageController")
const OrderController = require("./controllers/OrderController")
const FavoriteController = require("./controllers/FavoriteController")
const CategoryController = require("./controllers/CategoryController")
const BrandController = require("./controllers/BrandController")
const CompanyController = require("./controllers/CompanyController")
const SubcategoryController = require("./controllers/SubcategoryController")

const routes = express.Router()

// Auth
routes.post("/login", UserController.login) // Realiza o login na aplicação (usuário)
routes.post("/company/login", CompanyController.login) // Realiza o login na aplicação (empresa)

// User
routes.post("/user/create", UserController.store) // Insere um novo usuário
routes.get("/user/list_all", UserController.listAll) // Busca todos os usuários
routes.get("/user/list", authMiddleware, UserController.list) // Busca todas as informações de um usuário
routes.put("/user/update", authMiddleware, UserController.update) // Atualiza as informações de um usuário
routes.post("/user/upload_image", multer(multerConfig).array("files"), authMiddleware, UserController.uploadImage) // Insere imagens no banco de dados

// Cart
routes.post("/cart/insert", authMiddleware, CartController.store) // Insere um produto no carrinho do usuário
routes.get("/cart/list", authMiddleware, CartController.list) // Lista todos os produtos do carrinho do usuário
routes.delete("/cart/delete_product", authMiddleware, CartController.removeProduct) // Remove um produto do carrinho do usuário
routes.put("/cart/update_info", authMiddleware, CartController.updateInfo) // Altera informações do carrinho do usuário

// Orders
routes.post("/order/create", authMiddleware, OrderController.create) // Cria um novo pedido para o usuário
routes.get("/order/list_all", OrderController.listAll) // Lista todos os pedidos da loja
routes.get("/order/list", authMiddleware, OrderController.userListAll) // Lista os pedidos de um usuário
routes.put("/order/status/update", companyAuthMiddleware, OrderController.updateStatus) // Atualiza o status de um pedido
routes.post("/order/status/create", companyAuthMiddleware, OrderController.createStatus) // Cria um novo status
routes.get("/order/status/list_all", authMiddleware, OrderController.listStatus) // Lista todos os status

// Favorites
routes.post("/favorite/create", authMiddleware, FavoriteController.store) // Adiciona um produto como favorito
routes.get("/favorite/list", authMiddleware, FavoriteController.list) // Lista todos os produtos do usuários marcados como favorito
routes.delete("/favorite/delete_product", authMiddleware, FavoriteController.removeProduct) // Remove um produto marcado como favorito

// Card
routes.post("/card/create", authMiddleware, CardController.store) // Insere um novo cartão de crédito para o usuário
routes.get("/card/list", authMiddleware, CardController.list) // Lista os cartões do usuário
routes.put("/card/update", authMiddleware, CardController.update) // Atualiza um cartão de crédito
routes.delete("/card/delete", authMiddleware, CardController.remove) // Remove um cartão de crédito

// Address
routes.post("/address/create?:user_email", authMiddleware, AddressController.store) // Insere um novo endereço para o usuário
routes.get("/address/list?:user_email", authMiddleware, AddressController.list) // Busca os endereços do usuário
routes.put("/address/update", authMiddleware, AddressController.update) // Altera o endereço do usuário
routes.delete("/address/delete", authMiddleware, AddressController.remove) // Remove um endereço do usuário

// Products
routes.post("/product/create", multer(multerConfig).array("files"), companyAuthMiddleware, ProductController.storeOne) // Insere um produto no banco de dados
routes.post("/product/update", multer(multerConfig).array("files"), companyAuthMiddleware, ProductController.update) // Altera as informações de um produto
routes.get("/product/list_all", ProductController.listAll) // Lista todos os produtos do banco de dados
routes.get("/product/list", ProductController.listOne) // Lista todas as informações de um produto
routes.post("/product/frete_calculator", ProductController.fretePrazeCalculator) // Calcula o frete e prazo de um detrminado produto
routes.get("/product/list_offers", ProductController.listProductOffers) // Lista offertas relacionadas a um produto
routes.get("/product/list_by_category", ProductController.listProductsByCategory) // Lista os produtos pela categoria
routes.get("/product/search", ProductController.searchProduct) // Busca produtos baseado na pesquisa do usuário
routes.post("/product/delete", companyAuthMiddleware, ProductController.delete) // Apaga um produto do banco de dados

// Product Images
routes.post("/product/images/insert", multer(multerConfig).array("files"), ImageController.store) // Insere imagens no banco de dados

// Category
routes.post("/category/create", companyAuthMiddleware, CategoryController.create) // Cria uma nova categoria
routes.get("/category/list", CategoryController.listOne) // Lista as informações de uma categoria
routes.get("/category/list_all", CategoryController.listAll) // Lista todas as categorias
routes.put("/category/update", companyAuthMiddleware, CategoryController.update) // Atualiza uma categoria
routes.delete("/category/delete", companyAuthMiddleware, CategoryController.delete) // Remove uma categoria

// Sub categoria
routes.post("/subcategory/create", companyAuthMiddleware, SubcategoryController.create) // Cria uma nova sub categoria
routes.get("/subcategory/list", SubcategoryController.listOne) // Lista as informações de uma sub categoria
routes.get("/subcategory/list_all", SubcategoryController.listAll) // Lista todas as sub categorias
routes.put("/subcategory/update", companyAuthMiddleware, SubcategoryController.update) // Atualiza uma sub categoria
routes.delete("/subcategory/delete", companyAuthMiddleware, SubcategoryController.delete) // Remove uma sub categoria

// Brand
routes.post("/brand/create", companyAuthMiddleware, BrandController.create) // Cria uma nova marca
routes.get("/brand/list", BrandController.listOne) // Lista as informações de uma marca
routes.get("/brand/list_all", BrandController.listAll) // Lista todas as marcas
routes.put("/brand/update", companyAuthMiddleware, BrandController.update) // Atualiza uma marca
routes.delete("/brand/delete", companyAuthMiddleware, BrandController.delete) // Remove uma marca

// Company
routes.post("/company/create", CompanyController.create) // Cria uma nova empresa
routes.get("/company/list", companyAuthMiddleware, CompanyController.listOne) // Lista as informações de uma empresa
routes.get("/company/list_all", CompanyController.listAll) // Lista todas as empresas
routes.put("/company/update", companyAuthMiddleware, CompanyController.update) // Atualiza uma empresa
routes.delete("/company/delete", companyAuthMiddleware, CompanyController.delete) // Remove uma empresa
routes.get("/company/list_users", companyAuthMiddleware, CompanyController.listUsers) // Lista todos os usuários
routes.get("/company/list_sales", companyAuthMiddleware, CompanyController.listSales) // Lista as vendas da empresa
routes.get("/company/list_products", companyAuthMiddleware, CompanyController.listProducts) // Lista os produtos da empresa

module.exports = routes