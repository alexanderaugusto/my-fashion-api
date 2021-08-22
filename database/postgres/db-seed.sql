INSERT INTO companies (cnpj, name, email, password, phone, address, city, state, zipcode, created_at, updated_at)
VALUES ('03.558.808/0001-87', 'My Fashion Oficial', 'myfashion@email.com', '$2a$16$kthyaGL8azojQRc3YI.tOOEE3KcG69JDCZpHU2qmT793CqaBLrMGO',
'(35)99999-9999', 'Rua assombrada', 'São José do Alegre', 'MG', '37510-000', '2020-07-22', '2020-07-22');

INSERT INTO brands (name, created_at, updated_at) 
VALUES ('Adidas', '2020-07-22', '2020-07-22'), ('Asics', '2020-07-22', '2020-07-22'), ('Fila', '2020-07-22', '2020-07-22'), ('Kappa', '2020-07-22', '2020-07-22'),
('Mizuno', '2020-07-22', '2020-07-22'), ('Nike', '2020-07-22', '2020-07-22'), ('Oakley', '2020-07-22', '2020-07-22'), ('Olympikus', '2020-07-22', '2020-07-22'),
('Puma', '2020-07-22', '2020-07-22'), ('Umbro', '2020-07-22', '2020-07-22'), ('Mormaii', '2020-07-22', '2020-07-22'), ('Outra', '2020-07-22', '2020-07-22');

INSERT INTO categories (name, image, created_at, updated_at) 
VALUES ('Calçados', 'fas fa-shoe-prints', '2020-07-22', '2020-07-22'), ('Roupas', 'fas fa-tshirt', '2020-07-22', '2020-07-22'), 
('Acessórios', 'fas fa-glasses', '2020-07-22', '2020-07-22'), ('Eletrônicos', 'fas fa-bolt', '2020-07-22', '2020-07-22'),
('Mais categorias', 'fas fa-plus-square', '2020-07-22', '2020-07-22');

INSERT INTO subcategories (name, category_id, created_at, updated_at) 
VALUES ('Botas', 1, '2020-07-22', '2020-07-22'), ('Chinelos', 1, '2020-07-22', '2020-07-22'), ('Chuteiras', 1, '2020-07-22', '2020-07-22'), 
('Sandálias', 1, '2020-07-22', '2020-07-22'), ('Sapatilhas', 1, '2020-07-22', '2020-07-22'), ('Sapatênis', 1, '2020-07-22', '2020-07-22'), 
('Tênis', 1, '2020-07-22', '2020-07-22'), ('Bermudas', 2, '2020-07-22', '2020-07-22'), ('Calças', 2, '2020-07-22', '2020-07-22'), 
('Camiseta de Time', 2, '2020-07-22', '2020-07-22'), ('Camisas Polo', 2, '2020-07-22', '2020-07-22'), ('Camisetas', 2, '2020-07-22', '2020-07-22'),
('Jaquetas e Casacos', 2, '2020-07-22', '2020-07-22'), ('Moletons', 2, '2020-07-22', '2020-07-22'), ('Shorts', 2, '2020-07-22', '2020-07-22'), 
('Uniformes', 2, '2020-07-22', '2020-07-22'), ('Bolas', 3, '2020-07-22', '2020-07-22'), ('Bonés', 3, '2020-07-22', '2020-07-22'), 
('Capacetes', 3, '2020-07-22', '2020-07-22'), ('Malas', 3, '2020-07-22', '2020-07-22'), ('Meias', 3, '2020-07-22', '2020-07-22'), ('Meiões', 3, '2020-07-22', '2020-07-22'), 
('Mochilas', 3, '2020-07-22', '2020-07-22'), ('Óculos', 3, '2020-07-22', '2020-07-22'), ('Relógios', 3, '2020-07-22', '2020-07-22'), 
('Caixa de Som', 4, '2020-07-22', '2020-07-22'), ('Fones de Ouvido', 4, '2020-07-22', '2020-07-22'), ('Consoles', 4, '2020-07-22', '2020-07-22'),
('Jogos', 4, '2020-07-22', '2020-07-22'), ('Headset', 4, '2020-07-22', '2020-07-22'), ('Mouse', 4, '2020-07-22', '2020-07-22'), ('Teclado', 4, '2020-07-22', '2020-07-22'),
('Saúde e bem estar', 5, '2020-07-22', '2020-07-22'), ('Suplementos', 5, '2020-07-22', '2020-07-22');

