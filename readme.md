# Host-ape API

Bem-vindo à documentação da Host-Ape API, uma plataforma para gestão e reserva de apartamentos. Este documento descreve os principais endpoints disponíveis, seus métodos HTTP, parâmetros e exemplos de uso.

## Autenticação

A maioria dos endpoints exige autenticação via token JWT. Inclua o token no cabeçalho da requisição:

```
Authorization: Bearer <seu-token-aqui>
```

## Endpoints disponíveis

1. POST /guests/sign-in
   Realiza a autenticaçào de um hóspede existente

**Corpo da Requisição (JSON):**

```
{
  "email": "usuario@example.com",
  "password": "senha123"
}

```

2. POST /guests/sign-up
   Cria uma nova conta de hóspede

**Corpo da Requisição (JSON):**

```
{
  "name": "João Silva",
  "email": "usuario@example.com",
  "password": "senha123",
  "phone" : "123456789"
}

```

3. GET /apartments
   Recupera todos os usuários

4. GET /apartments/:id
   Recupera os detalhes de um apartamento específico caso exista

5. POST /apartments
   Cria um novo apartamento

**Corpo da Requisição (JSON):**
```
{
    "name": "Aconchego no Litoral Norte",
    "simpleLocation": "Cabedelo, Paraíba",
    "basicPrice": "210",
    "type": "Apartment",
    "bathroom": 2,
    "bedroom": 2,
    "kitchen": true,
    "beds": 3,
    "about": "Aproveite tudo o que o litoral norte paraibano oferece!\n\nA 200 metros (5 min a pé) da Praia de Areia Dourada, com acesso fácil a passeios para Ilha Vermelha e ao pôr do sol da Praia do Jacaré.O apê conta com dois banheiros, garagem privativa, ar-condicionado na suíte e no quarto social, e uma cozinha completa (fogão, micro-ondas, airfryer, purificador de água). Ambiente acolhedor com cama queen, cama de solteiro e sofá-cama. Espaço para home office com Wi-Fi e mesa em L.",
    "details": [
        {
            "name": "Quarto Suíte",
            "value": "Cama, Guarda-roupas, Televisão"
        },
        {
            "name": "Quarto e Escritório",
            "value": "Mesa, Cadeira, Cama, Armário"
        },
        {
            "name": "Cozinha",
            "value": "Equipada"
        },
        {
            "name": "Chuveiro",
            "value": "Elétrico"
        },
        {
            "name": "Sala de Estar",
            "value": "Televisão, Sofá cama"
        },
        {
            "name": "Sala de Jjantar",
            "value": "Mesa 4 pessoas, Aparador de Café"
        },
        {
            "name": "Segurança",
            "value": "Fechadura Eletrônica"
        }
    ],
    "commodities": [
        { "name": "Elevador Social", "has": false },
        { "name": "Bicicletário", "has": false },
        { "name": "Estacionamento", "has": true },
        { "name": "Portaria 24 horas", "has": false },
        { "name": "Piscina", "has": true },
        { "name": "Churrasqueira", "has": true },
        { "name": "Permitido Animais", "has": true },
        { "name": "Detector de Fumaça", "has": false }
    ],
    "rules": {
        "check_out": "12:00",
        "check_in": "14:00",
        "guests_quantity": 4
    },
    "contacts": [
        { "contact_name": "Anfitriã", "phone": "(81)98974-4485" },
        { "contact_name": "Portaria", "phone": "não informado" },
        { "contact_name": "Polícia Militar", "phone": "190" }
    ],
    "property_security": [
        { "name": "Senha Porta", "value": "123456" },
        { "name": "Senha Bloco", "value": "v + 265546" },
        { "name": "Senha Entrada", "value": "senha + 4445" },
        { "name": "Detector de Fumação", "value": "não informado" }
    ]
}
```
