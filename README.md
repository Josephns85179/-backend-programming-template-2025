# How to gacha?

1. Create a user using localhost:5000/api/users in echo API using the POST method
   example:
   {
   "email": "example@gmail.com",
   "full_name": "Example User",
   "password": "12345678"
   "confirm_password": "1234678"
   }
2. Get the user id by using the same URL but using the GET method this time, copy it
3. Input it into localhost:5000/api/gacha using the POST method in this format:
   {
   "userId": "(the user id you copied)"
   }
4. See the results! The quota for each prize automatically decreases in the database (MongoDB) every time someone wins a prize

Output example:
{
"selamat": "Anda mendapatkan hadiah!",
"hadiah": "Pulsa Rp. 50,000",
"waktuMenang": "2026-04-15T14:42:00.236Z"
}

# Additional endpoints:

localhost:5000/api/gacha/histori => returns the history of the user's previous gacha plays
Input using the POST method:
{
"userId": "(the user id you copied)"
}

Output example:
{
"daftarHadiahUser": [
{
"hadiahName": "Voucher Rp. 100,000",
"tanggalDibuat": "2026-04-15T14:45:12.210Z"
},
{
"hadiahName": "Pulsa Rp. 50,000",
"tanggalDibuat": "2026-04-13T16:30:03.437Z"
}
]
}

localhost:5000/api/gacha/daftarhadiah => returns the list of prizes and their remaining quota
Use the GET method

Output example (after several gacha plays, causing the quota to decrease):
{
"daftarHadiahGacha": [
{
"name": "Smartphone X",
"kuota": 5
},
{
"name": "Pulsa Rp. 50,000",
"kuota": 493
},
{
"name": "Voucher Rp. 100,000",
"kuota": 99
},
{
"name": "Emas 10 Gram",
"kuota": 1
},
{
"name": "Smartwatch Y",
"kuota": 10
}
]
}
