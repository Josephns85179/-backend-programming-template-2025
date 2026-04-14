# How to gacha?

1. Create a user using localhost:5000/api/users in echo API using POST
   example:
   {
   "email": "example@gmail.com",
   "full_name": "Example User",
   "password": "12345678"
   "confirm_password": "1234678"
   }
2. Get the user id by using the same URL but using GET this time
3. Insert it into localhost:5000/api/gacha using POST in this format:
   {
   "userId": "(the user id you copied)"
   }
4. See the results! The quota for each prize automatically decreases in MongoDB every time someone wins a prize.

Output example:
{
"sukses": true,
"message": "Selamat! Anda mendapatkan hadiah.",
"data": {
"hadiah": "Pulsa Rp. 50,000",
"waktuMenang": "2026-04-13T16:34:29.589Z"
}
}