INSERT INTO products (cod, title, price, quantity, category_id, brand_id, company_id, created_at, updated_at)
VALUES ('D12-2759-890-38', 'Tênis Nike Sb Check Solar Cnvs Masculino - Branco e Chumbo', 129.99, 45, 7, 6, 1, '2020-07-22', '2020-07-22'),
('HZM-1731-026-37', 'Tênis Nike Revolution 5 Masculino - Preto e Branco', 249.99, 78, 7, 6, 1, '2020-07-22', '2020-07-22'),
('COL-7146-014-38', 'Tênis Adidas Grand Court Base Masculino - Branco', 142.49, 90, 7, 6, 1, '2020-07-22', '2020-07-22'),
('MSX-0007-006-02', 'Kit Camiseta Básica c/ 5 Peças Masculina - Preto e Branco', 99.99, 16, 12, 12, 1, '2020-07-22', '2020-07-22'),
('B25-1607-377-02', 'Camiseta Ecko Básica E886A Masculina - Mescla Escuro', 25.64, 132, 12, 12, 1, '2020-07-22', '2020-07-22'),
('COL-2509-036-02', 'Camiseta Adidas Entrada 18 Masculina - Marinho e Branco', 47.49, 55, 12, 1, 1, '2020-07-22', '2020-07-22'),
('QWT-0078-014-01', 'Fone De Ouvido Universal - Branco', 10.00, 10, 27, 12, 1, '2020-07-22', '2020-07-22'),
('N26-0487-006-01', 'Fone de Ouvido JBL T500 On Ear Bluetooth - Preto', 249.00, 101, 30, 12, 1, '2020-07-22', '2020-07-22'),
('IBS-0011-006-01', 'Mouse Gamer Sensor Óptico 4000dpi OEX - Preto', 104.90, 88, 31, 12, 1, '2020-07-22', '2020-07-22'),
('D12-9317-006-01', 'Boné Nike Aba Curva H86 Metal Swoosh - Preto', 75.99, 45, 18, 6, 1, '2020-07-22', '2020-07-22'),
('HZM-1074-044-01', 'Bola de Futebol Campo Réplica Brasil CBF Nike Strike - Branco e Azul', 69.99, 67, 17, 6, 1, '2020-07-22', '2020-07-22'),
('252-0948-799-01', 'Whey Protein Nutri Refil 907 g - IntegralMédica', 33.36, 32, 34, 12, 1, '2020-07-22', '2020-07-22'),
('A05-0092-799-01', '100% Whey 2 kg - Max Titanium', 221.80, 52, 34, 12, 1, '2020-07-22', '2020-07-22'),
('COL-6931-026-02', 'Calça Adidas Sere 19 Masculina - Preto e Branco', 149.99, 46, 9, 1, 1, '2020-07-22', '2020-07-22'),
('D14-5607-012-02', 'Calça Puma Active Tricot Masculina - Marinho', 119.90, 28, 9, 9, 1, '2020-07-22', '2020-07-22');

INSERT INTO images (id, name, product_id, created_at, updated_at)
VALUES ('ab1da59b80e377f5a5fc15e65a0591ad', 'ab1da59b80e377f5a5fc15e65a0591ad-product1.1.jpg', 1, '2020-07-22', '2020-07-22'),
('9c22234794aa11797d1c6999a40fea31', '9c22234794aa11797d1c6999a40fea31-product1.2.jpg', 1, '2020-07-22', '2020-07-22'),
('1547d1459774f390d67a99a975624993', '1547d1459774f390d67a99a975624993-product1.3.jpg', 1, '2020-07-22', '2020-07-22'),
('b2504bfe96caddd0a6ec38b856880415', 'b2504bfe96caddd0a6ec38b856880415-product2.1.jpg', 2, '2020-07-22', '2020-07-22'),
('4a8bf1373b614a8d034197c4f8a84c00', '4a8bf1373b614a8d034197c4f8a84c00-product2.2.jpg', 2, '2020-07-22', '2020-07-22'),
('2e0398cbdf1cb987c1ce1d395a98d674', '2e0398cbdf1cb987c1ce1d395a98d674-product2.3.jpg', 2, '2020-07-22', '2020-07-22'),
('f0e6f66f9cab1cabc116654dc98799c4', 'f0e6f66f9cab1cabc116654dc98799c4-product2.4.jpg', 2, '2020-07-22', '2020-07-22'),
('5f5b60f76c4cafe2ab19ecad994851cf', '5f5b60f76c4cafe2ab19ecad994851cf-product3.1.jpg', 3, '2020-07-22', '2020-07-22'),
('287fba0532765d84c330856cafa078b1', '287fba0532765d84c330856cafa078b1-product3.2.jpg', 3, '2020-07-22', '2020-07-22'),
('b01febe5992ce0f64831bc771f546268', 'b01febe5992ce0f64831bc771f546268-product3.3.jpg', 3, '2020-07-22', '2020-07-22'),
('8ea94f49f0bb82d57cc1f0a312c7bce2', '8ea94f49f0bb82d57cc1f0a312c7bce2-product4.1.jpg', 4, '2020-07-22', '2020-07-22'),
('b93192cf38242ef063b9e1b9390b7c47', 'b93192cf38242ef063b9e1b9390b7c47-product4.2.jpg', 4, '2020-07-22', '2020-07-22'),
('2dea498c1ac8823fe97ecb0417e8bbf6', '2dea498c1ac8823fe97ecb0417e8bbf6-product5.1.jpg', 5, '2020-07-22', '2020-07-22'),
('382fa3584f41f6c0b690b4c1d8923f42', '382fa3584f41f6c0b690b4c1d8923f42-product5.2.jpg', 5, '2020-07-22', '2020-07-22'),
('a514c66285e44537bbdd94f6013a568a', 'a514c66285e44537bbdd94f6013a568a-product6.1.jpg', 6, '2020-07-22', '2020-07-22'),
('0ac7542bcde86c63d6b4b60c4d7da9cb', '0ac7542bcde86c63d6b4b60c4d7da9cb-product6.2.jpg', 6, '2020-07-22', '2020-07-22'),
('a3e477d529a246815b1aa429098f1fed', 'a3e477d529a246815b1aa429098f1fed-product6.3.jpg', 6, '2020-07-22', '2020-07-22'),
('c8dc211be3f6c174f3f27c16351b1e66', 'c8dc211be3f6c174f3f27c16351b1e66-product7.1.jpg', 7, '2020-07-22', '2020-07-22'),
('340f09b6ef153aca413fc7f9f867cbe1', '340f09b6ef153aca413fc7f9f867cbe1-product8.1.jpg', 8, '2020-07-22', '2020-07-22'),
('aa6fde11e03540900337213d9e30f92e', 'aa6fde11e03540900337213d9e30f92e-product8.2.jpg', 8, '2020-07-22', '2020-07-22'),
('28da756921d4bcd350f44ce655e296ef', '28da756921d4bcd350f44ce655e296ef-product8.3.jpg', 8, '2020-07-22', '2020-07-22'),
('3e4e5899016fc2025341a0f1407008b9', '3e4e5899016fc2025341a0f1407008b9-product9.1.jpg', 9, '2020-07-22', '2020-07-22'),
('ca6581e989e0f9458885c7dc62fa2201', 'ca6581e989e0f9458885c7dc62fa2201-product9.2.jpg', 9, '2020-07-22', '2020-07-22'),
('d2f38a96eb85f8ffef3660a89032f2a5', 'd2f38a96eb85f8ffef3660a89032f2a5-product9.3.jpg', 9, '2020-07-22', '2020-07-22'),
('c226e6b326d5fe263ec8874a47838b85', 'c226e6b326d5fe263ec8874a47838b85-product10.1.jpg', 10, '2020-07-22', '2020-07-22'),
('d985c9450d51d1b0d852998e2dd0c3dd', 'd985c9450d51d1b0d852998e2dd0c3dd-product10.2.jpg', 10, '2020-07-22', '2020-07-22'),
('474676d6503433eb47ca526aa4053aa0', '474676d6503433eb47ca526aa4053aa0-product11.1.jpg', 11, '2020-07-22', '2020-07-22'),
('bd7734c7aff3e718161dc2ed5ca06a8d', 'bd7734c7aff3e718161dc2ed5ca06a8d-product11.2.jpg', 11, '2020-07-22', '2020-07-22'),
('1beee9ac3edd967e50c2f49eea098e2b', '1beee9ac3edd967e50c2f49eea098e2b-product12.1.jpg', 12, '2020-07-22', '2020-07-22'),
('17629a75a15c8506bfdf8b9c9903dc98', '17629a75a15c8506bfdf8b9c9903dc98-product13.1.jpg', 13, '2020-07-22', '2020-07-22'),
('7d9a3efc8af6a885ecdb1bb09d8cd356', '7d9a3efc8af6a885ecdb1bb09d8cd356-product14.1.jpg', 14, '2020-07-22', '2020-07-22'),
('179c42575d1181c11c08c07ae430d57c', '179c42575d1181c11c08c07ae430d57c-product14.2.jpg', 14, '2020-07-22', '2020-07-22'),
('f9081543f391335dd5b4843ba381db33', 'f9081543f391335dd5b4843ba381db33-product15.1.jpg', 15, '2020-07-22', '2020-07-22'),
('33279e0980ff5e8f0d1b437abdf91fe5', '33279e0980ff5e8f0d1b437abdf91fe5-product15.2.jpg', 15, '2020-07-22', '2020-07-22');